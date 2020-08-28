import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox, Modal } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Footer from "./Menu/Footer"
import Header from './Menu/Header'
import HeaderProfile from './Menu/HeaderProfile'
import InputProfil from './InputProfil';
import TopMenu from "./Menu/TopMenu"
import BottomMenu from "./Menu/BottomMenu"
import { Avatar, ListItem } from 'react-native-elements'
import { deleteContact, modifyUserInfo,setIndexSelected,setSecondInfo } from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { size, weight } from '../Helpers/profileConst';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler'
import { Col, Row, Grid } from "react-native-easy-grid";
import Swipeable from 'react-native-swipeable';
import Bdd from "../API/Bdd"
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import {   saveInfo } from "../API/firebase";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { v1 as uuidv1 } from 'uuid';
import PopNav from "./Menu/PopNav"
const API_KEY = 'AIzaSyApjuz39FHMGBsy9lo7FobJQJtZKNra8P8';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}


class InfoPerso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samaritain: false,
      error: null,
      isScrolling: true,
      isSelectedProfile: false,
      isSelectedProfileSize: false,
      isSelectedProfileWeight: false,
      modalVisible: false,

      firstName: this.props.second.second_users[this.props.second.indexSelected].firstName,
      lastName: this.props.second.second_users[this.props.second.indexSelected].lastName,
      phone: this.props.second.second_users[this.props.second.indexSelected].phone,
      address: this.props.second.second_users[this.props.second.indexSelected].address,
      zip: this.props.second.second_users[this.props.second.indexSelected].zip,
      city: this.props.second.second_users[this.props.second.indexSelected].city,
      id: this.props.second.second_users[this.props.second.indexSelected].id,

      rollGranted: true,
      cameraGranted: false,
      uri_doc : null, 
      base64Img : null,
      photoUri : "",

      errLastName :null,
      errFirstName :null,
      errAddress : null,
      errZip  :null,
      errVille  :null,
      errPhone : null,

      isLoading : false,

      isModifbegin : false

    }
   


  }
  componentDidMount = async() =>{
      await this.getCameraPermissions()
  setTimeout(async()=>{
    await this.fetchImage()
  },5000)    
    
  }
  fetchImage = async () =>{
    await firebase.firestore().collection('profile')
    .where("idUser","==",this.state.id)
    .get()
    .then(querySnapshot =>{
      querySnapshot.forEach(doc =>{
       this.setState({
         photoUri : doc.data().photoUri
       })
      
      })
   
    })
    .catch(err =>{
      console.log(err)
    })
  }
  getCameraPermissions = async () => {

    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert("permission not granteed")
      this.setState({
        rollGranted: false,
        cameraGranted: false,
      })
    } else {
      this.setState({
        rollGranted: true,
        cameraGranted: true,
      })
    }
  }
  _pickImage = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({

      base64: true
    });
    console.log("ok")

    

    this._handleImagePicked(result);

  }
  _handleImagePicked = async pickerResult => {
    let uploadUrl =""
    try {
      this.setState({ isLoading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        console.log(uploadUrl)
        await this.saveProfileImageInfo(this.state.id, uploadUrl)
        
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ isLoading: false });
      /* this.props.navigation.navigate("MonProfil") */
      this.setState({photoUri : uploadUrl})
    }
  }
  saveProfileImageInfo = async (id,uri) => {

   await firebase.firestore().collection('profile').add({
      idUser : id,
      photoUri : uri
    })
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



  getCorrectAddress() {
    axios.get('https://nominatim.openstreetmap.org/search?q=444 chemin des barillons 84810 &format=json&addressdetails=1')
      .then((res) => {
        //.log('la reponse', res);

        let address = res.data[0].address.house_number + ' ' + res.data[0].address.road;
        let city = res.data[0].address.city || res.data[0].address.village;
        let zip = res.data[0].address.postcode;

        //.log('address', address);
        //.log('city', city);
        //.log('zip', zip);

      })


  }
  openSelectedProfil(profil) {
    let isOpen = !this.state[profil];
    let isScrolling = !this.state.isScrolling
    this.setState({ [profil]: isOpen, isScrolling: isScrolling })
  }

  goToContactList = () => {
    //.log(this.props.navigation);
    this.props.navigation.push("ContactList")
  }

  goToCam = () => {
    //.log(this.props.navigation);
    this.props.navigation.push("Cam")
  }

  goToContact = () => {
    //.log(this.props.navigation);
    this.props.navigation.push("Contact")
  }

  giveError = (msg) => {
    //.log(msg);
    this.setState({ error: msg }, () => { console.log('state modifié error', this.state) });
  }

  createInput(type, typeName) {
    //console.log('dans create input', this.props.user)
    if (this.props.user.user === null || this.props.user.user.data.user.length === 0) {
      // console.log('test null',this.props.user)
      return <Text>Pas de user</Text>
    } else {
      //   console.log('type', type);
      //   console.log('test pas null',this.props.user.user.data.user[0][type])
      return <InputProfil info={this.props.user.user.data.user[0][type]} type={type} typeName={typeName} giveError={this.giveError} style={{ zIndex: 0 }} />
    }
  }

  createContacts() {
    // console.log('test',this.props.contact.contact)
    if (this.props.contact.contact === null) {
      console.log('test null', this.props.user)
      return <Text>Pas de contact</Text>
    } else {
      return this.props.contact.contact.data.contacts.map((contact) => {
        return (
          <View key={contact.id} style={styles.contactItem}>
            <Text style={styles.textItem}>{contact.firstName} {contact.lastName}</Text>
            {contact.validate === "no" && <Text style={styles.textItem}>Non Validé</Text>}
            {contact.validate === "yes" && <Text style={styles.textItem}>Validé</Text>}

            <TouchableOpacity
              onPress={(e) => { this.onClickDeleteContact(contact.id) }}
              style={styles.buttonDelete}
            >
              <Text style={styles.textItem}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )
      })
    }
  }

  goToLogout = () => {
    //console.log(this.props.navigation);
    this.props.navigation.push("Logout")
  }

  onClickDeleteContact(id) {
    let contact = {
      id: id,
      user_id: this.props.user.user.data.user[0].id
    }
    this.props.deleteContact(contact)
  }

  onPressSamaritain = async () => {
    if (this.state.samaritain === false) {
      const { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        await Location.stopLocationUpdatesAsync('geoloc_bakground');

      }
    }

  };

  modifInfoPerso = async () => {

     let userModified = {
      firstName: this.props.user.user.data.user[0].firstName,
      lastName: this.props.user.user.data.user[0].lastName,
      phone: this.props.user.user.data.user[0].phone,
      address: this.props.user.user.data.user[0].address,
      zip: this.props.user.user.data.user[0].zip,
      city: this.props.user.user.data.user[0].city,
      blood: this.props.user.user.data.user[0].blood,
      size: this.props.user.user.data.user[0].size,
      weight: this.props.user.user.data.user[0].weight,
      donate: this.props.user.user.data.user[0].donate,
      secu: this.props.user.user.data.user[0].secu,
      user_id: this.props.user.user.data.user[0].id
    }

   

    userModified.firstName = this.state.firstName
    userModified.lastName = this.state.lastName
    userModified.phone = this.state.phone
    userModified.address = this.state.address
    userModified.city = this.state.city
    userModified.zip = this.state.zip

    let errorCount = await this.validationInfo(userModified)
    console.log(errorCount)
    
   if(errorCount ==0){
      console.log("ato")
       this.props.modifyUserInfo(userModified) 
    }
    
  }


  async validationInfo(data) {  
     
    var numberPattern = /^[0-9]+$/
    var alphaPattern = /^([a-zA-Z0-9 _-]+)$/
    let count = 0
      
      if(numberPattern.test(data.phone) === false ||data.phone.length <8 || data.phone.length > 12 || isNaN(data.phone)) {
        count++
        this.setState({errPhone : "Vous devez entrer un numéro de téléphone valide"})
      }else{
        this.setState({errPhone : null})
      }

    if(numberPattern.test(this.state.zip)===false || this.state.zip =="" || this.state.zip.length <3 || this.state.zip.length > 6) {
      count++
      this.setState({errZip : "Vous devez entrer un code postal valide"})
    }else{
      this.setState({errZip : null})
    }

    if(alphaPattern.test(this.state.firstName) === false || this.state.firstName ==""){
      count++
      this.setState({errFirstName : "Vous devez entrer un prénom valide"})
    }else{
      this.setState({errFirstName : null})
    }
    if(alphaPattern.test(this.state.lastName) === false || this.state.lastName ==""){
      count++
      this.setState({errLastName : "Vous devez entrer un nom valide"})
    }else{
      this.setState({errLastName : null})
    }
    if(alphaPattern.test(this.state.address) === false || this.state.address ==""){
      count++
      this.setState({errAddress : "Vous devez entrer une adresse valide"})
    }else{
      this.setState({errAddress : null})
    }
    if(alphaPattern.test(this.state.city) === false || this.state.city ==""){
      count++
      this.setState({errVille : "Vous devez entrer un nom de ville valide"})
    }else{
      this.setState({errVille : null})
    }

    return count
  }


  modifySecondInfoPerso =  async () => {
    let userModified = {
      firstName: this.props.second.second_users[this.props.second.indexSelected].firstName,
      lastName: this.props.second.second_users[this.props.second.indexSelected].lastName,
      phone: this.props.second.second_users[this.props.second.indexSelected].phone,
      address: this.props.second.second_users[this.props.second.indexSelected].address,
      zip: this.props.second.second_users[this.props.second.indexSelected].zip,
      city: this.props.second.second_users[this.props.second.indexSelected].city,
      blood: this.props.second.second_users[this.props.second.indexSelected].blood,
      size: this.props.second.second_users[this.props.second.indexSelected].size,
      weight: this.props.second.second_users[this.props.second.indexSelected].weight,
      donate: this.props.second.second_users[this.props.second.indexSelected].donate,
      secu: this.props.second.second_users[this.props.second.indexSelected].secu,
      id: this.props.second.second_users[this.props.second.indexSelected].id
    }

    userModified.firstName = this.state.firstName
    userModified.lastName = this.state.lastName
    userModified.phone = this.state.phone
    userModified.address = this.state.address
    userModified.city = this.state.city
    userModified.zip = this.state.zip

    let errorCount = await this.validationInfo(userModified)

   if(errorCount == 0){

      axios.post(Bdd.api_url + '/api/second_user/update', userModified)
      .then((response) => {

        if (response.data.status === 200) {

          AsyncStorage.getItem('bosToken')
            .then((token) => {
              let user_id = this.props.user.user.data.user[0].id
              this.props.setSecondInfo(token, user_id)
            })
        }
      })
    }

    

  }





  render() {

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
          <TopMenu navigation={this.props.navigation} />
        </View>

        <View>
           <PopNav navigation={this.props.navigation} color ={"#000"} />
        </View>

        <ScrollView style={[styles.scroll, { marginTop: 10 }]} >
          <View style={styles.userRow}>

          {this.state.isModifbegin === true && 
          <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft :200 }}
                onPress={()=>{
                  if(this.props.second.indexSelected ===0) {
                    this.modifInfoPerso()
                    this.setState({isModifbegin : false})
                  }else {
                    this.modifySecondInfoPerso()
                    this.setState({isModifbegin : false})
                  }
                }}
            >
              <Text  style={styles.textStyle}>Enregistrer</Text>
            </TouchableOpacity>}
            {this.state.isModifbegin === false && 
          <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft :200 }}
                onPress={()=>{
                  this.setState({isModifbegin : true})
                }}
            >
              <Text  style={styles.textStyle}>Modifier</Text>
            </TouchableOpacity>}

            <View style={styles.userImage}>
              {this.state.photoUri === "" &&
              <Avatar rounded
                onPress={() => { this._pickImage() }}
                size="large"
                source={require("../images/profile.png")}
              />
            }
            {this.state.photoUri !== "" && 
                <Avatar rounded
                onPress={() => { this._pickImage() }}
                size="large"
                source={{uri : this.state.photoUri}}
              />
            }
            </View>
            <Text style={{ fontSize: 20 }}>Informations personnelles</Text>
            {this.state.isModifbegin === true && <Text style={{color : "green"}}>Vous pouvez commencer à modifier</Text>}
            {this.state.errZip !== null && <Text style={{color : "red"}}>{this.state.errZip}</Text> }
            {this.state.errLastName !== null && <Text style={{color : "red"}}>{this.state.errLastName}</Text> }
            {this.state.errFirstName !== null && <Text style={{color : "red"}}>{this.state.errFirstName}</Text> }
            {this.state.errAddress !== null && <Text style={{color : "red"}}>{this.state.errAddress}</Text> }
            {this.state.errPhone !== null && <Text style={{color : "red"}}>{this.state.errPhone}</Text> }
            {this.state.errVille !== null && <Text style={{color : "red"}}>{this.state.errVille}</Text> }


          </View>


          <View>


            <ListItem
              hideChevron
              title="Prénom"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ firstName: text })}
                  value={this.state.firstName}
                />
              }
              containerStyle={styles.listItemContainer}
            />

            <ListItem
              hideChevron
              title="Nom"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ lastName: text })}
                  value={this.state.lastName}
                />
              }
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron

              title="Adresse"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ address: text })}
                  value={this.state.address}
                />
              } containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Code postal"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ zip: text })}
                  value={this.state.zip}
                />
              } containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Ville"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ city: text })}
                  value={this.state.city}
                />
              } containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Téléphone"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ phone: text })}
                  value={this.state.phone}
                  keyboardType={"numeric"}
                />
              } containerStyle={styles.listItemContainer}
            />

          </View>

        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    marginRight: 12,
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
    contact: store.contact,
    second: store.second
  }
}

const mapDispatchToProps = {
  deleteContact,
  modifyUserInfo,
  setSecondInfo,
  setIndexSelected
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoPerso);

