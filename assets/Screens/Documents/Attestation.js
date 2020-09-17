import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Modal,ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { SearchBar, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes, faSearch, faNotesMedical, faHandsHelping, faEllipsisV, faPumpMedical, faFileImage, faShareAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import Bdd from "../../API/Bdd"
import * as Sharing from 'expo-sharing';
import * as  FileSystem from 'expo-file-system';
import { Avatar, Divider, ListItem, Tooltip, Text } from 'react-native-elements';
import ImageView from "react-native-image-viewing";
import {Input} from 'native-base';

class Attestation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            documents: [],
            selectedCate: "atte",
            numColored: 0,
            listOption: false,
            selectedDoc: null,
            modalVisible: false,
            imgIndex: 0,
            isLoading : false,
            currentId: 0
        }
        this.images = []
        this.tooltip = React.createRef()
        this.tab = 'atte'
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
        this.handleCate(this.tab, 1)
        this.setState({isLoading : false})
        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            await this._initDoc()
       });
       loc(this)
    }

    componentWillUnMount() {
        rol();
    }

    
    
    _initDoc = async () => {
        let id = this.props.idUser;

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


    handleCate = async (cate, index) => {
        this.setState({ isLoading: true })
        await this.setState({
            selectedCate: cate,
            numColored: index
        })

        await this._initDoc()
        this.setState({ isLoading: false })
    }

    reloadTooltip() {
        this.setState({
            documents: []
        })
        this.handleCate(this.tab, 1)
    }
    
    goToDetail = (index) => {
        this.reloadTooltip()
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

    _clickInfo(id, index, link) {
        return(
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.goToDetail(index)}>
                    <Text style={styles.text_popup}>Afficher</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  this.shareDoc(id,link)}>
                    <Text style={styles.text_popup}>Partager</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteDoc(id)}>
                    <Text style={styles.text_popup2}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    blabla = (id, docName, docDate, index, link) => (
        <ListItem
            key={index}
            containerStyle={{ margin: 10 }}
            titleStyle={{color: '#008ac8', fontWeight: 'bold'}}
            title={docName}
            subtitle={docDate}
            leftIcon={<FontAwesomeIcon icon={faFileImage} />}
            bottomDivider
            onPress={() => this.goToDetail(index)}
            rightElement={
                <React.Fragment>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Tooltip popover={this._clickInfo(id, index, link)} height={120} width={200}
                        backgroundColor="#008ac8"
                        ref={this.tooltip}
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Tooltip>
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

    shareDoc = async (id, link) => {
        // this.reloadTooltip()
        this.setState({ isLoading: true })
        // await this.getDoc(id)
        // const image_source = Bdd.pict_url + this.state.uri
        FileSystem.downloadAsync(
            link,
            FileSystem.documentDirectory + "share.jpg"
        )
            .then(async ({ uri }) => {
                console.log('Finished downloading to ', uri);
                await Sharing.shareAsync(uri);
                this.setState({ isLoading: false })
                this.reloadTooltip()
            }).catch(error => {
                console.error(error);
              });
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
        this.reloadTooltip()
    }
    render() {
        return (
            <View style={{ flex: 1}}>
            {
                /**
                 * 
                 *   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.contain_search}>
                    <View style={{flex: 1}}>
                        <FontAwesomeIcon 
                        icon={faSearch} 
                        color="#636363" 
                        size={23} 
                        />
                    </View>
        
                    <View style={{flex: 5, marginLeft: -5}}>
                    <Input 
                    placeholder="Que cherchez vous ?"
                    style={styles.inputSearch}
                    onChangeText={(text) => console.log(text)}
                    />
                    </View>
                    </View>
                </View>
                 */
            }


                <ScrollView style={styles.container}>
                    {this.state.isLoading && <View style={styles.loading_container}>
                        <ActivityIndicator size="large" />
                    </View>}

                    <View style={styles.docContainer}>
                        <View >
                            <ScrollView>
                                {this.state.documents.length !== 0 && this.state.documents.map((document, i) => {
                                    const dataImg = { uri: document.typeDoc }
                                    this.images.push(dataImg)
                                    let name = document.nomDoc
                                    let date = document.createdAt
                                    const jour = date.toString().substring(8,10)
                                    const mois = date.toString().substring(5,7)
                                    const annee = date.toString().substring(0,4)
                                    date = 'date : ' + jour + '/' + mois + '/' + annee
                                    return this.blabla(document.idDoc, name, date, i, document.typeDoc)
                                })}
                            </ScrollView>
                        </View>

                    </View>

                </ScrollView>

                

                <ImageView
                    images={this.images}
                    imageIndex={this.state.imgIndex}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text_popup: {
        color: 'white',
        fontSize: 17,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginBottom: 10
    },
    text_popup2: {
        color: 'white',
        fontSize: 17,
        marginBottom: 10
    },
    contain_search: {
        marginTop: 20,
        marginBottom: 10,
        flex: 1, 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        width: wp("85%"), 
        paddingTop: 0, 
        paddingLeft: 15, 
        height: 60, 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Attestation)