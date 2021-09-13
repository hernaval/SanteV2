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
        title: 'Blood type',
        value: 'B+'
    },
    {
        title: 'Allergies',
        value: 'Allergies'
    },
    {
        title: 'Organ donor',
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
                <Text style={styles.main_title}>All</Text>

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
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },
    scroll_view : {
        height: hp('60%')
    },
    main_title : {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    block : {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10
    },
    block_title : {
        fontSize: 18,
        marginBottom: 5
    },
    block_value : {
        fontSize: 16,
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