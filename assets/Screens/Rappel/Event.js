import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { cond } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload, faCalendar, faClock, faCalendarAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import TopMenu from "../../component/Menu/TopMenu"
import { connect } from 'react-redux';

const testIDs = require('./testID');

 class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            dateson: {},
             
           
        };
    }

    componentDidMount = async () => {
       await this.fetchItems()
       
    }

  
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} />
                </View>

                <Agenda
                    testID={testIDs.agenda.CONTAINER}
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={'2020-06-08'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    /* markingType={'period'}
                     markedDates={{
                        '2020-06-08': { textColor: '#43515c' },
                        '2020-06-09': { textColor: '#43515c' },
                        '2020-06-14': { startingDay: true, endingDay: true, color: 'blue' },
                        '2020-06-21': { startingDay: true, color: 'blue' },
                        '2020-06-22': { endingDay: true, color: 'gray' },
                        '2020-06-24': { startingDay: true, color: 'gray' },
                        '2020-06-25': { color: 'gray' },
                        '2020-06-26': { endingDay: true, color: 'gray' }
                    }}
                
                monthFormat={'yyyy'}
                theme={{calendarBackground: 'white', agendaKnobColor: 'green'}}
                 renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                 hideExtraDays={true} */
                />
               

                <View style={styles.tabBtn}>

                    <TouchableOpacity onPress={  () => {
                        this.props.navigation.navigate("AddEvent")
                    }} style={ styles.headerBtn}>
                        <Text style={styles.headerText}>Ajouter un rappel</Text>
                    </TouchableOpacity>

                </View>

            </View>

        );
    }

    async fetchItems() {
        const ob = {}
        await firebase.firestore().collection("rendezvous").where("idUser", "==", this.props.user.user.data.user[0].id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const strTimes = doc.data().dateRdv
                    if (!this.state.items[strTimes]) {

                        this.state.items[strTimes] = []
                        this.state.items[strTimes].push({
                            name: doc.data().nomRdv,
                            heure: doc.data().heureRdv,
                            lieu: doc.data().lieu,
                        })
                    }
                })
            })


        Object.keys(this.state.items).forEach(key => { ob[key] = this.state.items[key] })

        this.setState({ items: ob })
    }

    loadItems(day) {

    }

    renderItem(item) {
        return (
            <TouchableOpacity

                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>{item.heure}</Text>
                <Text>{item.lieu}</Text>


            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    tabBtn: {
        marginTop : 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    headerBtn : {
        padding : 20,
        backgroundColor : "#008AC8"
    },
    headerBtnActive : {
        backgroundColor : "#d3d3d3",
        padding : 20,
    },
});

const mapStateToProps = (store) => {
    return {
        user: store.user,
        contact: store.contact,
        second: store.second
    }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(Event);
