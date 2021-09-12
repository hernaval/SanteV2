import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { HeaderRoutePatient } from '../HeaderRoutePatient'
import { Background } from '../../../Home/Background'
import { BottomMenuUrgencePatient } from "./BottomMenuUrgencePatient";

const data = [
    {
        title: 'Accident',
        illustration: require('./../../../../images/icons/urgences/Icone_Accident.png')
    },
    {
        title: 'Malaise',
        illustration: require('./../../../../images/icons/urgences/Icone_Malaise.png')
    },
    {
        title: 'Agression',
        illustration: require('./../../../../images/icons/urgences/Icone_Agression.png')
    },
    {
        title: 'Détresse',
        illustration: require('./../../../../images/icons/urgences/Détresse.png')
    }
]

export default class UrgencePatient extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <BottomMenuUrgencePatient/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Urgences"/>
                
                <ScrollView style={{height: hp('95%'), marginLeft: 20, marginRight: 20, marginTop: 20}}>

                { this.state.data.map((item, key)=>(
                    <TouchableOpacity key={key} style={styles.contain_list}>
                        <Image
                        style={styles.img_list}
                        source={item.illustration}
                        />
                        <Text style={styles.title_list}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>)
                )}
                <View style={{height: hp('15%')}}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20
    },
    contain_list : {
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        marginTop: 10,
        marginBottom: 15
    },
    img_list : {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#00C1B4'
    },
    title_list : {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#008ac8',
        marginTop: 10
    }
})