import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from "./Menu/Footer";
import InputSecondProfil from './InputSecondProfil';
import {deleteContact, setSecondInfo, setIndexSelected, modifyUserInfo} from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faToilet, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import Header from './Menu/Header'
import axios from 'axios';
import Bdd from '../API/Bdd'
import { size, weight } from '../Helpers/profileConst';


class SecondProfil extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        isScrolling: true,
        isSelectedProfile: false,
        isSelectedProfileSize: false,
        isSelectedProfileWeight: false
      }
  }

  componentDidMount() {

  }

  goToMapping = ()=> {
    this.props.navigation.navigate("Mapping")
  }


  createInput(type, typeName) {
   
    if(this.props.second.second_users === null) {
        console.log('test null',this.props.user)
        return <Text>Pas de user</Text>
    } else {
      
        return <InputSecondProfil info={this.props.second.second_users[this.props.second.indexSelected][type]} type={type} typeName={typeName}/>
    }
  }

  deleteProfil() {
    let data = {
      id: this.props.second.second_users[this.props.second.indexSelected].id
    }
    console.log(data);
    Alert.alert(
      'Suppression contact',
      'Attention êtes-vous sûr de supprimer ce contact ? toutes les données seront perdues',
      [
       // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK je suipprime', onPress: () => {
            console.log('OK Pressed')
            axios.post(Bdd.api_url+'/api/second_user/delete', data)
              .then((res)=>{
            
                if(res.data.status === 200) {
                  AsyncStorage.getItem('bosToken')
                            .then((token)=>{
                                let user_id = this.props.user.user.data.user[0].id
                                this.props.setIndexSelected(0);
                                this.props.setSecondInfo(token, user_id);
                                this.goToMapping();
                            })
                }
              })
          }   
        },
      ],
      { cancelable: false }
    )
  }

  openSelectedProfil(profil) {
    let isOpen = !this.state[profil];
    let isScrolling= !this.state.isScrolling
    this.setState({[profil]: isOpen, isScrolling: isScrolling})
  }

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
     AsyncStorage.getItem('bosToken')
        .then((token)=>{
            let user_id = this.props.user.user.data.user[0].id
            this.props.setSecondInfo(token, user_id);
        })
    let isScrolling= !this.state.isScrolling;
    this.setState({isScrolling: true});
  }

    onClickModifySecondUser(type, msg){
        console.log('modif user')

        let userModified = {
            firstName: this.props.second.second_users[this.props.second.indexSelected].firstName,
            lastName: this.props.second.second_users[this.props.second.indexSelected].lastName,
            phone: this.props.second.second_users[this.props.second.indexSelected].phone,
            address: this.props.second.second_users[this.props.second.indexSelected].address,
            zip: this.props.second.second_users[this.props.second.indexSelected].zip,
            city: this.props.second.second_users[this.props.second.indexSelected].city,
            blood: this.props.second.second_users[this.props.second.indexSelected].blood,
            size: this.props.second.second_users[this.props.second.indexSelected].size,
            weight: this.props.second.second_users[this.props.second.indexSelected].weight,
            donate: this.props.second.second_users[this.props.second.indexSelected].donate,
            secu: this.props.second.second_users[this.props.second.indexSelected].secu,
            id: this.props.second.second_users[this.props.second.indexSelected].id
        }

        userModified[type] = msg;
   

        axios.post(Bdd.api_url+'/api/second_user/update', userModified)
                .then((response)=>{
                  
                    if(response.data.status === 200){

                        AsyncStorage.getItem('bosToken')
                            .then((token)=>{
                                let user_id = this.props.user.user.data.user[0].id
                                this.props.setSecondInfo(token, user_id)
                            })
                        


                    }
                })

           this.setState({isScrolling: true});
    }




  goToLogout = ()=> {
  
    this.props.navigation.navigate("Logout")
  }

  onClickDeleteContact(id) {
    let contact = {
      id: id,
      user_id: this.props.user.user.data.user[0].id
    }
    this.props.deleteContact(contact)
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.under}>
          <Header navigation={this.props.navigation} />
        </View>
        <View style={styles.main}>
            <Image
              style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%')}}
              source={require('../images/profile.png')}
            />
            <Text style={styles.title1}>PROFIL</Text>
            
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
              <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Taille (cm) : {this.props.second.second_users[this.props.second.indexSelected].size !== null ? this.props.second.second_users[this.props.second.indexSelected].size : "Non connue"}</Text>
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
                                      if(this.props.second.indexSelected === 0) {
                                        this.onClickModifyUser("size",s);   
                                      } else {
                                        this.onClickModifySecondUser("size",s);
                                      }
                                      
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
              <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Poids (kg) : {this.props.second.second_users[this.props.second.indexSelected].weight !== null ? this.props.second.second_users[this.props.second.indexSelected].weight : "Non connue"}</Text>
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
                                      if(this.props.second.indexSelected === 0) {
                                        this.onClickModifyUser("weight",w); 
                                      } else {
                                        this.onClickModifySecondUser("weight",w); 
                                      } 
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
              <Text style={{color: "black",marginLeft: wp("5%"), width: wp("40%")}}>Donneur d'organe : {this.props.second.second_users[this.props.second.indexSelected].donate === "yes" ? "Oui" : "Non"}</Text>
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
                                if(this.props.second.indexSelected === 0) {
                                  this.onClickModifyUser("donate","yes"); 
                                } else {
                                  this.onClickModifySecondUser("donate","yes"); 
                                }
                                this.setState({isSelectedProfile: false})         
                              }}
                          >
                            <Text>Oui</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                                            
                              style={styles.choiceItem}
                              onPress={()=>{
                                if(this.props.second.indexSelected === 0) {
                                  this.onClickModifyUser("donate","no"); 
                                } else {
                                  this.onClickModifySecondUser("donate","no"); 
                                }
                                this.setState({isSelectedProfile: false})            
                              }}
                          >
                            <Text>Non</Text>
                          </TouchableOpacity>
                        </View>}
              {this.createInput('secu', "numéro de sécurité social")}
              <Image
                      source={require('../images/vitalePX.png')}
                      style={{height: hp('20%'), width: wp('70%'), marginLeft: wp('10%')}}
              />
              {this.props.user.user.data.user !== null && <Text style={styles.textVital}>{this.props.user.user.data.user[0].secu}</Text>}
              {/* <Text style={styles.title2}>Contact d'urgence</Text> */}
              
              <View>
                {/*this.createContacts()*/}
              </View>
             
              <TouchableOpacity
                onPress={(e)=>{this.deleteProfil()}}
                style={styles.deco}
              >
                <Text style={styles.textItem}>Supprimer Profil</Text>
              </TouchableOpacity>
              
            
            </ScrollView>
        </View>
        <Footer style={styles.footer} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C1B4',
    justifyContent: 'center'
  },
  main: {
    flex: 9,
    marginLeft: wp('5%'),
    alignItems: 'center',
    width: wp('90%'),
    paddingTop: hp('5%')
  },
  scrollview: {
    width: wp('90%'),
    textAlign: 'center'
  },
  title1: {
    color: 'white',
    fontSize: 36,
    marginBottom: hp('5%'),
    fontWeight: "bold"
},
  title2: {
    color: "white",
    fontSize: 20,
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
    left: wp('27%')
  },
  under: {
    zIndex: 99,
    maxHeight: hp('10%'),

  },
  choice: {
    backgroundColor: "white",
    width: wp('56%'),
    position: "absolute",
    top: hp('85%'),
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
    top: hp('75%'),
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
    top: hp('80%'),
    left: wp("10%"),
    zIndex:44,
    borderColor: "#00C1B4",
    borderWidth: 1
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
  deleteContact,
  setSecondInfo,
  setIndexSelected,
  modifyUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(SecondProfil);
