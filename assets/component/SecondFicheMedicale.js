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
import { Avatar, ListItem } from 'react-native-elements'
import {deleteContact, modifyUserInfo} from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
            console.log('la reponse', res);
    
            let address = res.data[0].address.house_number+' '+res.data[0].address.road;
            let city = res.data[0].address.city || res.data[0].address.village;
            let zip = res.data[0].address.postcode;
    
            console.log('address', address);
            console.log('city', city);
            console.log('zip', zip);
    
        })
    
       
      }
      openSelectedProfil(profil) {
        let isOpen = !this.state[profil];
        let isScrolling= !this.state.isScrolling
        this.setState({[profil]: isOpen, isScrolling: isScrolling})
      }
    
      goToContactList = ()=> {
        console.log(this.props.navigation);
        this.props.navigation.push("ContactList")
      }
    
      goToCam = ()=> {
        console.log(this.props.navigation);
        this.props.navigation.push("Cam")
      }
    
      goToContact = ()=> {
        console.log(this.props.navigation);
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
        console.log('test',this.props.contact.contact)
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
        console.log(this.props.navigation);
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
        console.log('usermodefied', userModified);
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

              <ScrollView style={[styles.scroll,{marginTop : 10}]} >
                    <View style={styles.userRow}>
                        
                        <View style={styles.userImage}>
                            <Avatar rounded
                                onPress={()=>{this.props.navigation.navigate("Profile")}}
                                size="large"
                                source={require("../images/profile.png")}
                            />
                        </View>

                        

                    </View>

                   
                    <View>

                    <ListItem
                            hideChevron
                            title="Groupe sanguin"
                            titleStyle={{fontWeight : "bold"}}
                           rightTitle ={this.props.second.second_users[this.props.second.indexSelected].blood}
                            containerStyle={styles.listItemContainer}
                        />
                        <ListItem
                            hideChevron
                            title="Taille"
                            titleStyle={{fontWeight : "bold"}}
                            rightTitle ={this.props.second.second_users[this.props.second.indexSelected].size}
                            containerStyle={styles.listItemContainer}
                        />
                        <ListItem
                            hideChevron
                            
                            title="Poids"
                            titleStyle={{fontWeight : "bold"}}
                            rightTitle ={this.props.second.second_users[this.props.second.indexSelected].weight}
                            containerStyle={styles.listItemContainer}
                        />
                        <ListItem
                            hideChevron
                            title="Donateur d'organe"
                            titleStyle={{fontWeight : "bold"}}
                            rightTitle ={this.props.second.second_users[this.props.second.indexSelected].donate}
                            containerStyle={styles.listItemContainer}
                        />
                        <ListItem
                            hideChevron
                            title="Numéro de securité sociale"
                            titleStyle={{fontWeight : "bold"}}
                            rigthTitle ={this.props.second.second_users[this.props.second.indexSelected].secu}
                            containerStyle={styles.listItemContainer}
                        />

                    </View>

              </ScrollView>
            
            </View>
          );
    }
}
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
        borderTopRightRadius : 20,
        borderTopLeftRadius : 20
      },
      userRow: {
        alignItems: 'center',
        justifyContent  :"center",
        flexDirection: 'column',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
      },
      userImage: {
        marginRight: 12,
      },
      listItemContainer: {
       
        borderRadius : 5,
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
      },

      //-----------------//
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
    rigthTitle1: {
      color: 'white',
      fontSize: 36,
      marginBottom: hp('2%'),
      fontWeight: "bold"
  },
    rigthTitle2: {
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
      contact: store.contact,
    second: store.second

    }
  }
  
  const mapDispatchToProps = {
    deleteContact,
    modifyUserInfo
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
  
