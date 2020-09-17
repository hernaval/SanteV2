import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal,ActivityIndicator, Keyboard, Button } from 'react-native'
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SearchBar, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faNotesMedical, faHandsHelping, faPumpMedical, faDisease, faFileImage, faShareAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import Bdd from "../../API/Bdd"
import * as Sharing from 'expo-sharing';
import * as  FileSystem from 'expo-file-system';
import BottomMenu from "../../component/Menu/BottomMenu"
import { Avatar, Divider, ListItem } from 'react-native-elements';
import ImageView from "react-native-image-viewing";
import { Container, Header, Content, Tab, Tabs, ScrollableTab  } from 'native-base';
import ActionButton from 'react-native-action-button';
import ListFile from './ListFile'
import ToutDoc from './ToutDoc'
import Ordonnance from './Ordonnance'
import Certificat from './Certificat'
import Autre from './Autre'
import Attestation from './Attestation'
import CompteRendu from './CompteRendu'

class FileManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            documents: [],
            selectedCate: "all",
            numColored: 0,
            listOption: false,
            selectedDoc: null,
            modalVisible: false,
            imgIndex: 0,
            isLoading : false
        }
        this.images = []
        this.handleCate = this.handleCate.bind(this)
    }

    selectedDocItem() {
        let oneDoc = []
        if (this.state.selectedDoc !== null) {
            oneDoc = this.state.documents.filter(el => {
                return el.id === this.state.selectedDoc
            })
        }
        return oneDoc[0]
    }


    async componentDidMount() {
        this.setState({isLoading : true})
        await this._initDoc()
        this.setState({isLoading : false})

        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            await this._initDoc()
       });
    }


    _initDoc = async () => {
        let id = this.props.user ? this.props.user.user.idUser : 0;

        await axios.get(`${Bdd.api_url}/document/list?idUser=${id}`)
            .then((response) => {

                if (this.state.selectedCate === "all") {
                    this.setState({ documents: response.data.data })
                } else
                    if (this.state.selectedCate === "aut") {
                         let selectedDoc = response.data.data.filter(el => {
                            return (el.cateDoc !== "all" && el.cateDoc !== "ordo" &&
                                el.cateDoc !== "cert" && el.cateDoc !== "atte" &&
                                el.cateDoc !== "cptr")
                        }) 
                        

                        this.setState({ documents: selectedDoc })
                    }
                    else {
                        let selectedDoc = response.data.data.filter(el => {
                            return el.cateDoc == this.state.selectedCate
                        })
                        this.setState({ documents: selectedDoc }, () => {
                            //.log('state',this.state)
                        })
                    }

            })
    }

    renderCardCate = (text, isColor, cate, index) => (
        <TouchableOpacity key={index} onPress={() => { this.handleCate(cate, index) }} style={[styles.cardContainer, isColor == true ? { backgroundColor: "#008ac2" } : { backgroundColor: "white" }]}>
            <FontAwesomeIcon size={30} style={[styles.iconCard, isColor == true ? { color: "white" } : { color: "grey" }]} icon={faNotesMedical} />
            <Text style={[styles.cardText, isColor == true ? { color: "white" } : { color: "grey" }]}>{text}</Text>
        </TouchableOpacity>

    )
    handleCate = async (cate, index) => {
        this.setState({ isLoading: true })
        await this.setState({
            selectedCate: cate,
            numColored: index
        })

        await this._initDoc()
        this.setState({ isLoading: false })
    }
    goToDetail = (index) => {
        this.setState({ isVisible: true, imgIndex: index })
    }

    renderCardDoc = (id, docName, docDate, index) => (
        <TouchableOpacity onPress={() => this.goToDetail(index)} key={index} style={{ flexDirection: "column", marginRight: wp("1%") }}>
            <View style={styles.docType}>
                <Icon name="collections" />
            </View>
            <Text style={styles.docName}>{docName}</Text>
            <Text style={styles.docName}>{docDate}</Text>
        </TouchableOpacity>
    )

    blabla = (id, docName, docDate, index) => (
        <ListItem
            key={index}
            containerStyle={{ margin: 10 }}

            title={docName}
            subtitle={docDate}
            leftIcon={<FontAwesomeIcon icon={faFileImage} />}
            bottomDivider
            rightElement={
                <React.Fragment>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.goToDetail(index)}>
                        <FontAwesomeIcon icon={faEye} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.shareDoc(id)}>
                        <FontAwesomeIcon icon={faShareAlt} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.deleteDoc(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>
                </React.Fragment>
            }
        />
    )

    perform = (id) => {
        this.setState({
            selectedDoc: id,
            modalVisible: true
        })
    }
    shareDoc = async (id) => {
        this.setState({ isLoading: true })
        await this.getDoc(id)
        const image_source = Bdd.pict_url + this.state.uri
        FileSystem.downloadAsync(
            image_source,
            FileSystem.documentDirectory + ".jpg"
        )
            .then(async ({ uri }) => {
                console.log('Finished downloading to ', uri);

                await Sharing.shareAsync(uri);

                this.setState({ isLoading: false })
            })



    };
    getDoc = async (id) => {
        let data = {
            id: id
        }
        axios.post(Bdd.api_url + "/api/document/detail", data)
            .then((response) => {
                this.setState({
                    name_doc: response.data.document.nam,
                    uri: response.data.document.url
                })
            })
    }
    deleteDoc(id) {


        axios.delete(`${Bdd.api_url}/document/${id}`)
            .then(async (response) => {
                this.setState({isLoading : true})
                await this._initDoc()
                this.setState({isLoading : false})
            })
    }
    render() {
        const datas = [
            {
                type: "Tous", label: "all"
            }, {
                type: "Mes ordonnances", label: "ordo"
            }, {
                type: "Mes certificats", label: "cert"
            }, {
                type: "Mes attestations", label: "atte"
            }, {
                type: "Mes comptes-rendus", label: "cptr"
            }, {
                type: "Autres", label: "aut"
            }

        ]

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                        <HeaderMenu navigation={this.props.navigation} documents={1}/>
                    </View>

                    <View style={styles.contain_tabs}>
                    <Tabs
                        renderTabBar={()=> <ScrollableTab/>} 
                        tabBarUnderlineStyle={{borderBottomWidth:2, borderBottomColor: 'white'}} 
                        tabContainerStyle={{elevation:0}}>

                          <Tab heading="Tous mes documents" 
                            tabStyle={{backgroundColor: '#00C1B4'}} 
                            textStyle={{color: 'white', fontSize: 20}}
                            activeTabStyle={{backgroundColor: '#00C1B4'}} 
                            activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                                <ToutDoc navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                          </Tab>
            
                          <Tab heading="Mes ordonnances" 
                            tabStyle={{backgroundColor: '#00C1B4'}} 
                            textStyle={{color: 'white', fontSize: 20}}
                            activeTabStyle={{backgroundColor: '#00C1B4', borderColor: '#008ac8'}} 
                            activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                            <Ordonnance navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                          </Tab>

                            <Tab heading="Mes certificats" 
                            tabStyle={{backgroundColor: '#00C1B4'}} 
                            textStyle={{color: 'white', fontSize: 20}}
                            activeTabStyle={{backgroundColor: '#00C1B4', borderColor: '#008ac8'}} 
                            activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                            <Certificat navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                          </Tab>

                          
                          <Tab heading="Mes attestations" 
                          tabStyle={{backgroundColor: '#00C1B4'}} 
                          textStyle={{color: 'white', fontSize: 20}}
                          activeTabStyle={{backgroundColor: '#00C1B4', borderColor: '#008ac8'}} 
                          activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                          <Attestation navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                        </Tab>

                        
                        <Tab heading="Mes comptes rendus" 
                        tabStyle={{backgroundColor: '#00C1B4'}} 
                        textStyle={{color: 'white', fontSize: 20}}
                        activeTabStyle={{backgroundColor: '#00C1B4', borderColor: '#008ac8'}} 
                        activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                        <CompteRendu navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                      </Tab>

                      
                      <Tab heading="Autres" 
                      tabStyle={{backgroundColor: '#00C1B4'}} 
                      textStyle={{color: 'white', fontSize: 20}}
                      activeTabStyle={{backgroundColor: '#00C1B4', borderColor: '#008ac8'}} 
                      activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
                      <Autre navigation={this.props.navigation} idUser={this.props.user.user.idUser}/>
                    </Tab>

                    </Tabs>
                    </View>

                    {/**
                    <View style={styles.categories}>
                        <ScrollView indicatorStyle="white" nestedScrollEnabled={true} horizontal={true}>
                            {datas.map((data, i) => {
                                return this.state.numColored === i ? this.renderCardCate(data.type, true, data.label, i) : this.renderCardCate(data.type, false, data.label, i)
                            })}
                        </ScrollView>
                    </View>
                    */}


                </ScrollView>

                    <ActionButton style={styles.action_button} 
                     onPress={() => this.props.navigation.navigate("Test")} 
                    buttonColor="#008AC8">
                    </ActionButton>


                {/**
                    <BottomMenu navigation={this.props.navigation} />
                */}

            </View>

        )
    }
}
const styles = StyleSheet.create({
    action_button: 
    { 
  
    },
    contain_tabs: {
        marginTop: 15,
        zIndex: 0
    },
    container: {
        height: hp("100%"),
        backgroundColor: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    docType: {
        backgroundColor: "#4f9e9e",
        borderColor: "grey",
        opacity: 0.5,
        padding: wp("4%"),
        borderRadius: 12
    },
    docName: {
        color: "#d3d3d3",
        textAlign: "center"
    },
    docContainer: {
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        height: hp("50%"),
        paddingTop: hp("1%"),

    },
    btnAction: {
        padding: wp("1%"),
        marginRight: wp("1%"),
        backgroundColor: "#cad0db",
        borderRadius: 5
    },
    docItem: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: hp("1%"),

        justifyContent: "space-around",


    },
    actionButton: {
        flexDirection: "row",
        justifyContent: "flex-end",

    },
    searchContainer: {
        width: wp("100%")
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    cardContainer: {
        height: hp("25%"),
        width: wp("70%"),
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: "grey",
        //  backgroundColor: "#008ac2",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cardText: {
        marginTop: 20,
        marginLeft: 10,
        color: "grey",
        fontSize: 14,
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontSize: 17
    },
    iconCard: {
        color: "grey",

    },
    under: {

        height: hp('10%'),
        width: wp("100%")
        // zIndex: 2
    },
    under_ios: {
        width: wp("100%"),
        height: hp('10%'),
        zIndex: 2
    },
    loading_container: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

const mapStateToProps = (store) => {
    return {
        user: store.user,
        /* contact: store.contact,
        second: store.second */
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FileManager)