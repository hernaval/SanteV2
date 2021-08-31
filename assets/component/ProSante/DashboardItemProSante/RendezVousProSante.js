import { StyleSheet, TouchableOpacity, Image, Text, View, TextInput, ScrollView} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { HeaderRouteProSante } from './HeaderRouteProSante'


export default class RendezVousProSante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    id: 1,
                    name: 'Mr. Gregory Smith',
                    motif: 'Contrôl médical',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Centre Paris',
                    heure: '14h',
                    date: '10/01/2021'
                },
                {
                    id: 2,
                    name: 'Mr. Gregory Smith',
                    motif: 'Contrôl médical',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Centre Paris',
                    heure: '14h',
                    date: '10/01/2021'                },
                {
                    id: 3,
                    name: 'Mr. Gregory Smith',
                    motif: 'Contrôl médical',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Centre Paris',
                    heure: '14h',
                    date: '10/01/2021'                
                },
                {
                    id: 4,
                    name: 'Mr. Gregory Smith',
                    motif: 'Contrôl médical',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Centre Paris',
                    heure: '14h',
                    date: '10/01/2021'                
                },
            ],
        }
        this.originData = this.state.data
    }

    _filterData(text) {
        var newData = this.originData.filter(list => list.name.includes(text))
        if (text === '') {
            this.setState({
                data: this.originData
            })
            return false
        }
        this.setState({
            data: newData
        })
        return true
    }

    _detail(id) {
        // this.props.navigation.navigate('DetailPatientProSante', {
        //     id
        // })
    }

    render() {
        return(
            <View style={styles.main}>
                <HeaderRouteProSante title="Rendez-vous" navigation={this.props.navigation}/>

                <View style={styles.main_contain}>
                    <View style={styles.contain_search}>
                    <Image
                        style={styles.icon_search}
                        source={require("../../../images/icons/documents/search-interface-symbol.png")}
                    />
                    <TextInput style={styles.input_search} 
                    placeholder="Rechercher"
                    returnKeyType='search'
                    onChangeText={text => this._filterData(text)}/>
                    </View>

                    <ScrollView style={{height: hp('80%')}}>
                    {/* <Text style={styles.main_title}>Tous</Text> */}

                    <View style={styles.main_scroll}>
                    { this.state.data.map(
                        list => (
                            <View style={styles.main_block}>
                            <TouchableOpacity style={styles.block}
                            onPress={() => this._detail(list.id)}>
                                <View style={[styles.block_icon]}>
                                    <Image style={styles.icon_img} source={list.profile} />
                                </View>
                                <View style={styles.block_description}>
                                    <View>
                                        <Text style={styles.title_doc}>{list.name}</Text>
                                    </View>
                                    <View style={styles.block_detail}>
                                        <Text>{list.motif}</Text>
                                    </View> 
                                </View>
                            </TouchableOpacity>
                            <View style={styles.block_2}>
                            <View style={styles.block_2_}>
                                <Text style={styles.text_block}>
                                {list.lieu}
                                </Text>
                            </View>
                            <View style={styles.block_2_}>
                                <Image
                                source={require("../../../images/icons/dossiers/wall-clock.png")}
                                style={styles.img_rappel}
                                />
                                <Text style={[styles.text_block, styles.text_detail_hour]}>
                                {list.heure}
                                </Text>
                                <Text style={[styles.text_block, styles.text_detail_date]}>
                                {list.date}
                                </Text>
                            </View>
                        </View>
                            </View>
                        )
                    )}
                    <View style={{height: hp('15%'), marginBottom: 10}}></View>
                    </View>

                    <View style={styles.spacer}></View>
                </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spacer: {
        height: hp('15%')
    },
    main: {
        marginTop: 20
    },
    main_contain : {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30
    },
    contain_search : {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 20,
        marginBottom: 30,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    icon_search : {
        width: 25,
        height: 25
    },
    input_search : {
        fontSize: 20,
        marginLeft: 20
    },
    main_title : {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 5
    },
    main_block : {
        marginBottom: 20,
        minHeight: 90,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    block : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    block_icon : {
        width: 60,
        height: 60,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        width: 60,
        height: 60
    },
    block_description : {
        marginLeft: 25
    },
    title_doc : {
        fontSize: 23,
        fontWeight: 'normal'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 10
    },
    block_2 : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    block_2_ : {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_block : {
        flexWrap: 'wrap',
        fontSize: 18
    },
    text_detail_hour : {
        marginLeft: 20,
        marginRight: 20,
        borderRightColor: '#00C1B4',
        borderRightWidth: 1,
        paddingRight: 20
    },
    img_rappel : {
        width: 25,
        height: 25
    },
})