import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 

const data = [
    {
        name : 'Christina Frazier',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        speciality: 'Pédiatre',
        location: 'Paris',
        date: '10-08-21'
    },
    {
        name : 'Christina Frozier',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        speciality: 'Pédiatre',
        location: 'Paris',
        date: '10-08-21'
    },
    {
        name : 'Christiano Frazier',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        speciality: 'Pédiatre',
        location: 'Paris',
        date: '10-08-21'
    }
]

export class FavoritesPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    _filterData(text) {

    }

    render() {
        return(
            <View>
                <View style={styles.contain_search}>
                <Image
                    style={styles.icon_search}
                    source={require("../../../../images/icons/documents/search-interface-symbol.png")}
                />
                <TextInput style={styles.input_search} 
                placeholder="Search"
                returnKeyType='search'
                onChangeText={text => this._filterData(text)}/>
                </View>

                <FlatList
                vertical
                style={{marginTop: 20, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <TouchableOpacity style={styles.contain_list}>
                         <Image source={rowData.profil} 
                         style={styles.card_img}/>
                         <View style={styles.card_detail}>
                            <Text style={styles.card_name}>
                                {rowData.name}
                            </Text>
                            <View style={styles.card_description}>
                                <View style={styles.card_description_detail}>
                                    <Text style={styles.txt_card}>{rowData.speciality},</Text>
                                    <Text style={styles.txt_card}>{rowData.location}</Text>
                                </View>
                                <Text style={styles.txt_card}>
                                    {rowData.date}
                                </Text>
                            </View>
                         </View>
                    </TouchableOpacity>
                );
                }}
                keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain_search : {
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 10,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        height: 55
    },
    icon_search : {
        width: 15,
        height: 15,
        position: 'relative',
        top: 8
    },
    input_search : {
        fontSize: 16,
        marginLeft: 20,
        position: 'relative',
        bottom: 5
    },
    contain_list : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 7,
        width: '100%'
    },
    card_img : {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 15
    },
    card_detail : {
        display: 'flex',
        flexDirection: 'column',
    },
    card_name : {
        fontSize: 18,
        fontWeight: 'bold'
    },
    card_description : {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between'
    },
    card_description_detail : {
        display: 'flex',
        flexDirection: 'row',
    },
    txt_card : {
        fontSize: 16
    }
})