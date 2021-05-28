import React, { Component } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, ActivityIndicator,Share } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { faArrowRight, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DoseList from './DoseList';

class VaccinItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                    <View style={styles.cardContainer}>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <FontAwesomeIcon size={18} icon={faSquareFull} 
                                style={styles.iconCard}/>
                                <Text style={styles.title_vaccin}>
                                    {this.props.nom}
                                </Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("DetailVaccin", 
                                {id: this.props.id, firstname: this.props.firstname, lastname: this.props.lastname,
                                naissance: this.props.naissance, age: this.props.age, sexe: this.props.sexe})}>
                                <FontAwesomeIcon size={30} icon={faArrowRight} style={styles.iconCard}/>    
                            </TouchableOpacity>
                        </View>
                        {this.props.doses.map(item => {
                        return <DoseList nomination={item.nomination}
                                            status={item.status}>
                        </DoseList>
                        })}
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconCard : {
        color : "#00C1B4"
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
    },
    under: {
        height: hp('10%'),
        zIndex: 99
    },
    title_text: {
        fontWeight: 'bold',
        color: '#008AC8',
        fontSize: 30,
        marginBottom: 30,
        marginTop: 30
    },
    scroll: {
        backgroundColor: 'white',
        padding: 20
    },
    cardContainer: {
        minHeight : hp("20%"),
        borderRadius : 10,
        backgroundColor: "white",
        margin: 10,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title_vaccin: {
        fontSize: 26,
        fontWeight: "900",
        marginLeft: 20,
        color: "black",
        position: "relative",
        bottom: 13
    }
});


export default VaccinItem