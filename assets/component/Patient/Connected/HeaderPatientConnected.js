import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

class HeaderPatientConnected extends Component {
    constructor(props) {
        super(props)
    }

    _clickMenu() {
        this.props.navigation.navigate('FirstPage')
    }

    render() {
        return(
            <View style={styles.main_header}>
                <View style={styles.contain_1}>
                    <View>
                    <TouchableOpacity>
                        <Image style={styles.img_profil}
                            source={require("../../../images/user.png")}/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.contain_1_2}>
                            <Text style={styles.name_user}>
                                Pierrot Men
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
                        source={require("../../../images/icons/burger.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_header: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        display: 'flex',
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
        marginLeft: 20,
        paddingTop: 10
    },  
    contain_1 : {
        display: 'flex',
        flexDirection: 'row'
    },
    contain_2 : {
        marginTop: 30
    }
})

export default HeaderPatientConnected