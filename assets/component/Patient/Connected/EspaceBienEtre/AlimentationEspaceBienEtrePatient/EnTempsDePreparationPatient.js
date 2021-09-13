import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native'
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
        title : 'Goulasc soup',
        time : '00 : 20 : 00',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
    },
    {
        title : 'Goulasc soup',
        time : '00 : 20 : 00',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
    },
    {
        title : 'Pizza dish',
        time : '00 : 20 : 00',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
    },
    {
        title : 'Farfalle pesto pasta',
        time : '00 : 20 : 00',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
    }
]

export default class EnTempsDePreparationPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    
    _filterData(text) {

    }

    render() {
        return (
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="Preparation time" backRoute="AlimentationEspaceBienEtrePatient"/>

                <ScrollView style={{height: hp('95%'), marginLeft: 20, marginRight: 20}}>
                <View style={styles.contain_search}>
                    <Image
                        style={styles.icon_search}
                        source={require("../../../../../images/icons/documents/search-interface-symbol.png")}
                    />
                    <TextInput style={styles.input_search} 
                    placeholder="Search"
                    returnKeyType='search'
                    onChangeText={text => this._filterData(text)}/>
                </View>

                <FlatList
                vertical
                style={{marginTop: 10, marginLeft: 0, marginRight: 0}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <View 
                    style={styles.contain_list}>
                        <Image
                        style={styles.img_list}
                        source={rowData.illustration}
                        />

                        <View style={styles.description_list}>
                            <Text style={styles.title_description}>
                                {rowData.title}
                            </Text>
                            <View style={styles.other_description_list}>
                                <Image
                                source={require("../../../../../images/icons/dossiers/wall-clock.png")}
                                style={styles.img_rappel}
                                />
                                <Text style={styles.txt_time}>Remaining time : </Text>
                                <Text style={styles.value_time}>{rowData.time}</Text>
                            </View>
                        </View>
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
    contain_search : {
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingLeft: 10,
        // paddingTop: 20,
        marginBottom: 20,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    icon_search : {
        width: 15,
        height: 15
    },
    input_search : {
        fontSize: 16,
        marginLeft: 20,
        // position: 'relative',
        // bottom: 5
    },
    contain_list : {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: 'whitesmoke'
    },
    img_list : {
        height: 70,
        width: 70,
        marginRight: 15
    },
    description_list: {
        display: 'flex',
        flexDirection: 'column',
    },
    other_description_list : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    title_description : {
        fontSize: 18,
        fontWeight: 'bold'
    },
    txt_time : {
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20
    },
    value_time : {
        fontSize: 18,
        color: '#008ac8'
    },
    img_rappel : {
        width: 15,
        height: 15
    }
})