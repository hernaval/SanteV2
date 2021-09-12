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
        title: 'Légumes',
        order: 1
    },
    {
        title: 'Viandes',
        order: 2
    },
    {
        title: 'Fruits',
        order: 3
    },
    {
        title: 'Jus',
        order: 4
    },
]

const legumes = [
    {
        designation : 'Courgette',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
    },
    {
        designation : 'Carotte',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
    },
    {
        designation : 'Choux',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
    }
]

const viandes = [
    {
        designation : 'Viande hachée',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
    },
    {
        designation : 'Viande en filet',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-cats-coming-406152.jpg'),
    }
]

const fruits = [
    {
        designation : 'Pomme',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-vlad-bagacian-2267134.jpg'),
    },
    {
        designation : 'Ananas',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-vlad-bagacian-2267134.jpg'),
    }
]

const jus = [
    {
        designation : 'Jus de citron',
        poids: '250 grammes',
        illustration: require('../../../../../images/espace_bien_etre/pexels-alexander-mils-1149300.jpg'),
    },

]

export default class DansMonFrigoPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            currentOrder: 1,
            list: legumes
        }
    }

    _setOrder(order) {
        this.setState({
            currentOrder: order
        })
        if (order == 1) this.setState({list: legumes})
        if (order == 2) this.setState({list: viandes})
        if (order == 3) this.setState({list: fruits})
        if (order == 4) this.setState({list: jus})
    }

    _getBorderColor(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'white'
    }

    _getColor(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'black'
    }

    _filterData(text) {

    }

    render() {
        return (
            <View style={styles.main}>
                <Background/>
                <HeaderRoutePatient navigation={this.props.navigation} 
                title="Dans mon frigo" backRoute="AlimentationEspaceBienEtrePatient"/>

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

                <Text style={{fontSize: 20}}>
                    Catégories
                </Text>

                <FlatList
                horizontal
                style={{marginTop: 20, marginLeft: 0, marginRight: 0}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <TouchableOpacity 
                    onPress={() => this._setOrder(rowData.order)}
                    style={[styles.card_scroll, 
                    {borderLeftColor: this._getBorderColor(rowData.order),
                        borderTopColor: this._getBorderColor(rowData.order),
                        borderRightColor: this._getBorderColor(rowData.order),
                        borderBottomColor: this._getBorderColor(rowData.order)}]}>

                        <Text 
                        style={[styles.card_title, 
                        {color: this._getColor(rowData.order)}]}>
                            {rowData.title}
                        </Text>
                    </TouchableOpacity>
                );
                }}
                keyExtractor={(item, index) => index}
                />

                <FlatList
                vertical
                style={{marginTop: 20, marginLeft: 0, marginRight: 0}}
                data={this.state.list}
                renderItem={({ item: rowData }) => {
                return (
                    <View 
                    style={styles.contain_list}>
                        <Image
                        style={styles.illustration_list}
                        source={rowData.illustration}
                        />
                        <View style={styles.contain_text_list}>
                            <Text style={styles.text_list}>{rowData.designation}</Text>
                            <Text style={styles.text_list}>{rowData.poids}</Text>
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
    card_scroll : {
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1
    },
    card_title : {
        fontSize: 18
    },
    contain_list : {
        display: 'flex',
        flexDirection: 'row',
        // height: 100,
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    illustration_list : {
        marginRight: 20,
        marginLeft: 10,
        width: 70,
        height: 70,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    contain_text_list : {
        display: 'flex',
        flexDirection: 'column'
    },
    text_list : {
        fontSize: 18,
        color: 'grey'
    }
})