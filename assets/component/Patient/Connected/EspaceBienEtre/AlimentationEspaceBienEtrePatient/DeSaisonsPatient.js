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
        title: 'Hiver',
        list : [
            {
                title: 'Soupe aux 5 légumes',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            },
            {
                title: 'Soupe aux 5 légumes',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            }
        ]
    },
    {
        title: 'Printemps',
        list : [
            {
                title: 'Merlan au bouillon parisien',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            },
            {
                title: 'Carpaccio de merlan',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            }
        ]
    },
    {
        title: 'Eté',
        list : [
            {
                title: 'Courgette à la vapeur',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            },
            {
                title: 'Caviar d\'aubergine',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            }
        ]
    },
    {
        title: 'Automne',
        list : [
            {
                title: 'Potiron au four',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            },
            {
                title: 'Poêlée de girolles',
                illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg')
            }
        ]
    }
]

export default class DeSaisonsPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="De saisons" backRoute="AlimentationEspaceBienEtrePatient"/>

                <ScrollView style={{height: hp('95%')}}>

                <FlatList
                vertical
                style={{marginTop: 20, marginLeft: 20, marginRight: 20}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <View 
                    style={styles.contain_list}>
                        <View style={styles.contain_list_title}>
                            <Text style={styles.list_title}>
                                {rowData.title}
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
                                <Image
                                style={styles.img_el}
                                source={el.illustration}
                                />
                                <Text style={styles.title_el}>{el.title}</Text>
                            </View>
                        );
                        }}
                        keyExtractor={(item, index) => index}
                        />

                        <View style={styles.contain_btn}>
                            <View style={styles.sign_btn}>
                                <Text style={styles.sign_btn_txt}>+</Text>
                            </View>
                            <Text style={styles.text_btn}>Ajouter</Text>
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
    contain_list: {
        backgroundColor: 'whitesmoke',
        marginTop: 10,
        marginBottom: 10
    },
    contain_list_title : {
        backgroundColor: '#00C1B4',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginRight: 5,
        paddingBottom: 5
    },
    img_el : {
        width: 50,
        height: 50,
        marginRight: 10
    },
    title_el : {
        fontSize: 18
    }
})