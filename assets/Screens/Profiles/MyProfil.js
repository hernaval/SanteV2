import React, { Component } from 'react'
import { StyleSheet,SafeAreaView, Share, Alert, Text, View, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox, Modal } from 'react-native'
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
import { deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo, ModifyPhoto } from '../../Action/action-type';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronRight, faEdit, faUmbrella, faUserAlt, faClinicMedical, faFileMedicalAlt, faUserCircle, faUsers, faExclamationCircle, faFirstAid } from '@fortawesome/free-solid-svg-icons';
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
        console.log(this.props);
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
            weight: ''
        }
        // console.log(this.props.user.user)

        this.ref = firebase.firestore().collection('profile');
        this.countProfil = 0;
    }

    componentDidMount = async () => {
        console.log('id ',this.props.user.user.idUser)
        this.fetchSante();

        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            this.fetchSante()
       });
    }

    _pickImage = async () => {
        //launchCameraAsync
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing : true,
          base64: true,
          quality : 0.5
        });
    
        if (result.cancelled) {
          return
        }
    
        this._handleImagePicked(result);
    
      }
      _handleImagePicked = async pickerResult => {
        let uploadUrl =""
        try {
          this.setState({ isLoading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await this.uploadImageAsync(pickerResult.uri);
          let data = {
            imageUser :uploadUrl,
            idUser : this.props.user.user.idUser
          }
             this.saveProfileImageInfo(data)
            
          }
        } catch (e) {
          console.log(e);
        //   alert('Upload failed, sorry :(');
        } finally {
          this.setState({ isLoading: false });
          /* this.props.navigation.navigate("MonProfil") */
          this.setState({photoUri : uploadUrl})
        }
      }
      saveProfileImageInfo =  (data) => {
        console.log('Modifier Photo')
        this.props.ModifyPhoto(data)
      }
      uploadImageAsync = async (uri)  =>{
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
        const id = Math.random().toString()
        const ref = firebase
          .storage()
          .ref()
          .child(id);
        const snapshot = await ref.put(blob);
      
        // We're done with the blob, close and release it
        blob.close();
      
        return await snapshot.ref.getDownloadURL();
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
        this.props.navigation.navigate("Switch", {
            size: this.state.size,
            blood: this.state.blood,
            weight: this.state.weight,
            profile: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri
        })
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
                <TouchableOpacity onPress={() => this._pickImage() }>
                <Avatar size={30} rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'camera', type: 'font-awesome' }} />
                </TouchableOpacity>
                </View>

                <View style={styles.under_main_profil_2}>
                    <Text style={styles.text_under_main_profil_2}>{this.state.firstName} {this.state.lastName}</Text>
                    {this.state.weight != '' && (
                        <Text style={styles.descr_under_main_profil_2}>
                        {this.state.size} cm - {this.state.weight} kg - {this.state.blood}
                    </Text>
                    )
                    }
                </View>
                
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
        Share.share({title: 'Best4Santé', message: url}).then(
            Alert.alert('Succes', 'Lien Partagé', [
                {
                    text: 'OK',
                    onPress: () => {}
                }
            ])
        ).catch(
            err => Alert.alert('Echec', 'Erreur lors de partage de lien', [
                {
                    text: 'OK',
                    onPress: () => {}
                }
            ])
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
                    <HeaderMenu navigation={this.props.navigation} profile={1}/>
                </View>
                

                <ScrollView style={[styles.scroll, { marginTop: 10 }]} >
                    {this.renderHeader()}
                    
                    <View>
                        <TouchableOpacity onPress={() => this.goToInfoPerso()} >
                            <ListItem
                            chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                                title="Mes Informations Personnelles"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faUserCircle} />}
                                titleStyle={{ fontWeight: '600' }}                              
                                containerStyle={styles.listItemContainer}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MySecondProfil")}>
                        <ListItem
                        chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                            title="Mes profils secondaires"
                            leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faUsers} />}
                            titleStyle={{ fontWeight: "600" }}
                            containerStyle={styles.listItemContainer}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ContactUrgence")} >
                        <ListItem
                        chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                            title="Mes contacts d'urgences"
                            leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faExclamationCircle} />}
                            titleStyle={{ fontWeight: "600" }}                               
                            containerStyle={styles.listItemContainer}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MySante")} >
                            <ListItem                            
                                title=" Ma Fiche santé"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faFileMedicalAlt} />}
                                titleStyle={{ fontWeight: "600" }}                                
                                containerStyle={styles.listItemContainer}
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("UserConnected")} >
                            <ListItem                            
                                title=" Mes Activités Bon Samaritain"
                                leftIcon={<FontAwesomeIcon color="#000000" size={20} icon={faFirstAid} />}
                                titleStyle={{ fontWeight: "600" }}                                
                                containerStyle={styles.listItemContainer}
                                chevron={<FontAwesomeIcon color="#000000" size={18} icon={faChevronRight} />}
                            />
                        </TouchableOpacity>

                    </View>

                    <SafeAreaView style={styles.main_profil_2}>
                        <Text style={styles.title_main_profil_2}>Recommender Best4Santé</Text>
                        <Text style={styles.descr_main_profil_2}>
                            Best4Santé est un application de santé, proposée pour tous.
                        </Text>

                        <TouchableOpacity style={styles.touch_share} onPress={() => this.shareLink()}>
                            <Text style={styles.btn_share}>
                                Partager le lien
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.title_main_profil_2}>Suivez-nous</Text>
                        <Text style={styles.descr_main_profil_2}>
                            Suivez-nous sur Facebook, Twitter et Instagram.
                        </Text>

                        <View style={styles.list_icon}>
                        <Icon
                        name='facebook'
                        size={28}
                        type='font-awesome'
                        color='#008ac2'
                        style={styles.shadow}
                        onPress={() => console.log('hello')} />
                        <Icon
                        name='twitter'
                        size={28}
                        type='font-awesome'
                        color='#008ac2'
                        style={styles.shadow}
                        onPress={() => console.log('hello')} />
                        <Icon
                        name='instagram'
                        size={28}
                        type='font-awesome'
                        color='#008ac2'
                        style={styles.shadow}
                        onPress={() => console.log('hello')} />
                        </View>

                        <TouchableOpacity style={styles.touch_logout} onPress={() => this.logout()}>
                        <Text style={styles.btn_logout}>
                            Me déconnecter
                        </Text>
                        </TouchableOpacity>

                    </SafeAreaView>

                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    shadow: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        width: 70,
        height: 70,
        borderRadius: 35,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 23,
        padding: 20,
        shadowColor: "#363535",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 1,
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
        backgroundColor: '#FFFFFF',
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
        flexDirection: 'row',
        marginTop: 27,
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

