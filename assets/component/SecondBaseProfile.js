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

 class SecondBaseProfile extends Component {
    constructor(props){
        super(props);
       
      }

      componentDidMount(){
        
     
        //console.log(this.props.second.second_users[this.props.second.indexSelected].firstName)
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
                                size="large"
                                source={require("../images/profile.png")}
                            />
                        </View>

                        <View>
                            <Text style={{fontWeight : '500',fontSize : 28}} > {this.props.second.second_users[this.props.second.indexSelected].firstName} </Text>
                        </View>

                        <View>
                            <Text style={{fontWeight : '500',fontSize : 25}} > {this.props.second.second_users[this.props.second.indexSelected].lastName}</Text>
                        </View>

                    </View>

                    <View style={{paddingTop :20, paddingBottom : 20, backgroundColor : "#f4f5f4",marginBottom : 20 }}>
                        <Text style={{fontSize : 16, marginLeft : 20, color : "grey", fontWeight : '500'}}>Renseignements Médicaux</Text>
                    </View>

                    <View>

                        <ListItem
                            onPress={()=>{this.props.navigation.push("SecondInfoPerso")}}
                            hideChevron
                            rightIcon ={<FontAwesomeIcon icon={faChevronRight} />}
                            title ="Informations personnelles"
                            containerStyle={styles.listItemContainer}
                        />

                        <ListItem
                            onPress={()=>{this.props.navigation.push("SecondFicheMedicale")}}
                            hideChevron
                            rightIcon ={<FontAwesomeIcon icon={faChevronRight} />}
                            title ="Fiche santé"
                            containerStyle={styles.listItemContainer}
                        />

                        <ListItem
                            onPress={()=>{this.props.navigation.push("ContactList")}}
                            hideChevron
                            rightIcon ={<FontAwesomeIcon icon={faChevronRight} />}
                            title="Contact"
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
        marginLeft : 20,
        marginRight : 20,
        borderRadius : 5,
        height: 55,
        borderWidth: 0.5,
      
        borderColor: '#ECECEC'
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
      contact: store.contact,
    second: store.second
        
    }
  }
  
  const mapDispatchToProps = {
    deleteContact,
    modifyUserInfo
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondBaseProfile);
  
