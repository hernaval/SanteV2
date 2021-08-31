import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { Background } from '../../../Home/Background'
import { HeaderRoutePatient } from '../HeaderRoutePatient'
import { DocMedicauxPatient } from './DocMedicauxPatient'
import { FloatButtonDocument } from "./FloatButtonDocument"
import { OrdonnancePatient } from './OrdonnancePatient'
import { PassSanitairePatient } from './PassSanitairePatient'

const data = [
    {
      imageUrl: require('../../../../images/icons/documents/doc-medicaux1.png'),
      imageSecond : require('../../../../images/icons/documents/doc-medicaux2.png'),
      title: "Doc médicaux",
      order: 1
    },
    {
      imageUrl: require('../../../../images/icons/documents/ordonnance1.png'),
      imageSecond: require('../../../../images/icons/documents/ordonnance2.png'),
      title: "Ordonnances",
      order: 2
    },
    {
        imageUrl: require('../../../../images/icons/documents/pass-sanitaire1.png'),
        imageSecond: require('../../../../images/icons/documents/pass-sanitaire2.png'),
        title: "Pass sanitaire",
        order: 3
    }
  ];

export default class DocumentPatient extends React.Component {
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
                <FloatButtonDocument/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Mes documents"/>

                <FlatList
                horizontal
                style={{marginTop: 50, marginLeft: 30, marginRight: 30}}
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
                <DocMedicauxPatient navigation={this.props.navigation}/>
                }

                {
                this.state.currentOrder === 2 &&
                <OrdonnancePatient navigation={this.props.navigation}/>
                }

                {
                this.state.currentOrder === 3 &&
                <PassSanitairePatient navigation={this.props.navigation}/>
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
        height: 190,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_contain_img : {
        backgroundColor: '#00C1B4',
        width: 60,
        height: 60,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 30
    },
    card_img : {
        width: 30,
        height: 30
    },
    card_title : {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70
    }
})