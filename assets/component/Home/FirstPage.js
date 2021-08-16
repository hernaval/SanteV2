import React from 'react'
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props)
    }

    _clickMenu() {
        console.log("Click Menu")
    }

    _patient() {
        this.props.navigation.navigate("Login");
    }

    _pro() {
        console.log("Pro")
    }

    render() {
        return(
            <View style={styles.main_container}>
                <Image
                    style={{position: 'absolute', width: wp("100%"), height: hp("100%")}}
                    resizeMode='cover'
                    source={require("../../images/favoris_selected.png")}
                    blurRadius={2}
                />

                <View style={styles.contain_menu}>
                    <TouchableOpacity
                    style={styles.menu_img}
                    onPress={() => this._clickMenu()}>
                        <Image 
                        source={require("../../images/icons/burger.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_text}>
                    <Image 
                    style={styles.logo}
                    source={require("../../images/Splash(FondBlanc).png")} />
                    <Text style={styles.main_text}>Se connecter en tant que : </Text>
                    <TouchableOpacity 
                    onPress={() => this._patient()}
                    style={[styles.btn_container, styles.btn_patient]}>
                        <Text style={styles.text}>Patient(e)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => this._pro()}
                    style={[styles.btn_container, styles.btn_pro]}>
                        <Text style={styles.text}>Professionnel(le) de santé</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.bottom_contain}>Best4Santé</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contain_menu : {
        flex: 1,
        width: wp("100%")
    },
    menu_img : {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 20,
        top: 60
    },
    contain_text : {
        flex: 2,
        alignItems: 'center'
    },  
    logo : {
        width: 150,
        height: 150,
        marginTop: -100,
        marginBottom: 30
    },
    main_text : {
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 20
    },
    btn_container : {
        marginTop: 30,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        textAlign: 'center',
        width: wp("90%")
    },
    btn_patient : {
        backgroundColor: "#00C1B4",
    },
    btn_pro : {
        backgroundColor: '#008ac8',
    },
    text : {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottom_contain : {
        marginBottom: 20,
        fontSize: 16
    }
})