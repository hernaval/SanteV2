import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from "./Menu/Footer";
import InputSecondProfil from './InputSecondProfil';
import { setSecondInfo } from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faToilet } from '@fortawesome/free-solid-svg-icons'
import TopMenu from "../component/Menu/TopMenu"
import HeaderMenu from "../component/Menu/HeaderMenu"
import axios from 'axios';
import Bdd from '../API/Bdd'
import { Card, Icon, Input } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import MyProfil from './../Screens/Profiles/MyProfil'
import { Container, Header, Content, Form, Item, Label } from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

class SecondAdd extends React.Component {

  constructor(props) {
    super(props);
    this.firstName = "",
      this.lastName = "",
      this.address = "",
      this.zip = "",
      this.city = "",
      this.phone = "",
      this.blood = "",
      this.size = "",
      this.weight = "",
      this.donate = "",
      this.secu = "",
     

      this.state = {
        errFirstName: null,
        errLastName: null,
        errZip: null,
        errVille: null,
        errAddress: null,
        errPhone: null,

        lien : "",
      }

      this.saveSecondProfil = this.saveSecondProfil.bind(this)
  }

  componentDidMount() {

  }



  goToContact = () => {

    this.props.navigation.push("Contact")
  }


  saveSecondProfil() {
    let data = {
      nomSecondUser: this.firstName,  
      prenomSecondUser: this.lastName,
      adresseSecondUser: this.address,
      villeSecondUser: this.city,
      zipSecondUser: this.zip,
      lienSecondUser: this.state.lien,
      phoneSecondUser : this.phone,
      idUser : this.props.user.user.idUser
    }
    // console.log('save second profil')
    // console.log(data)
    // let errorCount = await this.validationInfo(data)
    if (this.firstName != '' && this.lien != '') {
      axios.post(`${Bdd.api_url_second}/`, data)
      .then((response) => {
        console.log(response)
          // this.props.navigation.navigate("MySecondProfil")
          this.props.navigation.navigate("MySecondProfil")
      })
    }
  }


  async validationInfo() {
    var numberPattern = /^[0-9]+$/
    var alphaPattern = /^([a-zA-Z0-9 _-]+)$/
    let count = 0

    /* if (data.phone.length < 8 || data.phone.length > 12 || isNaN(data.phone)) {
      count++
      this.setState({ errPhone: "Vous devez entrer un numéro de téléphone valide" })
    } else {
      this.setState({ errPhone: null })
    } */

    if (alplaPattern.test(data.firstName) === false || data.firstName == "") {
      count++
      this.setState({ errFirstName: "Champs prénom obligatoire" })
    } else {
      this.setState({ errFirstName: null })
    }
    if (alplaPattern.test(data.lastName) === false || data.lastName == "") {
      count++
      this.setState({ errLastName: "Champs prénom obligatoire" })
    } else {
      this.setState({ errLastName: null })
    }

    if (numberPattern.test(data.zip) === false || this.state.zip == "" || this.state.zip.length < 3 || this.state.zip.length > 6) {
      count++
      this.setState({ errZip: "Vous devez entrer un code postal valide" })
    } else {
      this.setState({ errZip: null })
    }

    if (alphaPattern.test(data.address) === false || this.state.address == "") {
      count++
      this.setState({ errAddress: "Vous devez entrer une adresse valide" })
    } else {
      this.setState({ errAddress: null })
    }
    if (alphaPattern.test(data.city) === false || this.state.city == "") {
      count++
      this.setState({ errVille: "Vous devez entrer un nom de ville valide" })
    } else {
      this.setState({ errVille: null })
    }


  }

  render() {
    var lienProfil = [
      { label: 'Père', value: "Père" },
      { label: 'Mère', value: "Mère" },
      { label: 'Fils', value: "Fils" },
      { label: 'Fille', value: "Fille" },
      { label: 'Autre ascendant', value: "Autre ascendant" },
      { label: 'Autre descendant', value: "Autre descendant" },
      { label: 'Conjoint(e)', value: "Conjoint(e)" },
    ];
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>}

        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
        <HeaderMenu navigation={this.props.navigation} secondAdd={1} enregistrerSecondProfil={this.saveSecondProfil}/>
        </View>

