import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
class Doctor extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.nom}>
                    Docteur Hannibal trem
                </Text>
                <Text style={styles.specialite}>
                    medecin generaliste
                </Text>
                <Text style={styles.adresse}>
                    24, rue de temple
                </Text>
                <Text style={styles.pays}>
                    112 Nymes
                </Text>
            </View>
        );

    }
}
const styles=StyleSheet.create(
    {
        container:{
            justifyContent:'center',
            alignContent:'center',
            alignSelf:'center',
            borderWidth:0.1,
            marginTop:5,
            backgroundColor:'#fff',
            shadowColor: 'rgba(23, 149, 205, 0.5)',
            shadowOpacity: 5,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
            width:250
            
           
            
        },
        nom:{
            color:'#00C1B4',
            fontWeight:'bold',
            fontSize:16,
            alignSelf:'center',
        },
        specialite:{
            color:'#00C1B4',
            fontWeight:'bold',
            fontSize:14,
            alignSelf:'center',
        },
        adresse:{
            color:'#00C1B4',
            fontSize:13,
            alignSelf:'center',
        },
        pays:{
            color:'#00C1B4',
            fontSize:13,
            alignSelf:'center',
        }

    }
)
export default Doctor;