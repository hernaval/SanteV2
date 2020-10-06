
import React, { Component } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, ActivityIndicator,Share } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { faHeart, faHeartbeat, faGrinHearts, faUser, faUserCircle, faUserEditCircle, faUserEdit, faStar, faMicrophoneAlt, faUmbrella, faMicrophoneSlash, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import Bdd from '../../API/Bdd';
import { handleNavigation } from '../../Navigation/voice';


const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

class BottomMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            isRecording : false,
            recording : null,
            isFetching : false,
        }
    }
    

    async componentDidMount() {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    }

    shareLink() {
        const url = 'https://exp.host/@stenny453/Best4Sante';
        Share.share({title: 'Best4Santé', message: url}).then(
            Alert.alert('Succes', 'Lien Partagé', [
                {
                    text: 'OK',
                    onPress: () => {}
                }
            ])
        ).catch(
            err => Alert.alert('Echec', 'Erreur lors de partage de lien', [
                {
                    text: 'OK',
                    onPress: () => {}
                }
            ])
        )
    }


    deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(this.state.recording.getURI());
            console.log("file to delete : ",info)
            await FileSystem.deleteAsync(info.uri)
        } catch(error) {
            console.log("There was an error deleting recording file", error);
        }
    }

     getTranscription = async () => {
        this.setState({isFetching : true})
        try {
            const info = await FileSystem.getInfoAsync(this.state.recording.getURI());
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'audio/x-wav',
                name: 'speech2text'
            });
            
           

            const response = await fetch(`${Bdd.api_url}/voice`, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            console.log(data);
            switch(data){
                case "logout" : 
                    this.props.navigation.navigate("Logout")
                    break;
                
                case "profil" :
                    this.props.navigation.navigate("MyProfil")
                    break;
                
                case "document" :
                    this.props.navigation.navigate("FileManager")
                    break;
                
                case "favoris" :
                    this.props.navigation.navigate("Favorite")
                    break;
                
                case "contact" : 
                    this.props.navigation.navigate("ContactUrgence")
                    break;
                
                case "ps" : 
                    this.props.navigation.navigate("Home")
                    break;
                
                case "seconduser" :
                    this.props.navigation.navigate("MySecondProfil", {id: this.props.user.user.idUser})
                    break;
                
                case "shareapps" : 
                    this.shareLink();
                    break;
        
            }
            this.setState({isVisible: false})
          
            
          
        } catch(error) {
            console.log('There was an error reading file', error);
            await this.stopRecording()
            await this.resetRecording();
        }
        this.setState({isFetching : false})
    }



     stopRecording = async () => {
         console.log("mijanona e")
        this.setState({isRecording : false})
        try {
            await this.state.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
    }

    startRecording = async () => {
        console.log("lasa ty e")
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;

        this.setState({isRecording :true})
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            
        }

        this.setState({recording : recording})
    }

     resetRecording = async () => {
         
         this.deleteRecordingFile();
        this.setState({recording :false})
    };


    handlePressIn =  () =>{
         this.startRecording()
    } 
    handlePressOut = async () => {
         this.stopRecording()
          this.getTranscription();
    }
     

    render() {
        return (
            <View >

                <Modal
                    transparent={true}
                    animationType={'slide'}
                    visible={this.state.isVisible}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>

                        {this.state.isRecording && 
                            <Text style={{ color: "red", fontWeight: "bold", fontSize: 30 }}>
                            Relacher pour terminer
                            </Text>
                        }

                        {!this.state.isRecording && 
                            <Text style={{ color: "red", fontWeight: "bold", textAlign : "center",padding : 2, fontSize: 30 }}>
                           Appuyer longuement pour commencer
                            </Text>
                        }

                            
                        
                        <View>
                            {this.state.isFetching && 
                            <ActivityIndicator size="large" />
                        }
                        </View>
                        <View style={{flexDirection : "column",alignItems : "center"}}>
                            <TouchableOpacity
                                 onPressIn={()=>this.handlePressIn()}
                                 onPressOut={()=> this.handlePressOut()}
                            >
                                <FontAwesomeIcon size={120} icon={faMicrophoneAlt} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginTop : 20}} onPress={()=> this.setState({isVisible : false})}>
                                <FontAwesomeIcon color="red"  size={20} icon={faWindowClose} />
                            </TouchableOpacity>
                        </View>


                    </View>
                </Modal>


                <View style={{

                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: 'grey',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    bottom: 35,
                    zIndex: 10


                }}>

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Emergency")}>
                        <View style={[styles.button, styles.actionBtn]}>

                            <Image style={{ width: 60, height: 60 }}
                                resizeMode="contain"
                                source={require("../../images/icon_urg_2.png")} />
                        </View>
                    </TouchableWithoutFeedback>
                    {/*
                    <Text textBreakStrategy={'simple'} 
                    style={{color : "#FFFFFF", fontWeight: '200', marginTop: 69, marginLeft: 8}}>Urgence</Text>
                    */
                    }
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#00C1B4',


                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 15


                }}>



                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Favorite")}
                        >

                            <FontAwesomeIcon

                                icon={faStar}
                                color="#FFFFFF"
                                size={30}
                                style={{}} />


                        </TouchableOpacity>
                        <Text textBreakStrategy={'simple'} style={{ color: "#FFFFFF", justifyContent: 'center', alignItems: 'center' }}>Favoris </Text>
                    </View>


                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>

                        <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate("Favorite")}
                        >

                            <FontAwesomeIcon

                                icon={faUmbrella}
                                color="#FFFFFF"
                                size={30}
                                style={{}} />


                        </TouchableOpacity>
                        <Text textBreakStrategy={'simple'} style={{ color: "#FFFFFF", justifyContent: 'center', alignItems: 'center' }}>Notif </Text>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginStart: 30
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("MyProfil")}
                        >
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                size={30}
                                color="#EFEAEA"
                            />

                        </TouchableOpacity>
                        <Text textBreakStrategy={'simple'} style={{ color: "white", justifyContent: 'center', alignItems: 'center' }}>Mon{" "}Profil {" "} </Text>
                    </View>



                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>

                        <TouchableOpacity
                            onPress={() => this.setState({ isVisible: true })}

                        >
                            <FontAwesomeIcon
                                icon={faMicrophoneAlt}
                                size={30}
                                color="#EFEAEA"
                            />

                        </TouchableOpacity>
                        <Text textBreakStrategy={'simple'} style={{ color: "white", justifyContent: 'center', alignItems: 'center' }}>Vocale</Text>
                    </View>





                    {/* </View> */}
                </View>
            </View>
        );
    }


}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000090'
    },



});

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu)