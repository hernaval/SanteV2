import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox, Modal } from 'react-native'
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import InputProfil from '../../component/InputProfil';
import TopMenu from "../../component/Menu/TopMenu"
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo, ModifyPhoto } from '../../Action/action-type';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronRight, faEdit, faUmbrella, faUserAlt, faClinicMedical, faFileMedicalAlt, faUserCircle, faUsers, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

import { TouchableHighlight, TextInput } from 'react-native-gesture-handler'
import Bdd from "../../API/Bdd"
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { saveInfo } from "../../API/firebase";
import * as firebase from 'firebase';
import PopNav from "../../component/Menu/PopNav"
const API_KEY = 'AIzaSyApjuz39FHMGBsy9lo7FobJQJtZKNra8P8';
const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"

const firebaseConfig = {
    apiKey: "AIzaSyBCUEbVyhoEsQH-ZQzcwXbzuwAdcLQev3E",
    authDomain: "best4sante-61097.firebaseapp.com",
    databaseURL: "https://best4sante-61097.firebaseio.com",
    projectId: "best4sante-61097",
    storageBucket: "best4sante-61097.appspot.com",
    messagingSenderId: "76849620029",
    appId: "1:76849620029:web:2350de3aed95f25cbef654",
    measurementId: "G-R7JTYSVW52",

};



class MyProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.user.user.nomUser,
            lastName: this.props.user.user.prenomUser,
            id: this.props.user.user.idUser,
            uri_doc: null,
            photoUri: this.props.user.user.imageUser,
            isLoading: false,
        }
        // console.log(this.props.user.user)

        this.ref = firebase.firestore().collection('profile');
        this.countProfil = 0;
    }

    componentDidMount = async () => {
        console.log('id ',this.props.user.user.idUser)
    }

    changeProfil() {
        console.log('Param myprofil ', this.props.navigation.state.params)
        console.log('Count profil ', this.countProfil)
        if (this.props.navigation.state.params === undefined || this.countProfil !== 0) {
            console.log('Quit change profil')
            return
        }
        else {
            console.log('set state my profil')
            this.setState({photoUri: this.props.navigation.state.params.profil})
            this.countProfil++
        }
    }

    goToInfoPerso() {
        this.countProfil = 0;
        this.props.navigation.navigate("Switch")
    }


    goToContactList = () => {
        //.log(this.props.navigation);
        this.props.navigation.push("ContactList")
    }

    renderHeader = () => {

        return (
            <View style={styles.main_profil}>
            {this.changeProfil()}
                <View style={styles.under_main_profil_1}>
                <Avatar
                size={100}
                rounded
                source={{ uri: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri }}
                />
                </View>

                <View style={styles.btn_photo}>
                <TouchableOpacity onPress={() =>console.log('Change my profile') }>
                <Avatar size={30} rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'camera', type: 'font-awesome' }} />
                </TouchableOpacity>
                </View>

                <View style={styles.under_main_profil_2}>
                    <Text style={styles.text_under_main_profil_2}>{this.state.firstName} {this.state.lastName}</Text>
                    <Text style={styles.descr_under_main_profil_2}>
                        Femme, 34 ans, 1m 80, 76 kg
                    </Text>
                </View>
                
            </View>
        )
    }


    render() {
        // console.log(this.state.photoUri)
       
        const rightButtons = [
            <TouchableHighlight onPress={() => this.setState({ modalVisible: true })} style={styles.editBtn}>
                <FontAwesomeIcon color="white" size={40} icon={faEdit} />
            </TouchableHighlight>,
        ];

        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}
                
                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} menu={1}/>
                </View>

                <ScrollView style={[styles.scroll, { marginTop: 10 }]} >
                    {this.renderHeader()}
                    
                    <View>
                        <TouchableOpacity onPress={() => this.goToInfoPerso()} >
                            <ListItem
                            chevron={<FontAwesomeIcon color="#454545" size={18} icon={faChevronRight} />}
                                title="Mes Informations Personnelles"
                                leftIcon={<FontAwesomeIcon color="#454545" size={20} icon={faUserCircle} />}
                                titleStyle={{ fontWeight: '600' }}                              
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MySecondProfil")}>
                        <ListItem
                        chevron={<FontAwesomeIcon color="#454545" size={18} icon={faChevronRight} />}
                            title="Mes profils secondaires"
                            leftIcon={<FontAwesomeIcon color="#454545" size={20} icon={faUsers} />}
                            titleStyle={{ fontWeight: "600" }}
                            containerStyle={styles.listItemContainer}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyContact")} >
                        <ListItem
                        chevron={<FontAwesomeIcon color="#454545" size={18} icon={faChevronRight} />}
                            title="Mes contacts d'urgences"
                            leftIcon={<FontAwesomeIcon color="#454545" size={20} icon={faExclamationCircle} />}
                            titleStyle={{ fontWeight: "600" }}                               
                            containerStyle={styles.listItemContainer}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MySante")} >
                            <ListItem                            
                                title=" Ma Fiche santé"
                                leftIcon={<FontAwesomeIcon color="#454545" size={20} icon={faFileMedicalAlt} />}
                                titleStyle={{ fontWeight: "600" }}                                
                                containerStyle={styles.listItemContainer}
                                chevron={<FontAwesomeIcon color="#454545" size={18} icon={faChevronRight} />}
                            />
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_profil: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 70,
        marginLeft: 20,
        marginBottom: 35
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
      fontWeight: '200',
      paddingTop: 7
    },
    descr_under_main_profil_2: {
      fontSize: 17,
      paddingTop: 17
    },
    btn_photo: {
      flex: 1,
      paddingTop: 70,
      paddingLeft: 5
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
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
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

        borderRadius: 5,
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

});

const mapStateToProps = (store) => {
    return {
        user: store.user,
        // contact: store.contact,
        // second: store.second
    }
}

const mapDispatchToProps = {
    deleteContact,
    modifyUserInfo,
    setSecondInfo,
    setIndexSelected,
    ModifyPhoto
}


export default connect(mapStateToProps, mapDispatchToProps)(MyProfil);

