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
                <View style={{position: 'absolute', top: 0, width: wp('100%')}}>
                    <HeaderPatient navigation={this.props.navigation}/>
                </View>

                <View style={{marginTop: 50, justifyContent: 'center'}}>
                    <ScrollView>
                    <View style={styles.contain_logo}>
                        <Image 
                        style={styles.logo}
                        source={require("../../images/Splash(FondBlanc).png")} />
                    </View>

                    <View style={styles.main_scroll}>
                        <Text style={styles.txt}>Log in</Text>

                        <View style={styles.main_input}>
                            <Image 
                            style={styles.icon_mail}
                            source={require("../../images/icons/mail.png")} />
                            <TextInput style={styles.txt_input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="E-mail adress"
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
                            placeholder="Password"
                            returnKeyType="done"
                            ref={input => { this.password = input }}
                            />
                        </View>

                        <TouchableOpacity
                        style={styles.btn_connexion}
                        onPress={() => this._signIn()}>
                            <Text style={styles.txt_connexion}>
                                Connect
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.contain_other}>
                            <Text style={styles.txt_forgot}>Forgot your password</Text>
                        </View>

                        <View style={styles.other_connexion}>
                            <View style={styles.contain_icon}>
                            <Image 
                                style={styles.icon_other_fb}
                                source={require("../../images/icons/facebook-app-symbol.png")} />
                            </View>
                            <View style={styles.contain_icon}>
                            <Image 
                                style={styles.icon_other_gl}
                                source={require("../../images/icons/google-plus.png")} />
                            </View>
                        </View>
                        
                        
                        <View style={styles.switch_cnx}>
                                    <Text style={styles.txt_other}>
                                    No account yet ?
                                    </Text>
                                    <TouchableOpacity
                                    onPress={() => this._goToSignUp()}>
                                        <Text style={styles.se_connecter}>
                                            Register
                                        </Text>
                                    </TouchableOpacity>
                        </View>
                        {/* <View style={styles.space}></View> */}
                    </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    other_connexion : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },
    contain_icon : {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_other_fb: {
        height: 20,
        width: 10
    },
    icon_other_gl: {
        height: 23,
        width: 23
    },
    txt_forgot: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    space : {
        height: hp('12%')
    },
    main : {
        marginTop: 20,
        flex: 1
    },
    contain_logo : {
        display: 'flex',
        alignItems: 'center'
    },  
    logo : {
        width: 100,
        height: 100
    },
    main_scroll : {
        flex: 1,
        alignItems: 'center'
    },
    txt : {
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 20
    },
    main_input : {
        display: 'flex',
        flexDirection: 'row',
        width: wp('90%'),
        backgroundColor: 'white',
        height: 45,
        marginTop: 25,
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    icon_input : {
        marginRight: 20,
        width: 15,
        height: 20
    },
    icon_mail : {
        marginRight: 20,
        width: 20,
        height: 15,
        position: 'relative',
        top: 3
    },
    txt_input : {
        fontSize: 16,
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
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 10,
        textAlign: 'center',
        width: wp("90%"),
        backgroundColor: '#008ac8'
    },
    txt_connexion : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    switch_cnx : {
        // flex: 1,
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 50
    },
    txt_other : {
        fontSize: 16
    },
    se_connecter : {
        fontSize: 16,
        marginLeft: 10,
        color: '#00C1B4',   
        fontWeight: 'bold'
    }
})

export default ConnexionPatient