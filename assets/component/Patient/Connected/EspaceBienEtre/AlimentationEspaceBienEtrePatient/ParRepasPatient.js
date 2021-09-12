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

export default class ParRepasPatient extends React.Component {
    constructor(props) {
        super(props)
    }

    _filterData(text) {

    }

    render() {
        return (
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="Par repas" backRoute="AlimentationEspaceBienEtrePatient"/>

                <ScrollView style={{height: hp('95%'), marginLeft: 20, marginRight: 20}}>
                <View style={styles.contain_search}>
                    <Image
                        style={styles.icon_search}
                        source={require("../../../../../images/icons/documents/search-interface-symbol.png")}
                    />
                    <TextInput style={styles.input_search} 
                    placeholder="Rechercher"
                    returnKeyType='search'
                    onChangeText={text => this._filterData(text)}/>
                </View>

                <View style={styles.contain_block}> 
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-ponyo-sakana-3662126.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Soupe de goulasc
                        </Text>
                    </View>
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-robin-stickel-70497.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Pizza Assiette
                        </Text>
                    </View>
                </View>

                <View style={styles.contain_block}> 
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-ponyo-sakana-3662126.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Yaourt Fraise
                        </Text>
                    </View>
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-alexander-mils-1149300.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Pate Pesto farfalle
                        </Text>
                    </View>
                </View>

                <View style={styles.contain_block}> 
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-ponyo-sakana-3662189.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Pain jambon Max Plus
                        </Text>
                    </View>
                    <View style={styles.inside_block}>
                        <ImageBackground
                        style={styles.img_bg}
                        source={require('./../../../../../images/espace_bien_etre/pexels-vlad-bagacian-2267134.jpg')}>
                        </ImageBackground>
                        <Text style={styles.text_block}>
                            Figure fromage Pain
                        </Text>
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
    contain_block : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20
    },
    inside_block : {
        height: hp('30%'),
        width: wp('45%'),
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_block : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    img_bg : {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.6,
        backgroundColor: 'black'
    }
})