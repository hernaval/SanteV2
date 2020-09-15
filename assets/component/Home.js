import React from 'react'
import{StyleSheet, ScrollView, Text, View, AsyncStorage, Slider, Image, TextInput, KeyboardAvoidView, TouchableOpacity, Keyboard, ActivityIndicator, Alert } from 'react-native'
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation'
import { connect } from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
import MapView,{Marker,Callout} from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions"
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Header from './Menu/Header'
import DetailCard from "./DetailCard"
import axios from 'axios';
import {choices} from '../API/practioners';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationArrow, faBroom, faBackward, faChevronDown, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import Bdd from '../API/Bdd'
import Loader from './loader'
import Footer from './Menu/Footer'
import TopMenu from './Menu/TopMenu';
import BottomMenu from "./Menu/BottomMenu"
const DEFAULT_COORD = {coords: {
    latitude: 48.859268,
    longitude: 2.347060
  }
};

const DEP_COORD = {
  latitude: -23.3399372,
  longitude: 43.6596225
}
const DEST_COORD = {
  latitude: -23.3568974,
  longitude: 43.664497
}
const API_KEY = 'AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs';
class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      location: DEFAULT_COORD,
      destination:DEFAULT_COORD,
      mapLocation: DEFAULT_COORD,
      radius: 500,
      errorMessage: null,
      search: "",
      selected: "",
      autocomplete: [],
      markers: [],
      deltaLat: 0.1000,
      deltaLng:0.0500,
      isDisplay: false,
      detail: null,
      isDirection: false,
      isFavo:false,
      favoriteId: "ChIJqwot8jt-8CERZxtjIIStjNs",
      isLoading: false
    }

    this.testRad = 500
  }

  componentDidMount = async () =>{
     await  this._getLocationAsync();
     loc(this);
  }

  componentWillUnMount() {
    rol();
  }


  _onChangeFavo = ()=>{
    
    this.setState({isFavo: !this.state.isFavo})
    
  }

  _onClickClose = (type)=>{
    this.setState({isDisplay: false});
  }

  onChangeInput(text){
    this.setState({search: text},()=>{
      this.createGoodList(this.state.search)
    })
  }

  createGoodList(keyword) {
    let selected = keyword.replace('é', 'e').replace('è', 'e').replace('ç', 'c').replace('à', 'a');
    let autocomplete = choices.filter(choice => choice.val.indexOf(selected.toLowerCase()) !== -1);
    //.log('auto, ', autocomplete);
    this.setState({autocomplete});
  }

  _getLocationAsync = async () => {
    const key = 'permission_home_location';
    const value = await AsyncStorage.getItem(key);
    if(value === null) {
      Alert.alert('Localisation', 
      'Nous demandons votre permission afin de vous  localiser pour consulter les établissement à votre proximité', [
      {
          text: 'Suivant',
          onPress: async () => { 
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
              this.setState({
                errorMessage: 'Permission to access location was denied',
              });
            }else{
              await AsyncStorage.setItem(key, 'OK');
              let location = await Location.getCurrentPositionAsync({});
              this.setState({ location, mapLocation: location }); 
            }
          }
      }
        ])
      } else {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location, mapLocation: location }); 
    }   
  };

  renderList() {
    return this.state.autocomplete.map((auto, index)=>{
      return (<TouchableOpacity
                key={index}
                style={styles.list}
                onPress={()=>{
                  console.log('click')
                  this.setState({selected: auto.val},
                    this.onPressList(auto.val)
                  );
                  
                }}
              >
                <Text style={styles.listText}>{auto.name}</Text>
              </TouchableOpacity>)
    })
  }

  onPressList(value) {
   
   
     if (this.state.selected !== "") {
      this.setState({isLoading: true, autocomplete: []});
         //axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.3382965,43.6517931&radius=50000&keyword=restaurant&key='+API_KEY)
         axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+API_KEY+'&location='+this.state.location.coords.latitude+','+this.state.location.coords.longitude+'&radius=5000&keyword='+value)

         .then((res)=>{
           console.log("gùa^",res.data)
         
          this.setState({isLoading: false});
          let autocomplete = []
          this.setState({markers: res.data.results, autocomplete: autocomplete},
            ()=>{
              this.setState({search: value});
              Keyboard.dismiss();
            }
          );
        })
        .catch((err)=>{
          //.log(err);
      })
    } 


  }

  changeRadius(value) {
    this.setState({
      radius : value
    })
      let deltaLat = 0.1000
    let deltaLng = 0.0500

    if(value < 1000) {
      deltaLat = 0.0200
      deltaLng = 0.0100
    } else if (value < 2500) {
      deltaLat = 0.0200
      deltaLng = 0.0100
    }
    
       this.setState({radius: value, deltaLat: deltaLat, deltaLng: deltaLng},
        this.onPressList(this.state.selected) 
    );  

   
  
 //.log(value)

  }
  createMarkers() {
     return (this.state.markers.map((marker)=>{
       return (<Marker
        key={marker.id}
        coordinate={{
                      latitude: marker.geometry.location.lat,
                      longitude: marker.geometry.location.lat
                    }}
       /> )
    }))
  }


  onPressDetail(placeId){
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id='+placeId+'&key='+API_KEY)
    .then((res)=>{
 ////.log('dans le detail',res.data.result.international_phone_number);
      let location = {
        coords: {
          latitude: res.data.result.geometry.location.lat,
          longitude: res.data.result.geometry.location.lng
        }
      }

      let  g_id = res.data.result.place_id
      
      let idUser =  this.props.user.user.idUser



      axios.get(`${Bdd.api_url}/favoris/list?idUser=${idUser}&placeId=${g_id}`)
        .then(async favoris=>{
          console.log(favoris)
          if(await !favoris.data){
            this.setState({isDisplay: true, detail: res.data.result, mapLocation: location, destination: location, isFavo: false})

          }else{
            this.setState({isDisplay: true, detail: res.data.result, mapLocation: location, destination: location, isFavo: true, favoriteId:favoris.geoIdFavoris})

          }
        })
      

    }).catch((err)=>{
      //.log(err);
    })
  }

  _onClickDirection = ()=>{
    this.setState({isDirection: true})
  }

  onClickBack = ()=>{
    this.setState({isDirection: false, mapLocation: this.state.location})
  }

  onClickGoLocation() {
    this.setState({mapLocation: this.state.location});
  }

  onClickDelete() {
    this.setState({markers: [], isDisplay: false});
  }

  render(){
   
    return (
      <View style={{flex : 1}}>
<ScrollView style={styles.container}>
                      <Loader loading={this.state.isLoading} />
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <TopMenu navigation={this.props.navigation} />
        </View>
        <TouchableOpacity 
        style={styles.location}
        onPress={(e)=>{
          this.onClickGoLocation()
        }}
        >
          <Image
              style={{ width: wp('10%'), height: wp('10%'), backgroundColor: 'white'}}
              source={require('../images/cible.png')}
          />
      </TouchableOpacity>
      {this.state.isDirection == false  && <TouchableOpacity 
        style={styles.broom}
        onPress={(e)=>{
          this.onClickDelete()
          this.onClickGoLocation()
        }}
      >
        <Image
              style={{ width: wp('10%'), height: wp('10%'), backgroundColor: 'white'}}
              source={require('../images/Gomme.png')}
          />
      </TouchableOpacity>}
      {this.state.isDirection == true  && <TouchableOpacity 
        style={styles.broom}
        onPress={(e)=>{
          this.onClickBack()
        }}
      >
        <FontAwesomeIcon  size={30}  icon={ faBackward } />
      </TouchableOpacity>}
        <View style={Platform.OS === 'ios' ? styles.head_ios : styles.head}>
          <View style={{flex:1, flexDirection: "row", paddingTop: hp("3%")}}>
          <TextInput 
            style={styles.textinput}
            onChangeText={(text) => this.onChangeInput(text)}
            value={this.state.search}
            placeholder="Que cherchez vous ?"
          />
          
          <FontAwesomeIcon 
                            icon={faMicrophone} 
                            color="#3d3d3d" 
                            size={24} 
                            style={{width: wp('5%'), height: wp('5%'), position: 'relative', right: wp("12%"), top: hp('2%')}}
                          
                        />
          </View>
           {this.state.autocomplete.length !== 0 && <View style={styles.autoDiv}>
             <ScrollView 
              style={styles.auto}
              indicatorStyle="white"
              keyboardShouldPersistTaps="always"
            >
              { this.renderList()}
          </ScrollView></View>}
        </View>
        <View style={styles.main}>
          <View  style={styles.map}>
            <MapView 
              style={{flex: 1}}
               region={{
                latitude: this.state.mapLocation.coords.latitude,
                longitude: this.state.mapLocation.coords.longitude,
                latitudeDelta: this.state.deltaLat,
                longitudeDelta: this.state.deltaLng
              }} 
              showsUserLocation = {true}
              scrollEnabled={true}
              liteMode={false}
              zoom={15}
              zoomEnabled={true}
              zoomControlEnabled={true}
            >
                
                {this.state.isDirection == false && this.state.markers.map((marker, index) => {
                  return (<MapView.Marker
                    key={'key-'+index}d
                    title={marker.name}
                    coordinate={{
                      latitude: marker.geometry.location.lat,
                      longitude: marker.geometry.location.lng,
                   
                    }}
                    onPress={()=>{
                      //.log('je presse')
                      this.onPressDetail(marker.place_id)
                    }}
                    
                >
                
                
                </MapView.Marker>)}


                )}
                {this.state.isDirection === true &&
                  <Marker
                    coordinate={{
                      latitude: this.state.destination.coords.latitude,
                      longitude: this.state.destination.coords.longitude
                    }}
                  />
                }
              
                  {this.state.isDirection === true &&
                  <MapViewDirections
                    zIndex={2}
                    origin={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}
                   // waypoints={ null}
                    destination={{latitude: this.state.destination.coords.latitude, longitude: this.state.destination.coords.longitude}}
                    apikey={API_KEY}
                    strokeWidth={3}
                    strokeColor="green"
                    optimizeWaypoints={true}
                    mode="WALKING"
                    onStart={(params) => {
                      //.log('on start', params);
                    }}
                    onReady={result => {
                      //.log('ready', result)
                    }}
                    onError={(errorMessage) => {
                       //.log('GOT AN ERROR', errorMessage);
                    }}
                  />
                  }
      
                  
               
            </MapView>
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider 
            style={styles.slider}
            step={1}
            maximumValue={15}
            onSlidingComplete={(value)=> {this.changeRadius(value)}}
            value={this.state.radius}
            maximumTrackTintColor='#e2e0e0'  
            minimumTrackTintColor='#008AC8'
            thumbTintColor='#008AC8'
           
          />
          <Text style={{marginBottom: hp('1%'), color: '#008AC8', fontWeight: 'bold'}}>{this.state.radius} m</Text>
        </View>
                {this.state.isDisplay && <DetailCard   style={styles.card} detail = {this.state.detail} isFavo={this.state.isFavo} onClickClose={this._onClickClose} onClickDirection={this._onClickDirection} onChangeFavo= {this._onChangeFavo} favoriteId = {this.state.favoriteId}  />  }

      </ScrollView>
{/*       <BottomMenu navigation={this.props.navigation}  />
 */}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    backgroundColor: '#00C1B4'
  },
  main: {


  },
  footer: {
    
    
  },
  map: {
    
    width: wp('100%'),
    height: hp('57%')
  },
  sliderContainer : {
    height: hp("13%"),
    width: wp('100%'),
    backgroundColor: "white",
    alignItems: 'center',
  },
  slider: {
    width: wp('80%'),
    marginTop: hp("1%"),
    color: "#008AC8",

  },
  head_ios: {
    flex:1.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  head: {
    flex:1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    marginLeft: wp("10%"),
    textAlign: 'center',
    height: 50,
    width: wp("90%"),
    paddingLeft: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: hp('2%')
  },
  autoDiv: {
    flex: 1,
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    position: "absolute",
    top: hp('10%'),
    zIndex: 8,
    backgroundColor: '#00C1B4',
    width: wp('84%'),
    maxHeight: hp("40%"),
  },
  auto: {
    flex: 1,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  list: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('1%'),
    zIndex: 10,
    color: "#008AC8"
  },
  listText: {
    color: "white",
    textAlign: "center",
    fontWeight: 'bold'
  },
  location: {
    position: "absolute",
    bottom: hp("30%"),
    right: wp('5%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    
    borderRadius: 12
  },
  broom: {
    position: "absolute",
    bottom: hp("22%"),
    right: wp('5%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    
    borderRadius: 12
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
  under: {
  
    height: hp('10%'),
    width: wp("100%")
   // zIndex: 2
  },
  under_ios: {
    width: wp("100%"),
    height: hp('10%'),
    zIndex: 2
  },
  card: {
    zIndex: 99999,
  }
});

const mapStateToProps = (store) => {
  return {
      favorite: store.favorite,
      user: store.user
  }
}

const mapDispatchToProps = {
 
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)
//source={require('../images/cible.png')}