import React, { Component } from 'react'
import { Text, View,Stylesheet,Modal } from 'react-native'
import { connect } from 'react-redux'
import { _emitEvent, onSamaritainListChange, _setSocket, SocketService } from '../../services/socket'
import { getCurrentLocation, calculateDistanceBetween } from '../../services/location'
import Axios from 'axios'
import { TouchableOpacity, TouchableHighlight, TextInput } from 'react-native-gesture-handler'
import Bdd from '../../API/Bdd'
import { onlineUser } from '../../Action'
import { ListItem, Avatar,Accessory } from 'react-native-elements'
import { TouchableRipple } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Loader from '../../component/loader'
class UserConnected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userConnected: [],
            samaritainRequest : [],
            isLoading: false,
            isVisible : false,
        }
        this.description = ""
        this.mylocation = ""
        
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        await this.getUserConnected()
         await this.getRecentRequest()
         this.receiveSamaritainRequest()
        this.setState({ isLoading: false })

        let location = await getCurrentLocation()
         this.mylocation =  location.coords.latitude+","+location.coords.longitude

        //  let travel = await calculateDistanceBetween("-21.3464502,43.6679968","-23.3464502,43.6679968")
        //  console.log(travel)
       
    }

    getRecentRequest  =async() =>{
        await Axios.get(`${Bdd.api_url}/samaritain/list`)
            .then(async res=>{
                
                this.setState({samaritainRequest : res.data.data})
            })
    }


    getUserConnected = async () => {
  
        let socketSrv = new SocketService("samaritain")
            socketSrv.onSamaritainListChange(async (userList) => {
               
                this.props.onlineUser(userList)
            })
      
    }

    receiveSamaritainRequest = () =>{
        let socketSrv = new SocketService("samaritain")
        socketSrv.onNewSamaritainRequest(async(reqList) =>{
            console.log("vaovao",reqList)
            let a= this.state.samaritainRequest
            a.unshift(reqList.data)
            
            this.setState({samaritainRequest : a})
        })
    }

    goToRespond = (i) =>{
        this.props.navigation.navigate("UserResponded",{idSamaritain : i})
    }

 

    renderSamaritainRequest =  (id,i, name, details,travel,image) => (
        <TouchableOpacity key={id} onPress={()=>this.goToRespond(i)} >
                    <ListItem
                       leftElement={<Avatar source={{uri : image}} rounded size="medium" />}
                        rightElement={<Text>{travel}</Text>}
                        title={name}
                        subtitle={details}
                        titleStyle={{ fontWeight: '600' }}
                    />
        </TouchableOpacity>
    )

    renderOnlineUser = (i,name,image) => (
        
        <TouchableOpacity style={styles.userActiveContainer} key={i} >
            <Avatar source={{uril : image}} rounded size="medium" title="na"  />
            <Text >{name}</Text>
        </TouchableOpacity>
        
    )

    sendRequest = async () => {
        
       
        let idUser = this.props.user.user.idUser
        let data = {
            description  : this.description,
             geoloc : this.mylocation
        }
        await Axios.post(`${Bdd.api_url}/samaritain/request?idUser=${idUser}`,data)
            .then(res=>{
                console.log(res.data)
            })
        
        this.setState({isVisible : false})
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor : "white" }}>
                {/* {this.state.isLoading === true && <Text>
                    Veuillez patientez...
                </Text>} */}

                <Loader loading={this.state.isLoading} />
                
                <View>
               
                <ScrollView style={{marginTop : 50}} horizontal={true}>
                {this.props.user.online_users && this.props.user.online_users.map((user, i) => {
                    return this.renderOnlineUser(i,user.nomUser, user.imageUser)
                })}
                </ScrollView>

                </View>

                <View style={{maxHeight : hp("70%")}}>
                
                    
                <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Faîtes appel aux "Bons Samaritains"</Text>
            <Text style={styles.modalDesc}>Les utilisateurs "Bons Samaritains" près de chez vous seront alertés en temps réel
                et prendra en compte votre demande
            </Text>
            <TextInput style={styles.modalInput} placeholder="Une petite description de votre cas" multiline onChangeText={(text) => this.description = text} />
            <Text style={styles.buttonContainer} onPress={()=> this.sendRequest()}>Lancer ma demande</Text>
            <Text style={[styles.buttonContainer,{backgroundColor : "white",color : "red"}]} onPress={()=> this.setState({isVisible : false})}>Pas maintenant</Text>

          </View>
        </View>
      </Modal>      
      
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Retrouver ici les demandes de secours par les utilisateurs. SOYEZ LE 1ER A INTERVENIR
                            </Text>
                    </View>

                    <ScrollView>
                    {this.state.samaritainRequest && this.state.samaritainRequest.map((user, i) => {
                        const name = user.userRequested.nomUser+" "+user.userRequested.prenomUser
                        const nom = user.userRequested.idUser === this.props.user.user.idUser ? "Vous" : name 
                        
                    //    const travel  = calculateDistanceBetween(user.g)
                    return this.renderSamaritainRequest(i,user.idSamaritain,nom,user.description,"",user.userRequested.imageUser)
                })}
                    </ScrollView>
                </View>
                
                <View style={styles.launch} >

                <TouchableOpacity style={styles.buttonContainer2} onPress={() =>this.setState({isVisible : true})}>
                    <Text style={{textAlign : "center",color : "white",fontWeight :"bold"}} >Demander de l'aide</Text>
                </TouchableOpacity>
                </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userActiveContainer : {
        alignItems : "center",
        paddingVertical : hp("1%"),
        paddingHorizontal : wp("1%"),
        marginHorizontal : wp("1%")
    },
    launch : {
        padding : 10,
       
       
    },
    titleContainer : {
        padding : hp("2%")
    },
    title : {
        fontSize : 14,
        fontWeight : "700"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        width : wp("90%"),
        height : hp("60%"),
        padding: 35,
        alignItems: "center",
        justifyContent : "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 3.84,
        elevation: 100
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
          fontSize : 18,
          fontWeight : "bold",
        
        textAlign: "center"
      },
      modalInput : {
          borderBottomWidth : 2,
          borderBottomColor : "#00C1B4",
          marginBottom : hp("2%"),
          
          
      },
      modalDesc : {
          fontSize : 12,
          fontStyle : "italic",
          marginBottom: 15,
          textAlign : "center"
      },
      buttonContainer: {
      
        textAlign : "center",
        padding : 10,

        color : "white",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#008ac8",
       
      },
      buttonContainer2: {
      
        textAlign : "center",
        padding : 10,

        color : "white",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#008ac8",
       
      },
})

const mapStateToProps = (store) => {
    return {
        online_users: store.online_users,
        user: store.user,
        contact: store.contact,
        second: store.second
    }
}

const mapDispatchToProps = {
    onlineUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConnected)
