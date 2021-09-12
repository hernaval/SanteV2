import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 

export class AppFormePatient extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.card_app}>
            <View style={styles.illustration_app}>
                <View style={styles.illustration_card}>
                    <Text style={styles.illustration_text}>AA</Text>
                </View>
            </View>
            <Text style={styles.app_text}>Application</Text>
            <Text style={styles.app_text}>adaptée</Text>
            <TouchableOpacity style={styles.app_install}>
                <Text style={styles.app_txt_install}>Installer</Text>
            </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card_app: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    illustration_app : {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    illustration_card : {
        backgroundColor: '#00C1B4',
        height: 80,
        width: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    illustration_text : {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
    app_text : {
        fontSize: 16,
    },
    app_install : {
        backgroundColor: '#008ac8',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    app_txt_install : {
        color: 'white',
        fontWeight: 'bold'
    }
})