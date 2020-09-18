import React, { Component } from 'react'
import { Text, View,TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TopMenu from "../../component/Menu/TopMenu"
import HeaderMenu from "../../component/Menu/HeaderMenu"
import { Avatar, Divider, ListItem, Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faEdit, faUserAlt, faUserCircle, faUsers, faUser, faChevronDown, faTrashAlt, faCheck, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { deleteSecondProfil, setIndexSelected } from "../../Action";
import ActionButton from 'react-native-action-button';
import axios from "axios"
import Bdd from "../../API/Bdd"
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class MySecondProfil extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            secondUser: [],
            secondUserTemp: [],
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
        console.log('------8888------')
        this.setState({
            secondUser: []
        });
        axios.get(`${Bdd.api_url_second}/list?idUser=${idUser}`)
            .then(
                (res) => 
                {
                    console.log('fetch second dans second profil')
                    console.log(res.data)
                    this.setState({ secondUser: res.data.data })
                    this.setState({ secondUserTemp: res.data.data })
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
            onPress={() => this.props.navigation.navigate("InfoSecond", {id: idUser, profil: img, index: index})}
            rightElement={
                <React.Fragment>                   
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

    
    searchContact(search) {
        const taille = this.state.secondUserTemp.length;
        var tab = [];
        for(let i = 0; i < taille; i++){
            var chaine = this.state.secondUserTemp[i];
            if ((chaine.nomSecondUser.toString().toLowerCase().indexOf(search.toLowerCase()) > -1) || (chaine.prenomSecondUser.toString().toLowerCase().indexOf(search.toLowerCase()) > -1))
            { 
                console.log('find ', chaine);
                tab.push(chaine);
            } else {
                console.log('not find ', chaine);
            }
        }
        this.setState({
            secondUser: tab
        });
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
                <View style={{marginBottom: 0, flexDirection: 'row', 
                width: wp('90%'), marginLeft: wp('5%'), borderWidth: 1, 
                padding: 10, borderRadius: 10, borderWidthColor: 'grey'}}> 
                    <View>
                        <Icon
                          name='search'
                          size={22}
                          color='#696969'
                          containerStyle={{marginRight: 50}}
                        />
                    </View>

                    <View style={{marginLeft: 20}}>
                        <TextInput placeholder="Rechercher" style={{fontSize: 18}}
                        onChangeText={(text) => this.searchContact(text)}/>
                    </View>
                </View>

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
    inputSearch: {
    fontSize: 16,
    },
    contain_search: {
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    width: wp("87%"), 
    paddingTop: 17, 
    paddingLeft: 15, 
    height: 60, 
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 10
  },
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    profilContainer: {
        justifyContent: "center",
        marginTop: hp("3%")
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

