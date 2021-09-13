import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { HeaderRoutePatient } from '../HeaderRoutePatient'
import { CompteRenduVisitePatient } from './CompteRenduVisitePatient';
import { InfoMedicalePatient } from './InfoMedicalePatient';
import { RappelPatient } from './RappelPatient';
import { FloatButtonDossier } from "./FloatButtonDossier"
import { Background } from '../../../Home/Background';

const data = [
    {
      imageUrl: require('../../../../images/icons/dossiers/Comptes-rendus-de-mes-visites1.png'),
      imageSecond : require('../../../../images/icons/dossiers/Comptes-rendus-de-mes-visites2.png'),
      title: "Reports of my visits",
      order: 1
    },
    {
      imageUrl: require('../../../../images/icons/dossiers/Rappels1.png'),
      imageSecond: require('../../../../images/icons/dossiers/Rappels2.png'),
      title: "Reminders",
      order: 2
    },
    {
        imageUrl: require('../../../../images/icons/dossiers/Informations-médicales2.png'),
        imageSecond: require('../../../../images/icons/dossiers/Informations-médicales1.png'),
        title: "Medical informations",
        order: 3
    }
  ];

export default class DossierPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            currentOrder: 1
        };
    }

    _setOrder(order) {
        this.setState({
            currentOrder: order
        })
    }

    _getBackground(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'white'
    }

    _getColor(order) {
        if (order === this.state.currentOrder) {
            return 'white'
        }
        return 'black'
    }

    _getBackgroundIcon(order) {
        if (order === this.state.currentOrder) {
            return 'white'
        }
        return '#00C1B4'
    }
    
    render() {
        return(
            <View style={styles.main}>
                <Background/>

                <FloatButtonDossier/>

                <HeaderRoutePatient navigation={this.props.navigation} title="My file"/>

                <FlatList
                horizontal
                style={{marginTop: 20, marginLeft: 20, marginRight: 20}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <TouchableOpacity 
                    onPress={() => this._setOrder(rowData.order)}
                    style={[styles.card_scroll, 
                    {backgroundColor: this._getBackground(rowData.order)}]}>

                        <View 
                        style={[styles.card_contain_img, 
                        {backgroundColor: this._getBackgroundIcon(rowData.order)}]}>
                            {
                                this.state.currentOrder !== rowData.order &&
                                <Image source={rowData.imageUrl} style={styles.card_img}/>
                            }
                            {
                                this.state.currentOrder === rowData.order &&
                                <Image source={rowData.imageSecond} style={styles.card_img}/>
                            }
                        </View>

                        <Text 
                        style={[styles.card_title, 
                        {color: this._getColor(rowData.order)}]}>
                            {rowData.title}
                        </Text>
                    </TouchableOpacity>
                );
                }}
                keyExtractor={(item, index) => index}
                />

                {
                this.state.currentOrder === 1 &&
                <CompteRenduVisitePatient/>
                }

{
                this.state.currentOrder === 2 &&
                <RappelPatient/>
                }

                {
                this.state.currentOrder === 3 &&
                <InfoMedicalePatient/>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20
    },
    card_scroll : {
        height: 130,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_contain_img : {
        backgroundColor: '#00C1B4',
        width: 40,
        height: 40,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20
    },
    card_img : {
        width: 18,
        height: 20
    },
    card_title : {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 50,
        paddingLeft: 10,
        paddingRight: 10
    }
})