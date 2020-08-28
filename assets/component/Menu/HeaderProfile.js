import  React from 'react';
import {StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
  import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from "react-redux"
import { setIndexSelected } from '../../Action/'

class HeaderProfile extends React.Component {
    constructor(props) {
		super(props);
		
		this.state ={
            isOpen: false,
            isSelectedProfile: false,
            profils: [],
            selected: "Roselyne Bachelot"
        }

       
    }
    componentDidMount(){
        //.log('redux second', this.props.second.second_users)
    }

    goToDocument = () =>{
        this.props.navigation.navigate("Document")
    }

    goToSecondProfil = () =>{
        this.props.navigation.navigate("SecondBaseProfile")
    }

    goToLogout = () =>{
        this.props.navigation.push("Logout")
    }

    goToMappig() {
        this.props.navigation.navigate("Home")
    }

    goToRappel = () =>{
        this.props.navigation.navigate("Rappel")
    }
    
    onClickOpen() {
        this.setState({isOpen: true});
    }

    onClickClose() {
        this.setState({isOpen: false});
    }

    onChangeSelectedName(index) {
        
        let selected = this.props.second.second_users[index].firstName+' '+this.props.second.second_users[index].lastName
        this.setState({selected: selected, isSelectedProfile: false})
        this.props.setIndexSelected(index);
    }

    openSelectedProfil() {
        let isOpen = !this.state.isSelectedProfile
        this.setState({isSelectedProfile: isOpen})
    }

    goToSecondAdd(){
        this.props.navigation.navigate("SecondAdd")
    }
    render(){
        return(
            <React.Fragment>
                  { this.state.isOpen === false && <View style={styles.under}>


                   <TouchableOpacity onPress={() => this.props.navigation.navigate("Home") }>
                   <FontAwesomeIcon 
                            icon={faHome} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                    />

                   </TouchableOpacity>
                         
                 
                       


                   <View style={{flexDirection :"row"}}>

                       <Image
                        style={{width: wp('6%'), height: wp('6%'), backgroundColor: 'white',  borderRadius: 400/2, marginRight: wp('2%'),marginTop : hp("1%")}}
                        source={require('../../images/icon_point.jpeg')}
                    />
                   
                    <Text  onPress={()=>{
                            this.goToMappig();
                        }} style={styles.title1}>Best4Santé</Text> 

                    </View>
                
               <TouchableOpacity
                    onPress={() => this.props.navigation.push(this.props.dest)}
                 
                   >
                    <FontAwesomeIcon 
                            icon={faEdit} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                    />
                </TouchableOpacity>
                    
                   
                </View> }
                 { this.state.isOpen === true && <View style={styles.under2}>
                
                <View style={styles.under3}>
                    <TouchableOpacity
                        style={{marginRight: wp("13%")}}
                        onPress={()=>{
                            this.goToMappig();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faHome} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                        />
                    </TouchableOpacity>
                    <Text style={styles.title1}>Mes informations</Text>
                    <TouchableOpacity
                        style={{marginLeft: wp("13%")}}
                        onPress={()=>{
                            this.onClickClose();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                        />
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: "center"}}>
                    <Image
                        style={{width: wp('20%'), height: wp('20%'), backgroundColor: '#008AC8',  borderRadius: 400/2, marginRight: wp('2%')}}
                        source={require('../../images/Icone_Profil_icon.png')}
                    /> 
                </View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity 
                        style={{backgroundColor: "white", width: wp('70%'), alignItems: "center", paddingTop: hp("1%"), paddingBottom: hp("1%"), flexDirection: "row"}}
                        onPress={()=>{
                            this.openSelectedProfil()
                        }}
                    >
                        <Text style={{color: "#008AC8",marginLeft: wp("20%"), width: wp("40%")}}>{this.props.second.second_users[this.props.second.indexSelected].firstName} {this.props.second.second_users[this.props.second.indexSelected].lastName}</Text>
                        <FontAwesomeIcon 
                            icon={faCaretDown} 
                            color="#008AC8" 
                            size={24} 
                            style={{}}
                            
                        />
                    </TouchableOpacity>
                    {this.props.second.second_user !== null && this.state.isSelectedProfile && <View  style={styles.choice}>
                        {this.props.second.second_users !== null && this.props.second.second_users.map((profil, index)=>{
                            return (<TouchableOpacity
                                        key={index}
                                        style={styles.choiceItem}
                                        onPress={()=>{
                                            this.onChangeSelectedName(index)
                                        }}
                                    >
                                <Text>{profil.firstName} {profil.lastName}</Text>
                            </TouchableOpacity>)
                        })}
                        <TouchableOpacity
                            
                            style={styles.choiceItem}
                            onPress={()=>{
                                this.goToSecondAdd()
                            }}
                        >
                            <Text>+ Ajouter profil</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                <TouchableOpacity 
                    style={styles.link}
                    onPress={()=>{
                        this.goToDocument()
                    }}
                >
                    <Image
                        style={styles.imgLink}
                        source={require('../../images/Icone_Documents.png')}
                    /> 
                    <Text style={styles.imgText}>Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.link}
                    onPress={()=>{
                        this.goToRappel()
                    }}
                >
                    <Image
                        style={styles.imgLink}
                        source={require('../../images/Icone_Clockwhite.png')}
                    /> 
                    <Text style={styles.imgText}>Rappels</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.link}
                    onPress={()=>{
                        this.goToSecondProfil()
                    }}
                >
                    <Image
                        style={styles.imgLink}
                        source={require('../../images/Icone_Profil_icon.png')}
                    /> 
                    <Text style={styles.imgText}>Profil</Text>
                </TouchableOpacity>
                <View
                    style={styles.decoView}
                >
                    <TouchableOpacity
                        style={styles.deco}
                        onPress={(e)=>{
                            this.goToLogout();
                        }}
                    >
                        <Image
                            style={styles.imgDeco}
                            source={require('../../images/Bouton-deconnexion.png')}
                        /> 
                        <Text style={styles.decoText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>}
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    under: {
        
        flexDirection: 'row',
        paddingTop: hp("6%"),
        width: wp('100%'),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title1: {
        fontSize: 26,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    logo: {
        backgroundColor: "white"
    },
    under2: {
        backgroundColor: "#008AC8",
        position: "absolute",
        top: 0,
        //left: wp('-50%'),
        zIndex:99
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 60,

        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
       

    },
    textinput: {
        marginLeft: wp("15%"),
        textAlign: 'center',
        height: 50,
        width: wp("70%"),
        paddingLeft: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: hp('2%')
      },
      link: {
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: wp('25%'),
          paddingTop: hp("1%"),
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
      decoView: {
        marginBottom: hp('5%'),
        alignItems: "center"
      },
      deco: {
          width: wp('60%'),
          borderWidth: 1,
          borderColor: "white",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: hp('1%'),
          paddingTop: hp('1%')
      },
      imgDeco: {
        width: wp('11%'),
        height: wp('11%'),
        backgroundColor: '#008AC8',
        borderRadius: 400/2,
        marginRight: wp('2%')
      },
      decoText: {
          fontSize: 18,
          color: "white"
      },
      choice: {
          backgroundColor: "white",
          width: wp('70%'),
          position: "absolute",
          top: hp('5%'),
          zIndex:34
      },
      choiceItem: {
          alignItems: "center",
          justifyContent: 'center',
          paddingBottom: hp("2%"),
          paddingTop: hp("2%"),
          
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
    setIndexSelected
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile);