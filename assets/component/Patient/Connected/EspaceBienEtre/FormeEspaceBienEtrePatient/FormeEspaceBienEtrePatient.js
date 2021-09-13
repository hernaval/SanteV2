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
import { faArrowRight, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { AppFormePatient } from './AppFormePatient';

const data = [
    {
      illustration: require('./../../../../../images/espace_bien_etre/pexels-elina-fairytale-3822621.jpg'),
      title: "Yoga",
    },
    {
        illustration: require('./../../../../../images/espace_bien_etre/pexels-tina-nord-816377.jpg'),
        title: "Meditation",
    }
];

const arrowRight = require('./../../../../../images/espace_bien_etre/arrow-down-short.png')

const app = [
    {
        title: 'apk',
        illustration: ''
    },
    {
        title: 'apk',
        illustration: ''
    },
    {
        title: 'apk',
        illustration: ''
    },
    {
        title: 'apk',
        illustration: ''
    },
    {
        title: 'apk',
        illustration: ''
    }
]

export default class FormeEspaceBienEtrePatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            app: app
        }
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="My shape" backRoute="EspaceBienEtrePatient"/>
            <ScrollView style={{height: hp('95%')}}>
                <View style={styles.main_block}>
                <ImageBackground
                    style={styles.img_bg}
                    source={require('./../../../../../images/espace_bien_etre/sport-lifestyle-fitness-male-training.jpg')}>
                </ImageBackground>
                <View style={styles.block_slide}>
                    <Text style={styles.dots_slide}></Text>
                    <Text style={styles.bar_slide}></Text>
                    <Text style={styles.dots_slide}></Text>
                </View>    
                </View>

                <View style={styles.block}>
                    <View style={styles.block_head}>
                        <Text style={styles.block_head_title}>To let off steam</Text>
                        <Image
                        style={styles.img_arrow}
                        source={arrowRight}
                        />
                    </View>
                    <View>
                        <FlatList
                        horizontal
                        style={{marginTop: 0, marginLeft: 0, marginRight: 5}}
                        data={this.state.app}
                        renderItem={({ item: rowData }) => {
                        return (
                            <AppFormePatient/>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />
                    </View>
                </View>    

                <View style={styles.block}>
                    <View style={styles.block_head}>
                        <Text style={styles.block_head_title}>To strengthen me</Text>
                        <Image
                        style={styles.img_arrow}
                        source={arrowRight}
                        />
                    </View>
                    <View>
                        <FlatList
                        horizontal
                        style={{marginTop: 0, marginLeft: 0, marginRight: 5}}
                        data={this.state.app}
                        renderItem={({ item: rowData }) => {
                        return (
                            <AppFormePatient/>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />
                    </View>
                </View>    

                <View style={styles.block}>
                    <View style={styles.block_head}>
                        <Text style={styles.block_head_title}>To relax</Text>
                        <Image
                        style={styles.img_arrow}
                        source={arrowRight}
                        />
                    </View>
                    <View>
                        <FlatList
                        horizontal
                        style={{marginTop: 0, marginLeft: 0, marginRight: 5}}
                        data={this.state.app}
                        renderItem={({ item: rowData }) => {
                        return (
                            <AppFormePatient/>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />
                    </View>
                </View>    

                <View>
                    <FlatList
                    horizontal
                    style={{marginTop: 0, marginLeft: 0, marginRight: 5}}
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

                <View style={styles.block}>
                    <View style={styles.block_head}>
                        <Text style={styles.block_head_title}>Pedometer</Text>
                        <Image
                        style={styles.img_arrow}
                        source={arrowRight}
                        />
                    </View>
                    <View>
                        <FlatList
                        horizontal
                        style={{marginTop: 0, marginLeft: 0, marginRight: 5}}
                        data={this.state.app}
                        renderItem={({ item: rowData }) => {
                        return (
                            <AppFormePatient/>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />
                    </View>
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
    img_arrow : {
        height: 12
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        minHeight: hp('20%'),
        padding: 10
    },
    block_title : {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#008ac8'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    contain_profil : {
        backgroundColor: 'white',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '48%'
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
        marginLeft: 10,
        marginRight: 20,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20
    },
    txt_update : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    block : {
        backgroundColor: 'whitesmoke',
        marginTop: 20,
        marginBottom: 20,
        padding: 20
    },
    block_head : {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    block_head_title : {
        fontSize: 18,
        fontWeight: 'bold'
    },
})

