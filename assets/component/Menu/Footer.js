import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt, faHeart, faExclamationTriangle,  faUser} from '@fortawesome/free-solid-svg-icons'

class Footer extends React.Component {

  componentDidMount() {
    
  }

  goToLogoutMapping = ()=> {
    this.props.navigation.navigation("Home")
  }
  goToLogoutProfil = ()=> {
    this.props.navigation.push("BaseProfile")
  }

  goToUrgence = ()=> {
    this.props.navigation.push("Urgence")
  }

  goToFavorite = ()=> {
    this.props.navigation.push("Favorite")
  }

  render(){
    return (
      
      <View style={styles.container}>
        
        <TouchableOpacity
          style={styles.item}
          onPress={(e)=>{this.goToFavorite()}}
        >
          <Image
            style={{width: wp('10%'), height: wp('10%')}}
            source={require('../../images/favoris.png')}
          />         
          <Text style={styles.text}>FAVORIS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.item2}
            onPress={(e)=>{this.goToUrgence()}}
            
        >
          <Image
              style={{width: wp('17%'), height: wp('17%'), position: 'relative', bottom: 30}}
              source={require('../../images/icon_urg.png')}
            />
        </TouchableOpacity>
        {this.props.user != null &&<TouchableOpacity
          style={styles.item}
          onPress={(e)=>{this.goToLogoutProfil()}}
        >
          <Image
            style={{width: wp('10%'), height: wp('10%')}}
            source={require('../../images/profile.png')}
          />  
          <Text style={styles.text}>PROFIL</Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C1B4',
  },
  item: {
    flex: 12,
    paddingBottom: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item2: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: "white"
  },
  text: {
    fontSize: 21,
    color: 'white',
    fontWeight: "bold"
  }
});

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);
