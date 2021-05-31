import React, { Component } from 'react'
import { Card, Icon, Input } from 'react-native-elements'
import { BackHandler } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Modal,
  TouchableOpacity,
  Picker
} from 'react-native'
import PropTypes from 'prop-types'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { deleteContact, modifyUserInfo,ModifySecondPhoto, modifySecondUserInfo, setIndexSelected, setSecondInfo ,ModifyPhoto } from '../../Action';
import { Avatar } from 'react-native-elements';
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons';
import { Container, Header, Content, Form, Item, Label } from 'native-base';
import axios from 'axios';
import Bdd from '../../API/Bdd';
import DatePicker from 'react-native-datepicker';

const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class InfoSecond extends Component {

  constructor(props) {
    super(props)
    this.Startmodify = this.Startmodify.bind(this);
    this.Endmodify = this.Endmodify.bind(this);
    this.Savemodify = this.Savemodify.bind(this);
    this.state = {
      isSelectedProfile: false,
      blood: '', 
      size: '',
      weight: '',
      profile: '',
      modifying: false,
      firstName: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser,
      lastName: this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      phone: this.props.second.second_users[this.props.second.indexSelected].phoneSecondUser,
      address: this.props.second.second_users[this.props.second.indexSelected].adresseSecondUser,
      zip: this.props.second.second_users[this.props.second.indexSelected].zipSecondUser,
      city: this.props.second.second_users[this.props.second.indexSelected].villeSecondUser,
      naissance: this.props.second.second_users[this.props.second.indexSelected].naissanceSecondUser,
      age: this.props.second.second_users[this.props.second.indexSelected].ageSecondUser,
      sexe: this.props.second.second_users[this.props.second.indexSelected].sexeSecondUser,
      id: this.props.navigation.state.params.id,

      name: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser + ' ' + this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      firstName_: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser,
      lastName_: this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      name_: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser + ' ' + this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      phone_: this.props.second.second_users[this.props.second.indexSelected].phoneSecondUser,
      address_: this.props.second.second_users[this.props.second.indexSelected].adresseSecondUser,
      zip_: this.props.second.second_users[this.props.second.indexSelected].zipSecondUser,
      city_: this.props.second.second_users[this.props.second.indexSelected].villeSecondUser,
      naissance_: this.props.second.second_users[this.props.second.indexSelected].naissanceSecondUser,
      age_: this.props.second.second_users[this.props.second.indexSelected].ageSecondUser,
      sexe_: this.props.second.second_users[this.props.second.indexSelected].sexeSecondUser,
      id_: this.props.navigation.state.params.id,
      rollGranted: true,
      cameraGranted: false,
      uri_doc: null,
      base64Img: null,
    //   photoUri: this.props.user.user.imageUser ? this.props.user.user.imageUser : this.DEFAUTL_USER,
      photoUri: this.props.navigation.state.params.image,
      errLastName: "",
      errFirstName: "",
      errAddress: "",
      errZip: "",
      errVille: "",
      errPhone: "",
      isLoading: false,
      isModifbegin: false,
      modalVisible: false
    }
    this.ref = firebase.firestore().collection('profile');
    this.countProfil = 0
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    this.changeProfil()
    this.fetchSante()
    this.setState({ isLoading: false })
    console.log('Param navigation info second ',this.props.navigation.state.params)
    this._subscribe = this.props.navigation.addListener('didFocus', async () => {
      this.fetchSante()
    });
    await this.getCameraPermissions()
  }

    changeProfil() {
    console.log('Param switch second profil ', this.props.navigation.state.params)
    console.log('Count second profil ', this.countProfil)
    if (this.props.navigation.state.params === undefined || this.countProfil !== 0) {
        console.log('Quit second change profil')
        this.countProfil = 0
        return
    }
    else {
        console.log('set second state profil')
        this.setState({photoUri: this.props.navigation.state.params.profil})
        this.countProfil++
    }
    }

    goToSecondSante() {
    this.countProfil = 0;
    console.log('Go to second sante avec', this.state.photoUri)
    this.props.navigation.navigate("SanteSecond", 
    {
      profil: this.state.photoUri, id: this.state.id,
      firstName: this.state.firstName, lastName: this.state.lastName
    })
    }


Startmodify() {
  this.setState({
    modifying: true
  })
}

Endmodify() {
  this.setState({
    modifying: false
  })
  this.setState({
    firstName : this.state.firstName_,
    lastName : this.state.lastName_,
    name : this.state.firstName_ + ' ' + this.state.lastName_,
    phone : this.state.phone_,
    address : this.state.address_,
    city : this.state.city_,
    zip : this.state.zip_,
    name_ : this.state.firstName_ + ' ' + this.state.lastName_,
    naissance: this.state.naissance_,
    age: this.state.age_,
    sexe: this.state.sexe_,
  })
}

Savemodify() {
  this.setState({
    modifying: false
  })
  this.modifInfoPerso()
}


  renderHeader_1 = () => {

    return (
        <View style={styles.main_profil}>
            <View style={styles.under_main_profil_1}>
            <Avatar
            size={100}
            rounded
            source={{ uri: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri }}
            />
            </View>

            <View style={styles.btn_photo}>
            <TouchableOpacity onPress={() => this.setState({ modalVisible: true})  }>
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

  modifInfoPerso = async () => {
    // if (this.state.phone.length > 0 && (this.state.phone.length < 8 || this.state.phone.length > 12)) {
    //   this.setState({errPhone: "Numero telephone invalid"})
    //   return;
    // }
    // this.setState({errPhone: null})

    this.setState({ isLoading: true })
    console.log('moffdf')
    let userModified = {}


    userModified.idSecondUser = this.state.id
    userModified.nomSecondUser = this.state.firstName
    userModified.prenomSecondUser = this.state.lastName
    userModified.phoneSecondUser = this.state.phone
    userModified.adresseSecondUser = this.state.address
    userModified.villeSecondUser = this.state.city
    userModified.zipSecondUser = this.state.zip
    userModified.naissanceSecondUser = this.state.naissance
    userModified.ageSecondUser = this.state.age
    userModified.sexeSecondUser = this.state.sexe
    console.log('-----------')
    console.log(userModified)
    console.log('----------')

    this.setState({
      firstName_ : this.state.firstname,
      lastName_ : this.state.lastName,
      name_ : this.state.firstName + ' ' + this.state.lastName,
      phone_ : this.state.phone,
      address_ : this.state.address,
      city_ : this.state.city,
      zip_ : this.state.zip,
      naissance_ : this.state.naissance,
      age_ : this.state.age,
      sexe_ : this.state.sexe,
    })
      this.props.modifySecondUserInfo(userModified)
      this.setState({isModifbegin : false,isLoading : false})
  }


  async validationInfo(data) {

    var numberPattern = /^[0-9]+$/
    var alphaPattern = /^([a-zA-Z0-9 _-]+)$/
    let count = 0

    if ( data.phone.length < 8 || data.phone.length > 12 || isNaN(data.phone)) {
      count++
      this.setState({ errPhone: "Vous devez entrer un numéro de téléphone valide" })
    } else {
      this.setState({ errPhone: null })
    }

    if (numberPattern.test(this.state.zip) === false || this.state.zip == "" || this.state.zip.length < 3 || this.state.zip.length > 6) {
      count++
      this.setState({ errZip: "Vous devez entrer un code postal valide" })
    } else {
      this.setState({ errZip: null })
    }

    if (alphaPattern.test(this.state.firstName) === false || this.state.firstName == "") {
      count++
      this.setState({ errFirstName: "Vous devez entrer un prénom valide" })
    } else {
      this.setState({ errFirstName: null })
    }
    if (alphaPattern.test(this.state.lastName) === false || this.state.lastName == "") {
      count++
      this.setState({ errLastName: "Vous devez entrer un nom valide" })
    } else {
      this.setState({ errLastName: null })
    }
    /* if (alphaPattern.test(this.state.address) === false || this.state.address == "") {
      count++
      this.setState({ errAddress: "Vous devez entrer une adresse valide" })
    } else {
      this.setState({ errAddress: null })
    } */
    
    if (alphaPattern.test(this.state.city) === false || this.state.city == "") {
      count++
      this.setState({ errVille: "Vous devez entrer un nom de ville valide" })
    } else {
      this.setState({ errVille: null })
    }

    return count
  }

  getCameraPermissions = async () => {
    const key = 'permission_camera';
    const value = await AsyncStorage.getItem(key);
    if(value === null) {
      Alert.alert('Camera', 
      'Nous demandons l\' accès à votre camera afin de completer votre profil', [
      {
          text: 'Suivant',
          onPress: async () => { 
            let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              Alert("permission not granteed")
              this.setState({
                rollGranted: false,
                cameraGranted: false,
              })
            } else {
              await AsyncStorage.setItem(key, 'OK');
              this.setState({
                rollGranted: true,
                cameraGranted: true,
              })
            }
          }
      }
        ])
      } else {
        this.setState({
          rollGranted: true,
          cameraGranted: true,
        }) 
    }
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

  takePictureAndCreateAlbum = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing : true,
      quality : 0.5
    });

    this._handleImagePicked(result)
  }

    showModal() {
        return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        >
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22}}>
          <View 
          style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, 
          alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
        
            <TouchableOpacity
               style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible })
                this._pickImage()
              }}
            >

              <Text style={styles.textStyle}>Importer une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible})
                this.takePictureAndCreateAlbum()
              }}
            >
              <Text style={styles.textStyle}>Prendre une photo</Text>

            </TouchableOpacity>
            <TouchableOpacity
            style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#d3d3d3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: false})
              }}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
        </View>
        )
    }

    saveProfileImageInfo =  (data) => {
    console.log('Modifier Photo')
    this.props.ModifySecondPhoto(data)
    }

  _handleImagePicked = async pickerResult => {
    let uploadUrl =""
    try {
      this.setState({ isLoading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await this.uploadImageAsync(pickerResult.uri);
      let data = {
        imageSecondUser :uploadUrl,
        idSecondUser : this.state.id
      }
      this.saveProfileImageInfo(data)
      
         axios.put(`${Bdd.api_url_second}/${this.state.id}/image`,data)
         .then(res=>{
           console.log("vita upload mys maj")
         })
      }
    } catch (e) {
      console.log(e);
      console.log('Upload failed, sorry :(');
    } finally {
      console.log('FINALLY ', uploadUrl)
      this.setState({ 
        isLoading: false,
        photoUri: uploadUrl
      }, () => {
        this.setState({
          photoUri: this.state.photoUri
        })
      });
      /* this.props.navigation.navigate("MonProfil") */
    }
  }

  fetchSante = async () => {
    console.log('fetch sante second de ', this.state.id)
    await axios.get(`${Bdd.api_url_second}/fiche-sante/list?idSecondUser=${this.state.id}`)
      .then(async res => {
        if (await !res) {
          console.log("tena misy olana")
        } else {
          const fiche = res.data.data
          console.log('resultat de fiche sante ', fiche)
          if (res.data === null) this.setState({ isFirst: true })
          else this.setState({
            isFirst: false,
            blood: fiche.groupeSanguin, size: fiche.taille,
            weight: fiche.poids, medecin: fiche.medecinTraitant,
            secu: fiche.numSecu, donate: fiche.donnateur,
            idFiche: fiche.idFiche, allergies: fiche.allergies
          })
        }
      })
      .catch(err => {
        console.log(err)
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

  goToProfil() {
    this.props.navigation.navigate("MyProfil", {
      photo: this.state.photoUri
    })
  }


  render() {
    return (
      <View style={styles.container_1}>
          {this.state.isLoading && <View style={styles.loading_container_1}>
              <ActivityIndicator size="large" />
          </View>}
  
          {/*
          <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
            <TopMenu navigation={this.props.navigation} switch={1}/>
          </View>
           */
          }

          <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <HeaderMenu navigation={this.props.navigation} 
          secondProfilInfo={1} startModifSecond={this.Startmodify} 
          endModifSecond={this.Endmodify} saveModifSecond={this.Savemodify}/>
          </View>

        {this.showModal()}
        {this.changeProfil()}
          <ScrollView style={this.state.modifying ? styles.scroll_1 : styles.scroll_2}>
              {this.renderHeader_1()}

              {
                !this.state.modifying && 
                (
                  <View style={{marginLeft: 10}}>
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Prénom et Nom
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.name_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Date de naissance
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.naissance_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Age
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.age_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Sexe
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.sexe_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Ville
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.city_}
                        </Text>
                    </View>
                    
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Adresse
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.address_}
                        </Text>
                    </View>
                  
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Code Postal
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.zip_}
                        </Text>
                    </View>

                                  
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Téléphone
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.phone_}
                        </Text>
                    </View>
                </View>
                )
              }

              {
                this.state.modifying && 
                (
                  <View>
                  <Form>
                    <Item stackedLabel>
                      <Label style={styles.labelInfo}>Prénom</Label>
                      <Input value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })}/>
                    </Item>
                                
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Nom</Label>
                      <Input value={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Date de naissance</Label>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={this.state.naissance}
                      mode="date" // The enum of date, datetime and time
                      placeholder="select date"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirmer"
                      cancelBtnText="Annuler"
                      customStyles={{
                        dateIcon: {
                          //display: 'none',
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ naissance: date })
                      }}
                    />
                    </Item>

                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Age</Label>
                    <TextInput
                    style={{width: "100%", marginTop: 10, marginBottom: 5, paddingLeft: 10}}
                    placeholder="Votre age"
                    placeholderTextColor="#60605e"
                    numeric
                    keyboardType={'numeric'}
                    onChangeText={(text)=> this.setState({ age: text })}
                    value={this.state.age}
                    />
                      {/* <Input value={this.state.age} onChangeText={(text) => this.setState({ age: text })}/> */}
                    </Item>

                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Sexe</Label>
                    <Picker
                      selectedValue={this.state.sexe}
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ sexe: itemValue })}
                    >
                      <Picker.Item label="Masculin" value="Masculin" />
                      <Picker.Item label="Feminin" value="Feminin" />
                    </Picker>
                    </Item>
                    
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Ville</Label>
                    <Input value={this.state.city} onChangeText={(text) => this.setState({ city: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Adresse</Label>
                    <Input value={this.state.address} onChangeText={(text) => this.setState({ address: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Code Postal</Label>
                    <Input value={this.state.zip} onChangeText={(text) => this.setState({ zip: text })}/>
                    </Item>
                
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Téléphone</Label>
                    <Input value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })}/>
                    </Item>
                  </Form>
                </View>
                )
              }
  {
}
              {
                !this.state.modifying && (
                  <TouchableOpacity style={styles.fiche_sante} onPress={() => this.goToSecondSante()}>
                  <FontAwesomeIcon color="#FFFFFF" size={20} icon={faFileMedicalAlt} />
                  <Text style={styles.text_fiche_sante}>Fiche santé</Text>
                  </TouchableOpacity>
                )
              }


        </ScrollView>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  datePickerStyle: {
    marginTop: 15,
    width: "90%",
    marginRight: "10%",
    marginBottom: 15
  },
  fiche_sante: {
    width: wp('70%'),
    marginLeft: wp('15%'),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#008ac8',
    backgroundColor: '#008ac8',
    padding: 5,
    borderRadius: 5,
    marginTop: 15,
    height: 60,
    marginBottom: 50
  },
  text_fiche_sante: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingLeft: 15
  },
  contain_info: {
    marginBottom: 10,
    marginTop: 5
  },
  labelInfo: {
    color: 'black', 
    fontSize: 17, 
    fontWeight: 'bold'
  },
  valueInfo: {
    color: 'black', 
    fontSize: 17, 
    marginLeft: 10, 
    borderBottomWidth: 1, 
    width: wp('95%'), 
    paddingBottom: 5, 
    paddingTop: 5
  },
  textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
  },
  my_label: {
    fontWeight: 'bold',
    color: '#000'
},
labelValue: {
    color: '#000',
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 5,
    marginBottom: 5
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
    position: "relative",
    left: -20
  },
  img_profil: {
      width: 200
  },
  scroll_1: {
    backgroundColor: 'white',
    marginTop: 30
  },
  scroll_2: {
    backgroundColor: 'white',
    marginTop: 30
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  under: {
    height: hp('10%'),
    zIndex: 99
  },
  loading_container_1: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_1: {
    flex: 1,
    backgroundColor: '#00C1B4',
    zIndex: 40,
    justifyContent: 'center'
  },
  infoContainer: {
    padding: 20
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 16
  },
  labelValue: {
    color: "gray"
  },
  actionBtn: {
    position: "relative",
    top: -10,
    zIndex: 99999,
    paddingLeft: 3,
    paddingRight: 3
  },
  choiceItem: {
    backgroundColor: "white",
    padding: 10,
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
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: "#01C89E",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
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
  error:{
    alignSelf:'center',
    color:'red',
    fontSize:14,
    marginTop:10
  }
})

const mapStateToProps = (store) => {
  return {
    user: store.user,
    
    second: store.second 
  }
}

const mapDispatchToProps = {
  deleteContact,
  modifyUserInfo,
  modifySecondUserInfo,
  setSecondInfo,
  setIndexSelected,
  ModifyPhoto,
  ModifySecondPhoto
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoSecond)