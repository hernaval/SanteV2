import React, { Component } from 'react'
import { AppRegistry, StyleSheet, TouchableHighlight,Alert,Image, Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import ViewPager from '@react-native-community/viewpager';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StepIndicator from 'react-native-step-indicator'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { connect } from 'react-redux';
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import axios from 'axios'
import Bdd from "../../API/Bdd"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5']

/* 
var firebaseConfig = {
  apiKey: "AIzaSyCFQRgRJZu_IQhNbuXxtOMqwfmTZ1CB_mM",
  authDomain: "crud-app-2d3f3.firebaseapp.com",
  databaseURL: "https://crud-app-2d3f3.firebaseio.com",
  projectId: "crud-app-2d3f3",
  storageBucket: "crud-app-2d3f3.appspot.com",
  messagingSenderId: "242697897412",
  appId: "1:242697897412:web:41b0272255d83dce3ad091",
  measurementId: "G-F51CRJVR0P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); */



class Test extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
      typeDoc: "",
      isAutre: false,
      modalVisible: false,

      rollGranted: true,
      cameraGranted: false,
      uri_pict: null,
      pict_name: null,
      uri_doc: null,
      isCamera: false,
      base64Img: null,
      doc: {},
      name: "",
      isLoading: false,
      docCategorie: ""
    }
  }

  componentDidMount = async () => {
    await this.getCameraPermissions()
  }

  getCameraPermissions = async () => {

    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert("permission not granteed")
      this.setState({
        rollGranted: false,
        cameraGranted: false,
      })
    } else {
      this.setState({
        rollGranted: true,
        cameraGranted: true,
      })
    }
  }

  UNSAFE__componentWillReceiveProps(nextProps, nextState) {
    if (nextState.currentPage != this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }

  goToDocumentMenu = () => {
    this.props.navigation.navigate("FileManager")
  }

  _pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing : true,
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    // });

    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false
    });

    //console.log(result)

    this._handleImagePicked(result);
  }

  takePictureAndCreateAlbum = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing : true,
      quality : 0.5
    });
    console.log("ok")

    this._handleImagePicked(result)
   
  }

  _handleImagePicked = async pickerResult => {
    let uploadUrl =""
    try {
      this.setState({ isLoading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        this.setState({uri_doc : uploadUrl})
        
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ isLoading: false });
      /* this.props.navigation.navigate("MonProfil") */
      this.setState({photoUri : uploadUrl})
    }
  }
  
  uploadImageAsync = async (uri)  =>{
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
     
   xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const id = Math.random().toString()
    const ref = firebase
      .storage()
      .ref()
      .child(id);
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }


 async saveDoc(){
   console.log("doc savena eto")
    let data = {
      idUser : this.props.user.user.idUser,
      nomDoc : this.state.name,
      cateDoc : this.state.docCategorie,
      typeDoc : this.state.uri_doc,
    }
       //
       this.setState({ isLoading: true });
       await axios.post(`${Bdd.api_url}/document`,data)
        .then(_=> {
          this.props.navigation.navigate("FileManager")
        })
        .catch(err=> console.log(err))
        this.setState({ isLoading: false });
  }
  
  getCamera() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>}
        {this.state.uri_pict === null && <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />}
        {this.state.uri_pict === null && <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert('Permissions not granted')
          }
          style={styles.buttonContainer}>
          <View style={styles.buttonRond}>

          </View>
        </TouchableOpacity>}
       
        {this.state.uri_pict === null && <TouchableOpacity
          onPress={() =>
            this.setState({ isCamera: false })
          }
          style={styles.buttonContainer2}>
          <View style={styles.buttonBack}>
            <Text style={styles.textBack}>
              retour
                  </Text>
          </View>
        </TouchableOpacity>}
        {this.state.uri_pict !== null && <Image
          style={{ marginLeft: wp('0%'), marginTop : hp("20%"),  width: wp('100%'), height: wp('100%') }}
          source={{ uri: this.state.uri_pict }}
        />}
        {this.state.uri_pict !== null && <View>
          {this.state.uri_pict !== null && <TouchableOpacity
          onPress={() =>
            this.setState({ uri_pict: null })
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Annuler
                  </Text>
          </View>
        </TouchableOpacity>}
        {this.state.uri_pict !== null && <TouchableOpacity
          onPress={() =>
            this.setState({ isCamera: false, uri_doc: null })
          }
          style={styles.buttonContainer3}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Sauvegarder
                  </Text>
          </View>
        </TouchableOpacity>}
      
        </View>}

      </View>
    );
  }

  renderViewPagerPage = data => {
    return (
      <View style={styles.page}>
        <Text>{data}</Text>
      </View>
    )
  }

  renderDocumentType = (typeDocument) => (
    <View style={styles.page}>
      <View>
        <Text style={{fontWeight : "bold", fontSize : 20,paddingBottom : 70}}>Choisir le type de votre document</Text>
      </View>
      <RadioForm
        
        radio_props={typeDocument}
        initial={-1}
        onPress={(value) => {
          if (typeDocument[value].title === "aut") {
            this.setState({  isAutre: true })
          } else {
            this.setState({ docCategorie: typeDocument[value].title, isAutre: false })
          }

        }}
      />
      {this.state.isAutre === true && <TextInput onChangeText={(text) => this.setState({
        docCategorie : text
      })} placeholder="autre doc" />}
      {this.state.docCategorie !== "" &&
      <TouchableOpacity
         style={{ ...styles.openButton, backgroundColor: "#FFFFFF" }}
      onPress={() => {
        this.viewPager.setPage(2)
      }}>
         <Text style={styles.textSuivant}>Suivant</Text> 
        
      </TouchableOpacity>}
    </View>

  )

  renderDocumentUpload = () => (
    <View style={styles.page}>

      <Modal
        
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
         
          <View style={styles.modalView}>
          <TouchableOpacity ></TouchableOpacity>
            <TouchableHighlight
              style={{ ...styles.openButton2, backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible })
                this._pickImage()
              }}
            >
              <Text style={styles.textStyle}>Importer une photo</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton2, backgroundColor: "#2196F3", marginBottom: 20 }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible})
                this.takePictureAndCreateAlbum()
              }}
            >
              <Text style={styles.textStyle}>Prendre une photo</Text>

            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton2, backgroundColor: "#d3d3d3" }}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible})
              
              }}
            >
              <Text style={styles.textStyle}>Annuler</Text>

            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      
        
      <Text style={{fontSize : 20, fontWeight : "bold"}}>Attacher un document</Text>
        
      <TouchableOpacity style={{paddingTop :  70}} onPress={() => this.setState({ modalVisible: true })}>
        <FontAwesomeIcon size={70} icon={faUpload}  />
      </TouchableOpacity  >
    
      
      {this.state.uri_doc !== null && <Text style={styles.docText}>Votre document est prêt</Text>}
      {this.state.uri_pict !== null && <Text style={styles.docText}>Votre photo est prêt</Text>}
        
      {this.state.uri_doc !== null && 

       <TouchableOpacity 
       style={{ ...styles.openButton, backgroundColor: "#FFFFFF" }}
       onPress={() => this.viewPager.setPage(1 )}
        >
           <Text style={styles.textSuivant}>Suivant</Text>
          
         
        </TouchableOpacity>} 
        {this.state.uri_pict !== null && 

<TouchableOpacity 
style={{ ...styles.openButton, backgroundColor: "#FFFFFF" }}
onPress={() => this.viewPager.setPage(1 )}
 >
    <Text style={styles.textStyle}>Suivant</Text>
   
  
 </TouchableOpacity>} 
    </View>
  )

  renderDocumentName = () => (
    <View style={styles.page}>
      <Text style={{fontWeight : "bold",fontSize : 20,paddingBottom : 40}}>Nom du document</Text>
      <TextInput style={{padding : 5, borderColor : "#000", fontSize: 18}} onChangeText={(value) => {
        this.setState({ name: value })
      }} placeholder="Mon document" />
      <TouchableOpacity style={{padding : 10,backgroundColor : "#00C1B4", marginTop: 10}} onPress={() => { this.saveDoc() }}>
        <Text style={[styles.textStyle, {fontSize: 16}]}>
          Sauvegarder le  document
        </Text>
      </TouchableOpacity>
      
    </View>
  )





  render() {
    var documentType = [
      { label: 'Ordonnance', value: 0, title: "ordo" },
      { label: 'Certificat', value: 1, title: "cert" },
      { label: 'Attestation', value: 2, title: "atte" },
      { label: 'Compte-rendu', value: 3, title: "cptr" },
      { label: 'Autre', value: 4, title: "aut" },
    ];
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
          <Text style={{color: '#00C1B4'}}>Chargement ...</Text>
          <ActivityIndicator size="large" />
        </View>}

        {this.state.isCamera === true && this.getCamera()}
        {this.state.isCamera === false &&
          <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
            <HeaderMenu navigation={this.props.navigation} addDocument={1}/>
          </View>  }

         {this.state.isCamera === false && 
          <ViewPager
            style={{ flexGrow: 1 }}
            ref={viewPager => {
              this.viewPager = viewPager
            }}
            onPageSelected={page => {
              this.setState({ currentPage: page.position })
            }}
          >
            {this.renderDocumentUpload()}
            {this.renderDocumentType(documentType)}
           
            {this.renderDocumentName()}
          </ViewPager>}
         
      </View>
    )
  }

  onStepPress = position => {
    this.setState({ currentPage: position })
    this.viewPager.setPage(position)
  }



  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  )

  renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    )
  }
}

{/* <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={this.state.currentPage}
            labels={['Account', 'Profile', 'Band', 'Membership', 'Dashboard']}
            renderLabel={this.renderLabel}
            onPress={this.onStepPress}
          />
        </View>
        
        <ViewPager
          style={{ flexGrow: 1 }}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
          onPageSelected={page => {
            this.setState({ currentPage: page.position })
          }}
        >
          {PAGES.map(page => this.renderViewPagerPage(page))}
        </ViewPager> */}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
   page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  openButton2: {
    backgroundColor: "#F194FF",
    padding: 10,
    elevation: 2,
    width: wp('40%'),
    alignItems: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textSuivant: {
    color: '#2196F3',
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
  under3: {
    flexDirection: 'row',
    paddingTop: 40,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',


  },
  isNotCameraContainer: {

  },
  
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp('25%'),
    paddingTop: hp("7%"),
    paddingBottom: hp("1%")
  },
  imgLink: {
    width: wp('15%'),
    height: wp('15%'),
    backgroundColor: '#008AC8',
    borderRadius: 400 / 2,
    marginRight: wp('2%')
  },
  imgText: {
    color: "white",
    fontSize: 24
  },
  uploadAction : {
    flexDirection  :"row",
    justifyContent :"center"
  },
   docView: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },
  docButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderStyle: 'dashed',
    borderRadius: 50,
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
    //width: wp('70%')
  }, 
  docText: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15
  },
  buttonSave: {
    backgroundColor: "#00C1B4",
    marginTop: hp('5%'),
    width: wp('70%'),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),

  },
  docText2: {
    color: "white",
    fontSize: 18

  },
   buttonContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonContainer2: {
    position: 'absolute',
    top: 50,
    left: 30,
    alignItems: 'center',
  },
  buttonContainer3: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  }, 
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonRond: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  
    borderRadius: 80 / 2,
    paddingVertical: 4,
    borderWidth: 5,
    borderColor: '#fff',
  },
  buttonBack: {

  },
  textBack: {
    fontSize: 16,
    color: '#fff',
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
  }

})

const mapStateToProps = (store) => {
  return {
    user: store.user,
   /*  contact: store.contact,
    favorite: store.favorite,
    second: store.second */
  }
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Test)