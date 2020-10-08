import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faHome,  faBars, faTimes, faCaretDown, faChevronLeft, faPlusCircle , faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { connect } from 'react-redux';
  import {deleteContact} from "../Action"

  class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    goToHome = ()=> {
        this.props.navigation.navigate("Home")
    }

    goToProfil(){
        this.props.navigation.navigate("Profile")
    }

    goToDetail(id) {
        this.props.navigation.navigate("RappelDetail", {id: id})
    }

    onClickDelete(index){
        let data = {
            id: this.props.contact.contact.data.contacts[index].id,
            user_id: this.props.user.user.data.user[0].id
        }

       this.props.deleteContact(data);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.under3}>
                        <FontAwesomeIcon 
                            icon={faHome} 
                            color="white" 
                            size={24} 
                            style={{position: "absolute", left: wp('10%'), top: hp('5%')}}
                            onPress={()=>{
                                this.goToHome();
                            }}
                        />
                        <FontAwesomeIcon 
                            icon={faChevronLeft} 
                            color="white" 
                            size={24} 
                            style={{position: "absolute", right: wp('10%'), top: hp('5%')}}
                            onPress={()=>{
                                this.goToProfil();
                            }}
                        />
                </View>
                <View 
                        style={styles.link}
                    >
                        <Image
                            style={styles.imgLink}
                            source={require('../images/Icone_Personne_confiance.png')}
                        /> 
                        <Text style={styles.imgText}>Contacts</Text>
                </View>
                {this.props.contact.contact.data.contacts.length !== 0 && this.props.contact.contact.data.contacts.map((contact, index)=>{
                
                
                return (<View key={index} style={styles.docView}>
                    <Text style={styles.docText}>{contact.firstName} {contact.lastName}</Text>
                    {/* <TouchableOpacity
                        style={styles.docButton}
                        onPress={()=>{
                            this.goToDetail(contact.id)
                        }}
                    >
                            <Image
                                style={{width: wp('10%'), height: wp('10%')}}
                                source={require('../assets/images/Icone_oeil.png')}
                            /> 
                            
                    </TouchableOpacity>*/
                    <TouchableOpacity
                        style={styles.docButton}
                        onPress={()=>{
                            this.onClickDelete(index)
                        }}
                    >
                            <FontAwesomeIcon 
                                icon={faTimesCircle} 
                                color="white" 
                                size={21} 
                                style={{marginRight: wp('2%')}}
                                
                            />
                            
                    </TouchableOpacity> }
                </View>)
                })}
               
                <TouchableOpacity
                    style={styles.docView2}
                    onPress={()=>{
                        this.goToProfil()
                    }}
                >
                    
                            
                            <Text style={styles.docText}>Retour Profil</Text>
            
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00C1B4",
 
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 40,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: wp('25%'),
        paddingTop: hp("7%"),
        paddingBottom: hp("1%")
    },
    imgLink: {
      width: wp('15%'),
      height: wp('15%'),
      backgroundColor: '#01DCD5',
      borderRadius: 400/2,
      marginRight: wp('2%')
    },
    imgText: {
        color: "white",
        fontSize: 24
    },
    docView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("1%"),
        paddingBottom: hp("1%"),
        paddingLeft: wp("5%"),
        paddingRight: wp("5%"),
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
        width: wp('70%'),
        marginLeft: wp('15%'),
        marginBottom: hp("3%"),
    },
    docButton: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp('5%'),
        marginRight: wp('1%'),
        borderRadius: 1,
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
  
    }, 
    docText: {
        color: "white"
    }, 
    buttonSave: {
        backgroundColor: "#00C1B4",
        marginTop: hp('5%'),
        width: wp('70%'),
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        
    },
    docText2: {
        color: "white",
        fontSize: 18
        
    },
    docView2: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("0%"),
        paddingLeft: wp("5%"),
        paddingRight: wp("5%"),
        flexDirection: "row",
        width: wp('70%'),
        marginLeft: wp('15%')
    }
});


const mapStateToProps = (store) => {
    return {
      user: store.user,
      contact: store.contact,
      favorite: store.favorite,
      second: store.second
    }
  }
  
  const mapDispatchToProps = {
    deleteContact
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactList);