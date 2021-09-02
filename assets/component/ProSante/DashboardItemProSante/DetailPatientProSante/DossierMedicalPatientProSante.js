import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 

export class DossierMedicalPatientProSante extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Tous</Text>

                <View style={styles.block_view}>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Antécédant</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Allergie</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                </View>

                <View style={styles.block_view}>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Dossier 3</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Dossier 4</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                </View>

                <View style={styles.block_view}>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Dossier 5</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                    <View style={styles.block_}>
                        <Text style={styles.title_block_}>Dossier 6</Text>
                        <Text style={styles.descr_block_}>Lorem ipsum, dolor</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    block_view: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    block_: {
        width: '48%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: 130,
        borderRadius: 5
    },
    title_block_: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    descr_block_: {
        fontSize: 16,
    }
})
