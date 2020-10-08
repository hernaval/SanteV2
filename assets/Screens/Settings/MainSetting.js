import React, { Component } from 'react'
import {
    StyleSheet, SafeAreaView, Share, Alert, Text, View, Modal,
    AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox
} from 'react-native'
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import InputProfil from '../../component/InputProfil';
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import { Avatar, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { setUserInfo, deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo, ModifyPhoto } from '../../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHome, faBars, faTimes, faCaretDown, faChevronRight, faEdit, faUmbrella,
    faUserAlt, faClinicMedical, faFileMedicalAlt, faUserCircle, faUsers,
    faExclamationCircle, faFirstAid, faCog, faUserLock, faWindowClose, faHandHolding, faHandPeace, faChartArea, faUserSecret, faMailBulk, faCodeBranch, faBookReader
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { TouchableHighlight, TextInput } from 'react-native-gesture-handler'
import Bdd from "../../API/Bdd"
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { saveInfo } from "../../API/firebase";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import PopNav from "../../component/Menu/PopNav";
import Cloud from '../../API/Cloud';
import google from "../../API/google"
import { getCurrentLocation, getCountryCode } from "../../services/location"
const API_KEY = google.cloud_key;
const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"




class MainSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.user.user != null ? this.props.user.user.nomUser : '',
            lastName: this.props.user.user != null ? this.props.user.user.prenomUser : '',
            id: this.props.user.user != null ? this.props.user.user.idUser : 0,
            uri_doc: null,
            photoUri: this.props.user.user != null ? this.props.user.user.imageUser : '',
            isLoading: false,
            isFirst: false,
            blood: '',
            size: '',
            weight: '',
            modalVisible: false,

            localCode: null
        }
        // console.log(this.props.user.user)

        this.ref = firebase.firestore().collection('profile');
        this.countProfil = 0;

    }

    componentDidMount = async () => {
        console.log('id ', this.props.user.user.idUser)
        this.fetchSante();

        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            /*   this.fetchSante() */
            this.setState({
                firstName: this.props.user.user != null ? this.props.user.user.nomUser : '',
                lastName: this.props.user.user != null ? this.props.user.user.prenomUser : '',
                photoUri: this.props.user.user != null ? this.props.user.user.imageUser : '',
            })
        });
        let location = await getCurrentLocation()
    

    }

  

    renderHeader = () => {

        return (
            <View style={styles.main_profil}>

                <Text style={{fontSize : 28}}>{this.props.user.user.prenomUser} {this.props.user.user.nomUser}</Text>
                
               {/*  <View style={styles.scoreContainer}>
                <View style={{alignItems :"center", marginRight : 5}}>
                    <Text style={styles.scoreTitle}>Ancienneté</Text>
                    <Text>5j</Text>
                </View>

                <View style={{alignItems :"center"}}>
                    <Text style={styles.scoreTitle}>Présence</Text>
                    <Text>Fréquent</Text>
                </View>
                </View> */}
               
            </View>
        )
    }


    fetchSante = async () => {

        await axios.get(`${Bdd.api_url}/fiche-sante/list?idUser=${this.state.id}`)
            .then(async res => {
                if (await !res) {
                    console.log("tena misy olana")
                } else {
                    const fiche = res.data.data
                    if (res.data === null) this.setState({ isFirst: true })
                    else this.setState({
                        isFirst: false,
                        blood: fiche.groupeSanguin, size: fiche.taille,
                        weight: fiche.poids, medecin: fiche.medecinTraitant,
                        secu: fiche.numSecu, donate: fiche.donnateur,
                        idFiche: fiche.idFiche,
                        allergies: fiche.allergies
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    logout() {
        this.props.navigation.push("Logout")
    }

    shareLink() {
        const url = 'https://exp.host/@stenny453/Best4Sante';
        Share.share({ title: 'Best4Santé', message: url }).then(
            Alert.alert('Succes', 'Lien Partagé', [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ])
        ).catch(
            err => Alert.alert('Echec', 'Erreur lors de partage de lien', [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ])
        )
    }

    render() {
        // console.log(this.state.photoUri)

        // const rightButtons = [
        //     <TouchableHighlight onPress={() => this.setState({ modalVisible: true })} style={styles.editBtn}>
        //         <FontAwesomeIcon color="white" size={40} icon={faEdit} />
        //     </TouchableHighlight>,
        // ];

        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}


                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <HeaderMenu navigation={this.props.navigation} setting={1} />
                </View>


                <ScrollView style={[styles.scroll, { marginTop: 10 }]} >
                    {this.renderHeader()}

                    <View style={{padding : 10}}>
                    <Text style={styles.section}>Compte</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgot")} >
                            
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Changer mon  mot de passe"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faUserLock} />}
                                titleStyle={{ fontWeight: '600' }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity> 
                        <TouchableOpacity disabled onPress={() => this.props.navigation.navigate("forgot")} >
                            
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Fermer mon compte "
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faWindowClose} />}
                                titleStyle={{ fontWeight: '600' }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity> 
                      
                        <Text style={styles.section}>Support </Text>
                      
                      
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Signal")}>
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Contacter Best4Santé"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faMailBulk} />}
                                titleStyle={{ fontWeight: "600" }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>
                        <Text style={styles.section}>Statistiques </Text>
                        <TouchableOpacity disabled onPress={() => this.props.navigation.navigate("ContactUrgence")} >
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Usage"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faChartArea} />}
                                titleStyle={{ fontWeight: "600" }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>

                        <Text style={styles.section}>Termes et Conditions </Text>
                        <TouchableOpacity disabled onPress={() => this.props.navigation.navigate("ContactUrgence")} >
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="CGU"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faBookReader} />}
                                titleStyle={{ fontWeight: "600" }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity disabled onPress={() => this.props.navigation.navigate("ContactUrgence")} >
                            <ListItem
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Politique de la protection de données"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faCodeBranch} />}
                                titleStyle={{ fontWeight: "600" }}
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>

                        

                    </View>

                    
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    shadow: {
        borderWidth: 1,
        borderColor: '#363535',
        width: 70,
        height: 70,
        borderRadius: 35,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 21,
        padding: 20,
        // shadowColor: "#363535",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 4.65,
        // elevation: 1,
        marginRight: 15
    },
    list_icon: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 23
    },
    main_profil_2: {
        flex: 1,
        padding: 17,
        justifyContent: 'center'
    },
    title_main_profil_2: {
        fontWeight: 'bold',
        color: '#00C1B4',
        fontSize: 24,
        marginBottom: 10,
        marginTop: 20
    },
    descr_main_profil_2: {
        marginBottom: 15,
        fontSize: 16,
        lineHeight: 23
    },
    touch_share: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#008AC8',
        backgroundColor: '#008AC8',
        padding: 15,
        borderRadius: 10
    },
    touch_logout: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 20,
        marginTop: 10
    },
    btn_share: {
        color: '#FFFFFF',
        fontSize: 18
    },
    btn_logout: {
        color: '#008ac2',
        fontSize: 18
    },
    main_profil: {
        flex: 1,
       
        justifyContent : "center",
        alignItems : "center",
        marginTop : hp("2%")
    },
    under_main_profil_1: {
        flex: 1
    },
    under_main_profil_2: {
        flex: 4,
        paddingLeft: 0
    },
    text_under_main_profil_2: {
        fontSize: 28,
        fontWeight: '900',
        paddingTop: 7
    },
    descr_under_main_profil_2: {
        fontSize: 17,
        paddingTop: 17
    },
    btn_photo: {
        flex: 1,
        paddingTop: 70,
        paddingLeft: 0
    },
    img_profil: {
        width: 200
    },
    rightInput: {
        borderBottomColor: "#00C1B4",

    },
    editBtn: {
        backgroundColor: "#008ac2",

        justifyContent: 'center',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    inputs: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: '#00C1B4',
        width: wp("50%")
    },
    gridContainer: {
        marginBottom: 20
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },



    scroll: {
        backgroundColor: '#f0f0f0',
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20
    },
    userRow: {

        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        borderColor: "#2240D4",
        borderWidth: 2,
        padding: 10,
        borderRadius: 20
    },
    listItemContainer: {
        marginVertical : hp("0.5%"),
        borderRadius: 10,
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },

    //-----------------//
    container: {
        flex: 1,
        backgroundColor: '#00C1B4',
        zIndex: 40,
        justifyContent: 'center'
    },
    main: {
        flex: 9,
        marginLeft: wp('5%'),
        alignItems: 'center',
        width: wp('90%'),
        paddingTop: hp('1%')
    },
    scrollview: {
        width: wp('90%'),
        textAlign: 'center',
        position: 'relative',
        zIndex: 41
    },
    rigthTitle1: {
        color: 'white',
        fontSize: 36,
        marginBottom: hp('2%'),
        fontWeight: "bold"
    },
    rigthTitle2: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: hp('3%'),
        marginTop: hp('3%')

    },
    footer: {
        height: hp('10%')
    },
    contactItem: {
        borderColor: "white",
        borderWidth: 2,
        width: wp('60%'),
        margin: "auto",
        marginBottom: 30,
        marginLeft: wp('15%'),
        paddingBottom: hp('3%'),
        paddingTop: hp('3%'),
        paddingRight: wp('3%'),
        paddingLeft: wp("3%"),
        borderRadius: 15
    },
    textItem: {
        textAlign: 'center',
        color: "white"
    },
    buttonDelete: {
        backgroundColor: "#e86363",
        paddingBottom: hp('1%'),
        paddingTop: hp('1%'),
        paddingRight: wp('2%'),
        paddingLeft: wp("2%"),
        width: wp('30%'),
        marginLeft: wp("12%"),
        borderRadius: 10,
        marginTop: 20
    },
    addContact: {
        backgroundColor: "#008AC8",
        paddingBottom: hp('2%'),
        paddingTop: hp('2%'),
        paddingRight: wp('3%'),
        paddingLeft: wp("3%"),
        width: wp('50%'),
        width: wp('70%'),
        marginLeft: wp('10%'),
        marginBottom: 30
    },
    deco: {
        backgroundColor: "#00C1B4",
        paddingBottom: hp('2%'),
        paddingTop: hp('2%'),
        paddingRight: wp('3%'),
        paddingLeft: wp("3%"),
        width: wp('70%'),
        marginLeft: wp('10%'),
        marginBottom: hp('7%')
    },
    textVital: {
        color: "white",
        position: 'relative',
        bottom: hp('5%'),
        left: wp('27%')
    },
    under: {
        height: hp('10%'),
        zIndex: 99
    },
    choice: {
        backgroundColor: "white",
        width: wp('56%'),
        position: "absolute",
        top: hp('91%'),
        left: wp("10%"),
        zIndex: 34,
        borderColor: "#00C1B4",
        borderWidth: 1
    },
    choiceItem: {
        alignItems: "center",
        justifyContent: 'center',
        paddingBottom: hp("2%"),
        paddingTop: hp("2%"),

    },
    choiceSize: {
        backgroundColor: "white",
        width: wp('56%'),
        height: hp('25%'),
        position: "absolute",
        top: hp('80%'),
        left: wp("10%"),
        zIndex: 44,
        borderColor: "#00C1B4",
        borderWidth: 1
    },
    choiceWeight: {
        backgroundColor: "white",
        width: wp('56%'),
        height: hp('25%'),
        position: "absolute",
        top: hp('85%'),
        left: wp("10%"),
        zIndex: 44,
        borderColor: "#00C1B4",
        borderWidth: 1
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
    },


    section : {
        color : "silver",
        fontSize : 30
    },

    scoreContainer : {
        flexDirection : "row",
       
    },
    scoreTitle : {
        fontSize : 20,
        color : "grey"
    }

});

const mapStateToProps = (store) => {
    return {
        user: store.user
        // contact: store.contact,
        // second: store.second
    }
}

const mapDispatchToProps = {
    setUserInfo,

    ModifyPhoto
}


export default connect(mapStateToProps, mapDispatchToProps)(MainSetting)

