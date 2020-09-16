import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View, ScrollView } from "react-native";
import PlaceList from "../Place/PlaceList";
import styles from "./styles";
import HeaderMenu from "../../component/Menu/HeaderMenu"

class MapScreen extends Component {
  //Set the HeaderTitle screen
  static navigationOptions = props => {
    // const placeName = props.navigation.getParam("placeName");
    const placeName = 'Pharmacy';
    return { headerTitle: placeName.toUpperCase() };
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      lat: 48.858453,
      long: 2.294489,
      places: [],
      isLoading: false,
      placeType: "pharmacy"
    };

    this.GOOGLE_API_KEY = "AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs";
  }
  componentDidMount() {
    console.log(this.props);
    const { navigation } = this.props;
    // const placeType = navigation.getParam("placeType");
    const placeType = 'pharmacy';
    this.setState({ placeType: placeType });

      this.getCurrentLocation();
  }

  /**
   * Get current user's position
   */
  getCurrentLocation() {
    console.log('Get current location');
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.setState({ lat: lat, long: long });
      console.log(this.state);
      this.getPlaces();
    });
  }

  getPlaces() {
    console.log('get places');
    const { lat, long, placeType } = this.state;
    const markers = [];
    const url = this.getPlacesUrl(lat, long, 4000, placeType, this.GOOGLE_API_KEY);
    console.log('Get Places from ', url)
    // const url = this.getPlacesUrl(lat, long, 2000, 'pharmacy', this.GOOGLE_API_KEY);
    // const url = this.getPlacesUrl(-21.455028, 47.090339, 9000, 'pharmacy', this.GOOGLE_API_KEY);
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('resultat');
        console.log(res);
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.icon = element.icon;
          marketObj.photos = element.photos ? element.photos : '';
          marketObj.open = element.opening_hours ? element.opening_hours.open_now : true;
          marketObj.rating = element.rating;
          marketObj.placeId = element.place_id;
          marketObj.vicinity = element.vicinity;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng
          };

          if(marketObj.open) {
            markers.push(marketObj);
          }
        });
        //update our places array
        this.setState({ places: markers });
      });
  }

  /**
   * Get the Place URL
   */
  getPlacesUrl(lat, long, radius, type, apiKey) {
    console.log('Get place Url')
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${typeData}${api}`;

    // https://www.google.fr/maps/search/Pharmacie+de+garde,+Fianarantsoa,+MADAGASCAR/@-19.789516,46.00493,7z/data=!3m1!4b1
  }

  render() {
    const { lat, long, places } = this.state;
    return (
      <View style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
          <HeaderMenu navigation={this.props.navigation} mapview={1}/>
        </View>

        {/**
                    <View style={styles.mapView}>
              <MapView
              style={{
                flex: 1
              }}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {places.map((marker, i) => (
                <MapView.Marker
                  key={i}
                  coordinate={{
                    latitude: marker.marker.latitude,
                    longitude: marker.marker.longitude
                  }}
                  title={marker.name}
                />
              ))}
            </MapView>
          </View>
        */}

          <View style={styles.placeList}>
          {
            places.length > 0 ? <PlaceList places={places}/> : null
          }
          </View>



      </View>
    );
  }
}

export default MapScreen;
