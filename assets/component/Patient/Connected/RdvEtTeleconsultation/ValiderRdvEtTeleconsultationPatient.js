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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import RNPickerSelect from 'react-native-picker-select'

const profil = require('./../../../../images/medecin-generaliste.jpg')

const data = [
    {
        day: 'Tue.',
        date: '07/09',
        hours: [
            '10:00', '10:20', '10:40', '11:00'
        ]
    },
    {
        day: 'Wed.',
        date: '08/09',
        hours: [
            '10:00', '10:20', '10:40'
        ]
    },
    {
        day: 'Thu.',
        date: '09/09',
        hours: []
    }
]

export default class ValiderRdvEtTeleconsultationPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            rendezVous: '',
            motif: '',
            currentSelect: ''
        }
    }

    _selectRendezVous(value) {
        this.setState({rendezVous: value})
    }

    
    _selectMotif(value) {
        this.setState({motif: value})
    }

    _filterData(text) {

    }

    _setOrder(key, day) {
        console.log(key)
        console.log(day)
        const nnn = key + '' + day
        this.setState({currentSelect: nnn})
    }

    _getBackground(key, day) {
        const nnn = key + '' + day
        if (this.state.currentSelect == nnn) return '#008ac8'
        return '#008ac840'
    }

    _getColor(key, day) {
        const nnn = key + '' + day
        if (this.state.currentSelect == nnn) return 'white'
        return 'black'
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient 
                navigation={this.props.navigation} 
                title="Appointment and teleconsultations"
                backRoute="RdvEtTeleconsultationPatient"/>

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

                    <View style={styles.contain_doctor}>
                            <View style={styles.block_doctor_1}>
                                <View style={styles.inside_block_1}>
                                    <Image
                                    style={styles.profil_doctor}
                                    source={profil}
                                    />
                                    <View style={styles.detail_doctor}>
                                        <Text style={styles.name_doctor}>
                                            Dr Anaelle GUYOT
                                        </Text>
                                        <Text style={styles.speciality_doctor}>
                                        General practitioner
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.block_doctor_2}>
                                <Text style={styles.label_block_doctor_2}>Address :</Text>
                                <Text style={styles.val__block_doctor_2}>
                                Assess Santé health center
                                </Text>
                            </View>

                            <View style={styles.contain_choice}>
                            <Text style={styles.label_choice}>Type of appointment</Text>
                            <RNPickerSelect
                                placeholder={{}}
                                style={styles.select}
                                onValueChange={(value) => this._selectRendezVous(value)}
                                items={[
                                    { label: 'On video', value: 'On video' },
                                    { label: 'Local', value: 'Local' },
                                ]}
                            />
                            </View>

                            <View style={styles.contain_choice}>
                            <Text style={styles.label_choice}>Reason for appointment</Text>
                            <RNPickerSelect
                                placeholder={{}}
                                onValueChange={(value) => this._selectMotif(value)}
                                items={[
                                    { label: 'General teleconsultation', value: 'General teleconsultation' },
                                    { label: 'Medical visit', value: 'Medical visit' },
                                ]}
                            />
                            </View>

                            <View style={styles.block_date_doctor}>
                                <FontAwesomeIcon color="black" size={16} icon={faChevronLeft}/>
                                <Text style={{fontSize: 16}}>
                                    September 7 to 9
                                </Text>
                                <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                            </View>

                            <FlatList
                            horizontal
                            style={{marginTop: 20, marginLeft: 0, marginRight: 0}}
                            data={this.state.data}
                            renderItem={({ item: el }) => {
                            return (
                                <View 
                                style={styles.block_checkpoint}>
                                        <Text style={styles.block_day_3}>{el.day}</Text>
                                        <Text style={styles.block_value_date_3}>{el.date}</Text>
                                        { el.hours.map((item, key)=>(
                                        <TouchableOpacity key={key} 
                                        style={styles.Contain_textStyle}
                                        onPress={() => this._setOrder(key, el.day)}
                                        style={[styles.Contain_textStyle, 
                                        {backgroundColor: this._getBackground(key, el.day)}]}>
                                            <Text style={[styles.TextStyle, {
                                                color: this._getColor(key, el.day)
                                            }]}>
                                            { item }
                                            </Text>
                                        </TouchableOpacity>)
                                        )}
                                </View>
                            );
                            }}
                            keyExtractor={(item, index) => index}
                            />

                    </View>

                                    
                    <TouchableOpacity style={styles.btn_update}>
                        <Text style={styles.txt_update}>Confirm the appointment</Text>
                    </TouchableOpacity>

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
        borderRadius: 10,
        padding: 20,
        marginTop: 30,
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
        marginRight: 30
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
        marginTop: 10
    },
    val__block_doctor_2 : {
        fontWeight: 'bold'
    },
    label_block_doctor_2 : {
        marginRight: 30,
        color: 'gray'
    },
    btn_update : {
        height: 55,
        backgroundColor: '#008ac8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 20,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20 
    },
    txt_update : {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    block_date_doctor : {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block_checkpoint : {
        marginRight: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: wp('27%')
    },
    block_day_3 : {
        color: '#00C1B4',
        fontWeight: 'bold',
        fontSize: 16
    },
    block_value_date_3 : {
        color: 'gray',
        position: 'relative',
        bottom: 3,
        fontSize: 14
    },
    Contain_textStyle : {
        backgroundColor: '#008ac840',
        padding: 5,
        borderRadius: 3,
        marginTop: 10
    },
    TextStyle : {
        color: 'black',
        fontSize: 14,
    },
    contain_choice : {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 5,
        marginTop: 20,
        marginBottom: 10
    },
    label_choice : {
        backgroundColor: 'whitesmoke',
        color: 'gray',
        padding: 5,
        position: 'absolute',
        fontSize: 16,
        marginTop: -15,
        left: 10,
        width: 200
    },
    select : {
        marginLeft: 20,
        height: 10
    }
})