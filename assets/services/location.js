import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';

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

export const calculateDistanceBetween = async (myPosition, hisPosition) =>{
   
  let data = {}

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${myPosition}&destinations=${hisPosition}&mode=car&language=fr-FR&sensor=false&key=AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs`

  await Axios.get(url)
      .then(async res=>{

          res = res.data
        if(res.rows[0].elements[0].status == "ZERO_RESULTS"){
          const distanceValue = undefined
          const durationValue = undefined
          const distanceText = undefined
          const durationText = undefined

          Object.assign(data, {distanceValue,durationValue,distanceText,durationText})
        }else{

          const distanceValue = res.rows[0].elements[0].distance.value
          const durationValue = res.rows[0].elements[0].duration.value
          const distanceText = res.rows[0].elements[0].distance.text
          const durationText = res.rows[0].elements[0].duration.text

           Object.assign(data, {distanceValue,durationValue,distanceText,durationText})
        }
          
      })
  return data
 
}