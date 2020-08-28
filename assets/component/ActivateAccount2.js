import React from 'react'
import {View,Text,StyleSheet,Image,TextInput, Alert,TouchableOpacity,ScrollView } from 'react-native'
class ActivateAccount2 extends React.Component{
    render(){
        return(
            <ScrollView  style={styles.main_contenair}>
            <View style={styles.main_logo}>
                <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                <Text style={styles.text_Logo}>Best4Santé</Text>
            </View>
            <View style={styles.main_InContenair} >
                <Text style={styles.text_inscription}>Inscription</Text>
                <Text style={styles.text_titreInactif}>Votre compte est encore inactif</Text>
                <Text style={styles.text_Inactif}>Pour l'activer, veuillez cliquer sur le lien que vous venez de recevoir dans votre boîte mail</Text>

               <View style={styles.Go}>
               <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>Alert.alert(' Go accueil')}>
                   <Text style={styles.textGo}>C'est fait</Text>
                 </TouchableOpacity>
               </View>
               <View style={styles.textLink}>
                   <Text onPress={()=>Alert.alert('creer un compte')} style={styles.textLinkWhite}>Déjà un compte ?</Text>
               </View>
               <View style={styles.medecin}>
               <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>Alert.alert('je suis medecin')}>
                   <Text style={styles.textmedecin}>Vous êtes medecin ?</Text>
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
        text_inscription:{
            alignSelf:'center',
            color:'#fff',
            fontSize:18,
            marginTop:35
        },
        text_titreInactif:{
            alignSelf:'center',
            color:'#fff',
            fontSize:16,
            marginTop:35,
            fontWeight:'bold'
        },
        text_Inactif:{
            alignSelf:'center',
            color:'#fff',
            fontSize:16,
            marginTop:35,
            textAlign:'center'
        },
        main_InContenair:{
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
        Go:{
            height:50,
            backgroundColor:'#00C1B4',
            textAlign:'center',
            alignContent:'center',
            marginTop:60,
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
            color: '#FFFFFF',
            width:150,
            alignSelf:'center'
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
        textGo:{
            color: '#FFF',
            fontSize:15,
            width:200,
            marginTop:10,
            textAlign:'center',
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
            marginTop:70
        },
        textLinkWhite:{
            alignSelf:'center',
            marginTop:10,
            color:'#fff'
        }
      
    }
)
export default ActivateAccount2;