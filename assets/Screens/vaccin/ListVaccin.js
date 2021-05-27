import React, {Component} from 'react';
import {
    StyleSheet, SafeAreaView, Share, Alert, Text, View, Modal,
    AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox
} from 'react-native';
import { connect } from 'react-redux';
import HeaderMenu from "../../component/Menu/HeaderMenu";
import { setUserInfo, ModifyPhoto } from '../../Action';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Bdd from "../../API/Bdd";
import { faArrowRight, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import VaccinItem from './VaccinItem'


// const vaccins = [
//     {
//         nom_vaccin: "Vaccin covid 19", 
//         type_vaccin: "covid 19", 
//         doses : [
//             {
//                 nomination: "1ère dosage",
//                 status: 1,
//                 date: "12/01/2021",
//                 lieu: "Antananarivo",
//                 pays: "MADAGASCAR"
//             },
//             {
//                 nomination: "2ème dosage",
//                 status: 1,
//                 date: "25/07/2021",
//                 lieu: "Antananarivo",
//                 pays: "MADAGASCAR"
//             }
//         ]
//     },
//     {
//         nom_vaccin: "Vaccin kitrotro", 
//         type_vaccin: "kitrotro", 
//         doses : [
//             {
//                 nomination: "1ère dosage",
//                 status: 1,
//                 date: "12/01/2021",
//                 lieu: "Antananarivo",
//                 pays: "MADAGASCAR"
//             }, {
//                 nomination: "2ème dosage",
//                 status: 0,
//             }
//         ]
//     }
// ]

class ListVaccin extends Component {
    constructor(props) {
        super(props);
        var myModule = require('./data');

        this.state = {
            isLoading: false,
            vaccins: myModule.vaccins
        }
    }

    componentDidMount = async () => {}

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <HeaderMenu navigation={this.props.navigation} vaccin={1} />
                </View>

                <ScrollView style={[styles.scroll]}>
                    <View>
                        <Text style={styles.title_text}>
                            Les vaccins réalisés
                        </Text>
                    </View>

                    {this.state.vaccins.map((item, index) => {
                        return <VaccinItem navigation={this.props.navigation} 
                                detail={item}
                                nom={item.nom_vaccin}
                                type={item.type_vaccin}
                                doses={item.doses}
                                id={index}>
                        </VaccinItem>
            })}
                </ScrollView>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00C1B4',
        zIndex: 40,
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconCard : {
        color : "#00C1B4"
    },
    loading_container: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    under: {
        height: hp('10%'),
        zIndex: 99
    },
    title_text: {
        fontWeight: 'bold',
        color: '#008AC8',
        fontSize: 32,
        marginBottom: 25,
        marginTop: 30,
        marginLeft: 10
    },
    scroll: {
        backgroundColor: 'white',
        padding: 20
    }
});

const mapStateToProps = (store) => {
    return {
        user: store.user
        // contact: store.contact,
        // second: store.second
    }
}

const mapDispatchToProps = {
    setUserInfo,
    ModifyPhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(ListVaccin)