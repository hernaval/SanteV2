import React, { Component } from 'react'
import { Text, View, StyleSheet,Image, TouchableHighlight, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faEdit ,faCog} from '@fortawesome/free-solid-svg-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                <View style={styles.main_contain}>
                
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
                

                        {
                            (this.props.menu && 
                                (
                                    <View style={styles.contain_txt}>
                                        <Text style={styles.custom_txt}>Profil</Text>
                                    </View>
                                )
                            )
                        } 
                        
                        {
                            (this.props.switch && 
                                (
                                    <View style={styles.contain_txt2}>
                                        <Text style={styles.custom_txt}>Informations Personnelles</Text>

                                        <Icon
                                        name='save'
                                        size={20}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.icon_save}
                                        onPress={() => console.log('save')}
                                        />
                                    </View>
                                )
                            )
                        } 
                
                    </View>

                    {
                        (this.props.switch &&
                            (
                                <View style={styles.contain_back}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} >
                                    <Icon
                                    name='chevron-left'
                                    size={20}
                                    type='font-awesome'
                                    color='#FFFFFF'
                                    style={{fontWeight: '100'}}
                                    />
                                    </TouchableOpacity>
                                </View>
                            )    
                        )
                    }

                    </View>
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    icon_save: {
        fontWeight: '100',
        paddingLeft: 50,
        paddingTop: 5
    },
    contain_back: {
        flexDirection: 'row',
        marginTop: -33,
        marginLeft: 6
    },
    main_contain: {
        flexDirection: 'column',
    },
    under: {
        backgroundColor : "#00C1B4",
        flexDirection: 'row',
         paddingTop: hp("5%"),
        width: wp('100%'),
        height : hp("20%"),
        textAlign: 'center',
        // alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10
        
    },
    contain_txt: {
        position: 'absolute',
        bottom: 10,
        right: 20
    },
    contain_txt2: {
        position: 'absolute',
        bottom: 10,
        right: wp("5"),
        flex: 1,
        flexDirection: 'row'
    },
    custom_txt : {
        color: '#FFFFFF',
        fontWeight: '100',
        fontSize: 20
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
