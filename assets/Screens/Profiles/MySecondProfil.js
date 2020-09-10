import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import { Avatar, Divider, ListItem } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronRight, faEdit, faUmbrella, faUserAlt, faClinicMedical, faFileMedicalAlt, faUserCircle, faUsers, faExclamationCircle, faUser, faArrowDown, faArrowUp, faChevronDown, faTrashAlt, faCheck, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { deleteSecondProfil, setIndexSelected } from "../../Action";
import ActionButton from 'react-native-action-button';
import axios from "axios"
import Bdd from "../../API/Bdd"
import { ScrollView } from 'react-native-gesture-handler';
class MySecondProfil extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            secondUser: [],

            actionIndex: -1
        }
        this.addSecondProfil = this.addSecondProfil.bind(this)
    }

    componentDidMount() {
        this.fetchSecond()

        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            this.fetchSecond()
       });
    }

    fetchSecond = () => {
        let idUser = this.props.user.user.idUser
        axios.get(`${Bdd.api_url_second}/list?idUser=${idUser}`)
            .then(
                (res) => 
                {
                    console.log('fetch second')
                    console.log(res.data)
                    this.setState({ secondUser: res.data.data })
                }
            )
    }


    renderItem = (index,idUser, fullname, lien, iniital, img) => (
        <ListItem
            containerStyle={{ margin: 10 }}

            title={fullname}
            subtitle={lien}
            leftAvatar={{
                title: iniital
            }}
            bottomDivider
            rightElement={
                <React.Fragment>
                {
                    /**
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                        console.log('index ', index)
                        if (index === undefined || index === null) {
                            return
                        }
                         this.props.setIndexSelected(index)
                         this.props.navigation.navigate("SwitchSecond", {id: idUser, profil: img, index: index})
                    }}>
                        <FontAwesomeIcon icon={faEye} />
                    </TouchableOpacity>
                     */
                }

                   
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.deleteSecondProfil(idUser)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>
                </React.Fragment>
            }

        />


    )
    async onChangeSelectedName(index) {

        let selected = this.props.second.second_users[index].firstName + ' ' + this.props.second.second_users[index].lastName
        this.setState({ selected: selected, isSelectedProfile: false })
        await this.props.setIndexSelected(index);

        this.props.navigation.navigate("MyProfil")

    }


    _toggleAction = (index) => {
        this.state.actionIndex === index ? this.setState({ actionIndex: -1 })
            : this.setState({ actionIndex: index })
    }

    renderAction = (idUser, index) => (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly"}}>


            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.deleteSecondProfil(idUser)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <Text style={{textAlign : "center"}}>Supprimer</Text>
                </TouchableOpacity>
                
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={async () => {
                    this.props.setIndexSelected(index)
                    this.props.navigation.navigate("SwitchSecond")
                }}>
                    <FontAwesomeIcon icon={faCheck} />
                    <Text style={{textAlign : "center"}}>Modifier</Text>
                </TouchableOpacity>
                
            </View>

        </View>
    )
    deleteSecondProfil(idUser){
        axios.delete(`${Bdd.api_url_second}/${idUser}`)
			.then(response => {
                this.fetchSecond()
                this.setState({actionIndex : -1})
			})
    }

    addSecondProfil() {
        this.props.navigation.navigate("SecondAdd")
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <HeaderMenu navigation={this.props.navigation} secondProfil={1} ajouterSecondProfil={this.addSecondProfil}/>
                </View>

                <View style={styles.profilContainer}>

                    <ScrollView>
                        {this.state.secondUser !== null && this.state.secondUser.map((profil, index) => {
                            const name = profil.nomSecondUser
                            const lien = profil.lienSecondUser
                            const fullname = name + " " + profil.prenomSecondUser
                            const inital = profil.nomSecondUser[0] + profil.prenomSecondUser[0]
                            const id = profil.idSecondUser
                            const img = profil.imageSecondUser
                            return (
                                <View key={index}>
                                    {this.renderItem(index,id, fullname, lien, inital, img)}

                                </View>
                            )
                        })}
                    </ScrollView>


                </View>

                {/*
                <ActionButton onPress={() => this.props.navigation.navigate("SecondAdd")} style={{ marginBottom: 5 }} buttonColor="#008AC8">
                </ActionButton>

                */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    profilContainer: {
        justifyContent: "center",
        marginTop: hp("7%")
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
    deleteSecondProfil,
    setIndexSelected
}
export default connect(mapStateToProps, mapDispatchToProps)(MySecondProfil)

