import React from 'react'
import {View,Text,StyleSheet,Image,TextInput, Alert,TouchableOpacity,ScrollView, AsyncStorage } from 'react-native'
import axios from 'axios'
import Bdd from "../API/Bdd"
import { userConnected } from "../Action";
import { connect } from 'react-redux';
class ActiveAccount extends React.Component{

    constructor(){
        super()
        this.state = {
            error : null
        }
        this.code = ""
    }

    resendCode = async () =>{
        let email = this.props.navigation.state.params.tempEmail
        console.log(email)
         await axios.post(`${Bdd.api_url}/resend/${email}`)
            .then( res=>{
                console.log(res)
            }).catch(
                (error) => console.log('erreur resend code ', error)
            );
    }

    validate = async  () =>{
        this.setState({invalidLength : null})
        let email = this.props.navigation.state.params.tempEmail
        let code = this.code
        await axios.get(`${Bdd.api_url}/confirmation/${email}/${code}`)
            .then( async res=>{
                if(res.data.message ==="wrong code"){
                    this.setState({error : "Code erroné, essayez de nouveau"})
                }else{
                    this.props.userConnected(res.data.connectUser)
                    await AsyncStorage.setItem("bosToken",res.data.token)
                    this.props.navigation.navigate("Menu")
                }
            })
    }

    navigateLogin() {
        this.props.navigation.navigate("Login")
      }
    render(){
        return(
            <ScrollView  style={styles.main_contenair}>
            <View style={styles.main_logo}>
                <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                <Text style={styles.text_Logo}>Best4Santé</Text>
            </View>
            <View style={styles.main_InContenair} >
                <Text style={styles.text_inscription}>Confirmation</Text>
                <Text style={styles.text_titreInactif}>Vous allez recevoir un code de confirmation
                 dans votre boîte mail. 
                 </Text>
                
                <TextInput keyboardType={"numeric"} style={styles.Input} onChangeText={(text) => this.code = text} />
              
                <TouchableOpacity  style={styles.Go} onPress={()=>this.validate()}>
                    <Text style={{textAlign : "center",color : "white"}}>Envoyer</Text>
                </TouchableOpacity>
                <View style={{marginTop : 15}}>
                    <Text style={{textAlign : "center",color :  "white"}}>
                        Pas de code ?
                    </Text>
                    <TouchableOpacity
                        onPress={()=> this.resendCode()}
                     style={{padding : 10, backgroundColor : "#008ac8", marginTop: 10}}>
                        <Text style={{textAlign : "center", color :"white"}}>Renvoyer</Text>
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
            backgroundColor:'#00C1BC'
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
            marginTop:40,
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
         
            backgroundColor:'#00C1BC',
            textAlign:'center',
            alignContent:'center',
            marginTop:20,
            borderWidth:0.2,
            borderRadius:5,
           padding : 15,
            fontSize:15,
            shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
            backgroundColor: '#00C1BC',
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
const mapStateToProps = (store) => {
    return {
       
    }
  }
  
  const mapDispatchToProps = {
    userConnected
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ActiveAccount);