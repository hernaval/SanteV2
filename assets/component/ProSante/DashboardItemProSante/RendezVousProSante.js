import { StyleSheet, TouchableOpacity, Image, Text, View, TextInput, ScrollView} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { HeaderRouteProSante } from './HeaderRouteProSante'
import { Background } from "../../Home/Background";


export default class RendezVousProSante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    id: 1,
                    name: 'Mr. Gregory Smith',
                    motif: 'Medical check',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Paris Center',
                    heure: '14h',
                    date: '10/01/2021'
                },
                {
                    id: 2,
                    name: 'Mr. Gregory Smith',
                    motif: 'Medical check',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Paris Center',
                    heure: '14h',
                    date: '10/01/2021'                
                },
                {
                    id: 3,
                    name: 'Mr. Gregory Smith',
                    motif: 'Medical check',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Paris Center',
                    heure: '14h',
                    date: '10/01/2021'                
                },
                {
                    id: 4,
                    name: 'Mr. Gregory Smith',
                    motif: 'Medical check',
                    profile: require('./../../../images/userIcon.png'),
                    lieu: 'Paris Center',
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
                <Background/>
                <HeaderRouteProSante title="Appointment" navigation={this.props.navigation}/>

                <View style={styles.main_contain}>
                    <View style={styles.contain_search}>
                    <Image
                        style={styles.icon_search}
                        source={require("../../../images/icons/documents/search-interface-symbol.png")}
                    />
                    <TextInput style={styles.input_search} 
                    placeholder="Search"
                    returnKeyType='search'
                    onChangeText={text => this._filterData(text)}/>
                    </View>

                    <ScrollView style={{height: hp('80%')}}>
                    {/* <Text style={styles.main_title}>Tous</Text> */}

                    <View style={styles.main_scroll}>
                        <Text style={styles.txt_date}>Today</Text>

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
                    {/* <View style={{height: hp('2%'), marginBottom: 10}}></View> */}
                    </View>

                    <View style={styles.spacer}></View>
                </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txt_date: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    spacer: {
        height: hp('15%')
    },
    main: {
        marginTop: 20
    },
    main_contain : {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15
    },
    contain_search : {
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 40
    },
    icon_search : {
        width: 15,
        height: 15
    },
    input_search : {
        fontSize: 16,
        marginLeft: 20,
        position: 'relative',
        bottom: 5
    },
    main_title : {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10
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
        width: 30,
        height: 30,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        width: 40,
        height: 40
    },
    block_description : {
        marginLeft: 25
    },
    title_doc : {
        fontSize: 20,
        fontWeight: '700'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 5
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
        fontSize: 13
    },
    text_detail_hour : {
        marginLeft: 15,
        marginRight: 10,
        borderRightColor: '#00C1B4',
        borderRightWidth: 1,
        paddingRight: 10
    },
    img_rappel : {
        width: 12,
        height: 12
    },
})