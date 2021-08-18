import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

export default class Menu extends Component {
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
        console.log(this.state.showMenu)
    }
    
    render() {
        return(
        <View>
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

            <View style={styles.contain_menu}>
                    <TouchableOpacity
                    style={styles.menu_img}
                    onPress={() => this._clickMenu()}>
                        <Image 
                        source={require("../../images/icons/burger.png")} />
                    </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
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
    float_menu : {
        position: 'absolute',
        zIndex: 10,
        top: 40,
        backgroundColor: '#fbfafa',
        padding: 20,
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
        fontSize: 20,
        marginBottom: 20
    },
    menu_text : {
        fontSize: 18,
        marginBottom: 15,
        flexWrap: 'wrap'
    }
})