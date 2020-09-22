import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-gesture-handler';

const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.wav',
       
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

export default class VoiceScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            isRecording : false,
            isFetching : false,
            recording : null,
            query : ""
        }
    }

    async componentDidMount(){
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
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
            
           

            const response = await fetch("https://us-central1-best4sante-281604.cloudfunctions.net/voicesante", {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            console.log(data);
            this.setState({query : data.transcript})
            
           
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
            <View style={{flex:  1, justifyContent : "center",alignItems :"center"}}>
                <TouchableOpacity
                    onPressIn={()=>this.handlePressIn()}
                    onPressOut={()=> this.handlePressOut()}
                >
                    <Text>
                        Hold for recording
                    </Text>
                </TouchableOpacity>

                {this.state.isFetching && <ActivityIndicator color="#ffffff" />}
            </View>
        )
    }
}
