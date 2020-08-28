import React, { Component } from 'react'
import { Card, Icon, Input } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo } from '../../Action';
import { Avatar } from 'react-native-elements';
import TopMenu from "../../component/Menu/TopMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Contact from '../../component/Contact'

const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class ContactDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
     
        me : {}

    }
    
  }

  componentDidMount() {
    let allContacts = this.props.contact.contact.data.contacts
    let id = this.props.navigation.state.params.contactId
    let contactSelected = allContacts.filter(el => el.id === id)
    
    this.setState({me : contactSelected[0]})
  }

  
   call(){
    let url;
    if (Platform.OS === 'ios') {
        url = 'tel://' + this.state.me.phone
    }
    else if (Platform.OS === 'android') {
        url = 'tel:' + this.state.me.phone

    }

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url)
                    .catch(() => null);
            }
        });

   }


  renderHeader = () => {
    console.log("this.state.photoUri")
    console.log(this.state.photoUri)
    return (
      <View style={styles.headerContainer}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>

        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri:  DEFAUTL_USER  }}
        >
          <View style={styles.headerColumn}>

            <Image
              style={styles.userImage}
              source={{ uri: DEFAUTL_USER  }}
            />
            <Text style={styles.userNameText}>{this.state.me.firstName} {this.state.me.lastName} </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'share', type: 'font-awesome' }} />
                </TouchableOpacity>
               
              </View>
              <View style={styles.actionBtn}>
              <TouchableOpacity onPress={() =>this.call()}>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'phone', type: 'font-awesome' }} />
                </TouchableOpacity>
             
              </View>
              
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

 

  

 
  render() {
    console.log("render")
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {this.state.isLoading && <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>}

          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>



          <View style={styles.infoContainer}>


            <View>
              <Text style={styles.labelText}>Prénom</Text>
              
            <Text style={styles.labelValue}>{this.state.me.firstName}</Text>
          
            </View>
            <View>
              <Text style={styles.labelText}>Nom</Text>
             
                <Text style={styles.labelValue}>{this.state.me.lastName}</Text>
              
            </View>




            <View>
              <Text style={styles.labelText}>Email</Text>
              
            
                <Text style={styles.labelValue}>{this.state.me.email}</Text>
              
            </View>
            
            



            <View>
              <Text style={styles.labelText}>Téléphone</Text>
             
                <Text style={styles.labelValue}>{this.state.me.phone}</Text>
              
            </View>

          </View>



        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  infoContainer: {
    padding: 20
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 16
  },
  labelValue: {
    color: "gray"
  },
  actionBtn: {
    position: "relative",
    top: -10,
    zIndex: 99999
  },
  choiceItem: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: "#01C89E",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
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
})

const mapStateToProps = (store) => {
  return {
    user: store.user,
    contact: store.contact,
    second: store.second
  }
}

const mapDispatchToProps = {
  deleteContact,
  modifyUserInfo,
  setSecondInfo,
  setIndexSelected
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail)