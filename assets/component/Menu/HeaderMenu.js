import React, { Component } from 'react'
import { Text, View, StyleSheet,Image, TouchableHighlight, Dimensions, Platform, PixelRatio } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
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
            isAddNewContact: false,
            modifPersoSecond: false
        }

        this.width = Dimensions.get('window').width;
        this.height = Dimensions.get('window').height;
    }
    componentDidMount = async() =>{
        loc(this);
        const taille = this.normalize(23);
        this.setState({
            size: taille
        })
    }

    componentWillUnMount() {
        rol();
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




    clickModif() {
        this.setState({modifPerso: true});
        this.props.start();
    }

    modifProfilSecondaire() {
        this.setState({modifPersoSecond: true});
        this.props.startModifSecond();
    }


    saveNewContact() {
        this.props.saveContact();
        this.props.navigation.navigate("ContactUrgence")
    }

    cancelModif() {
        this.setState({modifPerso: false});
        this.props.end();
    }

    cancelModifProfilSecondaire() {
        this.setState({modifPersoSecond: false});
        this.props.endModifSecond();
    }

    saveModif() {
        this.setState({modifPerso: false});
        this.props.save(); 
    }

    saveModifProfilSecondaire() {
        this.setState({modifPersoSecond: false});
        this.props.saveModifSecond(); 
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
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Profil</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    
                                    </View>
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
                                        style={styles.style_chevron}
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
                            (this.props.reminder &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt1}>Mes rappels</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.ajoutEvent &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Reminder")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    
                                    </View>
                                    <View style={styles.contain_perso_31}>
                                    <Text style={styles.profil_txt}>Ajout de Rappel</Text>
                                    </View>
                                </View>
                                )
                            )
                        }

                        
                        {
                            (this.props.secondProfil &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} 
                                        style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        <Text style={styles.txt_back_profil}>Profil</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Profils Secondaires</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.props.ajouterSecondProfil()}>
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
                                        style={styles.style_chevron}
                                        />
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Contact</Text>
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
                            (this.props.secondAdd &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MySecondProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Profil Secondaire</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.props.enregistrerSecondProfil()}>
                                        <Text style={styles.modif_txt}>Enregistrer</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        }
                        

                        {
                            (this.props.persoll && !this.state.modifPerso &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
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
                            (this.props.perso && !this.state.modifPerso &&
                                (
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'center', marginLeft: 10}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <TouchableOpacity
                                         onPress={() => this.props.navigation.navigate("MyProfil")}>
                                        <Icon
                                        name='chevron-left'
                                        size={20}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingRight: 5, paddingTop: 4}}
                                        />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() => this.props.navigation.navigate("MyProfil")}>
                                         <Text style={styles.modif_txt}>Profil</Text>
                                         </TouchableOpacity>
                                    </View>

                                    <View style={{flex: 2, alignItems: 'center'}}>
                                        <Text style={styles.modif_txt}>Mes informations</Text>
                                    </View>

                                    <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
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
                            (this.props.secondProfilInfo && !this.state.modifPersoSecond &&
                                (
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'center', justifyContent: 'space-between'}}>
                                    <View style={{marginLeft: 5, flexDirection: 'row'}}>
                                        <TouchableOpacity
                                         onPress={() => this.props.navigation.navigate("MySecondProfil", {update: true})}>
                                        <Icon
                                        name='chevron-left'
                                        size={20}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={{fontWeight: '100', paddingRight: 5, paddingTop: 4}}
                                        />
                                        </TouchableOpacity>
                                         <TouchableOpacity
                                         onPress={() => 
                                            this.props.navigation.navigate("MySecondProfil", 
                                            {id: this.props.idUserSecond})}>
                                            <Text style={styles.modif_txt}>Retour</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.modif_txt}>Profil Secondaire</Text>
                                    </View>

                                    <View style={{alignItems: 'flex-end', marginRight: 5}}>
                                     <TouchableOpacity onPress={() => this.modifProfilSecondaire()}>
                                        <Text style={styles.modif_txt}>Modifier</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                )
                            )
                        } 

                        
                        {
                            (this.props.secondProfilInfo && this.state.modifPersoSecond &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.cancelModifProfilSecondaire()} style={{flex:1, flexDirection: 'row'}}>
                                        <Text style={styles.txt_back_profil}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                        
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    <TouchableOpacity onPress={() => this.saveModifProfilSecondaire()}>
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
                                        style={styles.style_chevron}
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

                                                {
                            (this.props.setting &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Paramètres</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

{
                            (this.props.signaler &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MainSetting")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Besoin d'aide</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

{
                            (this.props.mapUser &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_2}>
                                    <Text style={styles.profil_txt}>Bons Samaritains</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.userConnected &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfil")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_21}>
                                    <Text style={styles.profil_txt}>Bon samaritain</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.ps &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_22}>
                                    <Text style={styles.profil_txt}>Rechercher professionnel de santé</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.documents &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_22}>
                                    <Text style={styles.profil_txt}>Mes Documents</Text>
                                    </View>
                                    <View style={styles.contain_perso_3}>
                                    </View>
                                </View>
                                )
                            )
                        }

                        {
                            (this.props.addDocument &&
                                (
                                <View style={styles.contain_perso}>
                                    <View style={styles.contain_perso_1}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("FileManager")} style={{flex:1, flexDirection: 'row'}}>
                                        <Icon
                                        name='chevron-left'
                                        size={22}
                                        type='font-awesome'
                                        color='#FFFFFF'
                                        style={styles.style_chevron}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contain_perso_22}>
                                    <Text style={styles.profil_txt}>Nouveau Document</Text>
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
    style_chevron: {
        fontWeight: 'normal', 
        paddingTop: 4
    },
    txt_back_profil: {
        color: "#FFFFFF",
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: -10
    },
    contain_perso: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contain_perso_1: {
        // flex: 1,
        paddingLeft: 5,
        // marginTop: 15,
        flexDirection: 'row'
    },
    contain_perso_2: {
        // flex: 2,
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignItems: 'center'
    },
    contain_perso_21: {
        flex: 3,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    contain_perso_22: {
        flex: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    contain_perso_3: {
        paddingRight: 5,
        // flex: 1,
        // marginTop: 15,
    },
    contain_perso_31: {
        paddingRight: 5,
        // flex: 2,
        // marginTop: 15,
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
    profil_txt1: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 24,
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
