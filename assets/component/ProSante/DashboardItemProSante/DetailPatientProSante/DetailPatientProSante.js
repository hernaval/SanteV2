import { StyleSheet, TouchableOpacity, Image, Text, View, TextInput, ScrollView, FlatList} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { HeaderRouteProSante } from '../HeaderRouteProSante'
import { DossierMedicalPatientProSante } from "./DossierMedicalPatientProSante";
import { Background } from "../../../Home/Background";

const data = [
    {
      imageUrl: require('../../../../images/icons/documents/doc-medicaux1.png'),
      imageSecond : require('../../../../images/icons/documents/doc-medicaux2.png'),
      title: "Dossier médical",
      order: 1
    },
    {
      imageUrl: require('../../../../images/icons/documents/ordonnance1.png'),
      imageSecond: require('../../../../images/icons/documents/ordonnance2.png'),
      title: "Résultats d\'examens",
      order: 2
    },
    {
        imageUrl: require('../../../../images/icons/documents/pass-sanitaire1.png'),
        imageSecond: require('../../../../images/icons/documents/pass-sanitaire2.png'),
        title: "Contrôle des prises en charge sanitaire",
        order: 3
    },
    {
        imageUrl: require('../../../../images/icons/documents/pass-sanitaire1.png'),
        imageSecond: require('../../../../images/icons/documents/pass-sanitaire2.png'),
        title: "Gestion des documents",
        order: 4
    }
  ];

export default class DetailPatientProSante extends React.Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const id = navigation.getParam('id', 0);
        this.state = {
            patient : {
                name: 'Dr. Gregory Smith',
                description: 'Lorem ipsum, dolor asit',
                profile: require('./../../../../images/userIcon.png'),
                id: id
            },
            data: data,
            currentOrder: 1
        }
    }

    _setOrder(order) {
        this.setState({
            currentOrder: order
        })
    }

    _getBackground(order) {
        if (order === this.state.currentOrder) {
            return '#008ac8'
        }
        return 'white'
    }

    _getColor(order) {
        if (order === this.state.currentOrder) {
            return 'white'
        }
        return 'black'
    }

    _getBackgroundIcon(order) {
        if (order === this.state.currentOrder) {
            return 'white'
        }
        return '#00C1B4'
    }

    render() {
        return(
            <View style={styles.main}>
                <Background/>
                <HeaderRouteProSante title="Mes patients" 
                navigation={this.props.navigation} backRoute="PatientProSante"/>

                <ScrollView style={{height: hp('90%'), marginTop: 0}}>
                <View style={styles.main_contain}>
                    <View style={styles.block}>
                    <View style={[styles.block_icon]}>
                        <Image style={styles.icon_img} source={this.state.patient.profile} />
                    </View>
                    <View style={styles.block_description}>
                        <View>
                            <Text style={styles.title_doc}>{this.state.patient.name}</Text>
                        </View>
                        <View style={styles.block_detail}>
                            <Text style={{fontSize: 16}}>{this.state.patient.description}</Text>
                        </View> 
                    </View>
                    </View>
                </View>

                <FlatList
                horizontal
                style={{marginTop: 10, marginLeft: 15, marginRight: 15}}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                return (
                    <TouchableOpacity 
                    onPress={() => this._setOrder(rowData.order)}
                    style={[styles.card_scroll, 
                    {backgroundColor: this._getBackground(rowData.order)}]}>

                        <View 
                        style={[styles.card_contain_img, 
                        {backgroundColor: this._getBackgroundIcon(rowData.order)}]}>
                            {
                                this.state.currentOrder !== rowData.order &&
                                <Image source={rowData.imageUrl} style={styles.card_img}/>
                            }
                            {
                                this.state.currentOrder === rowData.order &&
                                <Image source={rowData.imageSecond} style={styles.card_img}/>
                            }
                        </View>

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

                <DossierMedicalPatientProSante/>

                <View style={styles.spacer}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        marginTop: 20,
    },
    main_contain : {

    },
    block : {
        marginTop: 10,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 10
    },
    block_icon : {
        width: 30,
        height: 30,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: '#FFFBCD',
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
        fontWeight: 'bold'
    },
    block_detail : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginTop: 5
    },
    card_scroll : {
        height: 130,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_contain_img : {
        backgroundColor: '#00C1B4',
        width: 40,
        height: 40,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20
    },
    card_img : {
        width: 18,
        height: 20
    },
    card_title : {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    spacer: {
        height: hp('15%')
    }
})
