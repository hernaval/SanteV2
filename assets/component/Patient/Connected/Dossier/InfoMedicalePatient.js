import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 

const data = [
    {
        title: 'Groupe sanguin',
        value: 'B+'
    },
    {
        title: 'Allergies',
        value: 'Allergies'
    },
    {
        title: 'Donneur(se) d\'organe',
        value: 'Non'
    }
]

export class InfoMedicalePatient extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main}>
                <ScrollView style={styles.scroll_view}>
                <Text style={styles.main_title}>Tous</Text>

                <View style={styles.main_scroll}>
                    { data.map(
                        list => (
                            <View style={styles.block}>
                                <Text style={styles.block_title}>{list.title}</Text>
                                <Text style={styles.block_value}>{list.value}</Text>
                            </View>
                        )
                    ) }

                    <View style={{height: hp('15%'), marginBottom: 10}}></View>
                </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30
    },
    scroll_view : {
        height: hp('60%')
    },
    main_title : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    block : {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        padding: 20,
        marginBottom: 30
    },
    block_title : {
        fontSize: 20,
        marginBottom: 10
    },
    block_value : {
        fontSize: 18,
        color: 'grey'
    },
    spacer: {
        height: hp("12%"),
        marginBottom: 100
    },
    main_scroll : {
        flex: 1
    },
})