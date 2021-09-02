import { StyleSheet, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView} from "react-native";
import React from "react";
import HeaderPatientConnected from "./HeaderPatientConnected";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
import WelcomeProSante from "./../../ProSante/WelcomeProSante";
import { BottomMenuPatient } from "./BottomMenuPatient";
import { Background } from "../../Home/Background";

export default class DashboardPatient extends React.Component {
    constructor(props) {
        super(props)
    }

    _pressMenu(route) {
        if (!route) return false
        this.props.navigation.navigate(route)
    }
    
    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <BottomMenuPatient/>

                <HeaderPatientConnected navigation={this.props.navigation}/>

                <ScrollView style={styles.main_scroll}> 
                <WelcomeProSante/>
                <View style={styles.main_dashboard}>
                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu('DossierPatient')}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Mon-dossier.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Mon Dossier</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu('DocumentPatient')}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Mes-documents.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Mes documents</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.main_dashboard]}>
                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Mo-espace-bien-être.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Mon espace bien être</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Rdv-et-téléconsultations.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Rdv et téléconsultation</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.main_dashboard]}>
                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Contacts.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Contacts</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../../images/icons/Urgences.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Urgences</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.space}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_scroll : {
        marginTop: 0
    },
    main_dashboard : {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    part_2 : {
        // marginTop: wp('43%')
        marginBottom: 200
    },
    space : {
        height: hp('15%'),
        marginTop: 150
    },
    card_menu : {
        backgroundColor: '#fbfafa',
        padding: 20,
        borderRadius: 5,
        width: wp('39%'),
        minHeight: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_menu_block : {
        backgroundColor: '#fbfafa',
        padding: 20,
        borderRadius: 10,
        width: wp('90%'),
        minHeight: 140,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_menu : {
        backgroundColor: "#00C1B4",
        width: 45,
        height: 45,
        padding: 15,
        borderRadius: 70,
        position: 'absolute',
        top: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        height: 22,
        width: 22,
    },
    text_menu : {
        fontSize: 16,
        marginTop: 70,
        textAlign: 'center',
        flexWrap: 'wrap'
    }
})