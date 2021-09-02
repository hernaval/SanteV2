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
        this.props.navigation.navigate('FirstPage')
    }

    render() {
        return(
            <View style={styles.main_header}>
                <View style={styles.contain_1}>
                    <View>
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
                        <Image style={{width: 20, height: 20}}
                        source={require("../../images/icons/burger.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
            // <View style={styles.main_header}> 
            //     <View style={styles.contain_1}>
            //             <View style={styles.contain_1_1}>
            //                 <TouchableOpacity>
            //                     <Image style={styles.img_profil}
            //                     source={require("../../images/user.png")}/>
            //                 </TouchableOpacity>
            //             </View>
            //             <View style={styles.contain_1_2}>
            //                 <Text style={styles.name_user}>
            //                     DR. Pierrot Men
            //                 </Text> 
            //                 <Text style={styles.description_user}>
            //                     Lorem ipsum
            //                 </Text>
            //             </View>
            //     </View>
            //     <View style={styles.contain_2}>
            //         <TouchableOpacity
            //          onPress={() => this._clickMenu()}>
            //             <Image
            //             source={require("../../images/icons/burger.png")}/>
            //         </TouchableOpacity>
            //     </View>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    main_header: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img_profil : {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50
    },
    name_user : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 0
    },
    description_user: {
        fontSize: 16,
        paddingLeft: 5
    },
    contain_1_2 : {
        marginLeft: 20,
        paddingTop: 0
    },  
    contain_1 : {
        display: 'flex',
        flexDirection: 'row'
    },
    contain_2 : {
        marginTop: 15
    }
})

export default HeaderProSante