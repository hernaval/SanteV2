
import React, { version } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from "./Menu/Footer"
import Header from './Menu/Header'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {modifyUserInfo} from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenSquare, faCheck} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


class InputProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isChanging: false,
          text: this.props.info,
          type: this.props.type,
          areas: []
        }
    }

  componentDidMount() {
  }

  getCorrectAddress() {
    if(this.state.text.length > 10) {
      console.log(this.state.text);
      axios.get('https://nominatim.openstreetmap.org/search?q='+this.state.text+'&format=json&addressdetails=1')
        .then((res)=>{
           

            this.setState({areas : res.data}, ()=>{
              console.log('state area', this.state.areas)
            })



        })
    }
    

  }

  change() {
      let changing = !this.state.isChanging;
      this.setState({isChanging: changing, areas: []})
  }

  checkForm() {
   
    if(this.state.type === "zip") {

      if(this.state.text.length !== 5 || isNaN(this.state.text)) {

        this.props.giveError('Vous devez entrer un code postal valide')
        return false;
      }
    }

    if(this.props.type === "phone") {
      if(this.state.text.length < 8  || this.state.text.length > 12 || isNaN(this.state.text)) {

        this.props.giveError('Vous devez entrer un numéro de téléphone valide')
        return false;
      }
    }

    if(this.props.type === "size") {
      if( this.state.text.length !== 3 || isNaN(this.state.text)) {

        this.props.giveError('Vous devez entrer une taille en cm valide')
        return false;
      }
    }

    if(this.props.type === "weight") {
      if( isNaN(this.state.text) || this.state.text.length < 2 || this.state.text.length > 3) {
        this.props.giveError('Vous devez entrer un poid en kg valide')
        return false;
      }
    }
    if(this.props.type === "secu") {
      if( isNaN(this.state.text) || this.state.text.length !== 15 ) {
        this.props.giveError('Vous devez entrer un numéro de sécurité socaiale à 15 chiffres')
        return false;
      }
    }


    return true;
    
  }



  onClickModifyUser(type, info){
    

    let check = this.checkForm();
    if(check === false) {
      this.change();
      return;
    } else {
      this.props.giveError(null)
    }

    let userModified = {
      firstName: this.props.user.user.data.user[0].firstName,
      lastName: this.props.user.user.data.user[0].lastName,
      phone: this.props.user.user.data.user[0].phone,
      address: this.props.user.user.data.user[0].address,
      zip: this.props.user.user.data.user[0].zip,
      city: this.props.user.user.data.user[0].city,
      blood: this.props.user.user.data.user[0].blood,
      size: this.props.user.user.data.user[0].size,
      weight: this.props.user.user.data.user[0].weight,
      donate: this.props.user.user.data.user[0].donate,
      secu: this.props.user.user.data.user[0].secu,
      user_id: this.props.user.user.data.user[0].id
    }

    userModified[type] = info;
  
    this.props.modifyUserInfo(userModified);
    this.change();

  }

  onClickModifyUserAddress(address, zip, city){
 

    let check = this.checkForm();
    if(check === false) {
      this.change();
      return;
    } else {
      this.props.giveError(null)
    }

    let userModified = {
      firstName: this.props.user.user.data.user[0].firstName,
      lastName: this.props.user.user.data.user[0].lastName,
      phone: this.props.user.user.data.user[0].phone,
      address: this.props.user.user.data.user[0].address,
      zip: this.props.user.user.data.user[0].zip,
      city: this.props.user.user.data.user[0].city,
      blood: this.props.user.user.data.user[0].blood,
      size: this.props.user.user.data.user[0].size,
      weight: this.props.user.user.data.user[0].weight,
      donate: this.props.user.user.data.user[0].donate,
      secu: this.props.user.user.data.user[0].secu,
      user_id: this.props.user.user.data.user[0].id
    }

    userModified.address = address;
    userModified.zip = zip;
    userModified.city = city;
  
    this.props.modifyUserInfo(userModified);
    this.change();
  }

  
  render(){
    return (
        <View style={this.props.type !== "address" ? styles.inputConatainer : styles.inputConatainerAddress} >
            <View style={{flexDirection: 'row',}}>
              <View style={styles.info}>
                  {this.state.isChanging === false && <Text style={styles.txt}>{this.props.typeName} : {this.props.info}</Text>}
                  {this.state.isChanging &&  <TextInput
                      placeholder={this.props.typeName}
                      style={styles.textinput}
                      onChangeText={(text) => {this.setState({text: text}, ()=>{
                        this.getCorrectAddress();
                      })}}
                      value={this.state.text}
                  />}
              </View>
              <View style={styles.button}>
                {this.state.isChanging === false && this.props.type !== "zip" && this.props.type !== "city" && <TouchableOpacity
                    style={styles.buttonPen}
                    onPress={(e)=>{this.change()}}
                  >
                    <Image
                        style={{width: 40, height: 40}}
                        source={require('../images/Edit-icon.png')}
                    /> 
                  </TouchableOpacity>}
                  {this.state.isChanging === true && this.props.type !== "address" && <TouchableOpacity
                    style={styles.buttonPen}
                    onPress={(e)=>{
                      
                      this.onClickModifyUser(this.props.type, this.state.text);
                    }}
                  >
                    <FontAwesomeIcon color="white" size={24} icon={faCheck}/>
                  </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.addressContainer}>
             { this.state.text !== "" && this.props.type === "address" && this.state.areas.length !== 0 && 
                <ScrollView style={styles.address}>
                {this.state.areas.map((area, index)=>{
                    let address;
                    if(area.address.house_number) {
                      address = area.address.house_number+' '+area.address.road;
                    } else {
                      address = area.address.road;
                    }
                   
                    let city = area.address.city || area.address.village;
                    let zip = area.address.postcode;
                    return (<TouchableOpacity
                        key={index}
                        style={styles.choiceItem}
                        onPress={(e)=>{
                          
                          this.onClickModifyUserAddress(address, zip, city);
                           
                        }}
                    >
                        <Text style={styles.addressText}>{address} {zip} {city}</Text>
                    </TouchableOpacity>)
                    })}
                    <TouchableOpacity
                    
                        style={styles.choiceItem}
                        onPress={()=>{
                          this.setState({areas: []})
                        }}
                    >
                        <Text style={styles.addressText}>Aucune....</Text>
                    </TouchableOpacity>
                  </ScrollView>}
              </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    inputConatainer: {
        paddingTop: hp('2%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        textAlign: 'center',
        
        alignItems: 'center',
        zIndex: 20,
        
    },
    inputConatainerAddress: {
      paddingTop: hp('2%'),
      paddingBottom: hp('1%'),
      paddingLeft: wp('10%'),
      paddingRight: wp('10%'),
      textAlign: 'center',
      
      alignItems: 'center',
      zIndex: 40,
     
  },
    info: {
        flex: 4,
        backgroundColor: "white",
        paddingBottom: 8,
        paddingTop: 8
    },
    button: {
        flex: 1,
        
    },
    buttonPen: {
      marginTop: hp("0%"), 
      width: wp("11%"),
      height: wp("11%"),
      backgroundColor: '#00C1B4',
     marginLeft: wp('2%'),
     alignItems: "center",
     justifyContent: "center"
    }, 
    textinput: {
        width: wp('40%'),
        paddingLeft: 10
        // paddingTop: hp('1%'),
        // paddingBottom: hp('1%')
        
    },
    txt: {
      paddingTop: hp('0.5%'),
      paddingBottom: hp('0.5%'),
      paddingLeft: 10
    },
    addressContainer: {
      position: 'relative',
      left: wp('-7%'),
      top: hp('1%')
      
    },
    address: {
      backgroundColor: "white",
      width: wp('56%'),
      maxHeight: hp('25%'),
      zIndex:45,
      borderColor: "#008AC8",
      borderWidth: 3
    },
    addressText: {
      zIndex: 47
    },
    choiceItem: {
      alignItems: "center",
      justifyContent: 'center',
      paddingBottom: hp("2%"),
      paddingTop: hp("2%"),
      zIndex: 54,
      borderBottomColor: "#008AC8",
      borderBottomWidth: 1,

      
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  modifyUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(InputProfil);
