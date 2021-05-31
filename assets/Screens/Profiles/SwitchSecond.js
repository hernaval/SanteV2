import React, { Component } from 'react'
import { Card, Icon, Input } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { deleteContact, modifyUserInfo,ModifySecondPhoto, modifySecondUserInfo, setIndexSelected, setSecondInfo ,ModifyPhoto } from '../../Action';
import { Avatar } from 'react-native-elements';
import TopMenu from "../../component/Menu/TopMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Bdd from '../../API/Bdd'
import axios from "axios"

const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class SwitchSecond extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSelectedProfile: false,
      firstName: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser,
      lastName: this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      phone: this.props.second.second_users[this.props.second.indexSelected].phoneSecondUser,
      address: this.props.second.second_users[this.props.second.indexSelected].adresseSecondUser,
      zip: this.props.second.second_users[this.props.second.indexSelected].zipSecondUser,
      city: this.props.second.second_users[this.props.second.indexSelected].villeSecondUser,
      naissance: this.props.second.second_users[this.props.second.indexSelected].naissanceSecondUser,
      age: this.props.second.second_users[this.props.second.indexSelected].ageSecondUser,
      sexe: this.props.second.second_users[this.props.second.indexSelected].sexeSecondUser,
      // id: this.props.second.second_users[this.props.second.indexSelected].idSecondUser,
      id: this.props.navigation.state.params.id,
      rollGranted: true,
      cameraGranted: false,
      uri_doc: null,
      base64Img: null,
      // photoUri: this.props.second.second_users[this.props.second.indexSelected].imageSecondUser,
      photoUri: this.props.navigation.state.params.image,
      errLastName: "",
      errFirstName: "",
      errAddress: "",
      errZip: "",
      errVille: "",
      errPhone: "",
      isLoading: false,
      isModifbegin: false
    }
    this.ref = firebase.firestore().collection('profile');
    this.countProfil = 0;
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    await this.getCameraPermissions()
    this.setState({ isLoading: false })
    this.changeProfil()
    console.log(this.props.second)
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
    this.props.navigation.navigate("MySecondSante", {profil: this.state.photoUri, id: this.state.id})
}


  renderHeader = () => {
    
    return (
      <View style={styles.headerContainer}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: this.state.photoUri == null? DEFAUTL_USER : this.state.photoUri }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri }}
            />
            <Text style={styles.userNameText}>{this.props.second.second_users[this.props.second.indexSelected].nomSecondUser} {this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser} </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() => this.goToSecondSante()}>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'share', type: 'font-awesome' }} />
                </TouchableOpacity>
              </View>
              {this.state.isModifbegin === false &&
                <View style={styles.actionBtn}>
                  <TouchableOpacity onPress={() => this.setState({ isModifbegin: !this.state.isModifbegin })}>
                    <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'pencil', type: 'font-awesome' }} />
                  </TouchableOpacity>
                </View>
              }
              {this.state.isModifbegin === true &&
                <View style={styles.actionBtn}>
                  <TouchableOpacity onPress={() => {   
                    console.log("ato tsika e")
                      this.modifInfoPerso()

                  }}>
                    <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'save', type: 'font-awesome' }} />
                  </TouchableOpacity>
                </View>
              }
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() =>this._pickImage() }>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'camera', type: 'font-awesome' }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  modifInfoPerso = async () => {
    /* if (this.state.phone.length > 0 && (this.state.phone.length < 8 || this.state.phone.length > 12)) {
      this.setState({errPhone: "Numero telephone invalid"})
      return;
    } */
    this.setState({errPhone: null})

    this.setState({ isLoading: true })
    let userModified = {
      idSecondUser : this.props.second.second_users[this.props.navigate.navigation.state.params.index].idSecondUser,
      nomSecondUser: this.props.second.second_users[this.props.second.indexSelected].nomSecondUser,
      prenomSecondUser: this.props.second.second_users[this.props.second.indexSelected].prenomSecondUser,
      phoneSecondUser: this.props.second.second_users[this.props.second.indexSelected].phoneSecondUser,
      adresseSecondUser: this.props.second.second_users[this.props.second.indexSelected].adresseSecondUser,
      zipSecondUser: this.props.second.second_users[this.props.second.indexSelected].zipSecondUser,
      villeSecondUser: this.props.second.second_users[this.props.second.indexSelected].villeSecondUser,
      naissanceSecondUser: this.props.second.second_users[this.props.second.indexSelected].naissanceSecondUser,
      ageSecondUser: this.props.second.second_users[this.props.second.indexSelected].ageSecondUser,
      sexeSecondUser: this.props.second.second_users[this.props.second.indexSelected].sexeSecondUser,
    }


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
           console.log(res.data)
         }).catch(
           error => {
             console.log(error)
           }
         )
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      console.log('finally')
      this.setState({ isLoading: false });
      /* this.props.navigation.navigate("MonProfil") */
      this.setState({photoUri : uploadUrl})
    }
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




  render() {
    console.log("render")
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {this.state.isLoading && <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>}

          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>


          <View style={styles.containProfilSecond}>
          <Text style={styles.profilSecondTxt}>Profil Secondaire</Text>
          </View>
          <View style={styles.infoContainer}>
          {this.changeProfil()}
            {this.state.isModifbegin === true && this.state.errPhone !== null &&
              <Text style={styles.error}>{this.state.errPhone}</Text>
            }
            <View>
              <Text style={styles.labelText}>Prénom</Text>
              {this.state.isModifbegin === true && <Input
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.firstName}</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Nom</Text>
              {this.state.isModifbegin === true && <Input

                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.lastName}</Text>
              }
            </View>

            <View>
              <Text style={styles.labelText}>Date de naissance</Text>
              {this.state.isModifbegin === true && <Input
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.lastName}</Text>
              }
            </View>

            <View>
              <Text style={styles.labelText}>Age</Text>
              {this.state.isModifbegin === true && <Input

                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.lastName}</Text>
              }
            </View>

            <View>
              <Text style={styles.labelText}>Sexe</Text>
              {this.state.isModifbegin === true && <Input
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.lastName}</Text>
              }
            </View>

            <View>
              <Text style={styles.labelText}>Ville</Text>
              {this.state.isModifbegin === true && <Input
              errorMessage={this.state.errVille}
                onChangeText={(text) => this.setState({ city: text })}
                value={this.state.city}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.city}</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Adresse</Text>
              {this.state.isModifbegin === true && <Input
              errorMessage={this.state.errAddress}
                onChangeText={(text) => this.setState({ address: text })}
                value={this.state.address}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.address}</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Code postale</Text>
              {this.state.isModifbegin === true && <Input keyboardType="numeric" 
                errorMessage={this.state.errZip}
                onChangeText={(text) => this.setState({ zip: text })}
                value={this.state.zip}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.zip}</Text>
              }
            </View>



            <View>
              <Text style={styles.labelText}>Téléphone</Text>
              {this.state.isModifbegin === true && <Input
               keyboardType="numeric"
                onChangeText={(text) => this.setState({ phone: text })}
                value={this.state.phone}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.phone}</Text>
              }
            </View>

          </View>



        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
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
  },
  profilSecondTxt : {
    alignItems: 'center',
    fontSize: 20,
  },
  containProfilSecond : {
    alignItems: 'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(SwitchSecond)