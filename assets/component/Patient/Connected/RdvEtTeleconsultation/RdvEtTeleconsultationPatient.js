import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { HeaderRoutePatient } from '../HeaderRoutePatient'
import { Background } from '../../../Home/Background'
import { BottomMenuPatient } from "./../BottomMenuPatient";


const data = [
    {
        médecin: 'Dr Anaelle GUYOT',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        specialité: 'General practitioner',
        disponibilité : 'Available in 1h',
        adresse: 'Assess Santé health center',
        day: 'Mar',
        date: '07/09',
        hours : [
            '10:20', '10:40', '11:00', '11:30'
        ]
    },
    {
        médecin: 'Dr Anaelle GUYOT',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        specialité: 'General practitioner',
        disponibilité : 'Available in 1h',
        adresse: 'Assess Santé health center',
        day: 'Mer',
        date: '08/09',
        hours : [
            '10:20', '10:40', '11:00', '11:30'
        ]
    },
    {
        médecin: 'Dr Anaelle GUYOT',
        profil: require('./../../../../images/medecin-generaliste.jpg'),
        specialité: 'General practitioner',
        disponibilité : 'Available in 1h',
        adresse: 'Assess Santé health center',
        day: 'Jeu',
        date: '09/09',
        hours : [
            '10:20', '10:40', '11:00', '11:30'
        ]
    }
]

export default class RdvEtTeleconsultationPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    _validate() {
        this.props.navigation.navigate("ValiderRdvEtTeleconsultationPatient")
    }

    _filterData(text) {

    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <BottomMenuPatient/>
                <HeaderRoutePatient navigation={this.props.navigation} title="Appointment and teleconsultations"/>

                <ScrollView style={{height: hp('95%'), marginLeft: 20, marginRight: 20}}>
                    <View style={styles.contain_search}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                            style={[styles.icon_search, 
                                {position: 'relative', top: 5}]}
                            source={require("../../../../images/icons/documents/search-interface-symbol.png")}
                        />
                        <TextInput style={styles.input_search} 
                        placeholder="General practitioner"
                        returnKeyType='search'
                        onChangeText={text => this._filterData(text)}/>
                        </View>
                        <Image
                            style={styles.icon_search}
                            source={require("../../../../images/icons/rdv/Groupe823.jpg")}
                        />
                    </View>

                    <FlatList
                    vertical
                    style={{marginTop: 20, marginLeft: 0, marginRight: 0}}
                    data={this.state.data}
                    renderItem={({ item: el }) => {
                    return (
                        <TouchableOpacity 
                        onPress={() => this._validate()}
                        style={styles.contain_doctor}>
                            <View style={styles.block_doctor_1}>
                                <View style={styles.inside_block_1}>
                                    <Image
                                    style={styles.profil_doctor}
                                    source={el.profil}
                                    />
                                    <View style={styles.detail_doctor}>
                                        <Text style={styles.name_doctor}>{el.médecin}</Text>
                                        <Text style={styles.speciality_doctor}>{el.specialité}</Text>
                                    </View>
                                </View>
                                <View style={styles.dispo_doctor}>
                                    <Text style={styles.text_dispo_doctor}>{el.disponibilité}</Text>
                                </View>
                            </View>

                            <View style={styles.block_doctor_2}>
                                <Text style={styles.label_block_doctor_2}>Adresse :</Text>
                                <Text style={styles.val__block_doctor_2}>{el.adresse}</Text>
                            </View>

                            <View style={styles.block_doctor_3}>
                                <View style={styles.block_date_3}>
                                    <Text style={styles.block_day_3}>{el.day}</Text>
                                    <Text style={styles.block_value_date_3}>{el.date}</Text>
                                </View>
                                { el.hours.map((item, key)=>(
                                <Text key={key} style={styles.TextStyle}> { item } </Text>)
                                )}
                            </View>
                            

                        </TouchableOpacity>
                    );
                    }}
                    keyExtractor={(item, index) => index}
                    />

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20
    },
    contain_search : {
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        paddingLeft: 10,
        // paddingTop: 20,
        marginBottom: 0,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    icon_search : {
        width: 15,
        height: 15
    },
    input_search : {
        fontSize: 16,
        marginLeft: 20,
    },
    contain_doctor : {
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    block_doctor_1 : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inside_block_1 : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profil_doctor : {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 15
    },
    detail_doctor : {
        display: 'flex',
        flexDirection: 'column'
    },
    name_doctor : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    speciality_doctor : {
        fontSize: 16,
        color: 'gray'
    }, 
    text_dispo_doctor : {
        color: '#00C1B4',
        fontSize: 16,
        backgroundColor: '#00c1b424',
        padding: 4,
        borderRadius: 3,
        fontWeight: 'bold'
    },
    block_doctor_2 : {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    val__block_doctor_2 : {
        fontWeight: 'bold'
    },
    label_block_doctor_2 : {
        marginRight: 10,
        color: 'gray'
    },
    block_doctor_3 : {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block_date_3 : {
        display: 'flex',
        flexDirection: 'column'
    },
    block_day_3 : {
        color: '#00C1B4',
        fontWeight: 'bold',
        fontSize: 16
    },
    block_value_date_3 : {
        color: 'gray',
        position: 'relative',
        bottom: 7,
        fontSize: 14
    },
    TextStyle : {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#008ac840',
        padding: 3,
        borderRadius: 3,
        fontSize: 14
    }
})