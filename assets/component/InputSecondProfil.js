import React, { version } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from "./Menu/Footer";
import { TextInput } from 'react-native-gesture-handler';
import {modifyUserInfo, setSecondInfo} from '../Action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenSquare, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Bdd from '../API/Bdd'


class InputSecondProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isChanging: false,
          text: this.props.info
        }
    }

  componentDidMount() {
  }

  change() {
      let changing = !this.state.isChanging;
      this.setState({isChanging: changing})
  }

    onClickModifyUser(){
       

        let userModified = {
            firstName: this.props.second.second_users[this.props.second.indexSelected].firstName,
            lastName: this.props.second.second_users[this.props.second.indexSelected].lastName,
            phone: this.props.second.second_users[this.props.second.indexSelected].phone,
            address: this.props.second.second_users[this.props.second.indexSelected].address,
            zip: this.props.second.second_users[this.props.second.indexSelected].zip,
            city: this.props.second.second_users[this.props.second.indexSelected].city,
            blood: this.props.second.second_users[this.props.second.indexSelected].blood,
            size: this.props.second.second_users[this.props.second.indexSelected].size,
            weight: this.props.second.second_users[this.props.second.indexSelected].weight,
            donate: this.props.second.second_users[this.props.second.indexSelected].donate,
            secu: this.props.second.second_users[this.props.second.indexSelected].secu,
            id: this.props.second.second_users[this.props.second.indexSelected].id
        }

        userModified[this.props.type] = this.state.text;
     

        axios.post(Bdd.api_url+'/api/second_user/update', userModified)
                .then((response)=>{
                  
                    if(response.data.status === 200){

                        AsyncStorage.getItem('bosToken')
                            .then((token)=>{
                                let user_id = this.props.user.user.data.user[0].id
                                this.props.setSecondInfo(token, user_id)
                            })
                        


                    }
                })

    //this.props.modifyUserInfo(userModified);

    }

  render(){
    return (
        <View style={styles.inputConatainer} >
            <View style={styles.info}>
                {this.state.isChanging === false && <Text style={styles.txt}>{this.props.typeName} : {this.props.info}</Text>}
                {this.state.isChanging &&  <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => {this.setState({text: text}, ()=>{
                      
                    })}}
                    value={this.state.text}
                />}
            </View>
            <View style={styles.button}>
              {this.state.isChanging === false && <TouchableOpacity
                  style={styles.buttonPen}
                  onPress={(e)=>{this.change(), ()=>{

                  }}}
                >
                  <Image
                      style={{width: 40, height: 40}}
                      source={require('../images/Edit-icon.png')}
                  /> 
                </TouchableOpacity>}
                {this.state.isChanging === true && <TouchableOpacity
                  style={styles.buttonPen}
                  onPress={(e)=>{
                      this.change();
                      this.onClickModifyUser()
                    }}
                >
                  <FontAwesomeIcon  size={40} icon={faCheckSquare}/>
                </TouchableOpacity>}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    inputConatainer: {
        paddingTop: hp('2%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',

    },
    info: {
        flex: 4,
        backgroundColor: "white",
        paddingBottom: 8,
        paddingTop: 8
    },
    button: {
        flex: 1,

    },
    buttonPen: {
      marginTop: hp("0%"), 
      width: wp("11%"),
      height: wp("11%"),
     // backgroundColor: '#00C1B4',
     marginLeft: wp('2%')
    }, 
    textinput: {
        width: wp('40%'),
        paddingLeft: 10
        // paddingTop: hp('1%'),
        // paddingBottom: hp('1%')
        
    },
    txt: {
      paddingTop: hp('0.5%'),
      paddingBottom: hp('0.5%'),
      paddingLeft: 10
    }
});

const mapStateToProps = (store) => {
  return {
    user: store.user,
    second: store.second
  }
}

const mapDispatchToProps = {
  modifyUserInfo,
  setSecondInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(InputSecondProfil);
