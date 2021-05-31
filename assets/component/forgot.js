import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Keyboard, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import Bdd from '../API/Bdd'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { registerForPushNotificationsAsync } from '../services/notifications';
import Header from './Menu/Header'
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TopMenu from "./Menu/TopMenu";
import HeaderMenu from "./Menu/HeaderMenu";

class Forgot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errDroit : null,
      errNew : null,
      errConfirm : null,
      isLoading: false
    }

    this.currentPass = ""
    this.pass = ""
    this.confirmPass = ""
  }

  gotToLogin() {
    this.props.navigation.push("Login")
  }

  onChangeInput(text, type) {
    this[type] = text;
  }


  sendForgot() {

    if (this.pass !== this.confirmPass) {
      this.setState({ error: "Confirmation mot de passe non identique", errConfirm : "Mot de passe non identique",errNew :"Mot de passe non identique" })
      this.pass = "",
        this.confirmPass = ""
    } else {
      let data = {
        actualPass: this.currentPass,
        passwordUser: this.pass
      }
      console.log(data.actualPass)
      let idUser = this.props.user.user.idUser
      this.setState({ isLoading: true });
      axios.put(`${Bdd.api_url}/${idUser}/reset-password`, data)
        .then((res) => {
          //  console.log(res);
          console.log(res.data.message)
          this.setState({ isLoading: false });
          switch (res.data.message) {
            case "pas le droit":
              this.setState({ error: "mot de passe incorrect", errConfirm : "mot de passe incorrect" })
              break
            case "use another":
              this.setState({ error: "trouver un autre mot de passe que l'actuel", errNew : "Trouver un autre que l'actuel" })
              break
            default:
              this.currentPass = ""
              this.pass = "",
                this.confirmPass = ""

          }
        }).catch((err) => {
          console.log('err', err);

        })
    }

  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>}

        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          {/* <TopMenu navigation={this.props.navigation} /> */}
          <HeaderMenu navigation={this.props.navigation} forgot={1} />
        </View>

        <View style={{marginTop : 0, flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <Text style={{textAlign : "center", fontWeight : "bold",fontSize: 23}}>Changer de mot passe </Text>
          <Image source={require("../images/reset.png")}  />
        </View>

        <View style={{ flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 20, marginTop: -150}} >
          <TextInput
            style={{ marginBottom: 20, backgroundColor : "white" }}
            onChangeText={(text) => this.currentPass = text}
            secureTextEntry={true}
            label="Mot de passe actuel"
            autoCapitalize='none'
          

          />
          <TextInput
            style={{ marginBottom: 20, backgroundColor : "white" }}
            onChangeText={(text) => this.pass = text}
            secureTextEntry={true}
            label="Nouveau mot de passe"
            autoCapitalize='none'


          />
          <TextInput
            style={{ marginBottom: 20,  backgroundColor : "white" }}
            onChangeText={(text) => this.confirmPass = text}
            secureTextEntry={true}
            label="Confirmer nouveau mot de passe"
            autoCapitalize='none'

          />

          {/* <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => { this.sendForgot() }}
          >
            <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity> */}

        </View>


        <View style={{marginVertical : hp("2%"),marginHorizontal : wp("2%")}}>
          <TouchableOpacity style={{padding : 20, backgroundColor : "#00C1B4"}}>
            <Text style={{textAlign : "center",color :"white"}}>Valider</Text>
          </TouchableOpacity>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white'
  },
  under: {
    flex: 1,
    maxHeight: hp('10%'),
  },
  header: {

    textAlign: 'center'
  },
  center: {
    textAlign: 'center',
    color: "white",
    fontSize: 21,
    marginTop: hp('10%')
  },
  red: {
    color: 'red'
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: wp("70%"),
    paddingLeft: 15,
    backgroundColor: 'white',
    borderRadius: 1,
    marginBottom: hp('2%')
  },
  footer: {

    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: "white"
  },
  normalText: {
    color: "white"
  },
  title2: {
    color: "white",
    marginBottom: hp('2%'),
    marginTop: hp('5%'),
    textAlign: "center"
  },
  buttonStyle: {

    width: wp("70%"),

    backgroundColor: "#00C1B4",
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderRadius: 10,
    marginBottom: hp("2%"),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#029B95',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: "center",
    fontSize: 16
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
  }
});

const mapStateToProps = (store) => {
  return {
    user: store.user,
    contact: store.contact,
    /* favorite: store.favorite,
    second: store.second */
  }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(Forgot);