import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { Background } from '../../../../Home/Background'
import { HeaderRoutePatient } from '../../HeaderRoutePatient'

const data = [
    {
        name: '1st dose',
        achieved: true,
        date: '01/10/2021',
        centre: 'Paris'
    },
    {
        name: '2nd dose',
        date: '11/12/2021',
        achieved: false,
        centre: 'Paris'
    }
]

export default class DetailPassSanitaire extends React.Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const id = navigation.getParam('id', 0);

    }

    _back() {
        this.props.navigation.navigate('DocumentPatient')
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Health pass" 
                backRoute="DocumentPatient"/>

                <ScrollView style={{height: hp('90%'), marginTop: 5}}>

                <View style={styles.main_card}>
                    <View style={styles.block_card_code}>
                    <Image
                    style={styles.qr_card}
                    source={require("../../../../../images/icons/qr-code.png")}
                    />
                    </View>
                    <View style={styles.block_card}>
                        <View style={styles.item_card}>
                            <Text style={styles.txt_card}>Name</Text>
                            <Text style={styles.txt_card}>Joyce Jones</Text>
                        </View>
                        <View style={styles.item_card}>
                            <Text style={styles.txt_card}>Date of birth</Text>
                            <Text style={styles.txt_card}>10/01/2021</Text>
                        </View>
                        <View style={styles.item_card}>
                            <Text style={styles.txt_card}>Age</Text>
                            <Text style={styles.txt_card}>21 ans</Text>
                        </View>
                        <View style={styles.item_card}>
                            <Text style={styles.txt_card}>Gender</Text>
                            <Text style={styles.txt_card}>Homme</Text>
                        </View>
                    </View>
                    <View style={styles.space_card}></View>
                    <View>
                        <Text style={styles.title_vaccination}>Vaccination</Text>
                        <View style={styles.item_card}>
                            <Text style={styles.txt_card}>Vaccine type</Text>
                            <Text style={styles.txt_card}>Pfiz OY</Text>
                        </View>

                        {
                            data.map(
                                list => (
                                    <View>
                                        <View style={styles.item_card}>
                                            <Text style={styles.txt_card}>{list.name}</Text>
                                            {
                                                (
                                                    list.achieved && (
                                                        <Text style={styles.txt_card, 
                                                            {color: '#008ac8', fontSize: 16}}>
                                                                Achieved
                                                        </Text>
                                                    )
                                                )
                                            }
                                            {
                                                (
                                                    !list.achieved && (
                                                        <Text style={styles.txt_card, 
                                                            {color: 'red', fontSize: 16}}>
                                                                Waiting
                                                        </Text>
                                                    )
                                                )
                                            }

                                        </View>
                                        <View style={styles.item_card}>
                                            <Text style={styles.txt_card}>Date of injection</Text>
                                            <Text style={styles.txt_card}>{list.date}</Text>
                                        </View>
                                        <View style={styles.item_card}>
                                            <Text style={styles.txt_card}>Center</Text>
                                            <Text style={styles.txt_card}>{list.centre}</Text>
                                        </View>
                                    </View>
                                )
                            )
                        }


                    </View>
                </View>
                <View style={styles.spacer}></View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20
    },
    main_card : {
        marginTop: 10,
        width: wp('90%'),
        backgroundColor: 'whitesmoke',
        minHeight: hp('80%'),
        marginLeft: wp('5%'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    block_card_code : {
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        borderColor: 'grey',
        borderWidth: 1
    },  
    item_card : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('100%'),
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    txt_card : {
        fontSize: 15
    },
    qr_card : {
        height: 200,
        width: '100%'
    },
    space_card : {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 2,
        width: wp('80%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        marginTop: 20
    },
    title_vaccination : {
        fontWeight: 'bold',
        marginLeft: wp('5%'),
        fontSize: 18,
        marginTop: 20,
        marginLeft: 30
    },
    spacer : {
        height: hp('10%')
    }
})