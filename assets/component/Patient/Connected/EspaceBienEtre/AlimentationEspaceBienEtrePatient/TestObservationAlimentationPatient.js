import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import { Background } from '../../../../Home/Background';
import { HeaderRoutePatient } from '../../HeaderRoutePatient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { MeasureTestObservationPatient } from './MeasureTestObservationPatient';

const data = [
    {
        title: 'Petit-déjeuner',
        calorie: '130 Cal',
        list : [
            {
                designation: 'Pain raisin',
                quantite: '2 pièces',
                calorie: '60'
            },
            {
                designation: 'Lait',
                quantite: '1 verre',
                calorie: '70'
            }
        ]
    },
    {
        title: 'Déjeuner',
        calorie: '150 Cal',
        list : [
            {
                designation: 'Courgette à la vapeur',
                quantite: '50g de courgette',
                calorie: '50'
            },
            {
                designation: 'Soupe légume',
                quantite: 'Pomme de terre: 50g, carotte: 25g',
                calorie: '50'
            },
            {
                designation: 'Steak',
                quantite: '450g',
                calorie: '50'
            }
        ]
    },
    {
        title: 'Diner',
        calorie: '100 Cal',
        list : [
            {
                designation: 'Courgette à la vapeur',
                quantite: '50g de courgette',
                calorie: '50'
            },
            {
                designation: 'Riz',
                quantite: '50g',
                calorie: '50'
            }
        ]
    },
    {
        title: 'Encas',
        calorie: '100 Cal',
        list : [
            {
                designation: 'Raisin sec',
                quantite: '15g',
                calorie: '50'
            },
            {
                designation: 'Chocolat',
                quantite: '45g',
                calorie: '50'
            }
        ]
    },
    {
        title: 'Boissons',
        calorie: '140 Cal',
        list : [
            {
                designation: 'Jus d\'orange',
                quantite: '2 verres',
                calorie: '50'
            },
            {
                designation: 'Eau',
                quantite: '1,5 litres',
                calorie: '50'
            },
            {
                designation: 'Jus d\'ananas',
                quantite: '2 verres',
                calorie: '50'
            }
        ]
    },
    {
        title: 'Activité physique',
        calorie: '100 Cal',
        list : [
            {
                designation: 'Zumba',
                quantite: '30 minutes',
                calorie: '50'
            },
            {
                designation: 'Marche à pied',
                quantite: '25 minutes',
                calorie: '50'
            }
        ]
    }
]

const arrowRight = require('./../../../../../images/espace_bien_etre/arrow-down-short.png')
const calendar = require('./../../../../../images/espace_bien_etre/calendar-page-svgrepo-com.png')

export default class TestObservationAlimentationPatient extends React.Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.day = navigation.getParam('day', 0);
        this.now = navigation.getParam('now', '');
        this.next = navigation.getParam('next', '');
        this.state = {
            data: data,
            day: this.day,
            now: this.now,
            next: this.next
        }
    }

    _observation() {
        const day = this.state.day
        if (day == 1) {this.setState({now : 'MONDAY', next :'TUE' })}
        if (day == 2) {this.setState({now : 'TUESDAY', next :'WED' })}
        if (day == 3) {this.setState({now : 'WEDNESDAY', next :'THU' })}
        if (day == 4) {this.setState({now : 'THUSDAY', next :'FRI' })}
        if (day == 5) {this.setState({now : 'FRIDAY', next :'SAT' })}
        if (day == 6) {this.setState({now : 'SATURDAY', next :'SUN' })}
        if (day == 7) {this.setState({now : 'SUNDAY', next :'MON' })}
        this.setState({day: day+1})
        if (day == 7) this.setState({day: 1})
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="My diet" backRoute="AlimentationEspaceBienEtrePatient"/>

                <ScrollView style={{height: hp('95%'), marginLeft: 20, marginRight: 20}}>
                <View style={styles.main_head}>
                    <View style={styles.under_head}>
                        <Image
                        style={styles.img_calendar}
                        source={calendar}
                        />
                        <Text style={styles.txt_head}>{this.state.now}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={() => this._observation()}
                    style={styles.under_head}>
                        <Text style={styles.txt_head}>{this.state.next}</Text>
                        <Image
                        style={styles.img_arrow}
                        source={arrowRight}
                        />
                    </TouchableOpacity>
                </View>

                <MeasureTestObservationPatient/>

                <FlatList
                vertical
                style={{marginTop: 20, marginLeft: 0, marginRight: 0}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <View 
                    style={styles.contain_list}>
                        <View style={styles.contain_list_title}>
                            <Text style={styles.list_title}>
                                {rowData.title}
                            </Text>
                            <Text style={styles.list_title}>
                                {rowData.calorie}
                            </Text>
                        </View>

                        <FlatList
                        vertical
                        style={{marginTop: 0, marginLeft: 20, marginRight: 20}}
                        data={rowData.list}
                        renderItem={({ item: el }) => {
                        return (
                            <View 
                            style={styles.contain_el}>
                                <View style={styles.inside_contain_el}>
                                    <Text style={styles.title_el}>{el.designation}</Text>
                                    <Text style={styles.title_el}>{el.calorie}</Text>
                                </View>
                                <View style={styles.inside_contain_el}>
                                    <Text style={styles.under_title_el}>{el.quantite}</Text>
                                </View>
                            </View>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />

                        <TouchableOpacity style={styles.contain_btn}>
                            <View style={styles.sign_btn}>
                                <Text style={styles.sign_btn_txt}>+</Text>
                            </View>
                            <Text style={styles.text_btn}>Add</Text>
                        </TouchableOpacity>
                    </View>
                );
                }}
                keyExtractor={(item, index) => index}
                />

                <View style={{height: hp('5%')}}></View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20
    },
    main_head : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    under_head : {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        height: 30
    },  
    img_arrow : {
        height: 12,
        marginLeft: 10
    },
    img_calendar : {
        height: 15,
        marginRight: 10
    },
    txt_head : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contain_list: {
        backgroundColor: 'whitesmoke',
        marginTop: 10,
        marginBottom: 10
    },
    contain_list_title : {
        backgroundColor: '#00C1B4',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    list_title : {
        color: 'white',
        fontSize: 18
    },
    contain_btn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20,
        alignItems: 'center',
        paddingBottom: 10
    },
    sign_btn : {
        width: 20,
        height: 20,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#008ac8',
        borderRadius: 30,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sign_btn_txt : {
        fontSize: 16,
        color: 'white'
    },
    text_btn : {
        fontSize: 18,
        color: '#008ac8'
    },
    contain_el : {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginRight: 5,
        paddingBottom: 5
    },
    inside_contain_el : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_el : {
        fontSize: 18
    },
    under_title_el : {
        fontSize: 14
    }
})