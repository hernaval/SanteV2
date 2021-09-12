import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { Background } from '../../../Home/Background';
import { HeaderRoutePatient } from '../HeaderRoutePatient'

export default class EspaceBienEtrePatient extends React.Component {
    constructor(props) {
        super(props)
    }

    _goTo(route) {
        if (!route) return false
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Mon espace bien-être"/>
                <ScrollView>
                <TouchableOpacity 
                style={[styles.block, styles.block_1]}
                onPress={() => this._goTo('ProfilEspaceBienEtrePatient')}>
                    <ImageBackground
                    style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                    source={require('./../../../../images/espace_bien_etre/waist-up-portrait-of-handsome-serious-unshaven-male-keeps-hands-together-dressed-in-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer.jpg')}>
                    </ImageBackground>
                    <Text style={styles.block_title}>Mon profil</Text>    
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.block, styles.block_1]}
                onPress={() => this._goTo('AlimentationEspaceBienEtrePatient')}>
                    <ImageBackground
                    style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                    source={require('./../../../../images/espace_bien_etre/pexels-ella-olsson-1640777.jpg')}>
                    </ImageBackground>
                    <Text style={styles.block_title}>Mon alimentation</Text>    
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.block, styles.block_1]}
                onPress={() => this._goTo('FormeEspaceBienEtrePatient')}>
                    <ImageBackground
                    style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                    source={require('./../../../../images/espace_bien_etre/pexels-jonathan-borba-3076513.jpg')}>
                    </ImageBackground>
                    <Text style={styles.block_title}>Ma forme</Text>    
                </TouchableOpacity>

                <View style={{height: hp('10%')}}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20
    },
    block : {
        display: 'flex',
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    block_1 : {
        backgroundColor: 'black'
    },
    block_title : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})