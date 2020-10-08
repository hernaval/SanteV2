import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputSecondProfil from '../../component/InputSecondProfil';
import {setSecondInfo} from '../../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faToilet} from '@fortawesome/free-solid-svg-icons'
import TopMenu from "../../component/Menu/TopMenu"
import axios from 'axios';
import Bdd from '../../API/Bdd'

class OtherProfile extends React.Component {

  constructor(props){
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
      this.secu = ""

      this.state = {
        errFirstName: null,
        errLastName: null,
        errZip: null,
        errVille: null,
        errAddress: null
      }
  }

  componentDidMount() {

  }

  goToMappig = ()=> {
    this.props.navigation.navigate("Switch")
  }


  goToContact = ()=> {
   
    this.props.navigation.push("Contact")
  }

//   createInput(type, typeName) {
//     console.log('dans create input', this.props.user)
//     if(this.props.second.second_users === null) {
//         console.log('test null',this.props.user)
//         return <Text>Pas de user</Text>
//     } else {
//         console.log('test pas null',this.props.second.second_users[this.props.second.indexSelected][type])
//         return <InputSecondProfil info={this.props.second.second_users[this.props.second.indexSelected][type]} type={type} typeName={typeName}/>
//     }
//   }

  saveSecondProfil(){
      
    let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        zip: this.zip,
        city: this.city,
        phone: this.phone,
        blood: this.blood,
        size: this.size,
        weight: this.weight,
        donate: this.donate,
        secu: this.secu,
        user_id: this.props.user.user.data.user[0].id
    }

    let errorCount = this.validateData(data)
    if (errorCount > 0) {
      return false;
    }

   
    axios.post(Bdd.api_url+'/api/second_user/add', data)
            .then((response)=>{
               
                if(response.data.status === 200){
                    
                    AsyncStorage.getItem('bosToken')
                            .then((token)=>{
                                let user_id = this.props.user.user.data.user[0].id
                                this.props.setSecondInfo(token, user_id)
                                this.goToMappig();
                            })

                    
                }
                
            })
  }

  validateData(data) {
    let count = 0
    var alphaPattern = /^([a-zA-Z0-9 _-]+)$/

    this.setState({errFirstName: null}, {errLastName: null}, {errVille: null}, 
      {errAddress: null}, {errZip: null}, {errPhone: null})

    if (data.firstName == "") {
      count++
      this.setState({ errFirstName: "Prénom obligatoire" })
    } else if (alplaPattern.test(data.firstName) === false) {
      count++
      this.setState({ errFirstName: "caractères alphanumerique" })
    }

    if (data.lastName == "") {
      count++
      this.setState({ errLastName: "Nom obligatoire" })
    } else if (alphaPattern.test(data.lastName) === false) {
      count++
      this.setState({ errLastName: "caractères alphanumerique" })
    }

    if (data.city == "") {
      count++
      this.setState({ errVille: "Ville obligatoire" })
    } else if (alphaPattern.test(data.lastName) === false) {
      count++
      this.setState({ errVille: "caractères alphanumerique" })
    }

    if (data.address == "") {
      count++
      this.setState({ errAddress: "Adresse obligatoire" })
    } else if (alphaPattern.test(data.address) === false) {
      count++
      this.setState({ errAddress: "caractères alphanumerique" })
    }

    if (data.zip == "") {
      count++
      this.setState({ errZip: "Code postal obligatoire" })
    } else if (alphaPattern.test(data.address) === false) {
      count++
      this.setState({ errZip: "caractères alphanumerique" })
    }

    return count;
  }




  render(){
    return (
      <ScrollView style={styles.container}>
         <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>
        <View style={styles.main}>
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%')}}
              source={require('../../images/profile.png')}
            />
          
            <ScrollView style={styles.scrollview}>
             
              <View style={styles.info}>
                <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => {
                            //this.setState({text: text})
                            this.firstName = text;
                        }}
                        // value={this.state.text}
                        placeholder="Prénom"
                    />
                    <Text style={styles.invalid}>{this.state.errFirstName}</Text>
              </View>
              <View style={styles.info}>
                <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => {
                            //this.setState({text: text})
                            this.lastName = text;
                        }}
                        // value={this.state.text}
                        placeholder="Nom"
                    />
                    <Text style={styles.invalid}>{this.state.errLastName}</Text>
              </View>
              <View style={styles.info}>
                <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => {
                            //this.setState({text: text})
                            this.address = text;
                        }}
                        // value={this.state.text}
                        placeholder="Adresse"
                    />
                    <Text style={styles.invalid}>{this.state.errAddress}</Text>
              </View>
              <View style={styles.info}>
                <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => {
                            //this.setState({text: text})
                            this.zip = text;
                        }}
                        // value={this.state.text}
                        placeholder="Code postal"
                    />
                    <Text style={styles.invalid}>{this.state.errZip}</Text>
              </View>
              <View style={styles.info}>
                <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => {
                            //this.setState({text: text})
                            this.city = text;
                        }}
                        // value={this.state.text}
                        placeholder="Ville"
                    />
                    <Text style={styles.invalid}>{this.state.errVille}</Text>
              </View>
              
              
            
              <TouchableOpacity
                onPress={(e)=>{  this.saveSecondProfil() }}
                style={styles.deco}
              >
                <Text style={styles.textItem}>Créer le compte</Text>
              </TouchableOpacity>
              
            </ScrollView>
        </View>
        

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C1B4',

    
  },
  main: {
    flex: 9,
    alignItems: 'center',
    width: wp('90%'),
    paddingTop: hp('5%'),
    marginLeft: wp('5%')
  },
  scrollview: {
    width: wp('90%'),
    textAlign: 'center',
   
  },
  title1: {
    color: 'white',
    fontSize: 26,
    textAlign:"center",
    marginBottom: hp('5%'),
    fontWeight: "bold"
},
  title2: {
    color: "white",
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
    marginLeft: wp('10%'),
    marginBottom: hp('7%')
  },
  textVital: {
    color: "white",
    position: 'relative',
    bottom: hp('5%'),
    left: wp('25%')
  },
  under: {
    flex:1,
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
   },
   invalid : {
    color: '#eb002a',
    textAlign: 'center'
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


export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
