import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button,TouchableHighlight, Alert,TouchableOpacity,ScrollView,AsyncStorage,Keyboard } from 'react-native'
import Bdd from '../API/Bdd'
import axios from 'axios';
import Loader from './loader'
import { userConnected } from "../Action";
import { connect } from 'react-redux';
class Login extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            error: null,
            isLoading: false
          }
        this.email = "";
        this.password = "";
    }
    gotToRegister() {
        this.props.navigation.navigate("SignUp")
      }
      accueil() {
        this.props.navigation.navigate("Home")
      }
      _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
         
          // Error saving data
        }
      };
      onChangeInput(text, type){
        this[type] = text;
      }

      gotToRegisterDoctor = () =>{
        this.props.navigation.navigate("RegisterDoctor")
      }
      goToForgotPassword = ()=>{
        this.props.navigation.navigate("Forgot")
      }

     Connect(){
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if(reg.test(this.email) === false) {
          Alert.alert("Votre email n'est pas valide")
        return false;
      }
      
        let data = {
            emailUser: this.email,
            passwordUser: this.password
          }

        this.setState({isLoading: true});
        axios.post(Bdd.api_url+'/login', data )
        .then((res)=>{
         

          switch(res.data.message){
            case "wrong credential" : 
              this.setState({isLoading : false,error : "Mot de passe incorrect"})
              break;
            case "user dont exist" :
              this.setState({isLoading : false, error : "Ce compte n'existe pas, Veuillez créer un"})
              break;
            case "compte inactive" :
              this.setState({isLoading : false})
              this.props.navigation.navigate("ActiveAccount",{tempEmail : this.email})
              break;
            default : 
              this._storeData('bosToken', res.data.token)
              
           // registerForPushNotificationsAsync(res.data.user_id);
              this.setState({isLoading : false})
            
              //this.props.userConnected(res.data.connectUser)
            this.props.navigation.navigate("Menu")
              Keyboard.dismiss()
            break;
          }

          
        }).catch((err)=>{
          console.log('err',err);
  
        })
     }
    render(){
        return (
          <View style={{flex : 1, backgroundColor:'#00C1B4'}}>
              <ScrollView  style={styles.main_contenair}>
               <Loader loading={this.state.isLoading} />
                <View style={styles.main_logo}>
                    <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                    <Text style={styles.text_Logo}>Best4Santé</Text>
                </View>
                <View style={styles.main_Input} >
                    <Text style={styles.tex_Connexion}>Connexion
                    </Text>
                    {this.state.error !== null && <Text style={styles.error}>{this.state.error}</Text>}
                    <View style={styles.inputContainer}>
                     <Image style={styles.inputIcon} source={require('../images/mailIc.png')}/>
                    <TextInput style={styles.inputs}
                      autoCapitalize="none"
                      placeholder="Adresse mail"
                      returnKeyType="next"
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.onChangeInput(text, 'email')}/>
                    </View>
                    <View style={styles.inputContainer}>
                     <Image style={styles.inputIcon} source={require('../images/pwd.png')}/>
                    <TextInput style={styles.inputs}
                     autoCapitalize="none"
                      placeholder="Mot de passe"
                      returnKeyType="done"
                      secureTextEntry={true}
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.onChangeInput(text, 'password')}/>
                    </View>
                   <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.Connect()}>
                     <Text style={styles.signUpText}>Se connecter</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainerF, styles.signupButtonF]} onPress={() => this.Connect()}>
                     <Text style={styles.signUpTextF}>Connexion avec Facebook</Text>
                    </TouchableHighlight>
                   <View style={styles.textLink}>
                       <Text onPress={()=>{this.goToForgotPassword()}} style={styles.textLinkWhite}>Mot de passe oublié?</Text>
                       <Text onPress={(e)=>{ this.gotToRegister();}} style={styles.textLinkWhite}>Créer un compte</Text>
                   </View>
                  
                
                
                  
                  
                </View>
               
            </ScrollView >
            <View style={styles.medecin}>
                   <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>this.gotToRegisterDoctor()}>
                       <Text style={styles.textmedecin}>Vous êtes medecin ?</Text>
                     </TouchableOpacity>
             </View>
          </View>
            
        );

    }
}
const styles=StyleSheet.create(
    {   
     
        main_contenair:{
            flex:1,
           
        },
        buttonContainer: {
          marginTop:15,
          borderWidth:0.166,
          height:45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:20,
          width:250,
          borderRadius:30,
          shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
        },
        signupButton: {
          backgroundColor: "#00C1B4",
        },
        signUpText: {
          color: 'white',
          fontWeight:'bold'
          
        },
        buttonContainerF: {
          borderWidth:0.166,
          height:45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:1,
          width:250,
          borderRadius:30,
          shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
        },
        signupButtonF: {
          backgroundColor: "white",
        },
        signUpTextF: {
          color: '#1795cd',
          fontWeight:'bold'
          
        },
        buttonContainerM: {
          borderWidth:0.166,
          height:45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:1,
          width:250,
          marginTop:10,
          borderRadius:30,
          shadowColor: 'rgba(1, 161, 156, 1)',
            shadowOpacity: 1.5,
            elevation: 8,
            shadowRadius: 20 ,
            shadowOffset : { width: 1, height: 13},
        },
        signupButtonM: {
          backgroundColor: "#008ac8",
        },
        signUpTextM: {
          color: 'white',
          fontWeight:'bold'
          
        },
        inputContainer: {
          marginTop:8,
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          flexDirection: 'row',
          alignItems:'center'
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
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
            fontSize:18,
            marginTop:15,
            marginBottom:15
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
            marginTop:14,
            borderRadius:5,
            paddingLeft:20
        
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
            marginTop:10
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);