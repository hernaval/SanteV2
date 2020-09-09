import React, { Component } from 'react'
import { Card, Input } from 'react-native-elements'
import {
    BackHandler,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Switch,
    ActivityIndicator,
    Alert
} from 'react-native'

import { connect } from 'react-redux'
import { deleteContact, modifyUserInfo, setIndexSelected, setSecondInfo } from '../../Action'

// import TopMenu from '../../component/Menu/TopMenu'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import RadioForm from 'react-native-simple-radio-button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'
import Bdd from '../../API/Bdd'
import RNPickerSelect from 'react-native-picker-select'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faFilePdf, faShareAlt as faShare } from '@fortawesome/free-solid-svg-icons'
const DEFAUTL_USER = 'https://www.nehome-groupe.fr/wp-content/uploads/2015/09/image-de-profil-2.jpg'

class MySante extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isModifbegin: false,
            isSelectedProfile: false,
            id: null,

            blood: 'B+',
            size: 150,
            weight: 60,
            donate: false,
            secu: null,
            idFiche: null,

            photoUri: '',

            medecin: '',
            allergies: '',
            traitement: '',

            isMedicinExist: false,
            isAllergieExist: false,
            isTraitementExist: false,

            isLoading: false,

            isFirst: false,
            ficheSante: {},
            bloodAnnex: { label: 'B+', value: 2 }

        }
        this.ref = firebase.firestore().collection('profile')
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    async componentDidMount () {
        this.setState({
            isLoading: true,
            photeUri: this.props.user.user.imageUser,
            id: this.props.user.user.idUser
        })
        await this.fetchSante()
        await this.getCameraPermissions()
        this.setState({ isLoading: false })
        if (this.props.navigation.state.params.profil !== undefined) {
            this.setState({ photoUri: this.props.navigation.state.params.profil })
        }
        this.setState({
            isLoading: false
        })
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    UNSAFE_componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick () {
        this.props.navigation.navigate('MyProfil', { profil: this.state.photoUri })
        return true
    }

    async fetchSante () {
        await axios.get(`${Bdd.api_url}/fiche-sante/list?idUser=${this.state.id}`)
            .then(async res => {
                if (await !res) {
                    console.log('tena misy olana')
                } else {
                    const fiche = res.data.data
                    if (res.data === null) this.setState({ isFirst: true })
                    else {
                        this.setState({
                            isFirst: false,
                            blood: fiche.groupeSanguin,
                            size: fiche.taille,
                            weight: fiche.poids,
                            medecin: fiche.medecinTraitant,
                            secu: fiche.numSecu,
                            donate: fiche.donnateur,
                            idFiche: fiche.idFiche,
                            allergies: fiche.allergies
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getCameraPermissions () {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
            Alert('permission not granteed')
            this.setState({
                rollGranted: false,
                cameraGranted: false
            })
        } else {
            this.setState({
                rollGranted: true,
                cameraGranted: true
            })
        }
    }

    async _pickImage () {
        // launchCameraAsync
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.5
        })

        if (result.cancelled) {
            return
        }

        this._handleImagePicked(result)
    }

    async _handleImagePicked (pickerResult) {
        let uploadUrl = ''
        try {
            this.setState({ isLoading: true })

            if (!pickerResult.cancelled) {
                uploadUrl = await this.uploadImageAsync(pickerResult.uri)
                const data = {
                    imageUser: uploadUrl,
                    idUser: this.props.user.user.idUser
                }
                this.saveProfileImageInfo(data)
            }
        } catch (e) {
            console.log(e)
            alert('Upload failed, sorry :(')
        } finally {
            this.setState({ isLoading: false })
            /* this.props.navigation.navigate("MonProfil") */
            this.setState({ photoUri: uploadUrl })
        }
    }

    saveProfileImageInfo (data) {
        this.props.ModifyPhoto(data)
    }

    async uploadImageAsync (uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                resolve(xhr.response)
            }
            xhr.onerror = function (e) {
                console.log(e)
                reject(new TypeError('Network request failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)
            xhr.send(null)
        })
        const id = Math.random().toString()
        const ref = firebase
            .storage()
            .ref()
            .child(id)
        const snapshot = await ref.put(blob)

        // We're done with the blob, close and release it
        blob.close()

        return await snapshot.ref.getDownloadURL()
    }

    renderHeader () {
        return (
            <View>
                <View style={ styles.under}>
                    {
                        this.state.isModifbegin
                            ? <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => this.setState({ isModifbegin: false })} >
                                <Text style={styles.header}>Annuler</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('Menu')} >
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    color="white"
                                    size={24}
                                />
                                <Text style={styles.header}>Profil</Text>
                            </TouchableOpacity>
                    }
                    <Text style={styles.header}>Ma Fiche Sante</Text>
                    {
                        this.state.isModifbegin
                            ? <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => this.setState({ isModifbegin: false })} >
                                <Text style={styles.header}>Enregistrer</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => this.setState({ isModifbegin: true })} >
                                <Text style={styles.header}>Modifier</Text>
                            </TouchableOpacity>
                    }

                    {/* <TopMenu navigation={this.props.navigation} /> */}
                </View>

                <View
                    style={styles.headerBackgroundImage}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={{
                                uri: this.state.photoUri === '' || this.state.photeUri
                                    ? DEFAUTL_USER
                                    : this.state.photoUri
                            }}
                        />
                        <View>
                            <Text style={styles.userNameText}>
                                {this.props.user.user.nomUser}
                                {this.props.user.user.prenomUser}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    addFiche () {
        this.setState({ isLoading: true })
        const data = {
            idUser: this.props.user.user.idUser,
            groupeSanguin: this.state.blood,
            taille: this.state.size,
            poids: this.state.weight,
            donnateur: this.state.donate,
            numSecu: this.state.secu,
            medecinTraitant: this.state.medecin,
            allergies: this.state.allergies
        }

        axios.post(`${Bdd.api_url}/fiche-sante`, data)
            .then(_ => {
                this.setState({ isModifbegin: false, isLoading: false })
            })
            .catch(err => console.log(err))
        this.setState({ isLoading: false })
    }

    modifFiche () {
        this.setState({ isLoading: true })
        const userModified = {
            groupeSanguin: this.state.blood,
            taille: this.state.size,
            poids: this.state.weight,
            donnateur: this.state.donate,
            numSecu: this.state.secu,
            medecinTraitant: this.state.medecin,
            allergies: this.state.allergies
        }
        // this.saveAutre(this.state.medecin, this.state.allergies, this.state.traitement)
        axios.put(`${Bdd.api_url}/fiche-sante/${this.state.idFiche}`, userModified)
            .then(res => {
                this.setState({ isLoading: false, isModifbegin: false })
            })
            .catch(err => {
                this.setState({ isLoading: false, isModifbegin: false })
                console.log(err)
            })
    }

    createTaille () {
        const taille = []
        for (let i = 50; i <= 210; i++) {
            const item = {
                label: i + ' cm',
                value: i
            }
            taille.push(item)
        }
        return taille
    }

    createPoids () {
        const poids = []
        for (let i = 1; i <= 180; i++) {
            const item = {
                label: i + ' kg',
                value: i
            }
            poids.push(item)
        }
        return poids
    }

    render () {
        var groupeSanguin = [
            { label: 'A+', value: 0 },
            { label: 'A-', value: 1 },
            { label: 'B+', value: 2 },
            { label: 'B-', value: 3 },
            { label: 'AB+', value: 4 },
            { label: 'AB-', value: 5 },
            { label: 'O+', value: 6 },
            { label: 'O-', value: 7 }
        ]
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    {
                        this.state.isLoading &&
                        <View style={styles.loading_container}>
                            <ActivityIndicator size="large" />
                        </View>
                    }

                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}
                    </Card>

                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.labelText}>Groupe Sanguin</Text>
                            {
                                this.state.isModifbegin
                                    ? <RadioForm
                                        formHorizontal={true}
                                        labelHorizontal={false}
                                        radio_props={groupeSanguin}
                                        value={groupeSanguin[this.state.bloodAnnex]}
                                        initial={-1}
                                        onPress={(value) => this.setState({ blood: groupeSanguin[value].label, bloodAnnex: value })}
                                    />
                                    : <Text style={styles.labelValue}>
                                        {this.state.bloodAnnex.label}
                                    </Text>
                            }
                        </View>
                        <View>
                            <Text style={styles.labelText}>Taille</Text>
                            {
                                this.state.isModifbegin
                                    ? <View>
                                        <RNPickerSelect
                                            placeholder={{
                                                label: 'Taille en cm'
                                            }}
                                            value={this.state.size}
                                            onValueChange={(value) => this.setState({ size: value })}
                                            items={this.createTaille()}
                                        />
                                    </View>
                                    : <Text style={styles.labelValue}>
                                        {this.state.size} cm
                                    </Text>
                            }
                        </View>

                        <View>
                            <Text style={styles.labelText}>Poids</Text>
                            {
                                this.state.isModifbegin
                                    ? <View>
                                        <RNPickerSelect
                                            placeholder={{
                                                label: 'Poids en kg'
                                            }}
                                            value={this.state.weight}
                                            onValueChange={(value) => this.setState({ weight: value })}
                                            items={this.createPoids()}
                                        />
                                    </View>
                                    : <Text style={styles.labelValue}>
                                        {this.state.weight} kg
                                    </Text>
                            }
                        </View>
                        <View>
                            <Text style={styles.labelText}>Donneur d'organe</Text>
                            {
                                this.state.isModifbegin
                                    ? <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={this.state.donate ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(value) => {
                                            if (value === true) this.setState({ donate: true })
                                            else this.setState({ donate: false })
                                        }}
                                        value={this.state.donate}
                                        style={styles.switch}
                                    />
                                    : <Text style={styles.labelValue}>
                                        {this.state.donate === true ? 'OUI' : 'NON'}
                                    </Text>
                            }
                        </View>
                        <View>
                            <Text style={styles.labelText}>Numéro de la sécurité sociale</Text>
                            {
                                this.state.isModifbegin
                                    ? <Input
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => this.setState({ secu: text })}
                                        value={this.state.secu}
                                    />
                                    : <Text style={styles.labelValue}>
                                        {this.state.secu}
                                    </Text>
                            }
                        </View>

                        <View>
                            <Text style={styles.labelText}>Médecin traitant</Text>
                            {
                                this.state.isModifbegin
                                    ? <Input
                                        onChangeText={(text) => this.setState({ medecin: text })}
                                        value={this.state.medecin}
                                    />
                                    : <Text style={styles.labelValue}>
                                        {this.state.medecin}
                                    </Text>
                            }
                        </View>
                        <View>
                            <Text style={styles.labelText}>Allergies</Text>
                            {
                                this.state.isModifbegin
                                    ? <Input
                                        onChangeText={(text) => this.setState({ allergies: text })}
                                        value={this.state.allergies}
                                    />
                                    : <Text style={styles.labelValue}>
                                        {this.state.allergies}
                                    </Text>
                            }
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text style={{ color: '#62c9c2' }}>Mon Rapport Medical</Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#0389c2',
                                        padding: 5,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>Inserer PDF</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View
                                    style={{
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 0,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 1,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 10,
                                        width: 150,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        borderRadius: 10
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faFilePdf}
                                        color="#518cb4"
                                        size={20}
                                    />

                                    <Text style={{ color: '#518cb4' }}>Mon Fichier PDF</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginRight: 50
                                }}
                            >
                                <Text>
                                    Partagez en toute sécurité avec votre
                                    médecin, coach ou famile votre rapport
                                    médical
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#0389c2',
                                    padding: 10,
                                    borderRadius: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faShare}
                                    color="#eee"
                                    size={20}
                                />
                                <Text>  </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >
                                    Partagez Maintenant
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 20
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#999'
    },
    labelValue: {
        color: '#000',
        fontSize: 16,
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingTop: 10,
        paddingLeft: 5,
        marginBottom: 5
    },
    actionBtn: {
        position: 'relative',
        top: -10,
        zIndex: 99999,
        paddingLeft: 5,
        paddingRight: 5
    },
    slider: {
        width: wp('80%'),
        marginTop: hp('1%'),
        color: '#008AC8'

    },
    choiceItem: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0
    },
    container: {
        flex: 1,
        paddingBottom: 50
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30
    },
    headerBackgroundImage: {
        paddingLeft: 20,
        paddingBottom: 20,
        paddingTop: 35
    },
    headerColumn: {
        flexDirection: 'row'
    },
    placeIcon: {
        color: 'white',
        fontSize: 26
    },
    scroll: {
        backgroundColor: '#FFF'
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    userCityRow: {
        backgroundColor: 'transparent'
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#01C89E',
        marginBottom: 15
    },
    userNameText: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
        marginLeft: 10
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
    },
    switch: {
        marginTop: -24,
        marginBottom: 10
    },
    under: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 80,
        backgroundColor: '#01C89E'
    },
    header: {
        color: 'white'
    }
})

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {
    deleteContact,
    modifyUserInfo,
    setSecondInfo,
    setIndexSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(MySante)
