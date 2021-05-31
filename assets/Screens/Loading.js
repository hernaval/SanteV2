import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Plane, Flow } from 'react-native-animated-spinkit';
import { Avatar } from 'react-native-elements';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default class Loading extends Component {


    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
        // setTimeout(()=>{
        //     this.props.navigation.navigate("Menu")
        // },1500)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image style={styles.logo} resizeMode={"center"} source={require("../images/Splash(FondBlanc).png")} />
                    {/* <Avatar overlayContainerStyle={{backgroundColor  : "white"}} rounded size="xlarge" source={require("../images/Splash(FondBlanc).png")} /> */}
                    
                </View>
                <Text style={styles.best} >BEST4SANTE</Text>
               <View>
               <Flow color="#008ac890" size={100} />
                <Text>Veuillez patientez</Text>
               </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ffffff90",
        marginVertical: hp("2%"),
        marginHorizontal: wp("2%")
    },
    logoContainer : {
        borderColor : "red",
       

    },
    spinner: {
        marginBottom: 50
    },
    logo: {
        margin : 0,
        height: hp("50%"),
        width: wp("50%")
    },

    best: {
        fontWeight: "bold",
        fontSize: 26,
        textAlign : "center",
        position : "relative",
        top : hp("-25%"),
        color : "#00C1B4"
    },
   
})
