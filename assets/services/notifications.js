import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';
import Bdd from '../API/Bdd'

export const registerForPushNotificationsAsync = async (id) => {
  console.log('ça part de la ');
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log('l uuid token', token);

      let data = {
        uuid: token,
        id: id
      }
      console.log('l uuid data', data);
      axios.post(Bdd.api_url+'/api/user/updateUuid', data )
      .then((res)=>{
        console.log('l uuid token 2',res)
      }).catch((err)=>{
        console.log('err',err);

      })



    } else {
      alert('Must use physical device for Push Notifications');
    }
  };