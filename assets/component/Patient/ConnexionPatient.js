import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { HeaderPatient } from './HeaderPatient'
import { Background } from "../Home/Background";

class ConnexionPatient extends React.Component {
    constructor(props) {
        super(props)
        this.email = ""
        this.password = ""
    }

    _signIn() {
        this.props.navigation.navigate("DashboardPatient");
    }

    _goToSignUp() {
        this.props.navigation.navigate("InscriptionPatient");
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>

                <HeaderPatient navigation={this.props.navigation}/>

                <ScrollView>
                    <View style={styles.contain_logo}>
                        <Image 
                        style={styles.logo}
                        source={require("../../images/Splash(FondBlanc).png")} />
                    </View>

                    <View style={styles.main_scroll}>
                        <Text style={styles.txt}>Connexion</Text>

                        <View style={styles.main_input}>
                            <Image 
                            style={styles.icon_mail}
                            source={require("../../images/icons/mail.png")} />
                            <TextInput style={styles.txt_input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Adresse e-mail"
                            returnKeyType="next"
                            ref={input => { this.email = input }}
                            />
                        </View>

                        <View style={styles.main_input}>
                            <Image 
                            style={styles.icon_input}
                            source={require("../../images/icons/password.png")} />
                            <TextInput style={styles.txt_input}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder="Mot de passe"
                            returnKeyType="done"
                            ref={input => { this.password = input }}
                            />
                        </View>

                        <TouchableOpacity
                        style={styles.btn_connexion}
                        onPress={() => this._signIn()}>
                            <Text style={styles.txt_connexion}>
                                Se connecter
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.switch_cnx}>
                            <Text style={styles.txt_other}>
                                Pas encore de compte ?
                            </Text>
                            <TouchableOpacity
                            onPress={() => this._goToSignUp()}>
                                <Text style={styles.se_connecter}>
                                    S' inscrire
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.space}></View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    space : {
        height: hp('12%')
    },
    main : {
        marginTop: 20,
        flex: 1
    },
    contain_logo : {
        display: 'flex',
        alignItems: 'center',
        marginTop: 80
    },  
    logo : {
        width: 150,
        height: 150
    },
    main_scroll : {
        flex: 1,
        alignItems: 'center'
    },
    txt : {
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 28
    },
    main_input : {
        display: 'flex',
        flexDirection: 'row',
        width: wp('90%'),
        backgroundColor: 'white',
        height: 70,
        marginTop: 25,
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    icon_input : {
        marginRight: 20,
        width: 25,
        height: 31
    },
    icon_mail : {
        marginRight: 20,
        width: 25,
        height: 20,
        position: 'relative',
        top: 3
    },
    txt_input : {
        fontSize: 20,
        position: 'relative',
        top: 3
    },
    checkBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        width: wp('90%'),
        marginLeft: -30
    },
    checkbox_text : {
        fontSize: 20,
        position: 'relative',
        top: 17
    },
    checkbox_po : {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00C1B4',
        marginLeft: 10,
        position: 'relative',
        top: 17
    },
    btn_connexion: {
        marginTop: 25,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        textAlign: 'center',
        width: wp("90%"),
        backgroundColor: '#008ac8'
    },
    txt_connexion : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    switch_cnx : {
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    txt_other : {
        fontSize: 20
    },
    se_connecter : {
        fontSize: 20,
        marginLeft: 10,
        color: '#00C1B4',   
        fontWeight: 'bold'
    }
})

export default ConnexionPatient