        <KeyboardAwareScrollView style={{ flex: 1, height: hp("90%") }}>        
        <View style={{marginTop: hp("10%")}}>
        <Form>
        <Item stackedLabel>
          <Label style={styles.my_label}>Prénom</Label>
          <Input inputStyle={{'color': 'black'}} 
          returnKeyType="next"
          onChangeText={(text) => { this.firstName = text }}/>
        </Item>
      
        
        <Item stackedLabel last>
        <Label style={styles.my_label}>Nom</Label>
        <Input inputStyle={{'color': 'black'}} 
        returnKeyType="next"
        onChangeText={(text) => { this.lastName = text }}/>
        </Item>
      
        <Item stackedLabel last>
        <Label style={styles.my_label}>Ville</Label>
        <Input inputStyle={{'color': 'black'}} 
        returnKeyType="next"
        onChangeText={(text) => { this.city = text }}/>
        </Item>

        <Item stackedLabel last>
        <Label style={styles.my_label}>Adresse</Label>
        <Input inputStyle={{'color': 'black'}} 
        returnKeyType="next"
        onChangeText={(text) => { this.address = text }}/>
        </Item>

        <Item stackedLabel last>
        <Label style={styles.my_label}>Code postale</Label>
        <Input inputStyle={{'color': 'black'}} 
        keyboardType={"numeric"}
        returnKeyType="next"
        onChangeText={(text) => { this.zip = text }}/>
        </Item>

        <Item stackedLabel last>
        <Label style={styles.my_label}>Téléphone</Label>
        <Input inputStyle={{'color': 'black'}} 
        returnKeyType="done"
        keyboardType={"numeric"}
        onChangeText={(text) => { this.phone = text }}/>
        </Item>

        <Item stackedLabel last>
        <Label style={styles.my_label}>Relation</Label>
        <RNPickerSelect
        placeholder={{
          label : "",
          color : "white"
        }}
      
          onValueChange={(value) => this.setState({lien : value}) }
          items={lienProfil}
        />
        </Item>

      </Form>

        {/*
                  <Text style={{fontWeight :"bold",textAlign : "left",fontSize : 18}}>Lien</Text>
                            <TouchableOpacity
            onPress={() => { this.saveSecondProfil() }}
            style={styles.deco}
          >

            <Text style={styles.textItem}>Créer le profil</Text>
          </TouchableOpacity>
        */}






      </View>
      </KeyboardAwareScrollView>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputVaovao: {
    marginBottom: hp("2%"),
  },
  main: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 9,
    alignItems: 'center',
    width: wp('90%'),
    paddingTop: hp('5%'),
    marginLeft: wp('5%'),
    marginTop: 10
  },
  scrollview: {
    width: wp('90%'),
    textAlign: 'center',

  },
  title1: {
    color: 'white',
    fontSize: 26,
    textAlign: "center",
    marginBottom: hp('5%'),
    fontWeight: "bold"
  },
  title2: {

    fontSize: 20,
    textAlign: 'center',
    marginBottom: hp('3%')
  },
  title3: {
    color: "white",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: hp('3%')
  },
  footer: {
    flex: 1,
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
    backgroundColor: "#00C1B4",
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    paddingRight: wp('3%'),
    paddingLeft: wp("3%"),
    width: wp('70%'),
    marginTop: hp("2%"),
  
    marginBottom: hp('7%')
  },
  textVital: {
    color: "white",
    position: 'relative',
    bottom: hp('5%'),
    left: wp('25%')
  },
  under: {
    flex: 1,
    maxHeight: hp('10%')
  },
  textinput: {
    width: wp('40%'),
    paddingLeft: 10,
    backgroundColor: "white"

  },
  info: {
    width: wp('60%'),
    marginLeft: wp('15%'),
    marginBottom: hp('2%'),
    flex: 4,
    backgroundColor: "white",
    paddingBottom: 8,
    paddingTop: 8
  }
});

const mapStateToProps = (store) => {
  return {
    user: store.user,
    contact: store.contact,
    second: store.second
  }
}

const mapDispatchToProps = {
  setSecondInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondAdd);