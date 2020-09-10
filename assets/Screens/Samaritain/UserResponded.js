import React, { Component } from 'react'
import { Text, View,Stylesheet } from 'react-native'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Axios from 'axios'
import Bdd from '../../API/Bdd'

class UserResponded extends Component {

    constructor(props) {
        super(props)
        this.idSamaritain = this.props.navigation.state.params.idSamaritain
       
    }
    asignUserResponder = async() =>{
        const id = this.idSamaritain
        const responder = this.props.user.user.idUser
        await Axios.put(`${Bdd.api_url}/samaritain/${id}/respond?idUser=${responder}`)
            .then(res=>{
                console.log(res.data)
            })
    }
    
    render() {

        return (
            <View style={{ flex: 1, backgroundColor : "white",justifyContent :"center",alignItems : "center" }}>
                 <Text>Sauvez une vie</Text>
                <TouchableOpacity onPress={()=>{this.asignUserResponder()}}>
                   
                    <Text>Soyer le premier à répondre</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
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
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserResponded)
