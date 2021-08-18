import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

class HeaderProSante extends Component {
    constructor(props) {
        super(props)
    }

    _clickMenu() {
        console.log("Menu")
    }

    render() {
        return(
            <View style={styles.main_header}> 
                <View style={styles.contain_1}>
                        <View style={styles.contain_1_1}>
                            <TouchableOpacity>
                                <Image style={styles.img_profil}
                                source={require("../../images/user.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contain_1_2}>
                            <Text style={styles.name_user}>
                                DR. Pierrot Men
                            </Text> 
                            <Text style={styles.description_user}>
                                Lorem ipsum
                            </Text>
                        </View>
                </View>
                <View style={styles.contain_2}>
                    <TouchableOpacity
                     onPress={() => this._clickMenu()}>
                        <Image
                        source={require("../../images/icons/burger.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_header: {
        margin: 30,
        marginTop: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img_profil : {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50
    },
    name_user : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description_user: {
        fontSize: 17,
        paddingLeft: 5
    },
    contain_1_2 : {
        marginLeft: 90,
        paddingTop: 10
    },  
    contain_1 : {
        flex: 5,
    },
    contain_2 : {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 30
    }
})

export default HeaderProSante