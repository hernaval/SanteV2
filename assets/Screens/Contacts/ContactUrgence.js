import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Linking } from 'react-native'
import TopMenu from "../../component/Menu/TopMenu"
import BottomMenu from "../../component/Menu/BottomMenu"
import { Avatar, Divider, ListItem, Input } from 'react-native-elements';
import { Container, Header, Item, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import { addContact, deleteContact } from "../../Action"
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Bdd from "../../API/Bdd"
import BottomSheet from 'react-native-simple-bottom-sheet';
import HeaderMenu from "../../component/Menu/HeaderMenu";

class ContactUrgence extends Component {

    constructor() {
        super()
        this.state = {
            contacts: [],
            contactsTemp: [],
            searchText: '',
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

    searchContact(search) {
        const taille = this.state.contactsTemp.length;
        var tab = [];
        for(let i = 0; i < taille; i++){
            var chaine = this.state.contactsTemp[i];
            if (chaine.nomContact.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
            { 
                console.log('find ', chaine);
                tab.push(chaine);
            } else {
                console.log('not find ', chaine);
            }
        }
        this.setState({
            contacts: tab
        });
    }

    fetchContact() {
        const idUser = this.props.user.user.idUser
        axios.get(`${Bdd.api_url}/contact/list?idUser=${idUser}`)
            .then(res => {
                console.log('resultat contact ', res.data.data)
                this.setState({ contacts: res.data.data })
                this.setState({ contactsTemp: res.data.data })
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
        console.log('delete contact')
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
        console.log(data)
        axios.put(`${Bdd.api_url}/contact/${idContact}`, data)
            .then(_ => {
                console.log('Save contact urgence')
                this.fetchContact()
            }).catch(
                error => {
                    console.log('Erreur save contact urgence')
                    console.log(error)
                }
            )
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

            <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
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
          
            <View style={{marginTop: -20}}>
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
            </View>
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
                <HeaderMenu navigation={this.props.navigation} urgence={1}/>
                </View>

                <Header searchBar rounded style={{backgroundColor: '#e6e6e6', marginTop: 5, marginBottom: 5}}>
                  <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Rechercher" onChangeText={(text) => this.searchContact(text)}/>
                  </Item>
                  <Button transparent>
                    <Text>Rechercher</Text>
                  </Button>
                </Header>

                <ScrollView>
                    {
                        this.state.contacts.map((contact, i) => {
                            const initial = contact.nomContact[0]
                            return (
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                <ListItem
                                style={{flex: 7}}
                                containerStyle={{ margin: 0}}
                                key={i}
                                title={contact.nomContact}
                                leftAvatar={{
                                    title: initial.toString().toUpperCase()
                                }}
                                bottomDivider
                                onPress={() => {
                                    this.panelRef.current.togglePanel()
                                    this.changeSelected(contact.idContact)
                                }}
                            />
                            <View style={{flex: 1, backgroundColor: 'white'}}>
                            <TouchableOpacity style={{ paddingTop: 30, color: 'red' }} onPress={() => this.callPerson(contact.numContact)}>
                            <FontAwesomeIcon icon={faPhone} color="#008AC8" size={19}/>
                            </TouchableOpacity>
                            </View>

                            <View style={{flex: 1, backgroundColor: 'white'}}>
                            <TouchableOpacity style={{ paddingTop: 30, color: '#e6e6e6' }} onPress={() => this.onClickDelete(contact.idContact)}>
                            <FontAwesomeIcon icon={faTrash} style={{color: '#2b2b2b' }} size={19}/>
                            </TouchableOpacity>
                            </View>

                            </View>
                            )
                        })
                    }

                </ScrollView>

                <BottomSheet isOpen={true} sliderMinHeight={0} ref={ref => this.panelRef.current = ref}>
                    {this.showInfo()}
                </BottomSheet>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6'
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
        fontSize: 19
    },
    labelValue: {
        color: "gray",
        fontSize: 18,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        marginBottom: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 2
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUrgence)