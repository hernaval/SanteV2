import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { CheckBox } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { HeaderPatient } from './HeaderPatient'
import { Background } from "../Home/Background";

class InscriptionPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
        this.lastName = ""
        this.firstName = ""
        this.email = ""
        this.password = ""
    }

    _signUp() {
        this.props.navigation.navigate("DashboardPatient");
    }

    _goToSignIn() {
        this.props.navigation.navigate("ConnexionPatient");
    }

    _check() {
        this.setState({ checked: !this.state.checked })
    }


    render() {
        return(
            <View style={styles.main}>
                <Background/>

                <View style={{position: 'absolute', top: 0, width: wp('100%')}}>
                    <HeaderPatient navigation={this.props.navigation}/>
                </View>

                <View style={{marginTop: 50}}>
                    <ScrollView>
                    <View style={styles.contain_logo}>
                        <Image 
                        style={styles.logo}
                        source={require("../../images/Splash(FondBlanc).png")} />
                    </View>

                    <View style={styles.main_scroll}>
                        <Text style={styles.txt}>Inscription</Text>

                        <View style={styles.main_input}>
                            <Image 
                            style={styles.icon_input_user}
                            source={require("../../images/icons/Mon-compte.png")} />
                            <TextInput style={styles.txt_input}
                            autoCapitalize="none"
                            placeholder="Prénom"
                            returnKeyType="next"
                            ref={input => { this.lastName = input }}
                            />
                        </View>

                        <View style={styles.main_input}>
                            <Image 
                            style={styles.icon_input_user}
                            source={require("../../images/icons/Mon-compte.png")} />
                            <TextInput style={styles.txt_input}
                            autoCapitalize="none"
                            placeholder="Nom"
                            returnKeyType="next"
                            ref={input => { this.firstName = input }}
                            />
                        </View>

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

                        <View style={styles.checkBox}>
                            <CheckBox 
                            checked={this.state.checked} 
                            checkedColor='#00C1B4'
                            uncheckedColor= '#00C1B4'
                            size={20}
                            onPress={() => this._check()} />
                            <Text style={styles.checkbox_text}>
                                J'accepte la politique
                            </Text>
                            <Text style={styles.checkbox_po}>
                                RGPO
                            </Text>
                        </View>

                        <TouchableOpacity
                        style={styles.btn_connexion}
                        onPress={() => this._signUp()}>
                            <Text style={styles.txt_connexion}>
                                S' inscrire
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.switch_cnx}>
                            <Text style={styles.txt_other}>
                                Vous avez déjà un compte ?
                            </Text>
                            <TouchableOpacity
                            onPress={() => this._goToSignIn()}>
                                <Text style={styles.se_connecter}>
                                    Connexion
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
    space : {
        height: hp('5%')
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
    icon_input_user : {
        marginRight: 20,
        width: 17,
        height: 20
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
        marginTop: 5,
        width: wp('90%'),
        marginLeft: -30
    },
    checkbox_text : {
        fontSize: 16,
        position: 'relative',
        top: 15
    },
    checkbox_po : {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00C1B4',
        marginLeft: 10,
        position: 'relative',
        top: 16
    },
    btn_connexion: {
        marginTop: 15,
        height: 45,
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

export default InscriptionPatient