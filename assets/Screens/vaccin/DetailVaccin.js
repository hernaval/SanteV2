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
import DoseDetailVaccin from './DoseDetailVaccin';
import vaccins from './data.js'

class DetailVaccin extends Component {
    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        var id = params.id;
        var myModule = require('./data');
        var vaccins = myModule.vaccins;

        this.state = {
            isLoading: false,
            current: vaccins[id],
            firstname: params.firstname,
            lastname: params.lastname,
            naissance: params.naissance,
            age: params.age,
            sexe: params.sexe
        }
    }

    componentDidMount = async () => {}

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View style={[Platform.OS === 'ios' ? styles.under_ios : styles.under, {position: "absolute", top: 0}]}>
                    <HeaderMenu navigation={this.props.navigation} detail_vaccin={1} />
                    <View style={styles.background}></View>
                </View>


                <View style={styles.contain_content}>
                <ScrollView style={styles.scroll}>
                    <View style={[{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}]}>
                        <Text style={styles.title_text}>
                            Certificat de vaccination
                        </Text>
                    </View>
                    <View style={styles.contain_img}>
                        <Image style={styles.img_qr} resizeMode="contain"
                        source={require("./codeqr.png")} />
                    </View>

                    <View style={styles.contain_detail}>
                        <View style={styles.row}>
                            <Text style={styles.simple_text}>
                                Nom
                            </Text>
                            <Text style={styles.simple_text}>
                                {this.state.firstname}&nbsp;{this.state.lastname}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.simple_text}>
                                Date de naissance
                            </Text>
                            <Text style={styles.simple_text}>
                                {this.state.naissance}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.simple_text}>
                                Age
                            </Text>
                            <View>
                            {this.state.age && (
                            <Text style={styles.simple_text}>
                                {this.state.age} ans
                            </Text>
                            )}
                            </View>

                        </View>
                        <View style={styles.row}>
                            <Text style={styles.simple_text}>
                                Sexe
                            </Text>
                            <Text style={styles.simple_text}>
                                {this.state.sexe}
                            </Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.row}>
                            <Text style={styles.complic_text}>
                                Vaccination
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.simple_text}>
                                Type de vaccin
                            </Text>
                            <Text style={styles.simple_text}>
                                {this.state.current.type_vaccin}
                            </Text>
                        </View>
                        <Text style={[{marginTop: 0}]}></Text>

                        {this.state.current.doses.map((item, index) => {
                        return <DoseDetailVaccin 
                                key={index}
                                nom={item.nomination}
                                status={item.status} 
                                lieu={item.lieu} 
                                pays={item.pays} 
                                date={item.date}>
                        </DoseDetailVaccin>
                        })}
                        
                    </View>
                </ScrollView>
                </View>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        zIndex: 40,
        justifyContent: 'center'
    },
    background: {
        backgroundColor: '#00C1B4',
        height: hp("30%"),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },  
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
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
    scroll: {
        padding: 20
    },
    title_text: {
        fontWeight: '900',
        color: '#008AC8',
        fontSize: 35,
        marginTop: 10,
        marginBottom: 10
    },
    contain_content: {
        backgroundColor: "#fff",
        width: wp("90%"),
        marginLeft: wp("5%"),
        borderRadius: 20,
        position: "absolute",
        top: 150,
        height: hp("80%"),
        zIndex: 999
    },
    contain_detail: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 30,
        marginRight: 30, 
        paddingBottom: 60
    },
    simple_text: {
        fontSize: 20,
        fontWeight: "100",
        color: "#666666"
    },
    complic_text: {
        fontSize: 22,
        fontWeight: "900",
        color: "#000"
    },
    line : {
        height: 1,
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#cccccc",
        marginTop: 20,
        marginBottom: 20
    },
    contain_img: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "#cccccc",
        borderWidth: 2,
        borderRadius: 10,
        width: "88%",
        marginLeft: "6%",
        marginBottom: 10
        // height: "30%",
        // width: "50%"
    },
    img_qr : {
        width: 300,
        height: 300
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailVaccin)