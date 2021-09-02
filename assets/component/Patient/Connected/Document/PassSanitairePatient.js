import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 


export class PassSanitairePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    id: 1,
                    title: 'Certificat de vaccination COVID19',
                    description: 'Lorem ipsum',
                    date: '10-08-21'
                }
            ],
        }
        this.originData = this.state.data
    }

    _getColor(title) {
        return '#008AC8'
    }

    _filterData(text) {
        var newData = this.state.data.filter(list => list.title.includes(text))
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

    _detailPassSanitaire(id) {
        this.props.navigation.navigate('DetailPassSanitaire', {
            id
        });
    }

    render() {
        return(
            <View style={styles.main}>
                <ScrollView style={styles.scroll_view}>
                <Text style={styles.main_title}>Tous les pass sanitaire</Text>

                <View style={styles.contain_search}>
                <Image
                    style={styles.icon_search}
                    source={require("../../../../images/icons/documents/search-interface-symbol.png")}
                />
                <TextInput style={styles.input_search} 
                placeholder="Rechercher"
                returnKeyType='search'
                onChangeText={text => this._filterData(text)}/>
                </View>

                <View style={styles.main_scroll}>
                    { this.state.data.map(
                        list => (
                            <TouchableOpacity style={styles.block}
                            onPress={() => this._detailPassSanitaire(list.id)}>
                                <View style={[styles.block_icon, {backgroundColor: this._getColor(list.title)}]}>
                                    <Image style={styles.icon_img} 
                                    source={require('../../../../images/icons/documents/icon-ordonnance.png')} />
                                </View>
                                <View style={styles.block_description}>
                                    <View>
                                        <Text style={styles.title_doc}>{list.title}</Text>
                                    </View>
                                    <View style={styles.block_detail}>
                                        <Text>{list.description}</Text>
                                        <Text>{list.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    ) }

                    <View style={{height: hp('15%'), marginBottom: 10}}></View>
                </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15
    },
    scroll_view : {
        height: hp('60%')
    },
    main_title : {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    block : {
        marginBottom: 10,
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    spacer: {
        height: hp("12%"),
        marginBottom: 100
    },
    main_scroll : {
        flex: 1
    },
    block_icon : {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#008AC8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        width: 13,
        height: 17
    },
    block_description : {
        marginLeft: 15
    },
    title_doc : {
        fontSize: 16,
        fontWeight: 'bold'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 5
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
})