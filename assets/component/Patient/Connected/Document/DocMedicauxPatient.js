import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 


export class DocMedicauxPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    title: 'Document medicaux.pdf',
                    description: 'Lorem ipsum',
                    date: '10-08-21'
                },
                {
                    title: 'Document medicaux.doc',
                    description: 'Lorem ipsum',
                    date: '10-08-21'
                },
                {
                    title: 'Document medicaux.png',
                    description: 'Lorem ipsum',
                    date: '10-08-21'
                },
                {
                    title: 'Document medicaux.pdf',
                    description: 'Lorem ipsum',
                    date: '10-08-21'
                }
            ],
        }
        this.originData = this.state.data
    }

    _getColor(title) {
        var extension  = title.substring(title.length - 3,title.length)
        if (extension === 'png') {
            return '#ff0a54'
        }
        if (extension === 'jpg') {
            return '#ff0a54'
        }
        if (extension === 'pdf') {
            return '#008ac8'
        }
        if (extension === 'doc') {
            return '#00C1B4'
        }
        return '#008AC8'
    }

    _getSource(title) {
        var extension  = title.substring(title.length - 3,title.length)
        if (extension === 'png') {
            return require('../../../../images/icons/documents/png.png')
        }
        if (extension === 'jpg') {
            return require('../../../../images/icons/documents/png.png')
        }
        if (extension === 'pdf') {
            return require('../../../../images/icons/documents/pdf.png')
        }
        if (extension === 'doc') {
            return require('../../../../images/icons/documents/doc.png')
        }
        return require('../../../../images/icons/documents/doc.png')
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

    render() {
        return(
            <View style={styles.main}>
                <ScrollView style={styles.scroll_view}>
                <Text style={styles.main_title}>Tous les documents médicaux</Text>

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
                            <View style={styles.block}>
                                <View style={[styles.block_icon, {backgroundColor: this._getColor(list.title)}]}>
                                    <Image style={styles.icon_img} source={this._getSource(list.title)} />
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
                            </View>
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
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },
    scroll_view : {
        height: hp('60%')
    },
    main_title : {
        fontSize: 23,
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
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#008AC8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_img : {
        width: 24,
        height: 29
    },
    block_description : {
        marginLeft: 25
    },
    title_doc : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 10
    },
    contain_search : {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
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
    }
})