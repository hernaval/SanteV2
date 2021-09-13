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


export default class PatientProSante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    id: 1,
                    name: 'Mr. Gregory Smith',
                    description: 'Lorem ipsum, dolor asit',
                    profile: require('./../../../images/userIcon.png')
                },
                {
                    id: 2,
                    name: 'Mr. Gregory Smith',
                    description: 'Lorem ipsum, dolor asit',
                    profile: require('./../../../images/userIcon.png')
                },
                {
                    id: 3,
                    name: 'Mr. Gregory Smith',
                    description: 'Lorem ipsum, dolor asit',
                    profile: require('./../../../images/userIcon.png')
                },
                {
                    id: 4,
                    name: 'Mr. Gregory Smith',
                    description: 'Lorem ipsum, dolor asit',
                    profile: require('./../../../images/userIcon.png')
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
        this.props.navigation.navigate('DetailPatientProSante', {
            id
        })
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRouteProSante title="My patients" navigation={this.props.navigation}/>
                
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
                    <Text style={styles.main_title}>All</Text>

                    <View style={styles.main_scroll}>
                    { this.state.data.map(
                        list => (
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
                                        <Text style={{fontSize: 14}}>{list.description}</Text>
                                    </View> 
                                </View>
                            </TouchableOpacity>
                        )
                    )}
                    <View style={{height: hp('5%'), marginBottom: 10}}></View>
                    </View>
                </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20
    },
    main_contain : {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
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
    block : {
        marginBottom: 20,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        backgroundColor: 'white',
        borderRadius: 5
    },
    block_icon : {
        width: 30,
        height: 30,
        borderRadius: 50,
        // backgroundColor: '#FFFBCD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        width: 40,
        height: 40
    },
    block_description : {
        marginLeft: 20
    },
    title_doc : {
        fontSize: 20,
        fontWeight: 'normal'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 3
    },
})