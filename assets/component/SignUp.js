import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button, Keyboard,Alert,TouchableOpacity,ScrollView ,KeyboardAvoidingView} from 'react-native'
import { CheckBox, ThemeProvider } from 'react-native-elements'
import Loader from './loader'
import axios from 'axios';
import Bdd from '../API/Bdd'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoading: false,
          checked: false
        }
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
    
      }
      register(){
        let form = this.checkForm()
        if(form === false) {
         return;
         }
         let data = {
            prenomUser: this.firstName,
            nomUser: this.lastName,
            emailUser: this.email,
            passwordUser: this.password
          }
     this.setState({isLoading: true});
     axios.post(Bdd.api_url+'/signup', data )
     .then((res)=>{
        if(res.status ===400){
          this.setState({isLoading : false,error : "email existant"})
        }
        else{
          this.setState({isLoading : false})
          this.gotToWaitMail()
        }
     }).catch((err)=>{
       console.log('err',err);

     })
      }
      gotToWaitMail() {
        this.props.navigation.navigate("ActiveAccount",{tempEmail : this.email})
      }
      goLogin() {
        this.props.navigation.navigate("Login")
      }
      checkForm() {

        if(this.lastName === "") {
            Alert.alert("Vous n'avez pas remplis votre nom")
            return false;
        }
    
        if(this.firstName === "") {
            Alert.alert("Vous n'avez pas remplis votre prénom")
          return false;
        }
    
    
        
        if(this.email === "") {
            Alert.alert("Vous n'avez pas remplis votre email")
          return false;
        }
    
        if(this.password === "") {
            Alert.alert("Vous n'avez pas remplis votre mot de passe")
          return false;
        }
        if(this.state.checked === false) {
          Alert.alert("Vous devez valider la politique RGPD")
          return false;
        }
    
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if(reg.test(this.email) === false) {
            Alert.alert("Votre email n'est pas valide")
          return false;
        }
    
     /*   if(this.state.checked === false) {
          this.setState({error: "Vous devez valider la politique RGPD"});
          return false;
        }
    */
        return true;
    
      }
      onChangeInput(text, type){
        this[type] = text;
      }
    render(){
        return(
            <View style={{flex : 1, backgroundColor:'#00C1BC'}}>
                <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}  style={styles.main_contenair}>
                <Loader loading={this.state.isLoading} />
        
            <View style={styles.main_logo}>
                <Image style={styles.image} source={require('../images/Splash(FondBlanc).png')}/>
                <Text style={styles.text_Logo}>Best4Santé</Text>
            </View>
            <View style={styles.main_Input} >

                <Text style={styles.tex_Connexion}>Inscription</Text>
                {this.state.error !== null && <Text style={styles.error}>{this.state.error}</Text>}
               <TextInput  onChangeText={(text) => this.onChangeInput(text, 'lastName')}  style={styles.Input} placeholder="Nom"/>
               <TextInput onChangeText={(text) => this.onChangeInput(text, 'firstName')} style={styles.Input} placeholder="Prenom"/>
               <TextInput autoCapitalize = 'none' onChangeText={(text) => this.onChangeInput(text, 'email')} style={styles.Input} placeholder="Adresse mail"/>
               <TextInput autoCapitalize = 'none' secureTextEntry={true}  onChangeText={(text) => this.onChangeInput(text, 'password')}  style={styles.Input} placeholder="Mot de passe"/>
               <View style={styles.checkBox}>
               <CheckBox checked={this.state.checked} onPress={() => this.setState({ checked: !this.state.checked })} />
               <Text  style={styles.checkBoxText}>
                  J'accepte les CGU et la politique de 
                  {"\n"}
                  gestion de la confidentialité de 
                  {"\n"}
                  mes données
                </Text>
               </View>
               
               <View style={styles.seConnecter}>
               <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>this.register()}>
                   <Text style={styles.textConnexion}>S'inscrire</Text>
                 </TouchableOpacity>
               </View>

               <View style={styles.textLink}>
                   <Text onPress={()=>{this.goLogin()}} style={styles.textLinkWhite}>Déjà un compte</Text>
               </View>
 
            </View>
           
        </KeyboardAwareScrollView >
              <View style={styles.medecin}>
               <TouchableOpacity style={{alignSelf:'center'}}  onPress={() =>{this.props.navigation.navigate("RegisterDoctor")}}>
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
            marginTop:13
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
            paddingLeft:20
        
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
        error:{
            alignSelf:'center',
            color:'red',
            fontSize:14,
            marginTop:10
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
            marginTop:12
        },
        textLinkWhite:{
            alignSelf:'center',
            marginTop:5,
            color:'#fff'
        }
      
    }
)
export default SignUp;