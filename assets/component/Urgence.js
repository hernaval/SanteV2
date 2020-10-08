import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Linking, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Footer from "./Menu/Footer"
import axios from 'axios'
import Bdd from '../API/Bdd'
import Header from './Menu/Header'
import TopMenu from "./Menu/TopMenu"
import BottomMenu from "./Menu/BottomMenu"
import { ScrollView } from 'react-native-gesture-handler'
import { emergency } from "../API/emergency";
const API_KEY = 'AIzaSyApjuz39FHMGBsy9lo7FobJQJtZKNra8P8';
class Urgence extends React.Component {

  componentDidMount() {


    let res = emergency.data[0]
    console.log(this.findNum())
  }

  findNum = async () => {
    let code = await this._getCountryCodeByLocation()

    console.log(code)
  }

  _getCountryCodeByLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    let code = ""
    await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&key=" + API_KEY)
      .then(async response => {
        const globalRes = response.data.results[0].address_components

        let resObj = await globalRes.filter(el => {
          return el.types.includes("country")
        })
        console.log(resObj.short_name)
        code = resObj.short_name
      })
    return code
  };


  onCLickUrgence(type, msg) {

    console.log(this.props.user.user.data.user[0].id)
    let data = {
      user_id: this.props.user.user.data.user[0].id
    }

    axios.post(Bdd.api_url + '/api/contact/all', data)
      .then((res) => {
        console.log('res', res.data);
        let contacts = res.data.contacts;

        contacts.map((contact) => {
          let user = {
            email: contact.email
          }

          axios.post(Bdd.api_url + '/api/user/byMail', user)
            .then((user) => {
              console.log('response par email', user)

              if (user.data.user.length !== 0) {

                let mail = {
                  email: user.data.user[0].email,
                  msg: msg,
                  type: type
                }

                axios.post(Bdd.api_url + '/api/com/sendMail', mail)
                  .then((response) => {

                    console.log(response)
                  }).catch((err) => {
                    console.log('err', err);

                  })

                let uuid = {
                  token: user.data.user[0].uuid,
                  msg: msg,

                }
                axios.post(Bdd.api_url + '/api/com/notif', uuid)
                  .then((response) => {

                    console.log(response)
                  }).catch((err) => {
                    console.log('err', err);

                  })



              }
            }).catch((err) => {
              console.log('err', err);

            })
        })

      }).catch((err) => {
        console.log('err', err);

      })
  }

  callPerson(phone) {
    let url;
    if (Platform.OS === 'ios') {
      url = 'tel://' + phone
    }
    else if (Platform.OS === 'android') {
      url = 'tel:' + phone

    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => null);
        }
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>
        <ScrollView style={styles.main}>
          <Text style={styles.title1}>APPEL D'URGENCE</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => {
              this.onCLickUrgence('Accident', "Attention accident, votre contact d'urgence a déclenché son bouton");
              this.callPerson('18');
            }}
            title="Accident"
          >
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%') }}
              source={require('../images/accident.png')}
            />
            <Text style={styles.buttonText}>ACCIDENT</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => {
              this.onCLickUrgence('Malaise', "Attention malaise, votre contact d'urgence a déclenché son bouton")
              this.callPerson('15')
            }}
            title="Malaise"
          >
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%') }}
              source={require('../images/malaise.png')}
            />
            <Text style={styles.buttonText}>MALAISE</Text></TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => {
              this.onCLickUrgence('Agression', "Attention agression, votre contact d'urgence a déclenché son bouton")
              this.callPerson('17')
            }}
            title="Agression"
          >
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%') }}
              source={require('../images/agression.png')}
            />
            <Text style={styles.buttonText}>AGRESSION</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => {
              this.onCLickUrgence('Agression', "Attention agression, votre contact d'urgence a déclenché son bouton")
              this.callPerson('0651508656')
            }}
            title="Agression"
          >
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%') }}
              source={require('../images/Detresse.png')}
            />
            <Text style={styles.buttonText}>DETRESSE</Text></TouchableOpacity>
        </ScrollView>
        <View>
          <BottomMenu navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C1B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    height: hp('70%'),
    marginTop: hp('3%')

  },
  footer: {
    height: hp("10%"),
  },
  buttonStyle: {
    marginTop: hp("2%"),
    width: wp("70%"),
    backgroundColor: "white",
    //paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    //marginBottom: hp("2%"),
    borderBottomColor: "#008AC8",
    borderBottomWidth: 6,
    alignItems: "center"
  },
  buttonText: {
    color: '#00C1B4',
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  title1: {
    fontSize: 30,
    color: "white",
    marginBottom: hp('3%'),
    fontWeight: "bold"
  },
  under: {
    height: hp('10%'),
    width: wp("100%"),
    zIndex: 99
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.user,
    contact: store.contact
  }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps)(Urgence)