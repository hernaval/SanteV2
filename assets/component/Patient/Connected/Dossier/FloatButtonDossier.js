import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

export class FloatButtonDossier extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main_button}>
                <TouchableOpacity style={styles.contain_button}>
                    <Text style={styles.txt_button}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_button : {
        position: 'absolute',
        top: hp('85%'),
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('100%')
    },  
    contain_button: {
        backgroundColor: '#008ac8',
        width: 40,
        height: 40,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt_button : {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 30
    }
})