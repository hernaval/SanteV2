import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import {setUserInfo,mySecondProfil, setContactInfo, setFavoriteInfo, setSecondInfo} from '../Action'
import { connect } from "react-redux";
import 	axios from "axios";
import Bdd from '../API/Bdd'
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { _setSocket, _emitEvent,onSamaritainListChange, SocketService } from '../services/socket';
import {getCurrentLocation} from "../services/location"
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';

export default function(ChildComponent) {
	class IsAuth extends Component {

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
				.then(async (res)=>{
					
					if(res.status !== 200) {
                        // this.props.navigation.push("Login");
                        console.log('status 200')
					}

					else {
						
						
						let value = token
						let socketListenId =`samaritain_${value}`

						let location = await getCurrentLocation()
						const coords = {
							lat : location.coords.latitude,
							log : location.coords.longitude
						}

						let socketSrv = new SocketService("samaritain")
						socketSrv.emitEvent("status_change",{token : value, socketListenId : socketListenId, coords : coords, type  :"join"})
						
						this.props.setUserInfo(token);
                        this.props.mySecondProfil(token);
                        this.props.navigation.navigate("Menu");
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			  } else {
				console.log('stay here to Login')
			   
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

	

	return connect(mapStateToProps, mapDispatchToProps)(IsAuth);
}

