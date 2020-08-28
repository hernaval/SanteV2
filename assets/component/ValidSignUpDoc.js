import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button, Alert,TouchableOpacity,ScrollView,Picker } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Doctor from './Doctor'
class ValidSignUpDoc extends React.Component{
    constructor(props){
        super(props)
        this.state={language:'selectionnez votre spécialité'}

    }
 
    render(){

        return(
            <ScrollView  style={styles.main_contenair}>
            <View style={styles.main_logo}>
                <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                <Text style={styles.text_Logo}>Best4Santé</Text>
            </View>
            <View style={styles.main_Input} >
                <Text style={styles.tex_Connexion}>Inscription</Text>
                <Text style={styles.text_ps}>Professionnels de la santé</Text>
                <ScrollView style={styles.doct_contenair}>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                </ScrollView>
               
               <View style={styles.seConnecter}>
               <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>Alert.alert('creation compte')}>
                   <Text style={styles.textConnexion}>Valider</Text>
                 </TouchableOpacity>
               </View>

               <View style={styles.textLink}>
                   <Text onPress={()=>Alert.alert('Déja un compte')} style={styles.textLinkWhite}>Déjà un compte ?</Text>
               </View>
            
            
              
              
            </View>
           
        </ScrollView >
        );
    }
}
const styles=StyleSheet.create(
    {
        main_contenair:{
            flex:1,
            backgroundColor:'#00C1B4'
        },
        doct_contenair:{
           height:250,
           width:300,
           marginTop:25,
           marginBottom:25,
           alignSelf:'center'

        },
        picker: {
            height: 40,
            backgroundColor: '#FFF',
            borderColor: 'white',
            marginTop:10,
            borderRadius:5,
            paddingLeft:20,
          },
          
          pickerItem: {
            height: 40,
            fontSize:14,
            color:'grey',
            borderColor: 'white',
            textAlign:'left',
            
          },
        image:{
            width:150,
            height:150,
            alignSelf:'center'
        },
        imageFacebook:{
            width:20,
            height:20,
            marginTop:10
        },
        main_logo:{
            marginTop:45,
            flex:1,
            alignSelf:'center',

        },
        text_Logo:{
            alignSelf:'center',
            color:'#fff',
            fontSize:40,
            fontWeight: "bold"
        },
        tex_Connexion:{
            alignSelf:'center',
            color:'#fff',
            fontSize:18,
            marginTop:15
        },
        text_ps:{
            alignSelf:'center',
            color:'#fff',
            fontSize:15,
            marginTop:10
        },
        main_Input:{
            flex:3,
            alignSelf:'center',
            width:250,
            marginTop:5
          
            
        },
        Input:{
            backgroundColor:'#fff',
            height:40,
            marginTop:10,
            borderRadius:5,
            paddingLeft:20,
            justifyContent:'center'
        
        },
        checkBox:{
            flexDirection:'row'
        },
        checkBoxText:{
            color:"#fff",
            fontSize:12,
            alignSelf:'center',
            marginLeft:-12
        },
        seConnecter:{
            height:50,
            backgroundColor:'#00C1B4',
            textAlign:'center',
            alignContent:'center',
            marginTop:10,
            borderWidth:0.2,
            borderRadius:5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 50,
            paddingRight: 50,
            fontSize:15,
            shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
            backgroundColor: '#00C1B4',
            color: '#FFFFFF'
        },
        medecin:{
            height:50,
            textAlign:'center',
            alignContent:'center',
            marginTop:25,
            borderWidth:0.2,
            borderRadius:5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 50,
            paddingRight: 50,
            fontSize:15,
            shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
            backgroundColor: '#008ac8',
            color: '#FFFFFF'
        },
        seConnecterFacebook:{
            height:50,
            backgroundColor:'#00C1B4',
            textAlign:'center',
            alignContent:'center',
            marginTop:10,
            borderWidth:0.2,
            borderRadius:5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 50,
            paddingRight: 50,
            fontSize:15,
            shadowColor: 'rgba(23, 149, 205, 0.5)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
            backgroundColor: '#FFF',
            color: '#1795cd',
        },
        textFacebook:{
            color: '#1795cd',
            fontSize:15,
            width:200,
            marginTop:10,
            marginLeft:10,
            fontWeight:'bold'
        },
        textConnexion:{
            color: '#FFF',
            fontSize:15,
            width:200,
            marginTop:10,
            fontWeight:'bold',
            textAlign:'center'
        },
        textmedecin:{
            color: '#FFF',
            fontSize:15,
            width:200,
            marginTop:10,
            marginLeft:50,
            fontWeight:'bold'
        },
        textLink:{
            alignSelf:'center',
            marginTop:25
        },
        textLinkWhite:{
            alignSelf:'center',
            color:'#fff'
        }
      
    }
)
export default ValidSignUpDoc;