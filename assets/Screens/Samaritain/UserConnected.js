import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { _emitEvent, onSamaritainListChange, _setSocket } from '../../services/socket'
import { getCurrentLocation } from '../../services/location'
class UserConnected extends Component {

    async componentDidMount(){
        await this.getUserConnected()
    }

    getUserConnected = async () =>{
        let myLocation = await getCurrentLocation()

        _setSocket("samaritain")
        
        onSamaritainListChange((userList)=>{
            console.log("eto ny liste rehetra",userList)
        })
    }


    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      user: store.user,
      contact: store.contact,
      second: store.second
    }
  }
  
  const mapDispatchToProps = {
    
  }

export default connect(mapStateToProps,mapDispatchToProps)(UserConnected)
