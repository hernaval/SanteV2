import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

export class BottomMenuProSante extends Component {
    constructor(props) {
        super(props)
    }

    _changeTab() {
        console.log('Change Tab');
    }

    render() {
        return(
            <View style={styles.main_bottom}>
                <View style={styles.contain_bottom}>
                    <TouchableOpacity 
                    style={styles.touch_bottom}
                    onPress={() => {this._changeTab()}}>
                        <Image style={styles.img_bottom}
                        source={require("../../images/icons/home.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_bottom}>
                    <TouchableOpacity 
                    style={styles.touch_bottom}
                    onPress={() => {this._changeTab()}}>
                        <Image style={styles.img_bottom}
                        source={require("../../images/icons/Favoris.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_bottom}>
                    <TouchableOpacity 
                    style={styles.touch_bottom}
                    onPress={() => {this._changeTab()}}>
                        <Image style={styles.img_bottom}
                        source={require("../../images/icons/messenger.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_bottom}>
                    <TouchableOpacity 
                    style={styles.touch_bottom}
                    onPress={() => {this._changeTab()}}>
                        <Image style={styles.img_bottom}
                        source={require("../../images/icons/notification.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_bottom}>
                    <TouchableOpacity 
                    style={styles.touch_bottom}
                    onPress={() => {this._changeTab()}}>
                        <Image style={styles.img_bottom}
                        source={require("../../images/icons/Mon-compte.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_bottom : {
        backgroundColor: '#fbfafa',
        width: wp('100%'),
        height: hp('10%'),
        zIndex: 10,
        position: 'absolute',
        top: hp('90%'),
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    touch_bottom : {
        margin: 10
    },
    img_bottom : {
        width: 33,
        height: 35
    } 
})