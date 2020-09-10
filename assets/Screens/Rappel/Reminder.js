import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TopMenu from "../../component/Menu/TopMenu"
import BottomMenu from "../../component/Menu/BottomMenu"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faEdit, faBars, faTimes, faCaretDown, faNotesMedical, faHandsHelping, faPumpMedical, faDisease, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Divider, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import Bdd from "../../API/Bdd"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import 'moment/locale/fr' 
import ActionButton from 'react-native-action-button';



export class Reminder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rappels: [],
            traitements: [],
            vaccins: [],
            selectedType: "rdv",
            numColored: 0,

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
            isOpenTime: false,
         

        }
    }
      componentDidMount() {
         console.log("hummm on moutn zany a")
        console.log(this.state.selectedType)
          this._initRappel()


          this._subscribe = this.props.navigation.addListener('didFocus', () => {
                this._initRappel()
           });
    }

   
    
    
    renderRappelType = (text, isColor, type, index) => (
        <TouchableOpacity key={index} onPress={() => { this.handleType(type, index) }} style={[styles.cardContainer, isColor == true ? { backgroundColor: "#008ac2" } : { backgroundColor: "white" }]}>
            <Text style={[styles.rappelText, isColor == true ? { backgroundColor: "#008AC8", borderRadius: 5 } : { backgroundColor: "#00C1B4" }]}>{text}</Text>
        </TouchableOpacity>
    )

    handleType = async (type, index) => {

        await this.setState({
            selectedType: type,
            numColored: index
        })

        this._initRappel()
    }


    _initRappel =  async () => {

        let idUser = this.props.user.user.idUser

         axios.get(`${Bdd.api_url}/rendez-vous/list?idUser=${idUser}`)
            .then((response) => {
                  this.setState({ rappels: response.data })
               
            })
         axios.get(`${Bdd.api_url}/traitement/list?idUser=${idUser}`)
            .then(response => {
                this.setState({ traitements: response.data.data })
            })
         axios.get(`${Bdd.api_url}/rendez-vous/list?idUser=${idUser}&vaccin=true`)
            .then(response => {
                this.setState({ vaccins: response.data })
               
            })
    }

    getMonthValue(value) {
        switch (value) {
            case 1: return "JAN"
                break
            case 2: return "FEV"
                break
            case 3: return "MAR"
                break
            case 4: return "AVR"
                break
            case 5: return "MAI"
                break
            case 6: return "JUN"
                break
            case 7: return "JUL"
                break
            case 8: return "AOU"
                break
            case 9: return "SEP"
                break
            case 10: return "OCT"
                break
            case 11: return "NOV"
                break
            case 12: return "DEV"
                break
        }
    }
    changeDay(day) {
        let newDay = !this.state[day];
        this.setState({ [day]: newDay }, () => {

        });
    }


    renderRendezVous = (id,title,date,name,index) =>(
        <ListItem
            containerStyle={{ margin: 10 }}
            key={index}
            title={name}
            subtitle={date}
            leftAvatar={{

                title: title
            }}
            bottomDivider
            rightElement={
                <React.Fragment>
                  
                    <TouchableOpacity style={{ padding: 5, }} onPress={() => this.deleteRendezVous(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>
                </React.Fragment>} 
            />
    )

    renderTraitement = (id, nameAndDate, jour, index) => (
        
     <ListItem
            containerStyle={{ margin: 10 }}
            key={index}
            title={nameAndDate}
            subtitle={jour}
            leftAvatar={{

                title: "TRT"
            }}
            bottomDivider
            rightElement={
                <React.Fragment>
                  
                    <TouchableOpacity style={{ padding: 5, }} onPress={() => this.deleteTraitement(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>
                </React.Fragment>} 
            />
               
    )

    deleteRendezVous(idRdv){

    axios.delete(`${Bdd.api_url}/rendez-vous/${idRdv}`)
        .then((response) => {
            this._initRappel()

        })
}
deleteTraitement(idTraitement){
    axios.delete(`${Bdd.api_url}/traitement/${idTraitement}`)
        .then(response=>{
            this._initRappel()        })
}
goToDetail = (id) => {
    this.props.navigation.navigate("RappelDetail", { id: id })

}

getDays(data){
    lun = data.monday === 1 ? "Lun" : ""
    mar = data.tuesday === 1 ? "Mar" : ""
    mer = data.wednesday === 1 ? "Mer" : ""
    jeu = data.thirsday === 1 ? "Jeu" : ""
    ven = data.friday === 1 ? "Ven" : ""
    sam = data.saturday === 1 ? "Sam" : ""
    dim = data.sunday === 1 ? "Dim" : ""

    return lun + " " + mar + " " + mer + " " + jeu + " " + ven + " " + sam + " " + dim
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

render() {

    const datas = [
         {
            type: "Rendez-vous", label: "rdv"
        }, {
            type: "Traitements", label: "trt"
        }, {
            type: "Vaccins", label: "vcc"
        }
    ]

   

    return (
        <View style={styles.container}>

            {/*
                        <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                <TopMenu navigation={this.props.navigation} />
            </View>
            */}

            <View style={styles.rappelContainer}>

                <View style={styles.rappelHeader}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
                        <Text textBreakStrategy={'simple'} style={{ color: "white", fontSize: 25, marginLeft: 20, flex: 1, textAlign: 'center', alignItems: 'center', paddingTop: 20 }}>
                        Mes{" "}rappels {"  "}</Text>
                    </View>
                    <View style={styles.appelType}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")} style={{flex:1, flexDirection: 'row'}}>
                    <Icon
                    name='chevron-left'
                    size={19}
                    type='font-awesome'
                    color='#FFFFFF'
                    style={{fontWeight: '100', paddingTop: 10}}
                    />
                    </TouchableOpacity>

                        {datas.map((data, i) => {
                            return this.state.numColored === i ? this.renderRappelType(data.type, true, data.label, i) : this.renderRappelType(data.type, false, data.label, i)
                        })}
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    {this.state.selectedType==="rdv" && this.state.rappels !== undefined && this.state.rappels.map((r,i)=>{
                        const id = r.idRdv
                        const title = "RDV"
                        let date = new Date(r.dateRdv)
                        moment.locale("fr")
                        date = moment(date,"DDMMYYYY").fromNow().toString()
                        const name = r.titreRdv

                       return  this.renderRendezVous(id,title,date,name,i)
                    })}
                    {this.state.selectedType==="vcc" && this.state.vaccins !== undefined && this.state.vaccins.map((r,i)=>{
                       
                        const id = r.idRdv
                        const title = "VCC"
                        let date = new Date(r.dateRdv)
                        moment.locale("fr")
                        date = moment(date,"DDMMYYYY").fromNow().toString()
                        const name = r.titreRdv

                       return  this.renderRendezVous(id,title,date,name,i)
                    })}
                    {this.state.selectedType==="trt" && this.state.traitements !== undefined && this.state.traitements.map((r,i)=>{
                        const id = r.idTraitement
                       let date1 = new Date(r.debTraitement)
                       let date2 = new Date(r.finTraitement)
                        date1 = moment().format("LL")
                        date2= moment().format("LL")
                        const nameAndDate = r.nomTraitement+" "+  date1+ " à "+ date2
                        
                        const jour = r.jourTraitement
                       return  this.renderTraitement(id,nameAndDate,jour,i)
                    })}
                </View>

            </View>
            <ActionButton onPress={() => this.props.navigation.navigate("AddEvent")} style={{ marginBottom: 20 }} buttonColor="#008AC8">

</ActionButton>

        </View>
    )
}

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rappelHeader: {
        backgroundColor: "#00C1B4",
        height: hp("15%")
    },

    appelType: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: hp("4%"),
        marginBottom: hp("1%")
    },

    rappelText: {
        color: "white",
        padding: 10,

    },
    rappelItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20
    },
    tempsRappel: {
        fontWeight: "bold",
    },
    heureRappel: {
        color: "#d3d3d3"
    },
    dateRappel: {
        backgroundColor: "red",
        color: "white",
        padding: 7,
        textAlign: "center"
    },
    moisRappel: {
        color: "red",
        textAlign: "center"
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
})

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


export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
