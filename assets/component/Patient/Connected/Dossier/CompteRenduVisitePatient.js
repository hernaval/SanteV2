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
        title: 'Report 1',
        description: 'Lorem ipsum, dolor asit',
        date: '10-08-21'
    },
    {
        title: 'Report 2',
        description: 'Lorem ipsum, dolor asit',
        date: '10-08-21'
    },
    {
        title: 'Report 3',
        description: 'Lorem ipsum, dolor asit',
        date: '10-08-21'
    },
    {
        title: 'Report 4',
        description: 'Lorem ipsum, dolor asit',
        date: '10-08-21'
    }
]

export class CompteRenduVisitePatient extends Component {
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
                                <View style={styles.contain_block_value}>
                                    <Text style={styles.block_value}>{list.description}</Text>
                                    <Text style={styles.block_value}>{list.date}</Text>
                                </View>
                            </View>
                        )
                    ) }

                    <View style={{height: hp('5%'), marginBottom: 10}}></View>
                </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15
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
        padding: 20,
        marginBottom: 15
    },
    block_title : {
        fontSize: 18,
        marginBottom: 10
    },
    contain_block_value : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    block_value : {
        fontSize: 14,
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