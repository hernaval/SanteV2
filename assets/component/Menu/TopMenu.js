import React, { Component } from 'react'
import { Text, View, StyleSheet,Image,TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { Avatar } from 'react-native-elements';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faHome,  faBars, faTimes, faCaretDown, faEdit ,faCog} from '@fortawesome/free-solid-svg-icons';
  import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
  import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { connect } from 'react-redux';
const DEFAUTL_USER  ="https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
 class TopMenu extends Component {

    constructor(){
        super()
        this.state = {
            isOpen : false,
            photoUri : "",
            id: ""

        }
    }
    componentDidMount = async() =>{
       
        
    }

    

    _menu = null;

    
    
    setMenuRef = ref => {
      this._menu = ref;
    };
   
    hideMenu = () => {
      this._menu.hide();
    };
   
    showMenu = () => {
      this._menu.show();
    };
    render() {
        return (
            <React.Fragment>
                <View style={styles.under}>
                        
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")}  >
                    <FontAwesomeIcon 
                         
                         icon={faHome} 
                         color="white" 
                         size={24} 
                         style={{}} />
                    
                  
                    </TouchableOpacity>
                     
                   <View style={{flexDirection :"row"}}>

                       <Image
                        style={{width: wp('6%'), height: wp('6%'), backgroundColor: 'white',  borderRadius: 400/2, marginRight: wp('2%'),marginTop : hp("1%")}}
                        source={require('../../images/icon_point.jpeg')}
                    />
                   
                    <Text   style={styles.title1}>Best4Santé</Text> 

                    </View>
                
                     <Menu
                        ref={this.setMenuRef}
                        button={
                            <TouchableOpacity onPress={()=> this.showMenu()}>
                                <FontAwesomeIcon  size={22} color ={"white"} icon={faCog} />
                            </TouchableOpacity>
                        }
                    >       
                            <MenuItem  onPress={()=>{
                                this.hideMenu()
                                this.props.navigation.navigate("Forgot")
                            }}>Mes paramètres</MenuItem>

                            <MenuDivider />
                             <MenuItem onPress={()=> {
                                 this.hideMenu()
                                 this.props.navigation.push("Logout")
                                 }} >
                                Me déconnecter
                             </MenuItem>
                    </Menu>
 
                    
                    </View>
      
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    under: {
        backgroundColor : "#00C1B4",
        flexDirection: 'row',
        paddingTop: hp("5%"),
        width: wp('100%'),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        
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
        zIndex: 99
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
        borderRadius: 400 / 2,
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
        borderRadius: 400 / 2,
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
        zIndex: 34
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
    
  }

export default connect(mapStateToProps,mapDispatchToProps)(TopMenu)
