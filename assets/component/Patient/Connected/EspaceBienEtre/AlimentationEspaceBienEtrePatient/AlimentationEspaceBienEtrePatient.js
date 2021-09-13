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

const data = [
    {
      illustration: require('./../../../../../images/espace_bien_etre/pexels-ponyo-sakana-3662126.jpg'),
      title: "What is a balanced meal ?",
    },
    {
        illustration: require('./../../../../../images/espace_bien_etre/pexels-alexander-mils-1149300.jpg'),
        title: "Drink, quantity and quality",
    },
    {
        illustration: require('./../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
        title: "Contact a nutritionist",
    }
];

export default class AlimentationEspaceBienEtrePatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    _click(route) {
        if (!route) return false
        this.props.navigation.navigate(route)
    }

    _observation(day) {
        var now = ''
        var next = ''
        if (day == 1) {now = 'MONDAY'; next = 'TUE'}
        if (day == 2) {now = 'TUESDAY'; next = 'WED'}
        if (day == 3) {now = 'WEDNESDAY'; next = 'THU'}
        if (day == 4) {now = 'THUSDAY'; next = 'FRI'}
        if (day == 5) {now = 'FRIDAY'; next = 'SAT'}
        if (day == 6) {now = 'SATURDAY'; next = 'SUN'}
        if (day == 7) {now = 'SUNDAY'; next = 'MON'}
        this.props.navigation.navigate('TestObservationAlimentationPatient', {
            day,
            now,
            next
        })
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="My diet" backRoute="EspaceBienEtrePatient"/>
            <ScrollView style={{height: hp('95%')}}>
                <View style={styles.main_block}>
                <ImageBackground
                    style={styles.img_bg}
                    source={require('./../../../../../images/espace_bien_etre/pexels-ella-olsson-1640777.jpg')}>
                </ImageBackground>
                <View style={styles.block_slide}>
                    <Text style={styles.dots_slide}></Text>
                    <Text style={styles.bar_slide}></Text>
                    <Text style={styles.dots_slide}></Text>
                </View>    
                </View>

                <View style={styles.block}>
                    <Text style={styles.block_title}>My diary</Text>
                    <View style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Text style={styles.title_profil}>My diary 1</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn_update}>
                        <Text style={styles.txt_update}>Add</Text>
                    </TouchableOpacity>
                </View>    


                <View style={[styles.main_block, {height: hp('25%'), marginTop: 20}]}>
                <ImageBackground
                    style={styles.img_bg}
                    source={require('./../../../../../images/espace_bien_etre/pexels-lumn-1410236.jpg')}>
                </ImageBackground>
                </View>

                <View style={styles.block}>
                    <Text style={styles.block_title}>Observation test</Text>
                    <Text style={styles.block_title}> - a week on my plate</Text>
                    <View style={styles.block_calendar}>
                        <TouchableOpacity 
                        onPress={() => this._observation(1)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>MON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(2)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>TUE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(3)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>WED</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(4)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>THU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(5)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>FRI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(6)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>SAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._observation(7)}
                        style={styles.list_calendar}>
                            <Text style={styles.value_calendar}>SUN</Text>
                        </TouchableOpacity>
                    </View>
                </View>  


                <View style={styles.block}>
                    <Text style={styles.block_title}>My recipes</Text>

                    <TouchableOpacity onPress={() => this._click('DeSaisonsPatient')}
                     style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Image style={styles.icon_img}
                            source={require("../../../../../images/espace_bien_etre/Cloud-Snow-Sunny.png")}/>
                            <Text style={styles.title_profil}>Seasonal</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._click('ParRepasPatient')}
                     style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Image style={styles.icon_img}
                            source={require("../../../../../images/espace_bien_etre/fish.png")}/>
                            <Text style={styles.title_profil}>Per meal</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._click('EnTempsDePreparationPatient')}
                     style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Image style={styles.icon_img}
                            source={require("../../../../../images/espace_bien_etre/time.png")}/>
                            <Text style={styles.title_profil}>In preparation time</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._click('DansMonFrigoPatient')}
                     style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Image style={{height: 18, width: 14, marginRight: 14}}
                            source={require("../../../../../images/espace_bien_etre/refrigerator-outline.png")}/>
                            <Text style={styles.title_profil}>In my fridge</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <FontAwesomeIcon color="black" size={16} icon={faChevronRight}/>
                        </View>
                    </TouchableOpacity>

                </View>   

                <View style={{backgroundColor: 'whitesmoke', paddingTop: 10, paddingBottom: 10, marginTop: 20}}>
                    <Text style={[styles.block_title, {marginLeft: 20, marginTop: 20, marginBottom: 10}]}>
                        My adapted advice
                    </Text>

                    <FlatList
                    horizontal
                    style={{marginTop: 0, marginLeft: 10, marginRight: 5}}
                    data={this.state.data}
                    renderItem={({ item: rowData }) => {
                    return (
                        <View style={styles.card_scroll}>
                            <ImageBackground
                                style={styles.card_item}
                                source={rowData.illustration}>
                            </ImageBackground>
                            <Text style={styles.card_item_title}>{rowData.title}</Text>
                        </View>
                    );
                    }}
                    keyExtractor={(item, index) => index}
                    />
                </View>

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
    img_bg : {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.6,
        backgroundColor: 'black'
    },
    main_block: {
        display: 'flex',
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
        paddingBottom: 20
    },
    block: {
        marginTop: 20,
        // marginLeft: 10,
        // marginRight: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        minHeight: hp('20%'),
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    block_title : {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: 'white',
    },
    contain_profil : {
        // backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: '48%'
    },
    bar_profil : {
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
        borderLeftColor: 'black',
        borderLeftWidth: 1
    },
    title_profil : {
        fontSize: 16
    },
    value_profil : {
        fontSize: 16,
        fontWeight: 'bold'
    },
    block_slide : {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dots_slide : {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    bar_slide : {
        width: 30,
        borderRadius: 3,
        height: 10,
        backgroundColor: '#00C1B4',
        marginLeft: 10,
        marginRight: 10
    },
    block_mensu : {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5
    },
    card_scroll : {
        height: hp('35%'),
        width: wp('60%'),
        marginRight: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    card_item : {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.6,
        backgroundColor: 'black',
        borderRadius: 5
    },
    card_item_title : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
        marginBottom: 30
    },
    btn_update : {
        height: 55,
        backgroundColor: '#008ac8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 10,
        // marginRight: 20,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20
    },
    txt_update : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    block_calendar : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20
    },
    list_calendar : {
        backgroundColor: 'white',
        padding: 10
    },
    value_calendar : {
        color: 'black',
        fontSize: 18
    },
    icon_img : {
        height: 18,
        width: 18,
        marginRight: 10
    }
})

