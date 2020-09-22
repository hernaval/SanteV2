import React from 'react'
import{StyleSheet, ScrollView, Text, View, AsyncStorage, Slider, Image, TextInput, KeyboardAvoidView, TouchableOpacity, Keyboard, ActivityIndicator, Alert, Dimensions } from 'react-native'
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
import { faLocationArrow, faBroom, faBackward, faChevronDown, faMicrophone, faSearch, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Bdd from '../API/Bdd'
import Loader from './loader'
import Footer from './Menu/Footer'
import TopMenu from './Menu/TopMenu';
import HeaderMenu from './Menu/HeaderMenu';
import BottomMenu from "./Menu/BottomMenu";

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
      isLoading: false,
      currentZoom: 0.1000,
      distance: 0
    }

    this.testRad = 500

    Dimensions.addEventListener('change', () => {
      console.log('Change orientation');
      this.props.navigation.navigate('menu')
    });
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
                  console.log('click one list with value ', auto)
                  this.setState({selected: auto.val});
                  this.onPressList(auto.val)
                }}
              >
                <FontAwesomeIcon 
                icon={faDotCircle} 
                color="#5e5e5e" 
                size={10} 
                style={{flex: 2, marginRight: 20, marginTop: 7}}
                />
                <Text style={styles.listText}>{auto.name}</Text>
              </TouchableOpacity>)
    })
  }

  onPressList(value) {
     if (value !== "") {
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
    }else {
      console.log('Value vide')
    }
  }

  _zoomIn() {
    let zoom = this.state.deltaLat

    if (zoom <= 0.021) {
      zoom = zoom - 0.002
    } else {
      zoom = zoom - 0.08
    }

    if (zoom < 0) {
      zoom = 0.00001
    }

    console.log(zoom)
    this.setState({
      currentZoom: zoom
    })
        this.setState({deltaLat: zoom, deltaLng: zoom},
        this.onPressList(this.state.selected))
  }

    _zoomOut() {
    let zoom = this.state.deltaLat

    if (zoom <= 0.021) {
      zoom = zoom + 0.01
    } else {
      zoom = zoom + 0.08
    }
    console.log(zoom)
    this.setState({
      currentZoom: zoom
    })
        this.setState({deltaLat: zoom, deltaLng: zoom},
        this.onPressList(this.state.selected))
    }

  changeRadius(value) {
    let deltaLat = 0.1000
    let deltaLng = 0.0500
    let myValue = value/1000
    myValue = myValue * 2
    
       this.setState({radius: value, deltaLat: myValue, deltaLng: myValue},
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

    this.setState({mapLocation: this.state.location, deltaLat: 0.1000, deltaLng:0.0500, search: ''});
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
          <HeaderMenu navigation={this.props.navigation} ps={1}/>
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
        style={styles.backward}
        onPress={(e)=>{
          this.onClickBack()
        }}
      >
        <FontAwesomeIcon  size={25}  icon={ faBackward } color='#008ac8' />
      </TouchableOpacity>}

        <TouchableOpacity 
        style={styles.zoomIn}
        onPress={()=>{
          this._zoomIn()
        }}
        >
          <Image
              style={{ width: wp('10%'), height: wp('10%'), backgroundColor: 'white'}}
              source={require('../images/Icone_Zoom_in.png')}
          />
      </TouchableOpacity>

        <TouchableOpacity 
        style={styles.zoomOut}
        onPress={()=>{
          this._zoomOut()
        }}
        >
          <Image
              style={{ width: wp('10%'), height: wp('10%'), backgroundColor: 'white'}}
              source={require('../images/Icone_Zoom_out.png')}
          />
      </TouchableOpacity>

      {this.state.isDirection == true  && 
        <View style={styles.contain_distance}>
          <Text style={{color: '#008ac8'}}>{this.state.distance}{'\n'} km</Text>
        </View>
      }

      

        <View style={Platform.OS === 'ios' ? styles.head_ios : styles.head}>
        <View style={styles.contain_search}>
          <View style={{flex: 1}}>
              <FontAwesomeIcon 
              icon={faSearch} 
              color="#636363" 
              size={23} 
              />
          </View>

          <View style={{flex: 5, marginLeft: -5}}>
            <TextInput 
            value={this.state.search}
            placeholder="Que cherchez vous ?"
            style={styles.inputSearch}
            onChangeText={(text) => this.onChangeInput(text)}
            />
          </View>

          <View style={{flex: 1}}>
              <FontAwesomeIcon 
                icon={faMicrophone} 
                color="#3d3d3d" 
                size={23} 
                style={{flex: 1}}
                />
          </View>
        
        </View>

           {this.state.autocomplete.length !== 0 && <View style={styles.autoDiv}>
             <ScrollView 
              style={styles.auto}
              indicatorStyle="white"
              keyboardShouldPersistTaps="always">
              { this.renderList()}
          </ScrollView></View>}
        </View>
        <View style={styles.main}>
          <View  style={styles.map}>
            <MapView 
              style={{flex: 1, width:('100%')}}
               region={{
                latitude: this.state.mapLocation.coords.latitude,
                longitude: this.state.mapLocation.coords.longitude,
                latitudeDelta: this.state.deltaLat,
                longitudeDelta: this.state.deltaLng
              }} 
              showsUserLocation = {true}
              scrollEnabled={true}
              liteMode={false}
              zoom={100}
              zoomEnabled={true}
              zoomControlEnabled={true}
              onPress={() => {
                const mapVide = []
                this.setState({autocomplete: mapVide})
              }}
            >
                
                {this.state.markers.map((marker, index) => {
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
                      this.setState({
                        deltaLat: 0.04,
                        deltaLng: 0.04
                      })
                    }}
                    onReady={result => {
                      this.setState({
                        distance: parseFloat(result.distance).toFixed(2)
                      })
                      console.log(`Distance: ${result.distance} km`)
                      console.log(`Duration: ${result.duration} min.`)
                    }}
                    onError={(errorMessage) => {
                       //.log('GOT AN ERROR', errorMessage);
                    }}
                  />
                  }
      
                  
               
            </MapView>
          </View>
        </View>

        {/**
          <View style={styles.sliderContainer}>
          <Slider 
            style={styles.slider}
            step={1}
            maximumValue={1000}
            onSlidingComplete={(value)=> {this.changeRadius(value)}}
            value={this.state.radius}
            maximumTrackTintColor='#e2e0e0'  
            minimumTrackTintColor='#008AC8'
            thumbTintColor='#008AC8'
           
          /> 
           <Text style={{marginBottom: hp('1%'), color: '#008AC8', fontWeight: 'bold'}}>{this.state.radius} m</Text>
        </View>
        */}

            {this.state.isDisplay && <DetailCard   style={styles.card} detail = {this.state.detail} isFavo={this.state.isFavo} onClickClose={this._onClickClose} onClickDirection={this._onClickDirection} onChangeFavo= {this._onChangeFavo} favoriteId = {this.state.favoriteId}  />  }

      </ScrollView>
{/*       <BottomMenu navigation={this.props.navigation}  />
 */}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  contain_detailCard: {
    position: 'absolute',
    bottom: hp('5%'),
    zIndex: 100
  },
  contain_search: {
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    width: wp("87%"), 
    paddingTop: 17, 
    paddingLeft: 15, 
    height: 60, 
    position: 'absolute',
    top: hp("6%"),
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 10
  },
  container: {
    // backgroundColor: '#fff',
    // backgroundColor: '#00C1B4'
  },
  main: {


  },
  footer: {
    
    
  },
  map: {
    width: wp('100%'),
    height: hp('85%')
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
    zIndex: 1,
    paddingTop: 20
  },
  head: {
    flex:1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  inputSearch: {
    fontSize: 16,
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
    top: hp('14.5%'),
    zIndex: 100,
    backgroundColor: 'white',
    width: wp('87%'),
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
    color: "#008AC8",
    flex: 1,
    flexDirection: 'row'

  },
  listText: {
    color: "black",
    textAlign: "left",
    fontWeight: '400',
    fontSize: 16,
    flex: 5
  },
  location: {
    position: "absolute",
    // bottom: hp("35%"),
    bottom: 250,
    right: wp('3%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    borderRadius: 12,
  },
  backward: {
    position: "absolute",
    bottom: 170,
    right: wp('3%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    width: wp('12%'), 
    height: wp('12%'),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  broom: {
    position: "absolute",
    bottom:170,
    right: wp('3%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    borderRadius: 12
  },
    zoomIn: {
    position: "absolute",
    bottom: 90,
    right: wp('3%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),    
    borderRadius: 12
  },
    zoomOut: {
    position: "absolute",
    bottom: 10,
    right: wp('3%'),
    zIndex: 10,
    backgroundColor: "white",
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    borderRadius: 12
  },
  contain_distance: {
      position: "absolute",
      bottom: 330,
      right: wp('3%'),
      zIndex: 10,
      backgroundColor: "white",
      paddingTop: hp('1%'),
      paddingBottom: hp('1%'),
      paddingLeft: wp('1%'),
      paddingRight: wp('1%'),
      borderRadius: 12,
      width: wp('13%'),
      alignItems: 'center',
      justifyContent: 'center'
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