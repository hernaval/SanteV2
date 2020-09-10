import React, { Component } from 'react'
import { Text, View, StyleSheet,Image, TouchableHighlight, Dimensions, Platform, PixelRatio } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faEdit ,faCog,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const DEFAUTL_USER  ="https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
 class HeaderMenu extends Component {

    constructor(){
        super()
        this.state = {
            isOpen : false,
            photoUri : "",
            id: "",
            size: 23,
            modifPerso: false,
            isAddNewContact: false
        }

        this.width = Dimensions.get('window').width;
        this.height = Dimensions.get('window').height;
    }
    componentDidMount = async() =>{
        const taille = this.normalize(23);
        this.setState({
            size: taille
        })
    }

    normalize(size) {
        const scale = this.width / 320;
        const newSize = size * scale 
        if (Platform.OS === 'ios') {
          return Math.round(PixelRatio.roundToNearestPixel(newSize))
        } else {
          return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
        }
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

    showProfile() {
        return(
            <View style={styles.contain_profil}>
            <View style={styles.contain_profil_1}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} >
            <Icon
            name='chevron-left'
            size={22}
            type='font-awesome'
            color='#FFFFFF'
            style={{fontWeight: '100'}}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.contain_profil_2}>
                <Text style={styles.profil_txt}>Profil</Text>
            </View>
            <View style={styles.contain_profil_3}>
                
            </View>
            </View>
        )
    }

    showInfoPerso() {
        <View style={styles.contain_perso}>
        <View style={styles.contain_perso_1}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
            <Icon
            name='chevron-left'
            size={22}
            type='font-awesome'
            color='#FFFFFF'
            style={{fontWeight: '100', paddingTop: 4}}
            />
            <Text style={styles.txt_back_profil}>Profil</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.contain_perso_2}>
        <Text style={styles.profil_txt}>Informations</Text>
        </View>
        <View style={styles.contain_perso_3}>
        <Text style={styles.modif_txt}>Modifier</Text>
        </View>
    </View>
    }

    modifInfoPerso() {
        return(
            <View>
            <View style={styles.contain_profil_1}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} >
                <Text styles={styles.profil_cancel}>Annuler</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.contain_profil_2}>
                
            </View>
            <View style={styles.contain_profil_3}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} >
                <Text style={styles.profil_save}>Enregistrer</Text>   
            </TouchableOpacity>
            </View>
            </View>
        )
    }


    clickModif() {
        this.setState({modifPerso: true});
        this.props.start();
    }

    saveNewContact() {
        this.props.saveContact();
        this.props.navigation.navigate("ContactUrgence")
    }

    cancelModif() {
        this.setState({modifPerso: false});
        this.props.end();
    }

    saveModif() {
        this.setState({modifPerso: false});
        this.props.save(); 
    }

    addContactUrgence() {
        this.setState({
            isAddNewContact: true
        })
        this.props.navigation.navigate("NewContact");
    }

    backContactUrgence() {
        this.setState({
            isAddNewContact: false
        })
        this.props.navigation.navigate("ContactUrgence");
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.main_contain}>
                <View style={styles.under}>
                        {
                            (this.props.profile && 
                                (
                                    <View>
                                        {this.showProfile()}
                                    </View>
                                )
                            )
                        } 

                        {
                            (this.props.urgence &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingTop: 4}}
                                        />
                                        <Text style={styles.txt_back_profil}>Profil</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Contacts d'urgence</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.addContactUrgence()}>
                                        <Text style={styles.modif_txt}>Ajouter</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.addContact &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.backContactUrgence()} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingTop: 4}}
                                        />
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Nouveau Contact</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.saveNewContact()}>
                                        <Text style={styles.modif_txt}>Enregistrer</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        }
                        

                        {
                            (this.props.perso && !this.state.modifPerso &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingTop: 4}}
                                        />
                                        <Text style={styles.txt_back_profil}>Profil</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Mes Informations</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.clickModif()}>
                                        <Text style={styles.modif_txt}>Modifier</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        } 

                        {
                            (this.props.perso && this.state.modifPerso &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.cancelModif()} style={{flex:1, flexDirection: 'row'}}>
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                        
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.saveModif()}>
                                        <Text style={styles.modif_txt}>Enregistrer</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        } 

                        {
                            (this.props.mapview &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingTop: 4}}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Pharmacie</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }
                
                    </View>
                    </View>
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    txt_back_profil: {
        color: "#FFFFFF",
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: -10
    },
    contain_perso: {
        flex: 1,
        flexDirection: 'row',
        width: wp("100%"),
        justifyContent: 'flex-end'
    },
    contain_perso_1: {
        flex: 1,
        paddingLeft: 10,
        marginTop: 15,
        flexDirection: 'row'
    },
    contain_perso_2: {
        flex: 2,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    contain_perso_3: {
        flex: 1,
        marginTop: 15,
    },
    contain_profil: {
        flex: 1,
        flexDirection: 'row',
        width: wp("100%")
    },
    contain_profil_1: {
        flex: 1,
        paddingLeft: 10,
        marginTop: 15
    },
    contain_profil_2: {
        flex: 2,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    contain_profil_3: {
        flex: 1
    },
    profil_txt: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#FFFFFF'
    },
    modif_txt: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#FFFFFF'
    },
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
        height : hp("13%"),
        textAlign: 'center',
        // alignItems: 'center',
        justifyContent: 'space-around',
        // borderBottomLeftRadius : 10,
        // borderBottomRightRadius : 10
        
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

export default connect(mapStateToProps,mapDispatchToProps)(HeaderMenu)
