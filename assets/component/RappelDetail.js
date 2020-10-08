


import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faBars, faTimes, faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import * as DocumentPicker from 'expo-document-picker'
import { connect } from 'react-redux'
import Bdd from '../API/Bdd'
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'
import TopMenu from "./Menu/TopMenu"
import PopNav from "./Menu/PopNav"
class Rappel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matin: false,
            midi: false,
            soir: false,

            monday: false,
            tuesday: false,
            wednesday: false,
            thirsday: false,
            friday: false,
            saturday: false,
            sunday: false,

            name: "",
            time: new Date(),
            matinHour: null,
            midiHour: null,
            soirHour: null,
            type: "matin",
            isOpenTime: false
        }
    }


    componentDidMount() {
        let data = {
            id: this.props.navigation.state.params.id
        }


        axios.post(Bdd.api_url + "/api/rappel/detail", data)
            .then((response) => {

                // this.setState({rappels: response.data.rappels })
                this.setState({
                    matin: response.data.rappel.morning === 1 ? true : false,
                    midi: response.data.rappel.hd === 1 ? true : false,
                    soir: response.data.rappel.evening === 1 ? true : false,

                    monday: response.data.rappel.monday === 1 ? true : false,
                    tuesday: response.data.rappel.tuesday === 1 ? true : false,
                    wednesday: response.data.rappel.wednesday === 1 ? true : false,
                    thirsday: response.data.rappel.thirsday === 1 ? true : false,
                    friday: response.data.rappel.friday === 1 ? true : false,
                    saturday: response.data.rappel.saturday === 1 ? true : false,
                    sunday: response.data.rappel.sunday === 1 ? true : false,

                    name: response.data.rappel.name.split("__")[0],

                    matinHour: response.data.rappel.matinHour,
                    midiHour: response.data.rappel.midiHour,
                    soirHour: response.data.rappel.soirHour,
                })
            })
    }

    goToRappelMenu() {
        this.props.navigation.navigate("RappelMenu")
    }

    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);

    }

    changeDay(day) {
        let newDay = !this.state[day];
        this.setState({ [day]: newDay }, () => {

        });
    }
    goToMapping = () => {
        this.props.navigation.navigate("Home")
    }

    onClickUpdateRappel() {

        let data = {
            name: this.state.name,
            monday: this.state.monday,
            tuesday: this.state.tuesday,
            wednesday: this.state.wednesday,
            thirsday: this.state.thirsday,
            friday: this.state.friday,
            saturday: this.state.saturday,
            sunday: this.state.sunday,
            morning: this.state.matin,
            hd: this.state.midi,
            evening: this.state.soir,
            id: this.props.navigation.state.params.id
        }



        axios.post(Bdd.api_url + "/api/rappel/update", data)
            .then((response) => {

                if (response.data.status === 200) {
                    this.goToRappelMenu();
                }
            })
    }

    change(event, selectedDate) {


        let hours = selectedDate.getHours() + ':' + selectedDate.getMinutes()

        if (this.state.type === "matin") {

            this.setState({ matinHour: hours, isOpenTime: false })

        } else if (this.state.type === "midi") {

            this.setState({ midiHour: hours, isOpenTime: false })

        } else if (this.state.type === "soir") {

            this.setState({ soirHour: hours, isOpenTime: false })

        }
        //const currentDate = selectedDate || this.state.time;
        //setShow(Platform.OS === 'ios');
        //setDate(currentDate);
        // this.setState({time: currentDate});
    };



    render() {
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} />
                </View>

                <View>
                    <PopNav navigation={this.props.navigation} color={"#000"} />
                </View>
                <View
                    style={styles.link}
                >
                    <Image
                        style={styles.imgLink}
                        source={require('../images/Icone_Clockwhite.png')}
                    />
                    <Text style={styles.imgText}>Mes rappels</Text>
                </View>
                <View style={styles.docView}>
                    <TextInput
                        placeholder="Nom du rappel"
                        value={this.state.name}
                        style={{ backgroundColor: "white", width: wp('70%'), textAlign: "center", color: "#008AC8", paddingTop: hp('2%'), paddingBottom: hp('2%') }}
                        onChangeText={(text) => {
                            this.setState({ name: text });
                        }}
                    />
                </View>
                {/* <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={this.state.monday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('monday');
                        }}
                    >
                        <Text style={this.state.monday ? styles.docTextSelected : styles.docText}>Lun</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.tuesday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('tuesday');
                        }}
                    >
                        <Text style={this.state.tuesday ? styles.docTextSelected : styles.docText}>Mar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.wednesday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('wednesday');
                        }}
                    >
                        <Text style={this.state.wednesday ? styles.docTextSelected : styles.docText}>Mer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.thirsday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('thirsday');
                        }}
                    >
                        <Text style={this.state.thirsday ? styles.docTextSelected : styles.docText}>Jeu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.friday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('friday');
                        }}
                    >
                        <Text style={this.state.friday ? styles.docTextSelected : styles.docText}>Ven</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.saturday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('saturday');
                        }}
                    >
                        <Text style={this.state.saturday ? styles.docTextSelected : styles.docText}>Sam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.sunday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={() => {
                            this.changeDay('sunday');
                        }}
                    >
                        <Text style={this.state.sunday ? styles.docTextSelected : styles.docText}>Dim</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.checkbox}>
                    <View style={{ flexDirection: 'row', alignItems: "center", }}>
                        <CheckBox
                            onChange={(e) => { this.setState({ matin: !this.state.matin }) }}
                            value={this.state.matin}

                        /><Text style={{ color: 'white' }}>matin</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", }}>
                        <CheckBox
                            onChange={(e) => { this.setState({ midi: !this.state.midi }) }}
                            value={this.state.midi}

                        /><Text style={{ color: 'white' }}>midi</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", }}>
                        <CheckBox
                            onChange={(e) => { this.setState({ soir: !this.state.soir }) }}
                            value={this.state.soir}

                        /><Text style={{ color: 'white' }}>soir</Text>
                    </View>

                </View> */}
                <View style={styles.docView}>
                    {this.state.isOpenTime && <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                this.change(event, selectedDate);
                            }}
                        />
                    </View>}
                    {this.state.matin && <TouchableOpacity
                        style={styles.showHour}
                        onPress={() => {
                            this.setState({ isOpenTime: true, type: "matin" })
                        }}
                    >
                        <Text style={styles.showHourText}>Rappel du matin : {this.state.matinHour !== null ? this.state.matinHour : "Cliquez pour ajouter"}</Text>
                    </TouchableOpacity>}
                    {this.state.midi && <TouchableOpacity
                        style={styles.showHour}
                        onPress={() => {
                            this.setState({ isOpenTime: true, type: "midi" })
                        }}
                    >
                        <Text style={styles.showHourText}>Rappel du midi : {this.state.midiHour !== null ? this.state.midiHour : "Cliquez pour ajouter"}</Text>
                    </TouchableOpacity>}
                    {this.state.soir && <TouchableOpacity
                        style={styles.showHour}
                        onPress={() => {
                            this.setState({ isOpenTime: true, type: "soir" })
                        }}
                    >
                        <Text style={styles.showHourText}>Rappel du soir : {this.state.soirHour !== null ? this.state.soirHour : "Cliquez pour ajouter"}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={() => {
                            this.onClickUpdateRappel()
                        }}
                    >
                        <Text style={styles.docText2}>Sauvegarder le rappel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#008AC8"
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 40,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',


    },
    link: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: wp('25%'),
        paddingTop: hp("7%"),
        paddingBottom: hp("1%")
    },
    imgLink: {
        width: wp('15%'),
        height: wp('15%'),
        backgroundColor: '#008AC8',
        borderRadius: 400 / 2,
        marginRight: wp('2%')
    },
    imgText: {
        color: "white",
        fontSize: 24
    },
    docView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
    },
    docButton: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "white",
        borderStyle: 'dashed',
        borderRadius: 1,
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        width: wp('70%')
    },
    docText: {
        color: "white"
    },
    buttonSave: {
        backgroundColor: "#00C1B4",
        marginTop: hp('5%'),
        width: wp('70%'),
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),

    },
    docText2: {
        color: "white",
        fontSize: 18

    },
    viewButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("4%")
    },
    viewButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        borderWidth: 1,
        borderColor: "white"
    },
    viewButtonSelected: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "white"
    },
    docTextSelected: {
        color: "#00C1B4"
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp('5%'),
        color: "white"
    },
    showHour: {
        marginTop: hp("2%"),
        marginBottom: hp("2%"),
    },
    showHourText: {
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white"
    }
});



const mapStateToProps = (store) => {
    return {
        user: store.user,
        contact: store.contact,
        favorite: store.favorite,
        second: store.second
    }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(Rappel);