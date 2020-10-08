import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faNotesMedical, faHandsHelping, faPumpMedical, faDisease } from '@fortawesome/free-solid-svg-icons';
import { Grid, Col, Row } from 'react-native-easy-grid';
export const CardMenu = (props) => 
     (
        <Col>
              <TouchableOpacity onPress={console.log(this.props.tests)} style={styles.cardContainer}>
              <FontAwesomeIcon size = {30}  style={styles.iconCard}   icon={faNotesMedical } />
              <Text style={styles.cardText}>{props.text}</Text>
              </TouchableOpacity>
        </Col>
    )
    

const styles = StyleSheet.create({
    cardContainer: {
        height : hp("25%"),
        borderRadius : 5,
        paddingLeft : 10,
        paddingRight : 5,
        paddingTop : 20,
        paddingBottom : 20,
        backgroundColor: "#00C1B4",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      cardText : {
        marginTop : 20,
        marginLeft : 10,
        color : "white",
        fontSize : 14,
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize : 17
      },
      iconCard : {
        color : "white",
        
      },
})
