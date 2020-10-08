import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { SocketService } from '../services/socket';



class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true
    }
   
    this.email = "";
    this.password = "";
  }

  async componentDidMount() {
    await this._deconnectSocket("bosToken")
    this._removeData('bosToken');
    // this.goToLogin();
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
      const token = await AsyncStorage.getItem(key);
      console.log('token logout ', token);
      const value = await AsyncStorage.removeItem(key);
      if (value !== null) {
        // We have data!!
        console.log('logout ',value);
      } else {
        console.log('logout, token value ', value);
      }
      this.setState({
        isLoading: false
      })
      this.props.navigation.push("Login");
    } catch (error) {
        console.log(error);
      // Error retrieving data
    }
  };

  render(){
    return (
      <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
        <ActivityIndicator size="large" />
        </View>}
        <Text style={{color: '#FFFFFF', fontWeight: '600'}}>Déconnexion {"  "}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C1B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_container: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Logout;