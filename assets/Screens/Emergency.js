import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Linking, Alert, Button, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import TopMenu from "../component/Menu/TopMenu"
import TabBar from "@mindinventory/react-native-tab-bar-interaction";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { emergency } from "../API/emergency";
import { urgency } from "../API/urgency";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Bdd from "../API/Bdd"
import ViewPager from '@react-native-community/viewpager';
import { Avatar } from 'react-native-elements';
import { getCurrentLocation } from '../services/location'
import google from "../API/google";


const API_KEY = google.cloud_key;


class Emergency extends Component {

    constructor(props) {
        super(props)
        // this.state = {
        //     localCode: "",
        //     urgence: {}
        // }
        this.urgence = {}
        this.localCode = ""

        this.state = {
            current: 1
        }
    }

    componentDidMount = async () => {
        await this._getCountryCodeByLocation()
    }


    sendmail = async (type, msg) => {

        let location = await getCurrentLocation()


        let data = {
            typeUrgence: type,
            geolocUrgence: `${location.coords.latitude},${location.coords.longitude}`,
            idUser: this.props.user.user.idUser
        }
        let idUser = this.props.user.user.idUser



        await axios.post(`${Bdd.api_url}/urgence`, data)
            .then(async res => {
                console.log("eto le izy ", res.data.data)
            })

        await axios.post(`${Bdd.api_url}/contact/inform/${idUser}`)
            .then(async _ => {

            })
    }

    callUrgence = async () => {
        let num = await this.findNumber()
        this.callPerson(num.ambulance)
        await this.sendmail("Malaise")
    }
    callAccident = async () => {
        let num = await this.findNumber()
        this.callPerson(num.fire)

        await this.sendmail("Accident")
    }

    callAgression = async () => {
        let num = await this.findNumber()
        this.callPerson(num.police)

        await this.sendmail("Agression")
    }

    callCovid = async () => {
        let num = await this.findNumber()
        this.callPerson(num.covid)

        await this.sendmail("Covid")

    }

    findNumber = async () => {


        let num = {
            ambulance: null,
            fire: null,
            police: null,
            covid: null
        }

        if (this.urgence.length === 0) {
            console.log('No urgence')
        } else {
            let urgence = this.urgence
            console.log("urgence", urgence)
            num = {
                ambulance: urgence[0].Ambulance.All[0],
                fire: urgence[0].Fire.All[0],
                police: urgence[0].Police.All[0],
                covid: urgence[0].Covid.All[0]
            }
        }
        console.log(num)
        return num
    }

