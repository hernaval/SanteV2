import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TopMenu from "../../component/Menu/TopMenu"
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const DEFAUTL_USER = "https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg"
class MonProfil extends Component {

    constructor() {
        super()
        this.state = {
            headerVisible: true,
            photoUri: "",
            id: "",
        }
    }

    componentDidMount = async () => {
        setTimeout(async () => {
            this.setState({
                id: this.props.second.second_users === null ? this.props.user.user : this.props.second.second_users[this.props.second.indexSelected].id,
            })
            await this.fetchImage()
        }, 5000)

    }
    fetchImage = async () => {
        await firebase.firestore().collection('profile')
            .where("idUser", "==", this.state.id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.setState({
                        photoUri: doc.data().photoUri
                    })

                })

            })
            .catch(err => {

            })
    }
    renderHeader = () => {

        return (<View style={{ flex: 1 }}>
            <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                <TopMenu navigation={this.props.navigation} />
            </View>
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    source={{ uri: this.state.photoUri == "" ? DEFAUTL_USER : this.state.photoUri }}
                >
                    <View style={styles.headerColumn}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.userNameText}>{this.props.second.second_users[this.props.second.indexSelected].firstName}</Text>
                            <Text style={styles.userNameText}>{this.props.second.second_users[this.props.second.indexSelected].lastName}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>)
    }

    renderTavanu = () => (
        <View style={styles.infoContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("InfoPerso")} style={styles.itemContaier}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.iconItem}>
                        <Icon name="accessibility" />
                    </View>
                    <Text style={styles.textItem}>Informations personnelles</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("FicheMedicale")} style={styles.itemContaier}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.iconItem}>
                        <Icon name="accessibility" />
                    </View>
                    <Text style={styles.textItem}>Fiche santé</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("MyContact")} style={styles.itemContaier}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.iconItem}>
                        <Icon name="accessibility" />
                    </View>
                    <Text style={styles.textItem}>Mes contacts d'urgence</Text>
                </View>
            </TouchableOpacity>

            <View>

            </View>
        </View>
    )

    handleScroll(event) {
        console.log(event)
    }
    render() {
        return (
            <ScrollView onScroll={this.handleScroll.bind(this)} style={styles.scroll}>

                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}
                        {this.renderTavanu()}
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },

    headerBackgroundImage: {
        resizeMode: "contain",
        paddingBottom: 20,
        paddingTop: 35,
        height: hp("45%")
    },

    headerColumn: {
        position: "absolute",
        bottom: 0,
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    iconItem: {
        // backgroundColor: '#00000000',
        backgroundColor: "#00C1B4",
        paddingRight: 5,
        borderTopRightRadius: 75,
        paddingRight: 20,
        paddingTop: 5
    },
    textItem: {
        padding: 20,
        fontWeight: "500"
    },
    itemContaier: {

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.17,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 30
    },
    infoContainer: {

        position: "relative",
        top: -10,
        marginLeft: wp("10%"),
        marginRight: wp("10%"),
        padding: 20,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    nameContainer: {
        zIndex: 111,
        backgroundColor: "#000",
        opacity: 0.5,
        width: wp("100%"),
        padding: 20
    },
    scroll: {
        backgroundColor: '#FFF',

    },


    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(MonProfil)