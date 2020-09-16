import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, ScrollView, AsyncStorage, Keyboard } from 'react-native'
import Bdd from '../API/Bdd'
import axios from 'axios';
import Loader from './loader'
import { userConnected } from "../Action";
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as Facebook from 'expo-facebook';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
class LoginNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoading: false
    }
    this.email = "";
    this.password = "";
    this.textInput = "";
    this.passwdInput = "";
  }
  gotToRegister() {
    this.props.navigation.navigate("SignUp")
  }

  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  accueil() {
    this.props.navigation.navigate("Home")
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('store data fini');
    } catch (error) {
      console.log('erreur store data ', error);
      // Error saving data
    }
  };

  onChangeInput(text, type) {
    this[type] = text;
  }

  gotToRegisterDoctor = () => {
    this.props.navigation.navigate("RegisterDoctor")
  }
  goToForgotPassword = () => {
    this.props.navigation.navigate("Forgot")
    console.log('Forgot')
  }

  async logInFacebook() {
    try {
      await Facebook.initializeAsync('600064420613606','Best4Sante');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
        
        const userInfo = await response.json();
        console.log(userInfo);
        // userInfo.picture.data.url
        // userInfo.name
        // userInfo.id
        // Alert.alert('Logged in!', `Hi ${userInfo.name}!`);
        this.props.navigation.navigate("Menu", 
          {
            user: userInfo
          });
      } else {
        // type === 'cancel'
        Alert.alert('Connexion annulée');
      }
    } catch ({ message }) {
      console.log(message);
      alert(`Erreur de connexion Facebook: ${message}`);
    }
  }


  milira() {
    this.props.navigation.navigate("Menu");
    Keyboard.dismiss();
  }

  Connect() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(this.email) === false) {
      Alert.alert("Votre email n'est pas valide")
      return false;
    }

    let data = {
      emailUser: this.email,
      passwordUser: this.password
    }

    this.setState({ isLoading: true });
    axios.post(Bdd.api_url + '/login', data)
      .then((res) => {


        switch (res.data.message) {
          case "wrong credential":
            this.setState({ isLoading: false, error: "Mot de passe incorrect" })
            break;
          case "user dont exist":
            this.setState({ isLoading: false, error: "Ce compte n'existe pas, Veuillez créer un" })
            break;
          case "compte inactive":
            this.setState({ isLoading: false })
            this.props.navigation.navigate("ActiveAccount", { tempEmail: this.email })
            break;
          default:
            this._storeData('bosToken', res.data.token).then(
              () => {
            // registerForPushNotificationsAsync(res.data.user_id);
            this.setState({ isLoading: false })

            Keyboard.dismiss()

            this.email = "";
            this.password = "";
            //this.props.userConnected(res.data.connectUser)
            this.props.navigation.navigate("Menu")
            
              }
            )
            break;
        }


      }).catch((err) => {
        console.log('erreur login ', err);

      })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.main_contenair}>

          <View style={styles.main_Input} >
          <Loader loading={this.state.isLoading} />

          <KeyboardAwareScrollView style={{ flex: 1 }}>
              {this.state.error !== null && <Text style={styles.error}>{this.state.error}</Text>}
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon1} source={require('../images/mail.png')} />
                <TextInput style={styles.inputs}
                  autoCapitalize="none"
                  placeholder="Adresse mail"
                  returnKeyType="next"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.onChangeInput(text, 'email')} />
              </View>
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon2} source={require('../images/password.png')} />
                <TextInput style={styles.inputs}
                  autoCapitalize="none"
                  placeholder="Mot de passe"
                  returnKeyType="done"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  ref={input => { this.passwdInput = input }}
                  onChangeText={(text) => this.onChangeInput(text, 'password')} />
              </View>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.Connect()}>
                <Text style={styles.signUpText}>Se{"  "}connecter</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.buttonContainerF, styles.signupButtonF]} onPress={() => this.logInFacebook()}>
                <Text style={styles.signUpTextF}>Connexion{"  "} avec{"  "} Facebook {"  "}</Text>
              </TouchableHighlight>
              <View style={styles.textLink}>
                <Text onPress={() => { this.goToForgotPassword() }} style={styles.textLinkWhite}>Mot{"  "} de{"  "} passe{"  "} oublié? {"  "}</Text>
              </View>

              </KeyboardAwareScrollView>

            </View>

        </View >
      </View>

    );

  }
}
const styles = StyleSheet.create(
  {

    main_contenair: {
      flex: 1,
      height: hp("80%"),
      zIndex: 0

    },
    buttonContainer: {
      marginTop: 15,
     
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
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
    buttonContainerF: {
      
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 1,
      width: "100%",
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      elevation: 3,
      shadowRadius: 20,
      shadowOffset: { width: 10, height: 7 },
    },
    signupButtonF: {
      backgroundColor: "white",
    },
    signUpTextF: {
      color: '#1795cd',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttonContainerM: {
      borderWidth: 0.166,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 1,
      width: 250,
      marginTop: 10,
      borderRadius: 30,
      shadowColor: 'rgba(1, 161, 156, 1)',
      shadowOpacity: 1.5,
      elevation: 8,
      shadowRadius: 20,
      shadowOffset: { width: 1, height: 13 },
    },
    signupButtonM: {
      backgroundColor: "#008ac8",
    },
    signUpTextM: {
      color: 'white',
      fontWeight: 'bold'

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
      zIndex: 1,
      flex: 1
    },
    inputs: {
      height: 50,
      marginLeft: 16,
      width : "100%",
      flex: 11
    },
    inputIcon1: {
      width: 22,
      height: 15,
      marginLeft: 15,
      justifyContent: 'center',
    },
    inputIcon2: {
      width: 18,
      height: 23,
      marginLeft: 15,
      marginRight: 7,
      justifyContent: 'center',
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
    error: {
      alignSelf: 'center',
      color: 'red',
      fontSize: 14,
      marginTop: 10
    },
    main_Input: {
      // flex:1,
      alignSelf: 'center',
      width: wp("90%"),
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 10,
      // shadowOffset: {
      //   width: 0,
      //   height: 3
      // },
      // shadowOpacity: 0.05,
      // shadowRadius: 20,
      // elevation: 5,
      position :"absolute",
      top : hp("2%")

    },
    body_container: {

      flex: 1,
      height: hp("100%"),
      // backgroundColor: "green",
      zIndex: -1
    },
    Input: {
      backgroundColor: '#fff',
      height: 50,
      marginTop: 14,
      borderRadius: 5,
      paddingLeft: 20,


    },
    seConnecter: {
      height: 50,
      backgroundColor: '#00C1B4',
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
      backgroundColor: '#00C1B4',
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
      backgroundColor: '#00C1B4',
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
      marginLeft: 100,
      fontWeight: 'bold'
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
      marginTop: 10,
      color: "#008ac8",
      fontWeight: "bold",
      fontSize: 16
    },
    textLinkWhite: {
      fontWeight: "bold",
      alignSelf: 'center',
      marginTop: 10,
      color: '#00C1B4',
      fontSize: 16
    }

  }
)
const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = {
  userConnected
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginNew);