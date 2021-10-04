import React, { Component } from 'react'
import { View, Text, Image, ScrollView, 
    StyleSheet, TouchableOpacity, 
    FlatList, useWindowDimensions } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { Background } from '../../../Home/Background'
import { HeaderRoutePatient } from '../HeaderRoutePatient'
import { FavoritesPatient } from './FavoritesPatient'
import { BottomMenuPatient } from "./../BottomMenuPatient";


const data = [
    {
        title: 'Favorites',
        order: 1
    },
    {
        title: 'Around',
        order: 2
    },
    {
        title: 'Specialists',
        order: 3
    }
]

export default class ContactsPatient  extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            currentOrder: 1
        }
    }

    _setOrder(order) {
        this.setState({currentOrder: order})
    }

    _getColor(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'black'
    }

    _getBorderColor(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'transparent'
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <BottomMenuPatient/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Contacts"/>

                <FlatList
                horizontal
                style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <TouchableOpacity 
                    onPress={() => this._setOrder(rowData.order)}
                    style={[styles.card_scroll]}>
                        <Text style={[styles.menu_tab, 
                            {color: this._getColor(rowData.order)}]}>
                            {rowData.title}
                        </Text>
                        <Text style={[styles.menu_tab_bar, 
                            {borderBottomColor: this._getBorderColor(rowData.order)}]}>    
                        </Text>

                    </TouchableOpacity>
                );
                }}
                keyExtractor={(item, index) => index}
                />

                <ScrollView style={{height: hp('90%'), marginLeft: 20, marginRight: 20}}>
                {
                this.state.currentOrder === 1 &&
                <FavoritesPatient navigation={this.props.navigation}/>
                }

                {
                this.state.currentOrder === 2 &&
                <FavoritesPatient navigation={this.props.navigation}/>
                }

                {
                this.state.currentOrder === 3 &&
                <FavoritesPatient navigation={this.props.navigation}/>
                }
                </ScrollView>
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20
    },
    card_scroll : {
        width: wp('32%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menu_tab : {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
    },
    menu_tab_bar : {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        height: 1,
        width: 30
    }
})