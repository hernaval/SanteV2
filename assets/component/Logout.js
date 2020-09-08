import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { SocketService } from '../services/socket';



class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
   
    this.email = "";
    this.password = "";
  }

  async componentDidMount() {
    await this._deconnectSocket("bosToken")
    this._removeData('bosToken');
    this.goToLogin();
  }

  goToLogin() {

    this.props.navigation.push("Login")
  }

  _deconnectSocket = async(key) =>{
    try{
      const value = await AsyncStorage.getItem(key)
      let socketSrv = new SocketService("samaritain")
      socketSrv.emitEvent("status_change", { token: value, socketListenId: `samaritain_${value}`, type: "leave" });
  
    }catch(err){

    }

  }


  _removeData = async (key) => {
    try {
      const value = await AsyncStorage.removeItem(key);
      if (value !== null) {
        // We have data!!
        console.log('logout',value);
        
        
      }
    } catch (error) {
        console.log(error);
      // Error retrieving data
    }
  };

  render(){
    return (
      <View>
        <Text>on est dans logout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Logout;