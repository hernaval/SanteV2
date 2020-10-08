import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';
import Bdd from '../API/Bdd'
import { _emitEvent, SocketService } from '../services/socket';

export const registerForPushNotificationsAsync = async (user) => {
  
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
   
   let socketSrv = new SocketService("samaritain")

    socketSrv.emitEvent("sendingExpoToken",{token : token, user : user})
    
    
  } else {
    alert('Must use physical device for Push Notifications');
  }
};