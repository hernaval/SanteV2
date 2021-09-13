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
        title: 'Medicine',
        description: 'Malox, Paracetamole',
        hour: '14h30',
        day: 'Lu-Ma-Me'
    },
    {
        title: 'Appointment with Dr. Jean Mark',
        description: 'Control Lorem Ipsum',
        hour: '14h',
        day: '11-08-21'
    },
    {
        title: 'Appointment with Dr. Jean Mark',
        description: 'Control Lorem Ipsum',
        hour: '14h',
        day: '11-08-21'
    },
]

export class RappelPatient extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main}>
                <ScrollView style={styles.scroll_view}>
                <Text style={styles.main_title}>All reminders</Text>

                <View style={styles.main_scroll}>
                    { data.map(
                        list => (
                            <View style={styles.block}>
                        <View style={styles.block_1}>
                            <View style={styles.contain_img_rappel}>
                                <Image
                                source={require("../../../../images/icons/dossiers/bell.png")}
                                style={styles.img_rappel}
                                />
                            </View>
                            <Text style={styles.title_rappel}>
                                {list.title}
                            </Text>
                        </View>
                        <View style={styles.block_2}>
                            <View style={styles.block_2_}>
                                <Text style={styles.text_block}>
                                {list.description}
                                </Text>
                            </View>
                            <View style={styles.block_2_}>
                                <Image
                                source={require("../../../../images/icons/dossiers/wall-clock.png")}
                                style={styles.img_rappel}
                                />
                                <Text style={[styles.text_block, styles.text_detail_hour]}>
                                {list.hour}
                                </Text>
                                <Text style={[styles.text_block, styles.text_detail_date]}>
                                {list.day}
                                </Text>
                            </View>
                        </View>
                    </View>
                        )
                    )}

                    <View style={{height: hp('15%'), marginBottom: 10}}></View>
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
        backgroundColor: '#fbfafa',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    spacer: {
        height: hp("12%"),
        marginBottom: 100
    },
    main_scroll : {
        flex: 1
    },
    contain_img_rappel : {
        backgroundColor: '#FFF',
        width: 20,
        height: 20,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_rappel : {
        width: 15,
        height: 15
    },
    title_rappel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    block_1 : {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    block_2 : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    block_2_ : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_block : {
        flexWrap: 'wrap',
        fontSize: 12
    },
    text_detail_hour : {
        marginLeft: 8,
        marginRight: 8,
        borderRightColor: '#00C1B4',
        borderRightWidth: 1,
        paddingRight: 5
    }
})