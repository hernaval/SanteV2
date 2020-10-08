import React from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import {Button} from 'react-native-elements'
import Bdd from '../API/Bdd'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import axios from 'axios'
import {choices} from '../API/practioners'
const API_KEY = 'AIzaSyBsLpOwIkiMarHHrEDkiHUwrhM5rXtQw5U'
import Header from './Menu/Header'



class RegisterDoctor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      doctors: [],
      autocomplete: [],
      searh:"" ,
      selected: "",
      selectedIndex: null,
      isLoading: false,
      checked: false,
      invalidFirstName: null,
      invalidLastName: null,
      invalidEmail: null,
      invalidPassword: null,
      invalidCity: null,
    }
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.phone = null;
    this.address=null;
    this.zip=null;
    this.city=null;
    this.place_id=null;


  }

  gotToLogin() {
    this.props.navigation.push("Login")
  }

  gotToRegister() {
    this.props.navigation.push("SignUp")
  }

  onChangeInput(text, type){
    this[type] = text;
  }

  sendDoctor() {
    const champ = /^[a-zA-Z0-9_]+$/
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({invalidFirstName: null}, {invalidLastName: null}, {invalidPassword: null}, 
      {invalidCity: null}, {invalidEmail: null})

    if (this.firstName == "") {
      this.setState({invalidFirstName: "Champ vide"})
      return false;
    }

    if (champ.test(this.firstName) === false) {
      this.setState({invalidFirstName: "Caractère alphanumerique"})
      return false;
    }

    if (this.lastName == "") {
      this.setState({invalidFirstName: "Champ vide"})
      return false;
    }

    if (champ.test(this.lastName) === false) {
      this.setState({invalidLastName: "Caractère alphanumerique"})
      return false;
    }

    if (this.password == "") {
      this.setState({invalidPassword: "Champ vide"})
      return false;
    }

    if (this.city == "") {
      this.setState({invalidCity: "Champ vide"})
      return false;
    }
    
    if(reg.test(this.email) === false) {
      this.setState({invalidEmail: "Adresse email invalide"})
      return false;
    }

    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      zip: this.zip,
      city: this.city,
      place_id: this.place_id
    }


    axios.post(Bdd.api_url+'/api/doctor/signup', data )
      .then((res)=>{
        console.log('res',res);

        if (res.data.status === 401) {
          this.setState({error: res.data.error}, ()=>{console.log(this.state)})
        } else {
          this.gotToLogin()
        }
      }).catch((err)=>{
        console.log('err',err);

      })
  }

    renderList() {
        return this.state.autocomplete.map((auto, index)=>{
            return (<TouchableOpacity
                    key={index}
                    style={styles.list}
                    onPress={()=>{
                    this.setState({selected: auto.val},
                        this.onPressList({ val: auto.val, name: auto.name})
                    );
                    
                    }}
                >
                    <Text>{auto.name}</Text>
                </TouchableOpacity>)
        })
    }

    onPressList(value) {

        this.setState({search: value.name, autocomplete: []});


    
    }

    onChangeInputList(text){
        this.setState({search: text},()=>{
          this.createGoodList(this.state.search)
        })
    
    }

    createGoodList(keyword) {
        let selected = keyword.replace('é', 'e').replace('è', 'e').replace('ç', 'c').replace('à', 'a');
        let autocomplete = choices.filter(choice => choice.val.indexOf(selected.toLowerCase()) !== -1);
     
        this.setState({autocomplete});
    }

    onClickSearchDoctors() {
        this.setState({isLoading: true})
        axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?results=5&query='+this.firstName+' '+this.lastName+' '+this.state.selected+' '+this.city+'&key='+API_KEY)
            .then((res)=>{
              this.setState({isLoading: false})
              console.log('gmap research', res);
              let doctors = res.data.results;
              this.setState({doctors: doctors});
            })
            .catch((err)=>{
              console.log(err);
          })
    }

    changeValues(doctor, index) {
        if(this.state.selectedIndex === index) {
            this.phone = null;
            this.address=null;
            this.zip=null;
            this.city=null;
            this.place_id=null;
            this.setState({selectedIndex: null})
        } else {
            this.phone = null;
            this.address=doctor.formatted_address;
            this.zip=null;
            this.city=null;
            this.place_id=doctor.place_id;
            this.setState({selectedIndex: index})
        }
        
    }

    renderDoctorList() {
        if(this.state.doctors !== 0) {
            return this.state.doctors.map((doctor, index)=>{
                if(index < 5) {
                    return (<TouchableOpacity 
                        key={doctor.id} 
                        style={this.state.selectedIndex === index ? styles.selectedInfo : styles.notSelected}
                        onPress={(e)=>{
                            this.changeValues(doctor, index);
                        }}
                    >
                        <Text style={this.state.selectedIndex === index ? styles.selectedInfoTitle : styles.notSelectedTitle}>{doctor.name}</Text>
                        <Text style={this.state.selectedIndex === index ? styles.selectedInfoText : styles.notSelectedText}>{doctor.formatted_address}</Text>
                    </TouchableOpacity>)
                }
            })
        }
    }

  render(){
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
        </View>}
        <View style={{marginTop : 70}}>
          
        </View>
        <View style={{flex:1}}>
        
            <ScrollView style={{flex:1}}>
            <View style={styles.header}>
               
                <Text style={styles.center}>Enregistrement médecin</Text>
                {this.state.error !== null && <Text style={styles.center, styles.red}>{this.state.error}</Text>}
            </View>
          
            <TextInput 
                style={styles.Input}
                onChangeText={(text) => this.onChangeInputList(text)}
                value={this.state.search}
                placeholder="Specialite"
            />
            {this.state.autocomplete.length !== 0 &&<View style={styles.auto}>
                { this.renderList()}
            </View>}
       
          <TextInput 
            style={styles.Input}
            onChangeText={(text) => this.onChangeInput(text, 'lastName')}
            type="text"
            placeholder="Nom"
            //onSubmitEditing={() => this._searchFilms()}
          />
          <Text style={styles.invalid}>{this.state.invalidLastName}</Text>
          
          <TextInput 
            style={styles.Input}
            onChangeText={(text) => this.onChangeInput(text, 'firstName')}
            type="text"
            placeholder="Prénom"
            //onSubmitEditing={() => this._searchFilms()}
          />
          <Text style={styles.invalid}>{this.state.invalidFirstName}</Text>
          
          <TextInput 
            style={styles.Input}
            onChangeText={(text) => this.onChangeInput(text, 'email')}
            type="email"
            autoCapitalize = 'none'
            placeholder="Email"
            //onSubmitEditing={() => this._searchFilms()}
          />
          <Text style={styles.invalid}>{this.state.invalidEmail}</Text>
        
          <TextInput 
            style={styles.Input}
            onChangeText={(text) => this.onChangeInput(text, 'password')}
            type="password"
            secureTextEntry={true}
            autoCapitalize = 'none'
            placeholder="Mot de passe"
            //onSubmitEditing={() => this._searchFilms()}
          />
          <Text style={styles.invalid}>{this.state.invalidPassword}</Text>
    
        <TextInput 
            style={styles.Input}
            onChangeText={(text) => this.onChangeInput(text, 'city')}
            type="city"
            placeholder="Ville"
            //onSubmitEditing={() => this._searchFilms()}
          />
          <Text style={styles.invalid}>{this.state.invalidCity}</Text>

          <View style={{flexDirection: 'row', alignItems: "center",}}>
            <CheckBox
                onChange={(e)=>{this.setState({checked: !this.state.checked})}}
                value={this.state.checked}
              
            /><Text style={{color:'white'}}>J'accepte la politique RGPD</Text>
          </View>
          <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={(e)=>{this.onClickSearchDoctors()}}
                >
                  <Text style={styles.buttonText}>Rechercher</Text>
          </TouchableOpacity>
            {this.state.doctors.length !== 0 && <View style={{flex:1}}>
                <Text style={styles.footer}>Est-ce vous ?</Text>
                {this.renderDoctorList()}
                
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={(e)=>{this.sendDoctor()}}
                >
                  <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>}

            <View>
                <Text
                    style={styles.footer}
                    onPress={(e)=>{
                    this.gotToLogin()
                    }}
                >
                    Déjà un compte ?
                </Text>
                <Text
                    style={styles.footer2}
                    onPress={(e)=>{
                    this.gotToRegister()
                    }}
                >
                    Vous êtes patient ?
                </Text>
            </View>
          </ScrollView>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C1B4'
  },
  header: {
    position: 'relative',
    top: hp("3%"),
    zIndex:4,
    textAlign:'center'
  },
  under: {
    flex:1,
    maxHeight: hp('10%'),
  },
  head: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    textAlign: 'center',
    color: "white",
    fontSize: 21,
    marginBottom: hp('10%')
  },
  red:{
    color: 'red'
  },
  Input:{
    backgroundColor:'#fff',
    height:50,
    marginTop:14,
    borderRadius:5,
    paddingLeft:20

},
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: wp("70%"),
    paddingLeft: 15,
    backgroundColor: 'white',
    borderRadius: 1,
    marginBottom: hp('2%')
  },
  footer: {
    zIndex:4,
    textAlign:'center',
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
    color: "white"
  },
  footer2: {
    position: 'relative',
    bottom: hp("4%"),
    left: wp("5%"),
    zIndex:4,
    textAlign:'center',
    paddingTop: 15,
    paddingBottom: 15,
    width: wp('60%'),
    color: "white",
    backgroundColor: "#008AC8"
  },
  auto: {
    width: wp('72%'),
    borderColor: 'black',
    borderWidth: 1,
    position: "absolute",
    top: hp('24.5%'),
    zIndex:3,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  list: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    textAlign: 'center'
  },
  doctorList: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    textAlign: 'center'
  },
  selectedInfo: {
      backgroundColor: "#008AC8",
      width: wp('70%'),
      paddingBottom: hp('2%'),
      paddingTop: hp('2%'),
      paddingLeft: wp('2%'),
      paddingRight: wp('2%'),
      marginBottom: 5,
      
  },
  selectedInfoTitle: {
    color: 'white',
    textAlign: 'center'
},
  selectedInfoText: {
      color: 'white',
      textAlign: 'center'
  },
  notSelected: {
      backgroundColor: "white",
      width: wp('70%'),
      paddingBottom: hp('2%'),
      paddingTop: hp('2%'),
      paddingLeft: wp('2%'),
      paddingRight: wp('2%'),
      marginBottom: 5,
      
  },
  notSelectedTitle: {
    color: '#00C1B4',
    textAlign: "center"
  },
  notSelectedText: {
    color: '#008AC8',
    textAlign: "center"
  },
  title2: {
    color: "white",
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    textAlign: "center"
  },
  buttonStyle: {
    marginTop: hp("2%"), 
    width: wp("50%"), 
    borderColor:'red',
    backgroundColor: "#00C1B4",
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderRadius: 10,
    marginBottom: hp("2%"),
    marginLeft: hp("5%"),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#029B95',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: "center",
    fontSize: 16
  },
  loading_container: {
    position: 'absolute',
    zIndex:10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  invalid : {
    color: '#eb002a',
    textAlign: 'center'
  }
});

export default RegisterDoctor;
