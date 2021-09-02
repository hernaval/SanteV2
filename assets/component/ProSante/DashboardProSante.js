import { StyleSheet, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView} from "react-native";
import React from "react";
import HeaderProSante from "./HeaderProSante";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
import WelcomeProSante from "./WelcomeProSante";
import { BottomMenuProSante } from "./BottomMenuProSante";
import { Background } from "../Home/Background";

export default class DashboardProSante extends React.Component {
    constructor(props) {
        super(props)
    }

    _pressMenu(route) {
        this.props.navigation.navigate(route)
    }
    
    render() {
        return(
            <View style={styles.main}>
                <BottomMenuProSante/>
                <Background/>
                
                <HeaderProSante navigation={this.props.navigation}/>

                <ScrollView style={styles.main_scroll}> 
                <WelcomeProSante/>
                <View style={styles.main_dashboard}>
                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu('PatientProSante')}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../images/icons/Mes-patients.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Mes patients</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../images/icons/Mes-outils-de-gestion.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Mes outils de gestion</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.main_dashboard]}>
                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../images/icons/prescription.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Aide à la prescription</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.card_menu}
                    onPress={() => this._pressMenu(null)}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../images/icons/coronavirus.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Campagne de vaccination COVID-19 et autre</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.main_dashboard, styles.part_2]}>
                    <TouchableOpacity 
                    style={styles.card_menu_block}
                    onPress={() => this._pressMenu('RendezVousProSante')}>
                        <View style={styles.icon_menu}>
                            <Image style={styles.icon_img}
                            source={require("../../images/icons/Rendez-vous.png")}/>
                        </View>
                        <View>
                            <Text style={styles.text_menu}>Rendez-vous</Text>
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
        marginTop: 10
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
        height: hp('15%')
    },
    card_menu : {
        backgroundColor: '#fbfafa',
        padding: 20,
        borderRadius: 5,
        width: wp('40%'),
        minHeight: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_menu_block : {
        backgroundColor: '#fbfafa',
        padding: 20,
        borderRadius: 10,
        width: wp('87%'),
        minHeight: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50
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
        marginTop: 60,
        textAlign: 'center',
        flexWrap: 'wrap'
    }
})