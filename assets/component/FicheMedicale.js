import React, { Component } from 'react'
import { StyleSheet,Switch, Slider,Text, View,Modal, AsyncStorage, ScrollView, TouchableOpacity,TouchableHighlight, Image, CheckBox } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Footer from "./Menu/Footer"
import HeaderProfile from './Menu/HeaderProfile'
import InputProfil from './InputProfil';
import { Avatar, ListItem } from 'react-native-elements'
import { deleteContact, modifyUserInfo,setSecondInfo,setIndexSelected } from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { size, weight } from '../Helpers/profileConst';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-gesture-handler'
import RadioButtonRN from 'radio-buttons-react-native';
import Bdd from "../API/Bdd"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import TopMenu from "../component/Menu/TopMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import PopNav from "./Menu/PopNav"
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samaritain: false,
      error: null,
      modalSize : false,
      modalWeight : false,
      modalBlood : false,
      isScrolling: true,
      isSelectedProfile: false,
      isSelectedProfileSize: false,
      isSelectedProfileWeight: false,

      blood: this.props.second.second_users[this.props.second.indexSelected].blood,
      size: this.props.second.second_users[this.props.second.indexSelected].size,
      weight: this.props.second.second_users[this.props.second.indexSelected].weight,
      donate: this.props.second.second_users[this.props.second.indexSelected].donate === null ? "Non" : this.props.second.second_users[this.props.second.indexSelected].donate,
      secu: this.props.second.second_users[this.props.second.indexSelected].secu,

      medecin : "",
      allergie  :"",
      traitement : "",

     


      isModifBegin : false
    }
    this.medicinArr = []
  }

 async  componentDidMount(){
    await this.fetchAutre()
    console.log(this.medicinArr)
  }

  async fetchAutre(){
    await firebase.firestore().collection("medecin").where("idUser","==",this.props.second.second_users[this.props.second.indexSelected].id).get()
      .then(querySnapshot =>{
        
         querySnapshot.forEach(doc =>{
          const data = {medecin : doc.data().nomMed,created_at : doc.data().created_at}
          this.medicinArr.push(data)
        }) 
      }) 
    
    await  firebase.firestore().collection("allergie").where("idUser","==",this.props.second.second_users[this.props.second.indexSelected].id).get()
      .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{this.setState({allergie : doc.data().nomAll})})
      })
      
      await firebase.firestore().collection("traitement").where("idUser","==",this.props.second.second_users[this.props.second.indexSelected].id).get()
      .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{this.setState({traitement : doc.data().traitement})})
      })
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
        //.log('zip', zip);2

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

  modifInfoPerso() {

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

    userModified.blood = this.state.blood
    userModified.size = this.state.size
    userModified.weight = this.state.weight
    userModified.secu = this.state.secu
    userModified.donate = this.state.donate

    console.log(userModified)
    this.saveAutre(this.state.medecin,this.state.allergie,this.state.traitement)
    this.props.modifyUserInfo(userModified)
  }


  saveAutre(med,all,traitement){
      firebase.firestore().collection('medecin').add({
      idUser : this.props.second.second_users[this.props.second.indexSelected].id,
      nomMed : med
    }) 
    firebase.firestore().collection('allergie').add({
      idUser : this.props.second.second_users[this.props.second.indexSelected].id,
      nomAll : all
    })
    firebase.firestore().collection('traitement').add({
      idUser : this.props.second.second_users[this.props.second.indexSelected].id,
      traitement : traitement
    })
  }


  modifySecondInfoPerso = () => {
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

    userModified.blood = this.state.blood
    userModified.size = this.state.size
    userModified.weight = this.state.weight
    userModified.secu = this.state.secu
    userModified.donate = this.state.donate

    console.log(userModified)
    this.saveAutre(this.state.medecin,this.state.allergie,this.state.traitement)
  
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





  renderBlood = (groupeSanguin) =>(
    <RadioForm
          radio_props={groupeSanguin}
          initial={-1}
          onPress={(value) => {this.setState({blood: groupeSanguin[value].label})}}
    />
  )

  renderWeight = () => (
    <Slider 
            style={styles.slider}
            step={1}
            minimumValue={2}
            maximumValue={150}
            onSlidingComplete={(value)=> {this.setState({weight : value})}}
            value={parseInt(this.state.weight)}
            maximumTrackTintColor='#e2e0e0'  
            minimumTrackTintColor='#008AC8'
            thumbTintColor='#008AC8'
           
    />)
  

  renderSize = () =>(
  <Slider 
            style={styles.slider}
            step={1}
            minimumValue={50}
            maximumValue={220}
            onSlidingComplete={(value)=> {this.setState({size : value})}}
            value={parseInt(this.state.size)}
            maximumTrackTintColor='#e2e0e0'  
            minimumTrackTintColor='#008AC8'
            thumbTintColor='#008AC8'
           
    />)
  

  renderModal = (children,label,value,unite,cb ) => (

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
      <Text style={styles.modalText}>{label} en  {unite}</Text>

            
           {children}
           <Text>{value} {unite}</Text>
           <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={cb}
            >

              <Text style={styles.textStyle}>Valider</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      
    </View>
  )

  render() {
    var groupeSanguin = [
      {label: 'A+', value: 0 },
      {label: 'A-', value: 1 },
      {label: 'B+', value: 2 },
      {label: 'B-', value: 3 },
      {label: 'AB+', value: 4 },
      {label: 'AB-', value: 5 },
      {label: 'O+', value: 6 },
      {label: 'O-', value: 7 }
    ];
    return (
     
      <View style={styles.container}>
         
         <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>

        <View>
           <PopNav navigation={this.props.navigation} color ={"#000"} />
        </View>

        <ScrollView style={[styles.scroll, { marginTop: 10 }]} >
          <View style={styles.userRow}>

            
            <Text style={{ fontSize: 20 }}>Fiche santé</Text>
            {this.state.isModifBegin === true && 
            <TouchableOpacity  style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft :200 }}
             onPress={()=>{
              if(this.props.second.indexSelected ===0) {
                  this.modifInfoPerso()
                  this.setState({isModifBegin : false})
              }else{
                  this.modifySecondInfoPerso()
                  this.setState({isModifBegin : false})
              }
            }}>
              <Text style={{color : "white"}}>Enregistrer</Text>
            </TouchableOpacity> }
            {this.state.isModifBegin === false && 
            <TouchableOpacity  style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft :200 }}
             onPress={()=>{
                this.setState({isModifBegin : true})
            }}>
              <Text style={{color : "white"}}>Modifier</Text>
            </TouchableOpacity> }

          </View>

          {this.state.isModifBegin ===true && <Text style={{color : "green",textAlign : "center"}}>Vous pouvez commencer à modifier</Text>}

          <View>

            {this.state.modalBlood=== true && this.renderModal(this.renderBlood(groupeSanguin),"Indiquer votre groupe sanguin",this.state.blood,"",()=>{
              this.setState({
                modalBlood : false
              })
            })}
            {this.state.modalSize=== true && this.renderModal(this.renderSize(),"Indiquer votre taille",this.state.size,"cm",()=>{
              this.setState({modalSize : false})
            })}
            {this.state.modalWeight === true && this.renderModal(this.renderWeight(),"Indiquer votre poids",this.state.weight,"kg" ,() =>{
              this.setState({modalWeight : false})
            }) }
 
            <ListItem
              hideChevron
              title="Groupe sanguin"
              titleStyle={{ fontWeight: "bold" }}
              
              
              rightElement={
                <TouchableOpacity onPress={() => this.setState({modalBlood : true})}>
                    <Text style={{color : "#d3d3d3"}}>{this.state.blood === null ? "ajouter " : this.state.blood }</Text>
                </TouchableOpacity>
              }
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Taille"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TouchableOpacity onPress={() => this.setState({modalSize : true})}>
                    <Text style={{color : "#d3d3d3"}}>{this.state.size}</Text>
                </TouchableOpacity>
              }
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron

              title="Poids"
              titleStyle={{ fontWeight: "bold" }}
              
              rightElement={
                <TouchableOpacity onPress={() => this.setState({modalWeight : true})}>
                    <Text style={{color : "#d3d3d3"}}>{this.state.weight}</Text>
                </TouchableOpacity>
              }
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Donneur d'organe"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={<Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.donate ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  if(value === true) this.setState({donate : "Oui"})
                  else this.setState({donate : "Non"})
                }}
                value={this.state.donate === "Non" ? false : true}
              />}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Numéro de securité sociale"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                keyboardType={"numeric"}
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({ secu: text })}
                  value={this.state.secu}
                />
              }

              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Médecin traitant"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => {this.setState({medecin : text})}}
                  value={this.state.medecin}
                />
              }

              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Allergies"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => {this.setState({allergie : text})}}
                  value={this.state.allergie}
                />
              }

              containerStyle={styles.listItemContainer}
            />
            <ListItem
              hideChevron
              title="Traitement"
              titleStyle={{ fontWeight: "bold" }}
              rightElement={
                <TextInput
                  style={{ color: "#d3d3d3" }}
                  clearTextOnFocus={true}
                  onChangeText={(text) => {this.setState({traitement : text})}}
                  value={this.state.traitement}
                />
              }

              containerStyle={styles.listItemContainer}
            />

          </View>

        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  slider: {
    width: wp('80%'),
    marginTop: hp("1%"),
    color: "#008AC8",

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
    backgroundColor: '#00c1bc',
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
    backgroundColor: "#00C1BC",
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
    borderColor: "#00C1BC",
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
    borderColor: "#00C1BC",
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
    borderColor: "#00C1BC",
    borderWidth: 1
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

