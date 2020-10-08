import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Linking } from 'react-native'
import TopMenu from "../../component/Menu/TopMenu"
import BottomMenu from "../../component/Menu/BottomMenu"
import { Avatar, Divider, ListItem, Input } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import { addContact, deleteContact } from "../../Action"
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Bdd from "../../API/Bdd"
import BottomSheet from 'react-native-simple-bottom-sheet';

class MyContact extends Component {

    constructor() {
        super()
        this.state = {
            contacts: [],
            contactIdSelected: {},
            isModifbegin: false,
            id: "",
            nom: "",
            prenom: "",
            email: "",
            num: ""
        }
        this.panelRef = React.createRef()
        this.showRenderInfo = false
    }

    componentDidMount() {
        this.fetchContact()

        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            this.fetchContact()
       });
    }

    fetchContact() {
        const idUser = this.props.user.user.idUser
        axios.get(`${Bdd.api_url}/contact/list?idUser=${idUser}`)
            .then(res => {
                this.setState({ contacts: res.data.data })
            })
    }

    callPerson(phone) {
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

    onClickDelete(id) {

        this.props.deleteContact(id);
        this.fetchContact()
    }

    saveChange() {
        let data = {
            nomContact: this.state.nom,
            prenomContact: this.state.prenom,
            numContact: this.state.num,
            emailContact: this.state.email
        }
        let idContact = this.state.id
        axios.put(`${Bdd.api_url}/${idContact}`, data)
            .then(_ => {

            })
    }

    changeSelected(id) {

        let contact = this.state.contacts.filter(el => {
            return el.idContact == id
        })

        this.setState({
            id: contact[0].idContact,
            nom: contact[0].nomContact,
            prenom: contact[0].prenomContact,
            email: contact[0].emailContact,
            num: contact[0].numContact
        })
        this.showRenderInfo = true
    }

    toggleInfo(props) {
        const show = props.isShow
        if(show) {
            return <this.showInfo/>
        }
    }

    showInfo() {
        if (this.showRenderInfo) {
        return (<View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                {this.state.isModifbegin === false &&
                    <TouchableOpacity onPress={() => this.setState({ isModifbegin: true })}>
                        <Avatar size="small" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'pencil', type: 'font-awesome' }} />

                    </TouchableOpacity>
                }
                {this.state.isModifbegin === true &&
                    <TouchableOpacity onPress={() => {
                        this.setState({ isModifbegin: false })
                        this.saveChange()
                    }}>
                        <Avatar size="small" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'save', type: 'font-awesome' }} />

                    </TouchableOpacity>
                }
            </View>
          
                <Text style={styles.labelText}>Prénom</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ prenom: value })}
                    value={this.state.prenom}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.prenom}</Text>
                }

                <Text style={styles.labelText}>Nom</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ nom: value })}
                    value={this.state.nom}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.nom}</Text>
                }

                <Text style={styles.labelText}>Email</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ email: value })}
                    value={this.state.email}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.email}</Text>
                }

                <Text style={styles.labelText}>Numéro</Text>
                {this.state.isModifbegin === true && <Input keyboardType="numeric"
                    onChangeText={(value) => this.setState({ num: value })}
                    value={this.state.num}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.num}</Text>
                }
        </View>)  
    }
    }


    renderInfo = () => {
        return (<View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                {this.state.isModifbegin === false &&
                    <TouchableOpacity onPress={() => this.setState({ isModifbegin: true })}>
                        <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'pencil', type: 'font-awesome' }} />

                    </TouchableOpacity>
                }
                {this.state.isModifbegin === true &&
                    <TouchableOpacity onPress={() => {
                        this.setState({ isModifbegin: false })
                        this.saveChange()
                    }}>
                        <Avatar size="medium" rounded overlayContainerStyle={{ backgroundColor: "#008AC8" }} icon={{ name: 'save', type: 'font-awesome' }} />

                    </TouchableOpacity>
                }
            </View>
          
                <Text style={styles.labelText}>Prénom</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ prenom: value })}
                    value={this.state.prenom}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.prenom}</Text>
                }

                <Text style={styles.labelText}>Nom</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ nom: value })}
                    value={this.state.nom}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.nom}</Text>
                }

                <Text style={styles.labelText}>Email</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ email: value })}
                    value={this.state.email}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.email}</Text>
                }

                <Text style={styles.labelText}>Numéro</Text>
                {this.state.isModifbegin === true && <Input
                    onChangeText={(value) => this.setState({ num: value })}
                    value={data.numContact}
                />
                }
                {this.state.isModifbegin === false &&
                    <Text style={styles.labelValue}>{this.state.num}</Text>
                }

         



        </View>)
    }



    render() {


        const list = [
            {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            },

        ]
        return (
            <View style={styles.container}>

                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} />
                </View>
                <View style={styles.contactHeader}>
                    <View>

                        <Avatar rounded size="large" title="HR" />

                    </View>
                    <View>
                        <Text style={styles.contactHeaderText}>Mes contacts d'urgence</Text>
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'grey' }} />
                <ScrollView>
                    {
                        this.state.contacts.map((contact, i) => {
                            const iniital = contact.nomContact[0] + "" + contact.prenomContact[0]
                            return (
                                <ListItem
                                    containerStyle={{ margin: 10 }}
                                    key={i}
                                    title={contact.nomContact}
                                    subtitle={contact.emailContact}
                                    leftAvatar={{

                                        title: iniital
                                    }}
                                    bottomDivider
                                    rightElement={
                                        <React.Fragment>
                                            <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                                this.panelRef.current.togglePanel()
                                                this.changeSelected(contact.idContact)
                                            }}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.callPerson(contact.numContact)}>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.onClickDelete(contact.idContact)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </TouchableOpacity>
                                        </React.Fragment>
                                    }
                                />)
                        })
                    }

                </ScrollView>
                <ActionButton onPress={() => this.props.navigation.navigate("NewContact")} style={{ marginBottom: 20 }} buttonColor="#008AC8">

                </ActionButton>
                <BottomSheet isOpen={true} sliderMinHeight={0} ref={ref => this.panelRef.current = ref}>
                    {this.showInfo()}
                </BottomSheet>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contactHeader: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
        alignItems: "center"
    },
    contactHeaderText: {
        fontWeight: "bold",
        fontSize: 20
    },

    labelText: {
        fontWeight: "bold",
        fontSize: 16
    },
    labelValue: {
        color: "gray"
    },



})

const mapStateToProps = (store) => {
    return {
        user: store.user,
        contact: store.contact,
        /* favorite: store.favorite,
        second: store.second */
    }
}

const mapDispatchToProps = {
    deleteContact
}

export default connect(mapStateToProps, mapDispatchToProps)(MyContact)