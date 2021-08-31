import React, { Component } from "react"
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

export class Background extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <View style={styles.main}>
                <Image
                    style={styles.main_img}
                    resizeMode='cover'
                    source={require("../../images/blurground.jpeg")}
                    // blurRadius={1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        width: wp("100%")
    },
    main_img : {
        position: 'absolute', 
        width: wp("100%"), 
        height: hp("102%"), 
        marginTop: -20
    }
})