    callPerson(phone) {
        console.log('Phone', phone)
        if (phone === undefined || phone === null) {
            Alert.alert(`Echec ${this.localCode}`, 'Pas de numero joignable', [{
                text: 'OK',
                onPress: () => { }
            }])
            return
        } else {
            let url;
            if (Platform.OS === 'ios') {
                url = 'tel://' + phone
            }
            else if (Platform.OS === 'android') {
                url = 'tel:' + phone

            }

            Linking.canOpenURL(url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(url)
                            .catch(() => null);
                    }
                });
        }
    }


    _getCountryCodeByLocation = async () => {

        const key = 'permission_location';
        const value = await AsyncStorage.getItem(key)

        if (value === null) {
            Alert.alert('Localisation',
                'Nous demandons votre permission afin de récuperer votre localisation en référence avec les contacts d\'urgences', [
                {
                    text: 'Suivant',
                    onPress: async () => {
                        let { status } = await Permissions.askAsync(Permissions.LOCATION);

                        if (status !== 'granted') {
                            this.setState({
                                errorMessage: 'Permission to access location was denied',
                            });
                        } else {
                            let location = await Location.getCurrentPositionAsync({});
                            await AsyncStorage.setItem(key, 'OK');

                            //    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=46.5286307,6.5124095&key=" + API_KEY)

                            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&key=" + API_KEY)
                                .then(async response => {
                                    const globalRes = response.data.results[0].address_components

                                    let resObj = await globalRes.filter(el => {
                                        return el.types.includes("country")
                                    })
                                    const local = await resObj[0].short_name
                                    this.localCode = local
                                    console.log("Short name local :", this.localCode)
                                    let res = urgency.data.filter(el => {
                                        return el.Country.ISOCode == local
                                    })

                                    //    this.setState({
                                    //        urgence : res
                                    //    })
                                    this.urgence = res
                                    console.log('Urgence ', this.urgence.length)

                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }

                    }
                }
            ])
        } else {
            let location = await Location.getCurrentPositionAsync({});
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&key=" + API_KEY)
                .then(async response => {


                    const globalRes = response.data.results[0].address_components

                    let resObj = await globalRes.filter(el => {
                        return el.types.includes("country")
                    })
                    const local = await resObj[0].short_name
                    this.localCode = local
                    console.log("Short name local :", this.localCode)
                    let res = urgency.data.filter(el => {
                        return el.Country.ISOCode == local
                    })

                    this.urgence = res
                    console.log('Urgence ', this.urgence.length)

                })
                .catch(err => {
                    console.log(err)
                })
        }

    };

    renderBtn = (index, url, i) => (
        <TouchableOpacity key={i}
            onPress={() => {
                this.setState({ current: index })
                this.viewPager.setPage(index)
            }}>
            {this.state.current !== index && <Avatar source={url} rounded size="medium" />}
            {this.state.current === index && <Avatar source={url} rounded size="large" />}

        </TouchableOpacity>
    )
    render() {

        var datas = [{
            index: 0, uri: require("../images/accident.png")
        }, {
            index: 1, uri: require("../images/malaise.png")
        }, {
            index: 2, uri: require("../images/agression.png")
        }, {
            index: 3, uri: require("../images/cvo.jpg")
        }]

        return (

            <View style={styles.container}>
                <View style={[Platform.OS === 'ios' ? styles.under_ios : styles.under]}>
                    <TopMenu navigation={this.props.navigation} />
                </View>
                <ViewPager
                    style={{ flexGrow: 1, marginTop: hp('15%') }}
                    ref={viewPager => {
                        this.viewPager = viewPager
                    }}
                >
                    <View style={styles.urgenceContainer}>
                        <TouchableOpacity
                            onPress={() => this.callAccident()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                            <Text style={styles.legend}>ACCIDENT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.urgenceContainer}>
                        <TouchableOpacity onPress={() => this.callUrgence()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                        </TouchableOpacity>
                        <Text style={styles.legend}>MALAISE</Text>
                    </View>
                    <View style={styles.urgenceContainer}>
                        <TouchableOpacity onPress={() => this.callAgression()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                        </TouchableOpacity>
                        <Text style={styles.legend}>AGRESSION</Text>

                    </View>
                    <View style={styles.urgenceContainer}>
                        <TouchableOpacity onPress={() => this.callCovid()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                        </TouchableOpacity>
                        <Text style={styles.legend}>COVID-19</Text>

                    </View>

                </ViewPager>

                <View style={styles.bottonTabMenu}>
                    {datas.map((data, i) => {
                        return this.renderBtn(data.index, data.uri, i)
                    })}
                </View>

            </View>)

        {/* <TabBar bgNavBar="white" bgNavBarSelector="white" stroke="skyblue">

                <TabBar.Item

                    icon={require(`../images/accident.png`)}
                    selectedIcon={require(`../images/accident.png`)}
                    title="Tab1"
                    screenBackgroundColor={{ backgroundColor: '#00C1B4' }}
                >
                    <View>
                        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                            <TopMenu navigation={this.props.navigation} />
                        </View>
                        <View style={styles.urgenceContainer}>
                            <TouchableOpacity onPress={()=> this.callAccident()} style={styles.urgenceBtn}>
                                <Image source={require("../images/sos.png")} />
                                <Text  style={styles.legend}>ACCIDENT</Text>
                            </TouchableOpacity>
                            <Button  color={"red"} title="Covid 19" style={styles.btn} onPress={()=> this.callCovid()}></Button>
                        </View>
                    </View>
                </TabBar.Item>

                <TabBar.Item

                    icon={require(`../images/malaise.png`)}
                    selectedIcon={require(`../images/malaise.png`)}
                    title="Tab1"
                    screenBackgroundColor={{ backgroundColor: '#00C1B4' }}
                >
                    <View style="emergencyContainer">
                        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                            <TopMenu navigation={this.props.navigation} />
                        </View>
                        <View style={styles.urgenceContainer}>
                            <TouchableOpacity onPress={()=> this.callUrgence()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                            </TouchableOpacity>
                            <Text  style={styles.legend}>MALAISE</Text>
                            <Button  color={"red"} title="Covid 19" onPress={()=> this.callCovid()}></Button>
                        </View>
                        
                    </View>
                </TabBar.Item>

                <TabBar.Item

                    icon={require(`../images/agression.png`)}
                    selectedIcon={require(`../images/agression.png`)}
                    title="Tab1"
                    screenBackgroundColor={{ backgroundColor: '#00C1B4' }}
                >
                    <View>
                        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                            <TopMenu navigation={this.props.navigation} />
                        </View>
                        <View style={styles.urgenceContainer}>
                        <TouchableOpacity onPress={()=> this.callAgression()} style={styles.urgenceBtn}>
                            <Image source={require("../images/sos.png")} />
                            </TouchableOpacity>
                            <Text  style={styles.legend}>AGRESSION</Text>
                            
                            <Button  color={"red"} title="Covid 19" onPress={()=> this.callCovid()}></Button>
                        </View>
                    </View>
                </TabBar.Item>
            </TabBar> */}



    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottonTabMenu: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    active: {
        backgroundColor: "red"
    },
    urgenceContainer: {
        height: hp("65%"),
        backgroundColor: "white",
        borderRadius: 50,
        marginTop: hp("3%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    legend: {
        fontSize: 25,
        fontWeight: "800",
        textAlign: "center"
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red"
    }
})

const mapStateToProps = (store) => {
    return {
        user: store.user,
        contact: store.contact
    }
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Emergency)

