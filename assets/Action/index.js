import { ONLINE_USER,IS_LOGGED, USER_INFO,CHANGE_SECOND_PDP, MODIFY_USER, CONTACT_INFO, ADD_CONTACT, DELETE_CONTACT, FAVORITE_INFO, ADD_FAVORITE, DELETE_FAVORITE, SECOND_INFO, CHANGE_INDEX, DELETE_SECOND, CHANGE_PDP } from './action-type';
import axios from "axios";
import Bdd from '../API/Bdd';
export function setAuthentification(isLoggedIn) {
	return function (dispatch) {
		dispatch({
			type: IS_LOGGED,
			payload: isLoggedIn
		});
	}
}

export function onlineUser(online_users){
	return function(dispatch){
		dispatch({
			type : ONLINE_USER,
			payload : online_users
		})
	}
}

export function userConnected(user) {
	return function (dispatch) {
		dispatch({
			type: USER_INFO,
			payload: user
		})
	}
}

 export function setUserInfo(token) {
	return function(dispatch) {
		axios.get(Bdd.api_url+'/checkToken',{ headers: { 'x-access-token': token }} )
		.then((user)=>{
		
			
			dispatch({
				type: USER_INFO,
				payload: user.data.data
			});
		})
		.catch((err)=>{
			//ole.log(err)
		})
	}
} 
export function modifyUserInfo(userModif) {

	return function (dispatch) {
		const idUser = userModif.idUser
		axios.put(`${Bdd.api_url}/${idUser}`, userModif)
			.then((user) => {
				//ole.log('user', user);
				dispatch({
					type: MODIFY_USER,
					payload: user.data.data
				});
				
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
}


export function modifySecondUserInfo(userModif){
	return function(dispatch){
		const idUser = userModif.idSecondUser
		axios.put(`${Bdd.api_url_second}/${idUser}`, userModif)
			.then((user) => {
				//ole.log('user', user);
				dispatch({
					type: MODIFY_USER,
					payload: user.data.data
				});
				
			})
			.catch((err) => {
				//ole.log(err)
			})

	}
	

}

export function ModifyPhoto(data) {
	return function (dispatch) {
		const idUser = data.idUser
		axios.put(`${Bdd.api_url}/${idUser}/pdp`, data)
			.then(user => {
				/*  dispatch({
				 	type: CHANGE_PDP,
				 	payload: user
				 }) */
			})
	}

}

export function ModifySecondPhoto(data) {
	return function (dispatch) {
		const idUser = data.idSecondUser
		axios.put(`${Bdd.api_url_second}/${idUser}/image`, data)
			.then(user => {
				// dispatch({
				// 	type: CHANGE_SECOND_PDP,
				// 	payload: user
				// })
			})
	}

}

export function mySecondProfil(token){
	return function(dispatch) {
		axios.get(Bdd.api_url_second+'/checkToken',{ headers: { 'x-access-token': token }} )
		.then((secondUser)=>{
		
		
			dispatch({
				type: SECOND_INFO,
				payload: secondUser.data.data
			});
		})
		.catch((err)=>{
			//ole.log(err)
		})
}
}

export function deleteSecondProfil(idUser) {
	return function (dispatch) {
		
		axios.delete(`${Bdd.api_url_second}/${idUser}`)
			.then(response => {
				dispatch({
					type: DELETE_SECOND,
					payload: second
				})
			})
	}
}

export function setIndexSelected(index) {
	return function (dispatch) {
		dispatch({
			type: CHANGE_INDEX,
			payload: index
		});
	}
}

export function setContactInfo(idUser) {
	return function (dispatch) {
		

		axios.post(`${Bdd.api_url}/contact/list?idUser=${idUser}`)
			.then((contacts) => {
				dispatch({
					type: CONTACT_INFO,
					payload: contacts
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
}

export function addContact(contact) {
	return function (dispatch) {
		axios.post(`${Bdd.api_url}/contact`, contact)
			.then((contacts) => {
				dispatch({
					type: ADD_CONTACT,
					payload: contacts
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
}

export function deleteContact(idContact) {
	return function (dispatch) {
		axios.delete(`${Bdd.api_url}/contact/${idContact}`)
			.then((contacts) => {
				//ole.log(contacts);
				dispatch({
					type: DELETE_CONTACT,
					payload: contacts
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
}

 export function setFavoriteInfo(user_id) {
	return function (dispatch) {
		let data = {
			user_id: user_id,
		}
		//ole.log('declenchement  dispatch favorites')
		axios.post(Bdd.api_url + '/api/favorite/all', data)
			.then((favorites) => {
				//ole.log('declenchement favorites', favorites)
				dispatch({
					type: FAVORITE_INFO,
					payload: favorites
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
} 

 export function addFavorite(favorite) {
	return function (dispatch) {
		//ole.log('dipatch add  dans action')
		axios.post(Bdd.api_url + '/api/favorite/add', favorite)
			.then((favorites) => {
				//ole.log('declenchement add  favorite ', favorites)
				dispatch({
					type: ADD_FAVORITE,
					payload: favorites
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	}
}

export function deleteFavorite(favorite) {
	//ole.log('favorite arg', favorite)
	return function (dispatch) {
		//ole.log('dipatch delete dans action favorite')
		axios.post(Bdd.api_url + '/api/favorite/delete', favorite)
			.then((favorites) => {
				//ole.log('declenchement delete favorite', favorites)
				dispatch({
					type: DELETE_FAVORITE,
					payload: favorites
				});
			})
			.catch((err) => {
				//ole.log(err)
			})


	} 
}

