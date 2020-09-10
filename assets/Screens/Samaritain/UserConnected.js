import React, { Component } from 'react'
import { Text, View,Stylesheet } from 'react-native'
import { connect } from 'react-redux'
import { _emitEvent, onSamaritainListChange, _setSocket, SocketService } from '../../services/socket'
import { getCurrentLocation, calculateDistanceBetween } from '../../services/location'
import Axios from 'axios'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler'
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

class UserConnected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userConnected: [],
            samaritainRequest : [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        await this.getUserConnected()
        // await this.getRecentRequest()
         this.receiveSamaritainRequest()
        this.setState({ isLoading: false })

        

    }

    getRecentRequest  =async() =>{
        await Axios.get(`${Bdd.api_url}/samaritain`)
            .then(async res=>{
                console.log(res.data)
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
            let a= this.props.user.online_users
            a.push(reqList)
            this.props.onlineUser(a)
        })
    }

    sendNotif = () => {
        Axios.post(`${Bdd.api_url}/samaritain`)
            .then(console.log("ok"))
    }

    renderSamaritainRequest = (i, name, details,travel,image) => (
        <TouchableOpacity key={i}>
                    <ListItem
                       leftElement={<Avatar source={{uri : image}} rounded size="medium" />}
                        rightElement={<Text>{travel}</Text>}
                        title={name}
                        subtitle={details}
                        titleStyle={{ fontWeight: '600' }}
                    />
        </TouchableOpacity>
    )

    renderOnlineUser = (i,name) => (
        
        <TouchableOpacity style={styles.userActiveContainer} key={i}>
            <Avatar rounded size="medium" title="na"  />
            <Text>{name}</Text>
        </TouchableOpacity>
        
    )


    render() {

        return (
            <View style={{ flex: 1, backgroundColor : "white" }}>
                {this.state.isLoading === true && <Text>
                    Veuillez patientez...
                </Text>}

                <ScrollView style={{marginTop : 50}} horizontal={true}>
                {this.props.user.online_users && this.props.user.online_users.map((user, i) => {
                    return this.renderOnlineUser(i,user.nomUser)
                })}
                </ScrollView>
                

                {this.props.user.online_users && this.props.user.online_users.map((user, i) => {
                    return this.renderSamaritainRequest(i,user.nomUser,"Je suis sempotre","20mn",user.imageUser)
                })}

                <TouchableOpacity onPress={() => this.sendNotif()}>
                    <Text>lanch</Text>
                </TouchableOpacity>
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
    }
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
