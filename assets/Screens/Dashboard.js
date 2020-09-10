import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Dashboard from 'react-native-dashboard';
import Header from "../component/Menu/Header"
import TopMenu from "../component/Menu/TopMenu"
import BottomMenu from "../component/Menu/BottomMenu"
import TabBar from "@mindinventory/react-native-tab-bar-interaction"
import Profile from "../component/Profile"
import {deleteContact, modifyUserInfo,setContactInfo} from '../Action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faNotesMedical, faHandsHelping, faPumpMedical, faDisease, faSearch, faFileArchive, faBell, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { registerForPushNotificationsAsync } from "../services/notifications";
import { _emitEvent } from '../services/socket';



class Menu extends Component {

  constructor(){
    super()
  
  }

  componentDidMount =  async  () =>{
    let user = this.props.user.user != null ? this.props.user.user.idUser : 0;
    
    // await registerForPushNotificationsAsync(user)
  }

  
  render() {
    

    return (
      <View style={{flex : 1}}>
         
<ScrollView style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>

        <View style={{marginTop : hp("2%")}}>

          <Grid>
          <Col >
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("Home")} style={styles.cardContainer}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faSearch } />
              <Text style={styles.cardText}>Rechercher{"  "}</Text>
              <Text style={[styles.cardText, {marginTop: 0}]}>PS{"  "}</Text>
              </TouchableOpacity>
        </Col>
        <Col>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("FileManager")} style={styles.cardContainer}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faFileArchive } />
              <Text style={styles.cardText}>Mes {"  "}</Text>
              <Text style={[styles.cardText, {marginTop: 0}]}>Documents {"  "}</Text>
              </TouchableOpacity>
        </Col>
          </Grid>
          
          <Grid>
          <Col>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChoixAutoDiag")} style={styles.cardContainer}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faStethoscope } />
              <Text style={styles.cardText}> Mon {"  "}</Text>
              <Text style={[styles.cardText, {marginTop: 0}]}>Autodiagnostic {"  "}</Text>
              </TouchableOpacity>
        </Col>
        <Col>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("MapView")} style={[styles.cardContainer]}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faNotesMedical } />
              <Text style={styles.cardText}>Ma {"  "}</Text>
              <Text style={[styles.cardText, {marginTop: 0}]}>pharmacie {"  "}</Text>
              </TouchableOpacity>
        </Col>
       
        </Grid>
        <Grid>
        <Col size={50}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Reminder")}}  style={styles.rappelContainer}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faBell} />
              <Text textBreakStrategy={'simple'} style={styles.cardText}>Mes{"  "} Rappels {"  "}</Text>
              </TouchableOpacity>
        </Col>
        </Grid>
        
        </View>
      
        </ScrollView>

       
        <BottomMenu navigation={this.props.navigation}  />
       
        
      </View>

    )
  }
}

const styles = StyleSheet.create({
  rappelContainer: {
    height : hp("16%"),
    borderRadius : 10,
    paddingLeft : 10,
    paddingRight : 5,
    paddingTop : -100,
    paddingBottom : 20,
    margin: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent : "center",
  },
  cardContainer: {
    height : hp("25%"),
    borderRadius : 10,
    paddingLeft : 10,
    paddingRight : 5,
    paddingTop : -20,
    paddingBottom : 20,
    backgroundColor: "white",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent : "center"
   
  },
  cardText : {
     marginTop : 10,
    // marginLeft : 10,
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize : 20,
    alignSelf : "center",
    textAlign : "center",
    fontWeight : "900"
    
  },
  iconCard : {
    color : "#008AC8",
   alignSelf : "center"
  },
  container: {
    backgroundColor: '#fff',
    // backgroundColor: '#00C1B4'

    flex: 1
  },
  
  footer: {
    height: hp("10%"),

  },
  map: {

    width: wp('100%'),
    height: hp('57%')
  },
  sliderContainer: {
    height: hp("13%"),
    width: wp('100%'),
    backgroundColor: "white",
    alignItems: 'center',
  },
  slider: {
    width: wp('80%'),
    marginTop: hp("1%"),
    color: "#008AC8",

  },
  head_ios: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  head: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    marginLeft: wp("10%"),
    textAlign: 'center',
    height: 50,
    width: wp("90%"),
    paddingLeft: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: hp('2%')
  },
  autoDiv: {
    flex: 1,
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    position: "absolute",
    top: hp('10%'),
    zIndex: 8,
    backgroundColor: '#00C1B4',
    width: wp('84%'),
    maxHeight: hp("40%"),
  },
  auto: {
    flex: 1,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  list: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('1%'),
    zIndex: 10,
    color: "#008AC8"
  },
  listText: {
    color: "white",
    textAlign: "center",
    fontWeight: 'bold'
  },
  location: {
    position: "absolute",
    bottom: hp("30%"),
    right: wp('5%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),

    borderRadius: 12
  },
  broom: {
    position: "absolute",
    bottom: hp("22%"),
    right: wp('5%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),

    borderRadius: 12
  },
  loading_container: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  under: {

    height: hp('10%'),
    width: wp("100%")
    // zIndex: 2
  },
  under_ios: {
    width: wp("100%"),
    height: hp('10%'),
    zIndex: 2
  },
  card: {
    zIndex: 4,
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
  modifyUserInfo,
  setContactInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)
