import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, Platform, StatusBar, Button, Keyboard, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { CheckBox, ThemeProvider } from 'react-native-elements'
import Loader from './loader'
import axios from 'axios';
import Bdd from '../API/Bdd'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import * as Location from 'expo-location';
import { urgency } from "../API/urgency";

const API_KEY = 'AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs';

class SignupNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      checked: false
    }
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.localisation = {};
    this.localCountry = "";
  }


  componentDidMount = async () => {
    loc(this);
    await this._getCountryCodeByLocation()
  }

  componentWillUnMount() {
    rol();
  }


  _creation() {
    let data = {
      prenomUser: this.firstName,
      nomUser: this.lastName,
      emailUser: this.email,
      passwordUser: this.password,
      deviceUser: null,
      paysUser: null
    }

    if (Platform.OS === 'ios') {
      data.deviceUser = 'ios';
    } else if (Platform.OS === 'android') {
      data.deviceUser = 'android';
    }

    data.paysUser = this.localCountry
    console.log(data)
  }

  _getCountryCodeByLocation = async () => {
      let location = await Location.getCurrentPositionAsync({});
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&key=" + API_KEY)
            .then(async response => {
                const globalRes = response.data.results[0].address_components

                let resObj = await globalRes.filter(el => {
                    return el.types.includes("country")
                })
                this.localCountry = await resObj[0].long_name
                console.log('Pays ',this.localCountry)
                return this.localCountry
            })
            .catch(err => {
                console.log(err)
                return null
            })
  };

  register() {
    let form = this.checkForm()
    if (form === false) {
      return;
    }

    let data = {
      prenomUser: this.firstName,
      nomUser: this.lastName,
      emailUser: this.email,
      passwordUser: this.password,
      deviceUser: null,
      paysUser: null
    }
    data.paysUser = this.localCountry;
    if (Platform.OS === 'ios') {
      data.deviceUser = 'ios';
    } else if (Platform.OS === 'android') {
      data.deviceUser = 'android';
    }

    this.setState({ isLoading: true });
    axios.post(Bdd.api_url + '/signup', data)
      .then((res) => {
        if (res.status === 400) {
          this.setState({ isLoading: false, error: "email existant" })
        }
        else {
          this.setState({ isLoading: false })
          this.gotToWaitMail()
        }
      }).catch((err) => {
        console.log('err', err);

      })
  }

  gotToWaitMail() {
    this.props.navigation.navigate("ActiveAccount", { tempEmail: this.email })
  }
  goLogin() {
    this.props.navigation.navigate("Login")
  }
  checkForm() {

    if (this.lastName === "") {
      Alert.alert("Champ incomplet", "Vous n'avez pas remplis votre nom")
      return false;
    }

    if (this.firstName === "") {
      Alert.alert("Champ incomplet", "Vous n'avez pas remplis votre prénom")
      return false;
    }



    if (this.email === "") {
      Alert.alert("Champ incomplet", "Vous n'avez pas remplis votre email")
      return false;
    }

    if (this.password === "") {
      Alert.alert("Champ incomplet", "Vous n'avez pas remplis votre mot de passe")
      return false;
    }
    if (this.state.checked === false) {
      Alert.alert("Champ incomplet", "Vous devez valider la politique RGPD")
      return false;
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(this.email) === false) {
      Alert.alert("Votre email n'est pas valide")
      return false;
    }

    /*   if(this.state.checked === false) {
         this.setState({error: "Vous devez valider la politique RGPD"});
         return false;
       }
   */
    return true;

  }
  onChangeInput(text, type) {
    this[type] = text;
  }
  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, marginTop: 0 }}>
        <View innerRef={ref => { this.scroll = ref }} style={styles.main_contenair}>
          <View style={styles.main_Input} >
          <Loader loading={this.state.isLoading} />
            {this.state.error !== null && <Text style={styles.error}>{this.state.error}</Text>}
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../images/userIcon.png')} />
                <TextInput onChangeText={(text) => this.onChangeInput(text, 'lastName')} 
                style={styles.inputs} placeholder="Nom" />
              </View>

              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../images/userIcon.png')} />
                <TextInput onChangeText={(text) => this.onChangeInput(text, 'firstName')} 
                style={styles.inputs} placeholder="Prenom" />

              </View>

              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon1} source={require('../images/mail.png')} />
                <TextInput autoCapitalize='none' onChangeText={(text) => this.onChangeInput(text, 'email')} 
                style={styles.inputs} placeholder="Adresse email" />
              </View>

              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon2} source={require('../images/password.png')} />
                <TextInput autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => this.onChangeInput(text, 'password')} 
                style={styles.inputs} placeholder="Mot de passe"
                />
              </View>

              <View style={styles.checkBox}>
                <CheckBox checked={this.state.checked} onPress={() => this.setState({ checked: !this.state.checked })} />
                <Text style={styles.checkBoxText}>
                  J'accepte les CGU et la politique de
                  {"\n"}
                  gestion de la confidentialité de
                  {"\n"}
                  mes données
                </Text>
              </View>


              <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.register()}>
                <Text style={styles.signUpText}>S'inscrire {"  "}</Text>
              </TouchableOpacity>

          </View>

        </View >
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create(
  {
    main_contenair: {
      flex: 1,
      height: hp("100%"),
      zIndex: 0
    },
    image: {
      width: wp("10%"),
      height: wp("10%"),
      alignSelf: 'center'
    },
    imageFacebook: {
      width: 20,
      height: 20,
      marginTop: 10
    },
    main_logo: {
      marginTop: hp("3%"),
      height: hp("40%"),
      alignSelf: 'center',
      width: wp("100%"),
      paddingTop: hp("7%"),
      backgroundColor: "#00C1B4",
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    text_Logo: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 30,
      fontWeight: "bold"
    },
    tex_Connexion: {
      alignSelf: 'center',
      color: '#008ac8',
      fontSize: 21,
      marginTop: 15,
      marginBottom: 15,
      fontWeight: "bold",
    },
    main_Input: {
      // flex:1,
      alignSelf: 'center',
      width: wp("90%"),
      maxHeight: hp("80%"),
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 10,
      position: "absolute",
      top: hp("2%")
    },

    body_container: {

      flex: 1,
      height: hp("100%"),
      // backgroundColor: "green",
      zIndex: -1
    },
    Input: {
      backgroundColor: '#fff',
      height: 40,
      marginTop: 10,
      borderRadius: 5,
      paddingLeft: 20

    },

    inputContainer: {
      marginTop: 8,
      borderColor: "#d3d3d3",
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      borderWidth: 1,
      width: "100%",
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      zIndex: 1
    },
    inputs: {
      height: 50,
      marginLeft: 16,
      width: "100%",

    },
    inputIcon: {
      width: 25,
      height: 25,
      marginLeft: 15,
      justifyContent: 'center'
    },
    inputIcon1: {
      width: 24,
      height: 17,
      marginLeft: 15,
      justifyContent: 'center',
    },
    inputIcon2: {
      width: 21,
      height: 28,
      marginLeft: 15,
      marginRight: 7,
      justifyContent: 'center',
    },
    checkBox: {
      flexDirection: 'row',
      marginLeft : 0,
      marginTop: 10
    },
    checkBoxText: {
      color: "#000",
      fontSize: 13,
      alignSelf: 'center',
      marginLeft: -12
    },

    buttonContainer: {
      marginTop: 15,
     
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      borderRadius: 10,
      // shadowColor: 'rgba(1, 161, 156, 1)',
      //   shadowOpacity: 1.5,
      //   elevation: 8,
      //   shadowRadius: 20 ,
      //   shadowOffset : { width: 1, height: 13},
    },
    signupButton: {
      backgroundColor: "#008ac8",
    },
    signUpText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    },
    error: {
      alignSelf: 'center',
      color: 'red',
      fontSize: 14,
      marginTop: 10
    },
    seConnecter: {
      height: 50,
      backgroundColor: '#00C1BC',
      textAlign: 'center',
      alignContent: 'center',
      marginTop: 10,
      borderWidth: 0.2,
      borderRadius: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 50,
      paddingRight: 50,
      fontSize: 15,
      shadowColor: 'rgba(1, 161, 156, 1)',
      shadowOpacity: 1.5,
      elevation: 8,
      shadowRadius: 20,
      shadowOffset: { width: 1, height: 13 },
      backgroundColor: '#00C1BC',
      color: '#FFFFFF'
    },
    medecin: {
      height: 50,
      textAlign: 'center',
      alignContent: 'center',
      marginTop: 25,
      borderWidth: 0.2,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 50,
      paddingRight: 50,
      fontSize: 15,
      shadowColor: 'rgba(1, 161, 156, 1)',
      shadowOpacity: 1.5,
      elevation: 8,
      shadowRadius: 20,
      shadowOffset: { width: 1, height: 13 },
      backgroundColor: '#008ac8',
      color: '#FFFFFF'
    },
    seConnecterFacebook: {
      height: 50,
      backgroundColor: '#00C1BC',
      textAlign: 'center',
      alignContent: 'center',
      marginTop: 10,
      borderWidth: 0.2,
      borderRadius: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 50,
      paddingRight: 50,
      fontSize: 15,
      shadowColor: 'rgba(23, 149, 205, 0.5)',
      shadowOpacity: 1.5,
      elevation: 8,
      shadowRadius: 20,
      shadowOffset: { width: 1, height: 13 },
      backgroundColor: '#FFF',
      color: '#1795cd',
    },
    textFacebook: {
      color: '#1795cd',
      fontSize: 15,
      width: 200,
      marginTop: 10,
      marginLeft: 10,
      fontWeight: 'bold'
    },
    textConnexion: {
      color: '#FFF',
      fontSize: 15,
      width: 200,
      marginTop: 10,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textmedecin: {
      color: '#FFF',
      fontSize: 15,
      width: 200,
      marginTop: 10,
      marginLeft: 50,
      fontWeight: 'bold'
    },
    textLink: {
      alignSelf: 'center',
      marginTop: 12,
      fontSize: 17
    },
    textLinkWhite: {
      fontWeight: "bold",
      alignSelf: 'center',
      marginTop: 10,
      color: '#00C1B4',
      textDecorationLine : "underline",
      fontSize: 16
    }

  }
)
export default SignupNew;