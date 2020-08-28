import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button,Linking, Alert,TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
const mapStateToProps = (state) => {
    return {
        Idquestion : state.Idquestion,
        point :state.point,
        age:state.age,
        taille:state.taille,
        poids:state.poids,
        
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
class DiagResult extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            index:1,
            error: null,
            isLoading: false,

            urgence : {}
          }   
          this.imc=0     
    }

    componentDidMount = async() =>{
        await this._getCountryCodeByLocation()
    }

    _getCountryCodeByLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }else{
            let location = await Location.getCurrentPositionAsync({});
        

            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=46.5286307,6.5124095&key=" + API_KEY)

      //  axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&key=" + API_KEY)
            .then(async response => {
                const globalRes = response.data.results[0].address_components
               
                let resObj = await globalRes.filter(el => {
                    return el.types.includes("country")
                })
                const local = await resObj[0].short_name
               let res= emergency.data.filter(el =>{
                   return el.Country.ISOCode == local
               })

               this.setState({
                   urgence : res
               })



            })
            .catch(err =>{
                console.log(err)
            })
        }

        

    };

    callUrgence = async () =>{
      
      
        let num = await   this.findNumber()
           this.callPerson(num.ambulance)  


    }

    callPerson(phone){
        let url;
        if(Platform.OS === 'ios') {
          url  = 'tel://'+phone
        }
        else if(Platform.OS === 'android') {
            url = 'tel:'+phone
            
        }
    
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(url)
                .catch(() => null);
            }
          });
        
    }

    findNumber = async  () =>{
        let urgence = this.state.urgence


        const num = {
            ambulance : urgence[0].Ambulance.All[0],
            fire : urgence[0].Fire.All[0],
            police : urgence[0].Police.All[0]
        }
        return num
    }

    calculIMC(){
       const taille= this.props.Idquestion.taille/100
       const poids=this.props.Idquestion.poids
       return poids/(taille*taille)
    }
    interpretation(){
        const point=this.props.Idquestion.point/2;
        if(this.props.Idquestion.point>=40){
            return "Appelez le 144, vos symptômes ou antécédents nécessitent un avis rapide."
            
        }
        else{
            if(this.props.Idquestion.point>=15 && this.props.Idquestion.point<=39){
                return "Votre situation peut relever d’un COVID 19 qu’il faut surveiller." 
            }
            if(this.props.Idquestion.point>=0 && this.props.Idquestion.point<15){
                return "Votre situation ne relève probablement pas du Covid-19  . N’hésitez pas à contacter votre médecin  en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation."
            }
        }
    }
    testGrave(){
        if(this.props.Idquestion.point>=40){
            return(
            <View>
                 <View style={styles.seConnecterFacebook}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() =>this.callPerson('144')}>
                       <Image style={styles.imageFacebook} source={require('../images/malaise.png')}/>
                       <Text style={styles.textFacebook}>Appel le  144 </Text>
                     </TouchableOpacity>
                   </View>
            </View>
            )
        }
    }
    callPerson(phone){
        let url;
        if(Platform.OS === 'ios') {
          url  = 'tel://'+phone
        }
        else if(Platform.OS === 'android') {
            url = 'tel:'+phone
            
        }
        Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url)
              .catch(() => null);
          }
        });
    }
    goHome(){
        const ques={Id:1,point:0,age:0,taille:0,poids:0}
        const action = { type: "Next", value: ques}
        this.props.dispatch(action)
        this.props.navigation.navigate("Menu")
    }
    render(){
        console.log(this.props)
        return(
            <ScrollView  style={styles.main_contenair}>
                
            <View style={styles.main_contenair}>
                <View style={styles.main}>
                <Text style={styles.question}>{this.interpretation()}</Text>
                <View style={styles.divQuestion}>
                    {this.testGrave()}
                 </View>  
                 <View style={styles.seConnecterFacebook}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() =>this.goHome() }>
                       <Image style={styles.imageFacebook} source={require('../images/Splash(FondBlanc).png')}/>
                       <Text style={styles.textMen}>Terminer</Text>
                     </TouchableOpacity>
                   </View>  
                  
                   
                </View>
                
            </View>
            </ScrollView>
        );
    }
}
const styles=StyleSheet.create(
    {
        main_contenair:{
            backgroundColor:"#00C1B4",
            flex:1
        },
        main:{
            alignContent:'center',
            alignItems:'center',
            marginTop:200
        },
        seConnecterFacebook:{
            height:70,
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
        imageFacebook:{
            width:60,
            height:60,
            marginLeft:-20
        },
        textFacebook:{
            color: 'red',
            fontSize:18,
            fontWeight:'bold',
            textAlign:'center',
           alignSelf:'center'
        },
        textMen:{
            color: '#00C1BC',
            fontSize:18,
            fontWeight:'bold',
            textAlign:'center',
           alignSelf:'center'
        },
        buttonStyle: {
            marginTop: 20, 
            width: 150, 
            backgroundColor: "white",
            //paddingTop: hp('1%'),
            paddingBottom: 10,
            //marginBottom: hp("2%"),
            borderBottomColor: "#008AC8",
            borderBottomWidth: 6,
            alignItems: "center"
          },
        question:{
            textAlign:'center',
            alignContent:'center',
            alignItems:'center',
            fontSize:18,
            color:'#fff',
            fontWeight:'bold',
            marginLeft:35,
            marginRight:35
            
        },
        text:{
           marginTop:200,
           textAlign:'center'
        }
    }
)
export default connect(mapStateToProps,mapDispatchToProps) (DiagResult);