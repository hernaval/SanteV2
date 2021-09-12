import React from 'react'
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
import { Background } from './Background';

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false
        }
    }

    _clickMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    _patient() {
        this.props.navigation.navigate("ConnexionPatient");
    }

    _pro() {
        this.props.navigation.navigate("DashboardProSante");
    }

    render() {
        return(
            <View style={styles.main_container}>
            {
                (this.state.showMenu && (
                    <View style={styles.float_menu}>
                        <View style={styles.contain_close}>
                            <Text style={styles.menu_title}>MENU</Text>
                            <TouchableOpacity 
                            style={styles.close_menu}
                            onPress={() => this._clickMenu()}>
                                <Image style={styles.icon_close}
                                source={require("../../images/icons/cancel.png")} />
                                {/* <Text 
                                style={{color: 'red', fontSize: 20, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
                                    X</Text> */}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.menu_text}>Qui sommes-nous ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menu_text}>Notre engagement ethique des données</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menu_text}>Nous contacter</Text>
                        </TouchableOpacity>
                    </View>
                    )
                )
            }

                <Background/>

                <View style={styles.contain_menu}>
                    <TouchableOpacity
                    style={styles.menu_img}
                    onPress={() => this._clickMenu()}>
                        <Image
                        style={{width: 20, height: 20}}
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

                <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20, 
        top: 10
    },
    contain_text : {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },  
    logo : {
        width: 100,
        height: 100,
        marginTop: 0
    },
    main_text : {
        fontWeight: 'bold',
        marginTop: 80,
        marginBottom: 20,
        fontSize: 20
    },
    btn_container : {
        marginTop: 20,
        height: 50,
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    bottom_contain : {
        marginBottom: 20,
        fontSize: 16
    },
    float_menu : {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        backgroundColor: '#FFFF',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        right: 10,
        width: wp('90%')
    },
    contain_close : {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 100,
        flexDirection: 'row',
        width: '100%'
    },
    close_menu : {
        color: 'red',
        fontSize: 10,
        width: 20,
        height: 20,
        borderRadius: 20,
        // textAlign: 'center',
        // flex: 1,
        // justifyContent: 'center'
    },
    icon_close : {
        width: 20,
        height: 20,
    },  
    menu_title : {
        fontSize: 20,
        marginBottom: 10
    },
    menu_text : {
        fontSize: 16,
        marginBottom: 10,
        flexWrap: 'wrap'
    }
})