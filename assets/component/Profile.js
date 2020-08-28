import React,{Component} from 'react'
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableOpacity, Image, CheckBox } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Footer from "./Menu/Footer"
import Header from './Menu/Header'
import InputProfil from './InputProfil';

import {deleteContact, modifyUserInfo} from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { size, weight } from '../Helpers/profileConst';

 class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
          samaritain: false,
          error: null,
          isScrolling: true,
          isSelectedProfile: false,
          isSelectedProfileSize: false,
          isSelectedProfileWeight: false,
        }
      }

      getCorrectAddress() {
        axios.get('https://nominatim.openstreetmap.org/search?q=444 chemin des barillons 84810 &format=json&addressdetails=1')
        .then((res)=>{
          
    
            let address = res.data[0].address.house_number+' '+res.data[0].address.road;
            let city = res.data[0].address.city || res.data[0].address.village;
            let zip = res.data[0].address.postcode;
    
          
    
        })
    
       
      }
      openSelectedProfil(profil) {
        let isOpen = !this.state[profil];
        let isScrolling= !this.state.isScrolling
        this.setState({[profil]: isOpen, isScrolling: isScrolling})
      }
    
      goToContactList = ()=> {
       
        this.props.navigation.push("ContactList")
      }
    
      goToCam = ()=> {
        
        this.props.navigation.push("Cam")
      }
    
      goToContact = ()=> {
      
        this.props.navigation.push("Contact")
      }
    
      giveError = (msg)=>{
        console.log(msg);
        this.setState({error: msg}, ()=>{ console.log('state modifié error', this.state) });
      }
    
      createInput(type, typeName) {
        //console.log('dans create input', this.props.user)
        if(this.props.user.user === null || this.props.user.user.data.user.length === 0) {
           // console.log('test null',this.props.user)
            return <Text>Pas de user</Text>
        } else {
         //   console.log('type', type);
         //   console.log('test pas null',this.props.user.user.data.user[0][type])
            return <InputProfil info={this.props.user.user.data.user[0][type]} type={type} typeName={typeName} giveError={this.giveError} style={{zIndex: 0}}/>
        }
      }

      createContacts() {
    
          if(this.props.contact.contact === null) {
            console.log('test null',this.props.user)
            return <Text>Pas de contact</Text>
          } else {
            return this.props.contact.contact.data.contacts.map((contact)=>{
              return (
                <View key={contact.id} style={styles.contactItem}>
                  <Text style={styles.textItem}>{contact.firstName} {contact.lastName}</Text>
                  {contact.validate === "no" && <Text style={styles.textItem}>Non Validé</Text>}
                  {contact.validate === "yes" && <Text style={styles.textItem}>Validé</Text>}
                  
                  <TouchableOpacity
                    onPress={(e)=>{this.onClickDeleteContact(contact.id)}}
                    style={styles.buttonDelete}
                  >
                    <Text style={styles.textItem}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
      }
    
      goToLogout = ()=> {
      
        this.props.navigation.push("Logout")
      }
    
      onClickDeleteContact(id) {
        let contact = {
          id: id,
          user_id: this.props.user.user.data.user[0].id
        }
        this.props.deleteContact(contact)
      }
    
      onPressSamaritain = async () => {
        if(this.state.samaritain === false) {
            const { status } = await Location.requestPermissionsAsync();
            if (status === 'granted') {
              await Location.stopLocationUpdatesAsync('geoloc_bakground');
    
            }
        }
        
      };
    
      onClickModifyUser(type, msg){
        console.log('modif user profil');
    
    
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
    
        userModified[type] = msg;
    
        this.props.modifyUserInfo(userModified);
        let isScrolling= !this.state.isScrolling;
        this.setState({isScrolling: true});
      }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.under}>
                <Header navigation={this.props.navigation}/>
              </View>
              <View style={styles.main}>
                  <Image
                    style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%')}}
                    source={require('../images/profile.png')}
                  />
                  <Text style={styles.title1}>PROFIL</Text>
                  {this.state.error !== null && <Text style={{color: 'red', textAlign: 'center'}}>{this.state.error}</Text>}
      
                  <ScrollView 
                    style={styles.scrollview}
                    scrollEnabled={this.state.isScrolling}
                  >
                    <Text style={styles.title2}>Informations personnelles</Text>
                    {this.createInput('firstName', 'Prénom')}
                    {this.createInput('lastName', 'Nom')}
                    {this.createInput('address', 'Adresse')}
                    {this.createInput('zip', 'Code postal')}
                    {this.createInput('city', 'Ville')}
                    {this.createInput('phone', 'Téléphone')}
                    <Text style={styles.title2}>Fiche santé</Text>
                    {this.createInput('blood', 'Groupe Sanguin')}
                    <TouchableOpacity 
                        style={{backgroundColor: "white", width: wp('56%'), marginLeft: wp("10%"), marginTop: wp('2%'), alignItems: "center", paddingTop: hp("1%"), paddingBottom: hp("1%"), flexDirection: "row"}}
                        onPress={()=>{
                            this.openSelectedProfil("isSelectedProfileSize");
                       }}
                    >
                    <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Taille (cm) : {this.props.user.user.data.user[0].size !== null ? this.props.user.user.data.user[0].size : "Non connue"}</Text>
                        <FontAwesomeIcon 
                            icon={faCaretDown} 
                                      color="#008AC8" 
                                      size={24} 
                                      style={{}}
                                      
                                  />
                      </TouchableOpacity>
                              { this.state.isSelectedProfileSize && <ScrollView style={styles.choiceSize}>
                                 {size.map((s, index)=>{
                                   return (
                                      <TouchableOpacity  
                                          key={index}        
                                          style={styles.choiceItem}
                                          onPress={()=>{
                                            this.onClickModifyUser("size",s);   
                                            this.setState({isSelectedProfileSize: false})         
                                          }}
                                      >
                                        <Text>{s}</Text>
                                      </TouchableOpacity>
                                   );
                            
                                 })}
                                 
                                 
              
                              </ScrollView>}
            
                    <TouchableOpacity 
                        style={{backgroundColor: "white", width: wp('56%'), marginLeft: wp("10%"), marginTop: wp('2%'), alignItems: "center", paddingTop: hp("1%"), paddingBottom: hp("1%"), flexDirection: "row"}}
                        onPress={()=>{
                            this.openSelectedProfil("isSelectedProfileWeight");
                       }}
                    >
                    <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Poids (kg) : {this.props.user.user.data.user[0].weight !== null ? this.props.user.user.data.user[0].weight : "Non connue"}</Text>
                        <FontAwesomeIcon 
                            icon={faCaretDown} 
                                      color="#008AC8" 
                                      size={24} 
                                      style={{}}
                                      
                                  />
                      </TouchableOpacity>
                              { this.state.isSelectedProfileWeight && <ScrollView style={styles.choiceWeight}>
                                 {weight.map((w, index)=>{
                                   return (
                                      <TouchableOpacity  
                                          key={index}        
                                          style={styles.choiceItem}
                                          onPress={()=>{
                                            this.onClickModifyUser("weight",w);   
                                            this.setState({isSelectedProfileWeight: false})         
                                          }}
                                      >
                                        <Text>{w}</Text>
                                      </TouchableOpacity>
                                   );
                            
                                 })}
                                 
                                 
              
                              </ScrollView>}
                    <TouchableOpacity 
                        style={{backgroundColor: "white", width: wp('56%'), marginLeft: wp("10%"), marginTop: wp('2%'), alignItems: "center", paddingTop: hp("1%"), paddingBottom: hp("1%"), flexDirection: "row"}}
                        onPress={()=>{
                            this.openSelectedProfil("isSelectedProfile")
                       }}
                    >
                    <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Donneur d'organe : {this.props.user.user.data.user[0].donate === "yes" ? "Oui" : "Non"}</Text>
                        <FontAwesomeIcon 
                            icon={faCaretDown} 
                                      color="#008AC8" 
                                      size={24} 
                                      style={{}}
                                      
                                  />
                      </TouchableOpacity>
                              { this.state.isSelectedProfile && <View style={styles.choice}>
                                 <TouchableOpacity
                                                  
                                    style={styles.choiceItem}
                                    onPress={()=>{
                                      this.onClickModifyUser("donate","yes");   
                                      this.setState({isSelectedProfile: false})         
                                    }}
                                >
                                  <Text>Oui</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                                  
                                    style={styles.choiceItem}
                                    onPress={()=>{
                                      this.onClickModifyUser("donate", "no");
                                      this.setState({isSelectedProfile: false})            
                                    }}
                                >
                                  <Text>Non</Text>
                                </TouchableOpacity>
                              </View>}
                    {this.createInput('secu', "numéro de sécurité sociale")}
                    <Image
                            source={require('../images/vitalePX.png')}
                            style={{height: hp('20%'), width: wp('70%'), marginLeft: wp('10%')}}
                    />
                    {this.props.user.user.data.user !== null && <Text style={styles.textVital}>{this.props.user.user.data.user[0].secu}</Text>}
                    {/* <Text style={styles.title2}>Contact d'urgence</Text> */}
                    {/* <View style={{flexDirection: 'row', alignItems: "center",}}>
                              <CheckBox
                                  onChange={(e)=>{this.setState({samaritain: !this.state.samaritain})}}
                                  value={this.state.samaritain}
                              
                              /><Text style={{color:'white'}}>Voulez vous faire partie du réseau "Bon samaritain"</Text>
                    </View> */}
                    <View>
                      {/*this.createContacts()*/}
                    </View>
                    <TouchableOpacity
                      onPress={(e)=>{this.goToContact()}}
                      style={styles.addContact}
                    >
                      <Text style={styles.textItem}>Ajouter contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={(e)=>{this.goToContactList()}}
                      style={styles.deco}
                    >
                      <Text style={styles.textItem}>Voir les contacts</Text>
                    </TouchableOpacity>
                    
                    <Image
                      style={{ width: wp('10%'), height: wp('10%'), position: "relative", bottom: hp('23%'), left: wp('75%')}}
                      source={require('../images/icon_urf_bleu.png')}
                    />
                    <Footer style={styles.footer} navigation={this.props.navigation}/>
                  </ScrollView>
              </View>
              
            </View>
          );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00C1B4',
      zIndex: 40,
      justifyContent: 'center'
    },
    main: {
      flex: 9,
      marginLeft: wp('5%'),
      alignItems: 'center',
      width: wp('90%'),
      paddingTop: hp('1%')
    },
    scrollview: {
      width: wp('90%'),
      textAlign: 'center',
      position: 'relative',
      zIndex: 41
    },
    title1: {
      color: 'white',
      fontSize: 36,
      marginBottom: hp('2%'),
      fontWeight: "bold"
  },
    title2: {
      color: "white",
      fontSize: 20,
      textAlign: 'center',
      marginBottom: hp('3%'),
      marginTop: hp('3%')
  
    },
    footer: {
      height: hp('10%')
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
      left: wp('27%')
    },
    under: {
      height: hp('10%'),
      zIndex: 99
    },
    choice: {
      backgroundColor: "white",
      width: wp('56%'),
      position: "absolute",
      top: hp('91%'),
      left: wp("10%"),
      zIndex:34,
      borderColor: "#00C1B4",
      borderWidth: 1
  },
  choiceItem: {
      alignItems: "center",
      justifyContent: 'center',
      paddingBottom: hp("2%"),
      paddingTop: hp("2%"),
      
  },
  choiceSize: {
    backgroundColor: "white",
    width: wp('56%'),
    height: hp('25%'),
    position: "absolute",
    top: hp('80%'),
    left: wp("10%"),
    zIndex:44,
    borderColor: "#00C1B4",
    borderWidth: 1
  },
  choiceWeight: {
    backgroundColor: "white",
    width: wp('56%'),
    height: hp('25%'),
    position: "absolute",
    top: hp('85%'),
    left: wp("10%"),
    zIndex:44,
    borderColor: "#00C1B4",
      borderWidth: 1
  },
  });

  const mapStateToProps = (store) => {
    return {
      user: store.user,
      contact: store.contact
    }
  }
  
  const mapDispatchToProps = {
    deleteContact,
    modifyUserInfo
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
  
