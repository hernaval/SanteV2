import React, { Component } from 'react'

import { CheckBox, Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import TopMenu from "../../component/Menu/TopMenu"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { addContact, setContactInfo } from "../../Action"
import { Card, Icon, Input, Avatar } from 'react-native-elements'
import { TextInput } from 'react-native-paper';
import HeaderNewContact from "../../component/Menu/HeaderNewContact";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

class NewContact extends Component {

  constructor() {
    super()
    this.state = {
      error: null,

    }
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phone = "";
    this.onClickaddContact = this.onClickaddContact.bind(this)
  }


  onChangeInput(text, type) {
    this[type] = text;
  }

  onClickaddContact() {
    let contact = {
      nomContact: this.firstName,
      prenomContact: this.lastName,
      emailContact: this.email,
      numContact: this.phone,
      idUser: this.props.user.user.idUser
    }

    console.log(contact)
    if (contact.nomContact != '' && contact.prenomContact != '' && contact.numContact != '') {
      this.props.addContact(contact);
      this.props.setContactInfo(contact.idUser)
      this.gotToProfil();
    } else {
    //.log(contact);
    this.setState({
      error: 'Veuillez completer les champs'
    });
    this.props.navigation.navigate("NewContact")

    }
  }


  gotToProfil() {
    this.props.navigation.push("ContactUrgence")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
        <HeaderNewContact navigation={this.props.navigation} addContact={1} saveContact={this.onClickaddContact}/>
        </View>

        <KeyboardAwareScrollView style={{ flex: 1 }} getTextInputRefs={() => { return [this._textInputRef];}}>
        <View style={{flex : 1,justifyContent : "center",marginLeft : 20, marginRight : 20}} >
          <View style={styles.contain_avatar}>
              <Avatar rounded icon={{ name: 'phone' }} size="large"/>
          </View>

            <TextInput
              style={{ marginBottom : 5 }}
              onChangeText={(text) => this.firstName = text}
              mode="outlined"
              label="Prénom"
              ref={input => { this.textInput = input }}
            />
            <TextInput
              style={{ marginBottom : 5 }}
              onChangeText={(text) => this.lastName = text}
              mode="outlined"
              label="Nom"
              ref={input => { this.textInput = input }}
            />

          <TextInput
            style={{ marginBottom : 5 }}
            autoCapitalize="none"
            onChangeText={(text) => this.email = text}
            mode="outlined"
            label="Adresse email"
            ref={input => { this.textInput = input }}
          />

          <TextInput
            style={{ marginBottom : 5 }}
            keyboardType="numeric"
            onChangeText={(text) => this.phone = text}
            mode="outlined"
            label="Téléphone"
            ref={input => { this.textInput = input }}
          />



          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={(e) => { this.onClickaddContact() }}
          >
            <Text style={styles.buttonText}>Enregistrer le contact </Text>
          </TouchableOpacity>
          <Image
            style={{ width: wp('13%'), height: wp('13%'), position: "relative", bottom: hp('12.5%'), left: wp('70%') }}
            source={require('../../images/icon_urf_bleu.png')}
          />

          {this.state.error !== null && <Text style={styles.text_error}>{this.state.error}</Text>}

        </View>
        </KeyboardAwareScrollView>

      </View>
    )
  }
}



const styles = StyleSheet.create({
  contain_avatar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  text_error: {
    color: 'red',
    fontSize: 16,
    marginTop: -50,
    textAlign: 'center',
    alignItems: 'center'
  },  
  container: {
    flex: 1,
    backgroundColor: 'white',
    

  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    alignItems: 'center',
    paddingTop: hp('8%'),

    zIndex: 2
  },
  header: {
    position: 'relative',
    top: hp("20%"),
    zIndex: 4,
    textAlign: 'center'
  },
  center: {
    textAlign: 'center',
    color: "white",
    fontSize: 23,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    fontWeight: 'bold'
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
    borderColor: "#000",
    borderRadius: 3,
    marginBottom: hp('2%')
  },
  footer: {
    position: 'relative',
    bottom: hp("10%"),
    zIndex: 4,
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: "white"
  },
  title2: {
    color: "white",
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    textAlign: "center"
  },
  buttonStyle: {
    backgroundColor: "#008ac8",
    marginTop: hp("2%"),
    marginBottom: hp("2.5%"),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%")
    /*  marginTop: hp("3%"), 
     width: wp("60%"), 
     marginLeft: wp('5%'),
     borderColor:'red',
     backgroundColor: "#008AC8",
     paddingTop: hp('3%'),
     paddingBottom: hp('3%'),
     marginBottom: hp("5%") */
  },
  buttonText: {
    color: 'white',
    textAlign: "center",
    fontSize: 16
  },

})

const mapStateToProps = (store) => {
  return {
    user: store.user,
    contact: store.contact
  }
}

const mapDispatchToProps = {
  addContact,
  setContactInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(NewContact)