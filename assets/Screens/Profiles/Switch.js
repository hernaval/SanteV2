import React, { Component } from 'react'
import { Card, Icon, Input } from 'react-native-elements'
import { BackHandler } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Modal,
  TouchableOpacity,
  Picker,
  TextInput
} from 'react-native'
import PropTypes from 'prop-types'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { setUserInfo,deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo ,ModifyPhoto } from '../../Action';
import { Avatar } from 'react-native-elements';
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Container, Header, Content, Form, Item, Label } from 'native-base';
import Cloud from '../../API/Cloud';
import DatePicker from 'react-native-datepicker';
 
const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class Switch extends Component {

  constructor(props) {
    super(props)
    this.Startmodify = this.Startmodify.bind(this);
    this.Endmodify = this.Endmodify.bind(this);
    this.Savemodify = this.Savemodify.bind(this);
    this.state = {
      isSelectedProfile: false,
      blood: '', 
      size: '',
      weight: '',
      profile: '',
      modifying: false,
      firstName: this.props.user.user.nomUser,
      lastName: this.props.user.user.prenomUser,
      name: this.props.user.user.nomUser + ' ' + this.props.user.user.prenomUser,
      phone: this.props.user.user.phoneUser,
      address: this.props.user.user.adresseUser,
      zip: this.props.user.user.zipUser,
      city: this.props.user.user.villeUser,
      id: this.props.user.user.idUser,
      dateNaissance: this.props.user.user.naissanceUser ? this.props.user.user.naissanceUser : '',
      age: this.props.user.user.ageUser ? this.props.user.user.ageUser : '',
      sexe: this.props.user.user.sexeUser ? this.props.user.user.sexeUser : '',
      firstName_: this.props.user.user.nomUser,
      lastName_: this.props.user.user.prenomUser,
      name_: this.props.user.user.nomUser + ' ' + this.props.user.user.prenomUser,
      phone_: this.props.user.user.phoneUser,
      address_: this.props.user.user.adresseUser,
      zip_: this.props.user.user.zipUser,
      city_: this.props.user.user.villeUser,
      id_: this.props.user.user.idUser,
      dateNaissance_: this.props.user.user.naissanceUser ? this.props.user.user.naissanceUser : '',
      age_: this.props.user.user.ageUser ? this.props.user.user.ageUser : '',
      sexe_: this.props.user.user.sexeUser ? this.props.user.user.sexeUser : '',
      rollGranted: true,
      cameraGranted: false,
      uri_doc: null,
      base64Img: null,
      photoUri: this.props.user.user.imageUser ? this.props.user.user.imageUser : this.DEFAUTL_USER,
      errLastName: "",
      errFirstName: "",
      errAddress: "",
      errZip: "",
      errVille: "",
      errPhone: "",
      isLoading: false,
      isModifbegin: false,
      modalVisible: false
    }

    console.log("deb");
    console.log(this.props.user);

    this.ref = firebase.firestore().collection('profile');
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.goToProfil = this.goToProfil.bind(this);

  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    const my_size = this.props.navigation.state.params.size;
    const my_blood = this.props.navigation.state.params.blood;
    const my_weight = this.props.navigation.state.params.weight;
    const my_profile = this.props.navigation.state.params.profile;
    this.setState({
      blood: my_blood, 
      size: my_size,
      weight: my_weight,
      profile: my_profile
    })
    this.setState({ isLoading: false })
    await this.getCameraPermissions()

   
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.navigate("MyProfil", {profil: this.state.photoUri})
    return true;
}

Startmodify() {
  this.setState({
    modifying: true
  })
}

Endmodify() {
  this.setState({
    modifying: false
  })
  // this.setState({
  //   firstName : this.state.firstName_,
  //   lastName : this.state.lastName_,
  //   name : this.state.firstName_ + ' ' + this.state.lastName_,
  //   phone : this.state.phone_,
  //   address : this.state.address_,
  //   city : this.state.city_,
  //   zip : this.state.zip_,
  //   name_ : this.state.firstName_ + ' ' + this.state.lastName_
  // })
}

Savemodify() {
  this.setState({
    modifying: false
  })
  this.modifInfoPerso()
}


  renderHeader = () => {
    
    return (
      <View style={styles.headerContainer}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>

        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: this.state.photoUri == null? DEFAUTL_USER : this.state.photoUri }}
        >
          <View style={styles.headerColumn}>

            <Image
              style={styles.userImage}
              source={{ uri: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri }}
            />
            <Text style={styles.userNameText}>{this.props.user.user.nomUser} {this.props.user.user.prenomUser} </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("MySante", {profil: this.state.photoUri})}>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'share', type: 'font-awesome' }} />
                </TouchableOpacity>
              </View>
              {this.state.isModifbegin === false &&
                <View style={styles.actionBtn}>
                  <TouchableOpacity onPress={() => this.setState({ isModifbegin: !this.state.isModifbegin })}>
                    <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'pencil', type: 'font-awesome' }} />
                  </TouchableOpacity>
                </View>
              }
              {this.state.isModifbegin === true &&
                <View style={styles.actionBtn}>
                  <TouchableOpacity onPress={() => {   
                      this.modifInfoPerso()

                  }}>
                    <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'save', type: 'font-awesome' }} />
                  </TouchableOpacity>
                </View>
              }
              <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() =>this._pickImage() }>
                  <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'camera', type: 'font-awesome' }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderHeader_1 = () => {

    return (
        <View style={styles.main_profil}>
            <View style={styles.under_main_profil_1}>
            <Avatar
            size={100}
            rounded
            source={{ uri: this.state.photoUri == null ? DEFAUTL_USER : this.state.photoUri }}
            />
            </View>

            <View style={styles.btn_photo}>
            <TouchableOpacity onPress={() => this.setState({ modalVisible: true})  }>
            <Avatar size={30} rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'camera', type: 'font-awesome' }} />
            </TouchableOpacity>
            </View>

            <View style={styles.under_main_profil_2}>
                <Text style={styles.text_under_main_profil_2}>{this.state.firstName} {this.state.lastName}</Text>
                {this.state.weight != '' && (
                  <Text style={styles.descr_under_main_profil_2}>
                  {this.state.size} cm - {this.state.weight} kg - {this.state.blood}
              </Text>
              )
              }
            </View>
            
        </View>
    )
  }

  modifInfoPerso = async () => {
    // if (this.state.phone.length > 0 && (this.state.phone.length < 8 || this.state.phone.length > 12)) {
    //   this.setState({errPhone: "Numero telephone invalid"})
    //   return;
    // }
    // this.setState({errPhone: null})

    this.setState({ isLoading: true })
    let userModified = {
      idUser : this.props.user.user.idUser,
      nomUser: this.props.user.user.nomUser,
      prenomUser: this.props.user.user.prenomUser,
      phoneUser: this.props.user.user.phoneUser,
      adresseUser: this.props.user.user.adresseUser,
      zipUser: this.props.user.user.zipUser,
      villeUser: this.props.user.user.villeUser,
      naissanceUser: this.props.user.user.naissanceUser,
      ageUser: this.props.user.user.ageUser,
      sexeUser: this.props.user.user.sexeUser
    }



    userModified.nomUser = this.state.firstName
    userModified.prenomUser = this.state.lastName
    userModified.phoneUser = this.state.phone
    userModified.adresseUser = this.state.address
    userModified.villeUser = this.state.city
    userModified.zipUser = this.state.zip
    userModified.naissanceUser = this.state.dateNaissance
    userModified.ageUser = this.state.age
    userModified.sexeUser = this.state.sexe
    console.log("---------");
    console.log(userModified);
    console.log("---------");
    this.setState({
      firstName_ : this.state.firstname,
      lastName_ : this.state.lastName,
      name_ : this.state.firstName + ' ' + this.state.lastName,
      phone_ : this.state.phone,
      address_ : this.state.address,
      city_ : this.state.city,
      zip_ : this.state.zip,
      dateNaissance_ : this.state.dateNaissance,
      age_ : this.state.age,
      sexe_ : this.state.sexe,
    })

   // let errorCount = await this.validationInfo(userModified)
   

   /*  if (errorCount == 0) {
      console.log("ato") */
      this.props.modifyUserInfo(userModified)
      this.setState({isModifbegin : false,isLoading : false})
   /*  }
    this.setState({ isLoading: false}) */
  }


  async validationInfo(data) {

    var numberPattern = /^[0-9]+$/
    var alphaPattern = /^([a-zA-Z0-9 _-]+)$/
    let count = 0

    if ( data.phone.length < 8 || data.phone.length > 12 || isNaN(data.phone)) {
      count++
      this.setState({ errPhone: "Vous devez entrer un numéro de téléphone valide" })
    } else {
      this.setState({ errPhone: null })
    }

    if (numberPattern.test(this.state.zip) === false || this.state.zip == "" || this.state.zip.length < 3 || this.state.zip.length > 6) {
      count++
      this.setState({ errZip: "Vous devez entrer un code postal valide" })
    } else {
      this.setState({ errZip: null })
    }

    if (alphaPattern.test(this.state.firstName) === false || this.state.firstName == "") {
      count++
      this.setState({ errFirstName: "Vous devez entrer un prénom valide" })
    } else {
      this.setState({ errFirstName: null })
    }
    if (alphaPattern.test(this.state.lastName) === false || this.state.lastName == "") {
      count++
      this.setState({ errLastName: "Vous devez entrer un nom valide" })
    } else {
      this.setState({ errLastName: null })
    }
    /* if (alphaPattern.test(this.state.address) === false || this.state.address == "") {
      count++
      this.setState({ errAddress: "Vous devez entrer une adresse valide" })
    } else {
      this.setState({ errAddress: null })
    } */
    
    if (alphaPattern.test(this.state.city) === false || this.state.city == "") {
      count++
      this.setState({ errVille: "Vous devez entrer un nom de ville valide" })
    } else {
      this.setState({ errVille: null })
    }

    return count
  }

  getCameraPermissions = async () => {
    const key = 'permission_camera';
    const value = await AsyncStorage.getItem(key);
    if(value === null) {
      Alert.alert('Camera', 
      'Nous demandons l\' accès à votre camera afin de completer votre profil', [
      {
          text: 'Suivant',
          onPress: async () => { 
            let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              Alert("permission not granteed")
              this.setState({
                rollGranted: false,
                cameraGranted: false,
              })
            } else {
              await AsyncStorage.setItem(key, 'OK');
              this.setState({
                rollGranted: true,
                cameraGranted: true,
              })
            }
          }
      }
        ])
      } else {
        this.setState({
          rollGranted: true,
          cameraGranted: true,
        }) 
    }
  }

  _pickImage = async () => {
    //launchCameraAsync
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing : true,
      base64: true,
      quality : 0.5
    });

    if (result.cancelled) {
      return
    }

    this._handleImagePicked(result);
  }

  takePictureAndCreateAlbum = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing : true,
      quality : 0.5,
      base64 : true
    });

    this._handleImagePicked(result)
  }

    showModal() {
        return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        >
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22}}>
          <View 
          style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, 
          alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
        
            <TouchableOpacity
               style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible })
                this._pickImage()
              }}
            >

              <Text style={styles.textStyle}>Importer une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible})
                this.takePictureAndCreateAlbum()
              }}
            >
              <Text style={styles.textStyle}>Prendre une photo</Text>

            </TouchableOpacity>
            <TouchableOpacity
            style={{ padding: 10, width: wp('40%'), alignItems: 'center', 
              backgroundColor: "#d3d3d3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: false})
              }}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
        </View>
        )
    }

 
    _handleImagePicked = async pickerResult => {
         
      let uploadUrl =""
      try {
        this.setState({ isLoading: true });
  
        if (!pickerResult.cancelled) {
          uploadUrl = await this.uploadImageAsync(pickerResult);
          this.setState({photoUri : uploadUrl})
        let data = {
          imageUser :uploadUrl,
          idUser : this.props.user.user.idUser
        }
       
       
          await  this.saveProfileImageInfo(data) 
          
        }

        this.setState({ isLoading: false });
      } catch (e) {
        console.log(e);
     
        this.setState({ isLoading: false });
       
        console.log('Upload Url ', uploadUrl)
        
      }
    }
    saveProfileImageInfo =  async (data) => {
       /*  let idUser = data.idUser
      await axios.put(`${Bdd.api_url}/${idUser}/pdp`, data)
    .then(async res => {
              
          }).catch(err=> console.log(err)) */
          
          this.props.ModifyPhoto(data)
          const token = await AsyncStorage.getItem("bosToken");
             this.props.setUserInfo(token)
    }
    uploadImageAsync = async (uri)  =>{
      let res = ""
      let data = {
          "file": `data:image/jpg;base64,${uri.base64}`,
          "upload_preset": 'dtziwafw'
      }
      await fetch(Cloud.cloudinary_api_upload, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
            let data = await r.json()
           

            if(data.error) {
              console.log('pas enregistré')
              return ;
            }

            res = data.secure_url

            
      }).catch(err=>console.log(err))
      return res
    }
  

  goToProfil() {
    this.props.navigation.navigate("MyProfil", {
      photo: this.state.photoUri
    })
  }

  render() {
    return (
      <View style={styles.container_1}>
          {this.state.isLoading && <View style={styles.loading_container_1}>
              <ActivityIndicator size="large" />
          </View>}
  
          {/*
          <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
            <TopMenu navigation={this.props.navigation} switch={1}/>
          </View>
           */
          }

          <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <HeaderMenu navigation={this.props.navigation} back={this.goToProfil} perso={1} start={this.Startmodify} end={this.Endmodify} save={this.Savemodify}/>
          </View>

          {this.showModal()}

          <ScrollView style={this.state.modifying ? styles.scroll_1 : styles.scroll_2}>
              {this.renderHeader_1()}

              {
                !this.state.modifying && 
                (
                  <View style={{marginLeft: 10}}>
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Prénom et Nom
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.name_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Date de naissance
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.dateNaissance_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Age
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.age_}
                        </Text>
                    </View>

                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Sexe
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.sexe_}
                        </Text>
                    </View>
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Ville
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.city_}
                        </Text>
                    </View>
                    
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Adresse
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.address_}
                        </Text>
                    </View>
                  
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Code Postal
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.zip_}
                        </Text>
                    </View>

                                  
                    <View style={styles.contain_info}>
                        <Text style={styles.labelInfo}>
                            Téléphone
                        </Text>
                        <Text 
                        style={styles.valueInfo}>
                            {this.state.phone_}
                        </Text>
                    </View>
                </View>
                )
              }

              {
                this.state.modifying && 
                (
                  <View>
                  <Form>
                    <Item stackedLabel>
                      <Label style={styles.labelInfo}>Prénom</Label>
                      <Input value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })}/>
                    </Item>
                                
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Nom</Label>
                      <Input value={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Date de naissance</Label>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={this.state.dateNaissance}
                      mode="date" // The enum of date, datetime and time
                      placeholder="select date"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirmer"
                      cancelBtnText="Annuler"
                      customStyles={{
                        dateIcon: {
                          //display: 'none',
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ dateNaissance: date })
                      }}
                    />
                    </Item>

                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Age</Label>
                    <TextInput
                    style={{width: "100%", marginTop: 10, marginBottom: 5, paddingLeft: 10}}
                    placeholder="Votre age"
                    placeholderTextColor="#60605e"
                    numeric
                    keyboardType={'numeric'}
                    onChangeText={(text)=> this.setState({ age: text })}
                    value={this.state.age}
                    />
                      {/* <Input value={this.state.age} onChangeText={(text) => this.setState({ age: text })}/> */}
                    </Item>

                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Sexe</Label>
                    <Picker
                      selectedValue={this.state.sexe}
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ sexe: itemValue })}
                    >
                      <Picker.Item label="Masculin" value="Masculin" />
                      <Picker.Item label="Feminin" value="Feminin" />
                    </Picker>
                    </Item>
                    
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Ville</Label>
                    <Input value={this.state.city} onChangeText={(text) => this.setState({ city: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Adresse</Label>
                    <Input value={this.state.address} onChangeText={(text) => this.setState({ address: text })}/>
                    </Item>
                  
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Code Postal</Label>
                    <Input value={this.state.zip} onChangeText={(text) => this.setState({ zip: text })}/>
                    </Item>
                
                    <Item stackedLabel last>
                    <Label style={styles.labelInfo}>Téléphone</Label>
                    <Input value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })}/>
                    </Item>
                  </Form>
                </View>
                )
              }
  {
}

        </ScrollView>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  datePickerStyle: {
    marginTop: 15,
    width: "90%",
    marginRight: "10%",
    marginBottom: 15
  },
  contain_info: {
    marginTop: 5,
    marginBottom: 10
  },
  labelInfo: {
    color: 'black', 
    fontSize: 17, 
    fontWeight: 'bold'
  },
  valueInfo: {
    color: 'black', 
    fontSize: 17, 
    marginLeft: 10, 
    borderBottomWidth: 1, 
    width: wp('95%'), 
    paddingBottom: 5, 
    paddingTop: 5
  },
  textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
  },
  my_label: {
    fontWeight: 'bold',
    color: '#000'
},
labelValue: {
    color: '#000',
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 5,
    marginBottom: 5
},
  main_profil: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 35
  },
  under_main_profil_1: {
      flex: 1,
      marginLeft: 50
  },
  under_main_profil_2: {
      flex: 4,
      paddingLeft: 0
  },
  text_under_main_profil_2: {
    fontSize: 28,
    fontWeight: '200',
    paddingTop: 7
  },
  descr_under_main_profil_2: {
    fontSize: 17,
    paddingTop: 17
  },
  btn_photo: {
    flex: 1,
    paddingTop: 70,
    position: "relative",
    left: -15
  },
  img_profil: {
      width: 200
  },
  scroll_1: {
    backgroundColor: 'white',
    marginTop: 120
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  scroll_2: {
    backgroundColor: 'white',
    marginTop: 90
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  under: {
    height: 0,
    // zIndex: 99
  },
  loading_container_1: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_1: {
    flex: 1,
    backgroundColor: '#00C1B4',
    zIndex: 40,
    justifyContent: 'center'
  },
  infoContainer: {
    padding: 20
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 16
  },
  labelValue: {
    color: "gray"
  },
  actionBtn: {
    position: "relative",
    top: -10,
    zIndex: 99999,
    paddingLeft: 3,
    paddingRight: 3
  },
  choiceItem: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: "#01C89E",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  loading_container: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error:{
    alignSelf:'center',
    color:'red',
    fontSize:14,
    marginTop:10
  }
})

const mapStateToProps = (store) => {
  return {
    user: store.user,
    /* contact: store.contact,
    second: store.second */
  }
}

const mapDispatchToProps = {
  setUserInfo,
  deleteContact,
  modifyUserInfo,
  setSecondInfo,
  setIndexSelected,
  ModifyPhoto
}
export default connect(mapStateToProps, mapDispatchToProps)(Switch)