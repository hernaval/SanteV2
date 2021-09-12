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
import { EvolutionProfilPatient } from './EvolutionProfilPatient';

const data = [
    {
      illustration: require('./../../../../../images/espace_bien_etre/pexels-anthony-shkraba-4662345.jpg'),
      title: "Me stabiliser",
    },
    {
        illustration: require('./../../../../../images/espace_bien_etre/pexels-pixabay-416809.jpg'),
        title: "Perdre du poids",
    },
    {
        illustration: require('./../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
        title: "Prendre du poids",
    }
];

export default class ProfilEspaceBienEtrePatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="Mon profil" backRoute="EspaceBienEtrePatient"/>
            <ScrollView style={{height: hp('95%')}}>
                <View style={styles.main_block}>
                <ImageBackground
                    style={styles.img_bg}
                    source={require('./../../../../../images/espace_bien_etre/pexels-ivan-samkov-7900282.jpg')}>
                </ImageBackground>
                <View style={styles.block_slide}>
                    <Text style={styles.dots_slide}></Text>
                    <Text style={styles.bar_slide}></Text>
                    <Text style={styles.dots_slide}></Text>
                </View>    
                </View>

                <View style={styles.block}>
                    <Text style={styles.block_title}>Mon Profil</Text>
                    <View style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Text style={styles.title_profil}>AGE</Text>
                            <Text style={styles.bar_profil}></Text>
                            <Text style={styles.value_profil}>33 ans</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <Text style={styles.title_profil}>TAILLE</Text>
                            <Text style={styles.bar_profil}></Text>
                            <Text style={styles.value_profil}>170 cm</Text>
                        </View>
                    </View>
                    <View style={styles.block_detail}>
                        <View style={styles.contain_profil}>
                            <Text style={styles.title_profil}>SEXE</Text>
                            <Text style={styles.bar_profil}></Text>
                            <Text style={styles.value_profil}>Homme</Text>
                        </View>
                        <View style={styles.contain_profil}>
                            <Text style={styles.title_profil}>POIDS</Text>
                            <Text style={styles.bar_profil}></Text>
                            <Text style={styles.value_profil}>65 kg</Text>
                        </View>
                    </View>
                </View>    

                <View style={styles.block}>
                    <View style={styles.contain_graph}>
                        <View style={styles.block_graph}>
                            <View style={[styles.block_graph_1, {backgroundColor: '#008ac8'}]}>
                                <Text style={styles.text_graph_1}>Sous-poids</Text>
                            </View>
                            <View style={[styles.block_graph_1, {backgroundColor: '#00C1B4'}]}>
                                <Text style={styles.text_graph_1}>Normal</Text>
                            </View>
                            <View style={[styles.block_graph_1, {backgroundColor: '#f933b3'}]}>
                                <Text style={styles.text_graph_1}>Surpoids</Text>
                            </View>
                        </View>
                        <View style={styles.block_graph_value}>
                            <Text style={styles.block_graph_txt}>10</Text>
                            <Text style={styles.block_graph_txt}>20</Text>
                            <Text style={styles.block_graph_txt}>30</Text>
                            <Text style={styles.block_graph_txt}>40</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.block}>
                    <Text style={styles.block_title}>Mes mensurations</Text>
                    <View style={styles.block_mensu}>
                        <Text style={styles.title_profil}>Tour de taille : </Text>
                        <Text style={styles.value_profil}>25 mm</Text>
                    </View>
                    <View style={styles.block_mensu}>
                        <Text style={styles.title_profil}>Biceps : </Text>
                        <Text style={styles.value_profil}>25 mm</Text>
                    </View>
                    <View style={styles.block_mensu}>
                        <Text style={styles.title_profil}>Cuisse : </Text>
                        <Text style={styles.value_profil}>15 mm</Text>
                    </View>
                </View> 

                <View>
                    <Text style={[styles.block_title, {marginLeft: 20, marginTop: 20, marginBottom: 10}]}>
                        Bien dans mon corps
                    </Text>

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
                    <Text style={styles.block_title}>Mon évolution</Text>
                    <EvolutionProfilPatient/>
                </View> 
                
                <TouchableOpacity style={styles.btn_update}>
                    <Text style={styles.txt_update}>Mettre à jour</Text>
                </TouchableOpacity>

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
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        minHeight: hp('15%'),
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
    contain_graph : {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    block_graph : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    block_graph_1 : {
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%'
    },
    block_graph_2 : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text_graph_1 : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    block_graph_value : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    block_graph_txt : {
        fontSize: 16,
        marginTop: 5
    }
})

