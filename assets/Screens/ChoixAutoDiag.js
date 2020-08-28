import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';

export default class ChoixAutoDiag extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom : 50}}>
                    <Text style={{textAlign :"center",color : "white",fontSize : 22, fontWeight : "bold"}}>Participer à l'autodiagnostique de Best4Sante sur : </Text>
                </View>
                <View style={{flexDirection : "row",justifyContent : "space-between"}}>

                  <Button mode="contained"  style={{backgroundColor : "#008AC8"}} onPress={()=> this.props.navigation.navigate("WelcomeToDiag")}>
                        COVID-19
                  </Button>

                  <Button  disabled  >
                        Autre
                  </Button>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#00C1BC",
        justifyContent : "center",
        alignItems :"center",
        padding : 20,
    }
   
})
