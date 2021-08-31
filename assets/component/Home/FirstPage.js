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
                            <TouchableOpacity 
                            style={styles.close_menu}
                            onPress={() => this._clickMenu()}>
                                <Text 
                                style={{color: 'red', fontSize: 20, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
                                    X</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.menu_title}>MENU</Text>
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
        fontSize: 28
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottom_contain : {
        marginBottom: 20,
        fontSize: 16
    },
    float_menu : {
        position: 'absolute',
        zIndex: 10,
        top: 40,
        backgroundColor: '#fbfafa',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 60,
        borderRadius: 5,
        right: 20,
        width: wp('90%')
    },
    contain_close : {
        flex: 1,
        alignItems: 'flex-end',
    },
    close_menu : {
        color: 'red',
        fontSize: 20,
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    menu_title : {
        fontSize: 25,
        marginBottom: 30
    },
    menu_text : {
        fontSize: 20,
        marginBottom: 30,
        flexWrap: 'wrap'
    }
})