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
        title: 'Médicament',
        description: 'Malox, Paracetamole',
        hour: '14h30',
        day: 'Lu-Ma-Me'
    },
    {
        title: 'Rendez-vous avec Dr. Jean Mark',
        description: 'Contrôle Lorem Ipsum',
        hour: '14h',
        day: '11-08-21'
    },
    {
        title: 'Rendez-vous avec Dr. Jean Mark',
        description: 'Contrôle Lorem Ipsum',
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
                <Text style={styles.main_title}>Tous les rappels</Text>

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
        backgroundColor: '#fbfafa',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        padding: 20,
        marginBottom: 30
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
        width: 45,
        height: 45,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_rappel : {
        width: 25,
        height: 25
    },
    title_rappel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
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
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_block : {
        flexWrap: 'wrap',
        fontSize: 18
    },
    text_detail_hour : {
        marginLeft: 20,
        marginRight: 20,
        borderRightColor: '#00C1B4',
        borderRightWidth: 1,
        paddingRight: 20
    }
})