import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button, Alert,TouchableOpacity,ScrollView } from 'react-native'
import Bdd from '../API/Bdd'
import axios from 'axios';
class WelcomeToDiag extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            error: null,
            isLoading: false
          }
    }

    render(){
        return (
            <ScrollView  style={styles.main_contenair}>
                <View style={styles.main_logo}>
                    <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                    <Text style={styles.text_Logo}>Best4Santé</Text>
                </View>
                <View style={styles.main_Input} >
                    <Text style={styles.tex_Connexion}>Bienvenue!</Text>
                    <Text style={styles.tex_welcome}>Bienvenue sur le test d'autodiagnostic COVID-19, réalisé par l'équipe d'acadys</Text>
                    <Text style={styles.tex_welcome}>Attention, cette application n’est pas un dispositif médical, il ne délivre pas d’avis médical.</Text>
                   <View style={styles.medecin}>
                    <TouchableOpacity style={{padding : 20, backgroundColor : "#008ac8",marginTop : 20}}  onPress={() =>this.props.navigation.navigate("AutoDiagnostique")}>
                       <Text style={{color :"white",textAlign : "center"}}>Commencer </Text>
                     </TouchableOpacity>
                    
                    
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
            marginTop:65,
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
            fontSize:16,
            marginTop:35,
            fontWeight: "bold"
        },
        tex_welcome:{
            alignSelf:'center',
            textAlign:'center',
            color:'#fff',
            fontSize:15,
            marginTop:25,
            
        },
        error:{
            alignSelf:'center',
            color:'red',
            fontSize:14,
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
            height:50,
            marginTop:20,
            borderRadius:5,
            paddingLeft:20
        
        },
        seConnecter:{
            height:50,
            backgroundColor:'#00C1BC',
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
            backgroundColor: '#00C1BC',
            color: '#FFFFFF'
        },
        /* medecin:{
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
        }, */
        seConnecterFacebook:{
            height:50,
            backgroundColor:'#00C1BC',
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
            marginLeft:100,
            fontWeight:'bold'
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
            marginTop:35
        },
        textLinkWhite:{
            alignSelf:'center',
            marginTop:10,
            color:'#fff'
        }
      
    }
)
export default WelcomeToDiag;