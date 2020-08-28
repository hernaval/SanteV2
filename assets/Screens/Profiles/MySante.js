import React, { Component } from 'react'
import { Card, Icon, Input, } from 'react-native-elements'
import { BackHandler } from 'react-native';
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
  Slider,
  Switch,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo } from '../../Action';
import { Avatar } from 'react-native-elements';
import TopMenu from "../../component/Menu/TopMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import axios from "axios";
import Bdd from "../../API/Bdd"
import RNPickerSelect from 'react-native-picker-select';
const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class MySante extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSelectedProfile: false,
      id: this.props.user.user.idUser,


      blood: "",
      size: 0,
      weight: 0,
      donate: false,
      secu: null,
      idFiche: null,


      photoUri: this.props.user.user.imageUser,

      medecin: "",
      allergies: "",
      traitement: "",

      isMedicinExist: false,
      isAllergieExist: false,
      isTraitementExist: false,

      isLoading: false,

      isModifbegin: false,
      isFirst: false,
      ficheSante: {},

     

    }
    this.ref = firebase.firestore().collection('profile');
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  componentDidMount = async () => {

    this.setState({ isLoading: true })
    await this.fetchSante()
    await this.getCameraPermissions()
    this.setState({ isLoading: false })
    if (this.props.navigation.state.params.profil !== undefined) {
      this.setState({photoUri: this.props.navigation.state.params.profil})
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.navigate("MyProfil", {profil: this.state.photoUri})
    return true;
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
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ isLoading: false });
      /* this.props.navigation.navigate("MonProfil") */
      this.setState({photoUri : uploadUrl})
    }
  }

  saveProfileImageInfo =  (data) => {
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



  renderHeader = () => {

    return (
      <View style={styles.headerContainer}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>

        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: this.state.photoUri == "" ? DEFAUTL_USER : this.state.photoUri }}
        >
          <View style={styles.headerColumn}>

            <Image
              style={styles.userImage}
              source={{ uri: this.state.photoUri == "" ? DEFAUTL_USER : this.state.photoUri }}
            />
            <Text style={styles.userNameText}>{this.props.user.user.nomUser} {this.props.user.user.prenomUser} </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("MySecondProfil")}>
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
                  <TouchableOpacity onPress={async () => {
                    if (this.state.isFirst === true) {
                      await this.addFiche()
                    } else {
                      await this.modifFiche()
                    }
                    await this.addFiche()
                    /* if (this.props.second.indexSelected === 0) {
                      await this.modifInfoPerso()

                    } else {
                      await this.modifySecondInfoPerso()

                    } */
                  }}>
                    <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'save', type: 'font-awesome' }} />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  addFiche =  () => {
    this.setState({ isLoading: true })
    let data = {
      idUser: this.props.user.user.idUser,
      groupeSanguin: this.state.blood,
      taille: this.state.size,
      poids: this.state.weight,
      donnateur: this.state.donate,
      numSecu: this.state.secu,
      medecinTraitant: this.state.medecin,
      allergies : this.state.allergies
    }


     axios.post(`${Bdd.api_url}/fiche-sante`, data)
      .then(_ => {
        this.setState({ isModifbegin: false, isLoading: false })
      })
      .catch(err => console.log(err))
    this.setState({ isLoading: false })
  }


  modifFiche() {
    this.setState({ isLoading: true })
    let userModified = {

      groupeSanguin: this.state.blood,
      taille: this.state.size,
      poids: this.state.weight,
      donnateur: this.state.donate,
      numSecu: this.state.secu,
      medecinTraitant: this.state.medecin,
      allergies : this.state.allergies
    }

    userModified.groupeSanguin = this.state.blood
    userModified.taille = this.state.size
    userModified.poids = this.state.weight
    userModified.numSecu = this.state.secu
    userModified.donnateur = this.state.donate
    userModified.allergies = this.state.allergies

    // this.saveAutre(this.state.medecin, this.state.allergies, this.state.traitement)
    axios.put(`${Bdd.api_url}/fiche-sante/${this.state.idFiche}`, userModified)
      .then(res => {
        this.setState({ isLoading: false, isModifbegin: false })
      })
      .catch(err => console.log(err))
    this.setState({ isLoading: false, isModifbegin: false })
  }

  createTaille = () => {
    taille = []
    for (i = 50; i <= 210; i++ ) {
      const item = {
        label: i + " cm",
        value: i
      }
      taille.push(item)
    }

    return taille
  }

  createPoids = () => {
    poids = []

    for (i = 1; i <= 180; i++ ) {
      const item = {
        label: i + " kg",
        value: i
      }
      poids.push(item)
    }
    return poids
  }


  render() {
    var groupeSanguin = [
      { label: 'A+', value: 0 },
      { label: 'A-', value: 1 },
      { label: 'B+', value: 2 },
      { label: 'B-', value: 3 },
      { label: 'AB+', value: 4 },
      { label: 'AB-', value: 5 },
      { label: 'O+', value: 6 },
      { label: 'O-', value: 7 }
    ];
    var tailleCm = this.createTaille()
    var poidsKg = this.createPoids()
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>

   

          {this.state.isLoading && <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>}

          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>


          <View style={styles.infoContainer}>


            <View>
              <Text style={styles.labelText}>Groupe Sanguin</Text>
              {this.state.isModifbegin === true && <RadioForm
                formHorizontal={true}
                labelHorizontal={false}
                radio_props={groupeSanguin}
                initial={-1}
                onPress={(value) => { this.setState({ blood: groupeSanguin[value].label }) }}
              />

              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.blood}</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Taille</Text>
              {this.state.isModifbegin === true && <View>

                <RNPickerSelect
                  placeholder={{
                    label: "Taille en cm"
                  }}
                  onValueChange={(value) => this.setState({ size: value })}
                  items={tailleCm}
                />

              </View>

              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.size} cm</Text>
              }
            </View>




            <View>
              <Text style={styles.labelText}>Poids</Text>
              {this.state.isModifbegin === true && <View>
                <RNPickerSelect
                  placeholder={{
                    label: "Poids en kg"
                  }}
                  onValueChange={(value) => this.setState({ weight: value })}
                  items={poidsKg}
                />


              </View>
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.weight} kg</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Donneur d'organe</Text>
              {this.state.isModifbegin === true && <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.donate ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  if (value === true) this.setState({ donate: true })
                  else this.setState({ donate: false })
                }}
                value={this.state.donate}
                style={styles.switch}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.donate === true ? "OUI" : "NON"}</Text>
              }
            </View>
            <View>
              <Text style={styles.labelText}>Numéro de la sécurité sociale</Text>
              {this.state.isModifbegin === true && <Input
                keyboardType={"numeric"}
                onChangeText={(text) => this.setState({ secu: text })}
                value={this.state.secu}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.secu}</Text>
              }
            </View>



            <View>
              <Text style={styles.labelText}>Médecin traitant</Text>
              {this.state.isModifbegin === true && <Input

                onChangeText={(text) => this.setState({ medecin: text })}
                value={this.state.medecin}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.medecin}</Text>
              }
            </View>

            <View>
              <Text style={styles.labelText}>Allergies</Text>
              {this.state.isModifbegin === true && <Input

                onChangeText={(text) => this.setState({ allergies: text })}
                value={this.state.allergies}
              />
              }
              {this.state.isModifbegin === false &&
                <Text style={styles.labelValue}>{this.state.allergies}</Text>
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
    paddingLeft: 5,
    paddingRight: 5
  },
  slider: {
    width: wp('80%'),
    marginTop: hp("1%"),
    color: "#008AC8",

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
  switch: {
    marginTop:-24,
    marginBottom: 10
  }
})

const mapStateToProps = (store) => {
  return {
    user: store.user,
    /*   contact: store.contact,
      second: store.second */
  }
}

const mapDispatchToProps = {
  deleteContact,
  modifyUserInfo,
  setSecondInfo,
  setIndexSelected
}
export default connect(mapStateToProps, mapDispatchToProps)(MySante)