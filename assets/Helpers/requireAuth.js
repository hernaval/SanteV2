import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import {setUserInfo,mySecondProfil, setContactInfo, setFavoriteInfo, setSecondInfo} from '../Action'
import { connect } from "react-redux";
import 	axios from "axios";
import Bdd from '../API/Bdd'
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';


export default function(ChildComponent) {
	class RequireAuthentification extends Component {

		constructor(props) {
			super(props);
			
			
		}

		componentDidMount() {
			this._retrieveData('bosToken');
			
		}

		_retrieveData = async (key) => {
			try {
			  const token = await AsyncStorage.getItem(key);
			
			  if (token !== null) {
				// We have data!!
				axios.get(Bdd.api_url+'/checkToken',{ headers: { 'x-access-token': token }} )
				.then((res)=>{
			
					if(res.status !== 200) {
						this.props.navigation.push("Login");
					}

					else {
						
						this.props.setUserInfo(token)
						this.props.mySecondProfil(token)
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			  } else {
				this.props.navigation.navigate("Login");
			   
			  }
			} catch (error) {
			  // Error retrieving data
			  console.log(error);
			}
		  }
		

	    render() {
	    	return <ChildComponent navigation={this.props.navigation}/>
	    }
	}

	const mapStateToProps = (store) => {
		return {
			user: store.user,
			contact: store.contact,
			favorite: store.favorite,
			second: store.second
		}
	}

	const mapDispatchToProps = {
		setUserInfo,
		mySecondProfil,
		setContactInfo,
		setFavoriteInfo,
		setSecondInfo
	}

	// TaskManager.defineTask('geoloc_bakground', ({ data, error }) => {
	// 	if (error) {
	// 	  // Error occurred - check `error.message` for more details.
	// 	  return;
	// 	}
	// 	if (data) {
	// 	  const { locations } = data;
		  
	// 	  console.log('first', data);
	// 	  let coords = {
	// 		  lat: data.locations[0].coords.latitude,
	// 		  lng: data.locations[0].coords.longitude,
	// 		  id: 601
	// 	  }
	// 	  // do something with the locations captured in the background
	// 	  axios.post(config.api_url+"/api/user/updateGeo", coords)
	// 		  .then((res)=>{
	// 			  console.log(res);
	// 		  })
	  
	// 	}
	// });

	return connect(mapStateToProps, mapDispatchToProps)(RequireAuthentification);
}

