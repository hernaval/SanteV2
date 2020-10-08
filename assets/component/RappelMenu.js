import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faHome,  faBars, faTimes, faCaretDown, faChevronLeft, faPlusCircle , faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import * as DocumentPicker from 'expo-document-picker';
  import Bdd from '../API/Bdd'
  import axios from 'axios';
  import { connect } from 'react-redux';

class RappelMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rappels: []
        }
    }

    componentDidMount() {
        let data = {
            user_id: this.props.second.second_users[this.props.second.indexSelected].id
        }


        axios.post(Bdd.api_url+"/api/rappel/one",  data)
            .then((response)=>{
                
                this.setState({rappels: response.data.rappels })
            })
    }

   

    goToMapping = ()=> {
        this.props.navigation.navigate("Home")
    }

    
    
    goToRappel(){
        this.props.navigation.navigate("Rappel")
    }

    goToRappelMenu(){
        this.props.navigation.navigate("RappelMenu")
    }

    goToDetail(id) {
       
        this.props.navigation.navigate("RappelDetail", {id: id})
    }
    onClickDelete(index){
        let data = {
            id: this.state.rappels[index].id
        }

        let rappels = this.state.rappels;

        rappels.splice(index, 1);

        axios.post(Bdd.api_url+"/api/rappel/delete",  data)
        .then((response)=>{
      
            if(response.data.status === 200) {
                this.setState({rappels: rappels })
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.under3}>
                    <TouchableOpacity
                        style={{marginRight: wp("35%")}}
                        onPress={()=>{
                            this.goToMapping();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faHome} 
                            color="white" 
                            size={24} 
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginLeft: wp("35%")}}
                        onPress={()=>{
                            this.goToMapping();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faChevronLeft} 
                            color="white" 
                            size={24} 
                            
                        />
                    </TouchableOpacity>
                </View>
                <View 
                        style={styles.link}
                    >
                        <Image
                            style={styles.imgLink}
                            source={require('../images/Icone_Clockwhite.png')}
                        /> 
                        <Text style={styles.imgText}>Rappels</Text>
                </View>
                {this.state.rappels.length !== 0 && this.state.rappels.map((rappel, index)=>{
                
                
                return (<View key={index} style={styles.docView}>
                    <Text style={styles.docText}>{rappel.name}</Text>
                    <TouchableOpacity
                        style={styles.docButton}
                        onPress={()=>{
                            this.goToDetail(rappel.id)
                        }}
                    >
                            <Image
                                style={{width: wp('10%'), height: wp('10%')}}
                                source={require('../images/Icone_oeil.png')}
                            /> 
                            
                    </TouchableOpacity>
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
                            
                    </TouchableOpacity>
                </View>)
                })}
               
                <TouchableOpacity
                    style={styles.docView2}
                    onPress={()=>{
                        this.goToRappel()
                    }}
                >
                    
                            <FontAwesomeIcon 
                                icon={faPlusCircle} 
                                color="white" 
                                size={24} 
                                style={{marginRight: wp('2%')}}
                        
                            />
                            <Text style={styles.docText}>Ajouter un nouveau rappel</Text>
            
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#008AC8",
 
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
      backgroundColor: '#008AC8',
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
        marginLeft: wp('1%'),
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
    
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(RappelMenu);