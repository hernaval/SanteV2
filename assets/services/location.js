import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const getCurrentLocation = async () =>{
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }else{
      let location = await Location.getCurrentPositionAsync({});
      
      return location
    }

     
}