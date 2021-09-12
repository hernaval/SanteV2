import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'expo-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const data = [0.6]
const chartConfig = {
    backgroundGradientFrom: '#008ac8',
    backgroundGradientTo: '#008ac8',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
}

export class MeasureTestObservationPatient extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main_}>
                <View style={styles.main_1}>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>11.1222</Text>
                        <Text style={styles.text_main}>ALIMENTS</Text>
                    </View>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>RESTANTES</Text>
                        <View style={[styles.contain_bar, {marginTop: 10}]}>
                            <View style={styles.bar_}></View>                            
                        </View>
                        <Text style={styles.text_mainly}>780Kcal</Text>
                    </View>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>11.000</Text>
                        <Text style={styles.text_main}>EXERCICE</Text>
                    </View>
                </View>

                <View style={styles.main_1}>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>GLUCIDES</Text>
                        <View style={styles.contain_bar}>
                            <View style={styles.bar_}></View>                            
                        </View>
                        <Text style={styles.text_main}>145 / 250 g</Text>
                    </View>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>PROTEINES</Text>
                        <View style={styles.contain_bar}>
                            <View style={styles.bar_}></View>                            
                        </View>
                        <Text style={styles.text_main}>145 / 250 g</Text>
                    </View>
                    <View style={styles.main_11}>
                        <Text style={styles.text_main}>LIPIDES</Text>
                        <View style={styles.contain_bar}>
                            <View style={styles.bar_}></View>                            
                        </View>
                        <Text style={styles.text_main}>145 / 250 g</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_ : {
        backgroundColor: '#008ac8',
        borderRadius: 5,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 50,
        paddingRight: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    main_1 : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    main_11 : {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
        alignItems: 'center'
    },
    text_main : {
        color: 'white',
        fontSize: 14,
    },
    text_mainly : {
        position: 'relative',
        fontSize: 23,
        fontWeight: 'bold',
        top: 5,
        color: 'white'
    },
    contain_bar : {
        width: 80,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#8080809e',
        marginTop: 7,
        marginBottom: 7
    },
    bar_ : {
        width: '70%',
        height: 5,
        backgroundColor: 'white'
    }
})