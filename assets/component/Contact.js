import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { connect } from 'react-redux';
  import {addContact} from "../Action"
  import { Card, Icon, Input } from 'react-native-elements'

  class Contact extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        invalidFirstName: null,
        invalidLastName: null,
        invalidEmail: null,
        invalidPhone: null,
        empty: null
      }
     
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
    }
  
    gotToProfil() {
      this.props.navigation.push("Profile")
    }
  
    onChangeInput(text, type){
      this[type] = text;
    }
  
    onClickaddContact() {
      const champ = /^[a-zA-Z0-9_]+$/
      const email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      this.setState({empty: null}, {invalidFirstName: null}, 
        {invalidLastName: null}, {invalidEmail: null}, {invalidPhone: null})
      if (this.firstName == '' || this.lastName == '' || this.email == '' || this.phone == '') {
        this.setState({empty: 'Veuillez remplir tout les champs'})
      } else if (!champ.test(this.firstName)) {
        this.setState({invalidFirstName: 'Caractère alphanumerique'})
      } else if (!champ.test(this.lastName)) {
        this.setState({invalidLastName: 'caractère alphanumerique'})
      } else if (!email.test(this.email)) {
        this.setState({invalidEmail: 'Email invalid'})
      } else if (this.phone.length < 8) {
        this.setState({invalidPhone: 'Entre 8 à 12 chiffres'})
      } else {
        let contact = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          user_id: this.props.user.user.data.user[0].id
      }
      //.log(contact);
      this.props.addContact(contact);
      this.gotToProfil();
      }


    }
  
  
    render(){
      return (
        <View style={styles.container} behavior="padding" enabled>
          <View style={styles.header}>
            
            
          </View>
          <ScrollView>
          <View style={styles.container2}>
            <View style={styles.center}>
              <Image
                style={{ width: wp('35%'), height: wp('35%'), backgroundColor: 'white', borderRadius: 400/2}}
                source={require('../images/icon_point.jpeg')}
              />
            </View>
            <Text style={styles.center}>Best4Santé</Text>
            <Text style={styles.center}>Ajouter un contact d'urgence</Text>
            {this.state.error !== null && <Text style={styles.center, styles.red}>{this.state.error}</Text>}
            
            <Input 
              
              onChangeText={(text) => this.firstName = text}
             
              placeholder="Prénom"
              //onSubmitEditing={() => this._searchFilms()}
            />
            <Text style={styles.invalid}>{this.state.invalidFirstName}</Text>

            <Input 
             
              onChangeText={(text) =>this.lastName = text}
             
              placeholder="Nom"
              //onSubmitEditing={() => this._searchFilms()}
            />
            <Text style={styles.invalid}>{this.state.invalidLastName}</Text>

            <Input 
            
              autoCapitalize = "none"
              onChangeText={(text) => this.email = text}
          
              placeholder="Adresse email"
              //onSubmitEditing={() => this._searchFilms()}
            />
            <Text style={styles.invalid}>{this.state.invalidEmail}</Text>
  
            <Input 
              style={styles.textinput}
              onChangeText={(text) => this.phone = text}
              placeholder="Numéro de téléphone"
              keyboardType="numeric" maxLength={12}
              //onSubmitEditing={() => this._searchFilms()}
            />
            <Text style={styles.invalid}>{this.state.invalidPhone}</Text>
            
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={(e)=>{this.onClickaddContact()}}
            >
              <Text style={styles.buttonText}>Enregistrer le contact d'urgence</Text>
            </TouchableOpacity>
            <Text style={styles.invalid}>{this.state.empty}</Text>
            <Image
                  style={{ width: wp('13%'), height: wp('13%'), position: "relative", bottom: hp('12.5%'), left: wp('59%')}}
                  source={require('../images/icon_urf_bleu.png')}
                />
              
          </View>
          <View>
            <Text
              style={styles.footer}
              onPress={(e)=>{
                this.gotToProfil();
              }}
            >
              Revenir à la page profil
            </Text>
          </View>
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
  
     
    },
    container2: {
      flex: 1,
     
      alignItems: 'center',
      paddingTop: hp('8%'),
     
      zIndex: 2
    },
    header: {
      position: 'relative',
      top: hp("20%"),
      zIndex:4,
      textAlign:'center'
    },
    center: {
      textAlign: 'center',
      color: "white",
      fontSize: 23,
      marginTop: hp('1%'),
      marginBottom: hp('1%'),
      fontWeight: 'bold'
    },
    red:{
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
      position: 'relative',
      bottom: hp("10%"),
      zIndex:4,
      textAlign:'center',
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
        backgroundColor : "#008ac8",
        marginTop: hp("2%"), 
        marginBottom: hp("2.5%"),
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        paddingLeft : wp("2%"),
        paddingRight : wp("2%")
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
      fontSize: 13
    },
    invalid : {
      color: '#eb002a',
      textAlign: 'center'
    }
  });
  
  const mapStateToProps = (store) => {
      return {
        user: store.user,
        contact: store.contact
      }
    }
    
    const mapDispatchToProps = {
      addContact
    }
    
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contact);
