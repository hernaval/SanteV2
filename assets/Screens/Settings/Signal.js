import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet ,ScrollView ,Image} from 'react-native'
import { connect } from 'react-redux'
import Loader from '../../component/loader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import HeaderMenu from '../../component/Menu/HeaderMenu'
import { TextInput } from 'react-native-paper';
import Axios from 'axios'
import Bdd from '../../API/Bdd'
import { GiftedChat,Send,Bubble } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { Avatar } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


class Signal extends Component {

    constructor(){
        super()
        this.state = {
            isLoading :false,
            messages : [
              /**
               * Mock message data
               */
              // example of system message
              {
                _id: 0,
                text: 'Nouvelle discussion créée',
                createdAt: new Date().getTime(),
                system: true
              },
              // example of chat message
              {
                _id: 1,
                text: "Bonjour, l'équipe Best4Santé est à votre écoute. Laissez votre message et notre équipe reviendra vers vous le plus vite possible",
                createdAt: new Date().getTime(),
                user: {
                  _id: 2,
                  name: 'Admin'
                },

                
              },

            
            ]
        }
        this.sujet = "",
        this.description = ""
    }

    async componentDidMount(){
      this.setState({isLoading : true})
      await this.getAndConstructMessage()
      this.setState({isLoading : false})
    }

    getAndConstructMessage = async() =>{
      
      await Axios.get(`http://adequa.club:3000/api-backoffice/user/signal/mysignal?idUser=${this.props.user.user.idUser}`)
          .then(async res =>{
            
           let msg = []
            res.data.forEach(el=>{
              let data ={
                _id: Math.random(),
                text: el.descriSignal,
                createdAt: new Date(el.createdAt).getTime(),
                user: {
                  _id: 1,
                  name: el.user.nomUser
                }
              }

              msg.push(data)
            })
           
           this.state.messages.forEach(el=>{
             msg.push(el)
           })
            this.setState({messages : msg})
          })
          .catch(err=>{
            console.log(err)
          })
    }

    sendSignal = async (message) =>{
      console.log(message)
       
        let data = {
            sujetSignal : "Demande",
            descriSignal : message.text,
            idUser : this.props.user.user.idUser
        }
        await Axios.post(`${Bdd.api_url}/signal`,data)
            .then(async res=>{
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
                this.setState({isLoading : false})
            })
        
    }

     handleSend = (newMessage = []) =>{
      
      this.setState({
        messages: GiftedChat.append(this.state.messages, newMessage)
      })

      this.sendSignal(newMessage[0])
    
    }
    render() {
        return (
            <View style={styles.container}>
        {this.state.isLoading && <View style={styles.loading_container}>
         <Loader loading={this.state.isLoading} />
        </View>}

        <View style={[Platform.OS === 'ios' ? styles.under_ios : styles.under, {marginBottom : 20}]}>
                    <HeaderMenu navigation={this.props.navigation} signaler={1} />
        </View>

       
        <GiftedChat
      
        placeholder={"Tapez vos remarques ici..."}
      messages={this.state.messages}
      onSend={newMessage => this.handleSend(newMessage)}
      user={{ _id: 1 }}
     
      />
        
        

      

       
        {/* <View style={styles.textDescriContainer}>
            <Text style={styles.textDescri}>Si vous avez quelques choses à signaler auprès de l'admin BEST4SANTE, 
                laissez votre  message ici. Vous allez être notifié dès qu'un admin reçoit votre demande.
            </Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 20}} >

          <TextInput
            style={{ marginBottom: 20, backgroundColor : "white" }}
            onChangeText={(text) => this.sujet = text}
            label="SUJET"

          />
          <TextInput
            style={{ marginBottom: 20, backgroundColor : "white" }}
            onChangeText={(text) => this.description = text}
            label="Description"
            multiline
          />
         

        </View>


        <View style={{marginVertical : hp("2%"),marginHorizontal : wp("2%")}}>
          <TouchableOpacity onPress={()=> this.sendSignal()} style={{padding : 20, backgroundColor : "#00C1B4"}}>
            <Text style={{textAlign : "center",color :"white"}}>Valider</Text>
          </TouchableOpacity>
        </View>
 */}
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
     
       backgroundColor: 'white'
    },
    under: {
      flex: 1,
      maxHeight: hp('10%'),
    },
    header: {
  
      textAlign: 'center'
    },
    center: {
      textAlign: 'center',
      color: "white",
      fontSize: 21,
      marginTop: hp('10%')
    },
    red: {
      color: 'red'
    },
    body: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      width: wp("70%"),
      paddingLeft: 15,
      backgroundColor: 'white',
      borderRadius: 1,
      marginBottom: hp('2%')
    },
    footer: {
  
      textAlign: 'center',
      textDecorationLine: 'underline',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
      color: "white"
    },
    normalText: {
      color: "white"
    },
    title2: {
      color: "white",
      marginBottom: hp('2%'),
      marginTop: hp('5%'),
      textAlign: "center"
    },
    buttonStyle: {
  
      width: wp("70%"),
  
      backgroundColor: "#00C1B4",
      paddingTop: hp('2%'),
      paddingBottom: hp('2%'),
      borderRadius: 10,
      marginBottom: hp("2%"),
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#029B95',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    buttonText: {
      color: 'white',
      textAlign: "center",
      fontSize: 16
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

    textDescriContainer : {
        marginTop : hp("5%")
    },
    textDescri : {
        textAlign : "center",
        fontSize : 14
    }

  });
  


const mapStateToProps = (store) => {
    return {
        user: store.user,
    }
}
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Signal)
