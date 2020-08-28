import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';


class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
   
    this.email = "";
    this.password = "";
  }

  componentDidMount() {
    this._removeData('bosToken');
    this.goToLogin();
  }

  goToLogin() {
    this.props.navigation.push("Login")
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