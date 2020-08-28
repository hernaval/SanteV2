import React, { Component } from 'react'
import {  Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import TopMenu from "../../component/Menu/TopMenu"
import { Input } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload, faCalendar, faClock, faCalendarAlt, faPlus, faMinus, faMapPin } from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import Bdd from '../../API/Bdd';
import * as Calendar from 'expo-calendar';
import axios from "axios"
import BottomSheet from 'react-native-simple-bottom-sheet';
import { CheckBox } from 'react-native-elements'
const API_KEY = 'AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';


class AddEvent extends Component {

    constructor() {
        super()
        this.state = {
            isOpenDate: false,
            isOpenTime: false,
            time: new Date(),
            date: new Date(),
            nom: "",
            lieu: "",
            isLoading: false,

            nomTrait: "",
            momentTrait: "",
            dateDebTrait: new Date(),
            dateFinTrait: new Date(),
            heureTrait: new Date(),
            momentTrait: "",
            nomTrait: "",
            isDateDebTrait: false,
            isDateFinTrait: false,
            isTimeTrait: false,

            isRdv: true,
            posologie: 1,
            day: 1,
            isLun: false,
            isMar: false,
            isMer: false,
            isJeu: false,
            isVen: false,
            isSam: false,
            isDim: false,

            favList: [],
            favorites: [],
            favoriteIdSelected: null,
            isVaccin: false,
            notifLaps : -10



        }
        this.panelRef = React.createRef()
    }

