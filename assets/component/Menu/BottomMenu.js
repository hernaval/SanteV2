
import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { faHeart, faHeartbeat, faGrinHearts,faUser,faUserCircle, faUserEditCircle, faUserEdit, faStar } from '@fortawesome/free-solid-svg-icons';


 class BottomMenu extends Component {

    toggleOpen = () => {


    }

    render() {
        return (
            <View >

                <View style={{

                    position: 'absolute',
                    alignSelf: 'center',
                   backgroundColor: 'grey',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    bottom: 35,
                    zIndex: 10


                }}>

                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate("Emergency")}>
                        <View style={[styles.button, styles.actionBtn]}>

                            <Image style={{ width: 60, height: 60 }}
                                resizeMode="contain"
                                source={require("../../images/icon_urg_2.png")} />
                        </View>
                    </TouchableWithoutFeedback>
                    {/*
                    <Text textBreakStrategy={'simple'} 
                    style={{color : "#FFFFFF", fontWeight: '200', marginTop: 69, marginLeft: 8}}>Urgence</Text>
                    */
                    }
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#00C1B4',
                   
                
                    borderTopLeftRadius : 10,
                    borderTopRightRadius : 10,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25


                }}>

                   
                    
                    <View style={{
                        flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Favorite")}
                        >

                        <FontAwesomeIcon 
                         
                         icon={faStar} 
                         color="#FFFFFF" 
                         size={30} 
                         style={{}} />
                    

                        </TouchableOpacity>
                        <Text  textBreakStrategy={'simple'} style={{color : "#FFFFFF",justifyContent:'center',alignItems:'center' }}>Favoris </Text>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("MyProfil")}
                        >
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                size={30}
                                color="#EFEAEA"
                             />
                       
                        </TouchableOpacity>
                        <Text  textBreakStrategy={'simple'} style={{color : "white",justifyContent:'center',alignItems:'center' }}>Mon{" "} compte </Text>
                    </View>

                       

                    {/* </View> */}
                </View>
            </View>
        );
    }

    
}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }


});

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps,mapDispatchToProps)(BottomMenu)