    async componentDidMount() {
        
        let {status} = await Permissions.askAsync(Permissions.CALENDAR)
       console.log("ilay izy ka efa ",status)
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
              
        }
        await this.initFav()
    }

    async initFav() {
        let idUser = this.props.user.user.idUser
        await axios.get(`${Bdd.api_url}/favoris/list?idUser=${idUser}`)
            .then(res => {

                this.setState({ favList: res.data.data })
            })

        this.state.favList.map((favorite) => {

            axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + favorite.geoIdFavoris + '&key=' + API_KEY)
                .then((res) => {

                    let result = res.data.result;
                    result.isOpen = false;

                    this.setState({ favorites: [...this.state.favorites, result] }, () => {

                        console.log('state favorite', this.state.favorites);
                    });
                })
        })
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async createCalendar(titre, date1, date2, notifLapsBeforeTime) {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };

        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            allowedReminders: [Calendar.AlarmMethod.ALARM, Calendar.AlarmMethod.ALERT, Calendar.AlarmMethod.EMAIL, Calendar.AlarmMethod.SMS, Calendar.AlarmMethod.DEFAULT]
        });


        const tmz = new Date().getTimezoneOffset()
        const tmzAbs = Math.abs(tmz)
        const sign = tmz < 0 ? "+" : "-"
        const tmzVal = tmzAbs / 60
        const timezone = `GMT${sign}${tmzVal}`

        const options = {
            method: Calendar.AlarmMethod.ALERT,
            relativeOffset: notifLapsBeforeTime,
            
        }
        let event = await Calendar.createEventAsync(newCalendarID, {
            title: titre,
            startDate: date1,
            endDate: date2,
            timeZone: timezone,

            alarms: [options]

        })
        console.log("your event id is : " + event)
    }


    positif = ch => ch > 0

    saveRendezVous = async () => {
        this.setState({ isLoading: true })
        try {
            let data = {
                idUser: this.props.user.user.idUser,
                idFavoris: this.state.favoriteIdSelected,
                dateRdv: this.state.date,
                heure: this.state.time,
                isVaccin : this.state.isVaccin,
                titreRdv: this.state.nom
            }

            await axios.post(`${Bdd.api_url}/rendez-vous`, data)
                .then(async rdvSaved => {
                    if (await rdvSaved) {
                        
                        //await this.createCalendar(data.titreRdv, this.state.date, this.state.date,this.state.notifLaps)
                        this.props.navigation.navigate("Reminder")
                    } else {

                    }
                })
                .catch(err => console.log(err))



        } catch (err) { console.log(err) }


        this.setState({ isLoading: false })
    }

    getJours = () => {
        l = this.state.isLun === true ? " Lun " : " "
        ma = this.state.isMar === true ? " Mar " : " "
        me = this.state.isMer === true ? " Mer" : " "
        jeu = this.state.isJeu === true ? " Jeu " : " "
        ven = this.state.isVen === true ? " Ven " : " "
        sam = this.state.isSam === true ? " Sam " : " "
        dim = this.state.isDim === true ? " Dim " : " "
        return l + ma + me + jeu + ven + sam + dim


    }

    saveTraitement = async () => {
        this.setState({ isLoading: true })
        let data = {
            idUser: this.props.user.user.idUser,
            debTraitement: this.state.dateDebTrait,
            finTraitement: this.state.dateFinTrait,
            heureTraitement: this.state.heureTrait,
            jourTraitement: this.getJours(),
            nomTraitement: this.state.nomTrait,
            doseTraitement : parseInt(this.state.posologie),
            freqTraitement : parseInt(this.state.day)
        }

       await  axios.post(`${Bdd.api_url}/traitement`, data)
            .then(async res=>{
                await this.createCalendar(data.nomTraitement, data.debTraitement, data.finTraitement) 
                this.props.navigation.navigate("Reminder")
            })
            .catch(err=>{

            })

        this.setState({ isLoading: false })
    }

    _fortmatDate(date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + dt
    }

    renderRendezVous = () => {
        const notifs = [{
            label : "10 minutes", value: -10
        },{
            label : "30 minutes",value : -30
        },{
            label : "1 heure" ,value : -60
        },{
            label : "2 heures", value : -120
        },{
            label : "3 heures" , value : -180
        },{
            label : "5 heures", value : -240
        }]
    
    
        return (<View style={{ margin: 10 }}>
            <CheckBox
                title='Est-ce un rappel de vaccin ?'
                checked={this.state.isVaccin}
                onPress={()=>this.setState({isVaccin : !this.state.isVaccin})}
            />
            <Input
                placeholder='Me rappeler à propos de ...'
                onChangeText={(text) => { this.setState({ nom: text }) }}
            />
            <View style={styles.displayDate}>
                <TouchableOpacity style={styles.dating} onPress={() => this.setState({ isOpenDate: true })}>
                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendarAlt} />
                    <Text style={styles.datingText}>Pour une date</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: "center" }}>{this._fortmatDate(this.state.date)}</Text>
            </View>

            

            <View style={styles.displayDate}>
                <TouchableOpacity style={styles.dating} onPress={() => this.setState({ isOpenTime: true })}>
                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faClock} />
                    <Text style={styles.datingText}>A quelle heure</Text>
                </TouchableOpacity>
                <Text>{this._formatTime(this.state.time)}</Text>
            </View>

            <View>
                <Text style={{fontWeight :"bold"}}>A quel moment souhaiteriez-vous être notifiés ?</Text>
            <RNPickerSelect
                  placeholder={{
                    label: "Temps en minutes/heures"
                  }}
                  onValueChange={(value) => this.setState({ notifLaps: value })}
                  items={notifs}
                />
            </View>

          

            {this.state.isOpenDate === true &&
                <DateTimePicker
                    testID="dateTimePickerd"
                    timeZoneOffsetInMinutes={0}
                    value={this.state.date}
                    mode="date"

                    display="calendar"
                    onChange={(event, selectedDate) => {
                        this.setState({ isOpenDate: false })

                        this.setState({ date: selectedDate })
                    }}
                />
            }
            {this.state.isOpenTime === true &&
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={this.state.time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {

                        this.setState({ isOpenTime: false })
                        this.setState({ time: selectedDate })
                    }}
                />
            }


            <TouchableOpacity style={styles.submitBtn} onPress={() => this.saveRendezVous()}>
                <Text style={styles.submitBtnText}>Enregistrer</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Reminder")} style={styles.submitBtn} >
                <Text style={styles.submitBtnText}>Voir mes rappels </Text>
            </TouchableOpacity>
 
        </View>)
    }

    renderTraitement = () => (


        <View style={{ margin: 10 }}>
            <Input
                placeholder='De quel traitement ...'
                onChangeText={(text) => { this.setState({ nomTrait: text }) }}
            />
            <View style={styles.displayDate}>
                <TouchableOpacity style={styles.dating} onPress={() => this.setState({ isDateDebTrait: true })}>
                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendarAlt} />
                    <Text style={styles.datingText}>Date début</Text>
                </TouchableOpacity>
                <Text>{this._fortmatDate(this.state.dateDebTrait)}</Text>
            </View>
            <View style={styles.displayDate}>
                <TouchableOpacity style={styles.dating} onPress={() => this.setState({ isDateFinTrait: true })}>
                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendarAlt} />
                    <Text style={styles.datingText}>Date fin</Text>
                </TouchableOpacity>
                <Text>{this._fortmatDate(this.state.dateFinTrait)}</Text>
            </View>
            <View style={styles.displayDate}>
                <TouchableOpacity style={styles.dating} onPress={() => this.setState({ isTimeTrait: true })}>
                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faClock} />
                    <Text style={styles.datingText}>heure </Text>
                </TouchableOpacity>
                <Text>{this._formatTime(this.state.heureTrait)}</Text>
            </View>

            <View style={styles.displayDate}>
                <View style={styles.dating}>
                    <TouchableOpacity onPress={() => this.setState({ posologie: ++this.state.posologie })}>
                        <FontAwesomeIcon color="#d3d3d3" size={24} icon={faPlus} />
                    </TouchableOpacity>

                    <Text style={styles.datingText}>{this.state.posologie} </Text>
                    <TouchableOpacity onPress={() => this.setState({ posologie: --this.state.posologie })}>
                        <FontAwesomeIcon color="#d3d3d3" size={24} icon={faMinus} />

                    </TouchableOpacity>
                </View>
                <Text>dose</Text>
            </View>

            <View style={styles.displayDate}>
                <View style={styles.dating}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ day: ++this.state.day })
                    }}>
                        <FontAwesomeIcon color="#d3d3d3" size={24} icon={faPlus} />
                    </TouchableOpacity>

                    <Text style={styles.datingText}>{this.state.day} </Text>
                    <TouchableOpacity onPress={() => {
                        this.positif(this.state.day) === true ? this.setState({ day: --this.state.day }) : this.setState({ day: 1 })
                    }}>
                        <FontAwesomeIcon color="#d3d3d3" size={24} icon={faMinus} />

                    </TouchableOpacity>
                </View>
                <Text>Fréquence par jour</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => this.setState({ isLun: !this.state.isLun })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isLun === true ? "#00C1B4" : "#d3d3d3" }} title="L" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isMar: !this.state.isMar })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isMar === true ? "#00C1B4" : "#d3d3d3" }} title="M" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isMer: !this.state.isMer })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isMer === true ? "#00C1B4" : "#d3d3d3" }} title="M" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isJeu: !this.state.isJeu })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isJeu === true ? "#00C1B4" : "#d3d3d3" }} title="J" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isVen: !this.state.isVen })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isVen === true ? "#00C1B4" : "#d3d3d3" }} title="V" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isSam: !this.state.isSam })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isSam === true ? "#00C1B4" : "#d3d3d3" }} title="S" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isDim: !this.state.isDim })}>
                    <Avatar overlayContainerStyle={{ backgroundColor: this.state.isDim === true ? "#00C1B4" : "#d3d3d3" }} title="D" />
                </TouchableOpacity>



            </View>



            {this.state.isDateDebTrait &&
                <DateTimePicker
                    testID="dateTimePickerd"
                    timeZoneOffsetInMinutes={0}
                    value={this.state.dateDebTrait}
                    mode="date"

                    display="calendar"
                    onChange={(event, selectedDate) => {
                        this.setState({ isDateDebTrait: false })

                        this.setState({ dateDebTrait: selectedDate })
                    }}
                />
            }

            {this.state.isDateFinTrait &&
                <DateTimePicker
                    testID="dateTimePickerd"
                    timeZoneOffsetInMinutes={0}
                    value={this.state.dateFinTrait}
                    mode="date"

                    display="calendar"
                    onChange={(event, selectedDate) => {
                        this.setState({ isDateFinTrait: false })

                        this.setState({ dateFinTrait: selectedDate })
                    }}
                />
            }

            {this.state.isTimeTrait &&
                <DateTimePicker
                    testID="dateTimePickerd"
                    timeZoneOffsetInMinutes={0}
                    value={this.state.heureTrait}
                    mode="time"


                    onChange={(event, selectedDate) => {
                        this.setState({ isTimeTrait: false })

                        this.setState({ heureTrait: selectedDate })
                    }}
                />
            }

            <TouchableOpacity style={styles.submitBtn} onPress={() => this.saveTraitement()}>
                <Text style={styles.submitBtnText}>Enregistrer</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Reminder")} style={styles.submitBtn} >
                <Text style={styles.submitBtnText}>Voir mes rapples </Text>
            </TouchableOpacity> 
        </View>

    )
    _formatTime(date) {
        hour = date.getHours()
        minutes = date.getMinutes()

        hour = hour < 10 ? "0" + hour : hour
        minutes = minutes < 10 ? "0" + minutes : minutes

        return hour + ":" + minutes
    }

    renderItem = () => {
        {
            this.state.favorites.map((favorite, index) => {
                <Text>salut</Text>
            })
        }
    }



    renderHeader = () => (
        <View style={{ backgroundColor: "#008AC8", padding: 20 }}>
            <Text style={{ color: "white", textAlign: "center" }}>Choisir un lieu parmis vos favoris</Text>
        </View>

    )
    renderContent = () => (
        <View style={{ backgroundColor: "white", height: hp("50%") }}>
            {this.renderItem()}
        </View>

    )




    render() {
        
        return (
            <ScrollView>

                <View style={styles.container}>


                    {this.state.isLoading === true && <View style={styles.loading_container}>
                        <ActivityIndicator size="large" />
                    </View>}
                    <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                        <TopMenu navigation={this.props.navigation} />
                    </View>

                    <View style={styles.tabBtn}>

                        <TouchableOpacity onPress={() => this.setState({ isRdv: true })} style={this.state.isRdv === true ? styles.headerBtnActive : styles.headerBtn}>
                            <Text style={styles.headerText}>Rendez-Vous</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.setState({ isRdv: false })} style={this.state.isRdv === false ? styles.headerBtnActive : styles.headerBtn}>
                            <Text style={styles.headerText}>Traitement</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>

                        {this.state.isRdv === false && this.renderTraitement()}
                        {this.state.isRdv === true && this.renderRendezVous()}


                    </View>



                </View>
                <BottomSheet isOpen={this.state.isRdv === true ? true : false} sliderMinHeight={0} ref={ref => this.panelRef.current = ref}>
                    <View style={{ padding: 10, backgroundColor: "#008AC8" }}>
                        <Text style={{ textAlign: "center", color: "white" }}>Choisir un lieu parmis vos favoris</Text>
                    </View>
                    {this.state.favorites !== null && this.state.favorites.map((favorite, i) => {

                        return (<TouchableOpacity key={i} style={{ flexDirection: "row", margin: 10 }} onPress={() => {
                            this.setState({ favoriteIdSelected: this.state.favList[i].idFavoris })
                            this.panelRef.current.togglePanel()
                        }}>
                            <FontAwesomeIcon icon={faMapPin} />
                            <Text style={{ fontWeight: "bold" }}>{favorite.name}</Text>
                        </TouchableOpacity>)
                    })}
                    <View />
                </BottomSheet>
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tabBtn: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    headerBtn: {
        padding: 20,
        backgroundColor: "#008AC8"
    },
    headerBtnActive: {
        backgroundColor: "red",
        padding: 20,
    },
    headerText: {
        color: "white"
    },
    dating: {
        flexDirection: "row"
    },
    datingText: {
        color: "#d3d3d3",
        marginLeft: 3,
        fontSize: 16,

    },
    displayDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20
    },
    submitBtn: {
        backgroundColor: "#00C1B4",
        justifyContent: "center",
        padding: 20,
        margin: 20,

    },
    submitBtnText: {
        color: "white",
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold"
    },
    formContainer: {

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
    }
})

const mapStateToProps = (store) => {
    return {
        user: store.user,
        contact: store.contact,
        second: store.second
    }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);

