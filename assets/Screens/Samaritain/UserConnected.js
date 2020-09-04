import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { _emitEvent, onSamaritainListChange, _setSocket, SocketService } from '../../services/socket'
import { getCurrentLocation, calculateDistanceBetween } from '../../services/location'
import Axios from 'axios'
class UserConnected extends Component {

    constructor (props){
        super(props)
        this.state = {
            userConnected : [],
            userConnectedProx : [],
            isLoading : false
        }
    }

     async componentDidMount(){
         this.setState({isLoading : true})
       await  this.getUserConnected()
        this.setState({isLoading : false})

        await this._filterUserProximite()
       
     }

     _filterUserProximite = async() =>{
        
         let users =  this.state.userConnected.filter( el =>{
            //  const destString = `${el.coords.lat},${el.coords.log}`
            //  let dist = await calculateDistanceBetween(myPositionString, destString)
            // const value = dist.distanceValue

            
            return el.idUser >0

         })



         
     }
    

    getUserConnected =   async () =>{
        console.log("eto")
        const myLocation = await getCurrentLocation()

        const myPositionString = `${myLocation.coords.latitude},${myLocation.coords.longitude}`


       let socketSrv = new SocketService("samaritain")
       let prox= []
          socketSrv.onSamaritainListChange((userList)=>{
            let usrs = userList.filter(async el=>{
                 const destString = `${el.coords.lat},${el.coords.log}`
             let dist = await calculateDistanceBetween(myPositionString, destString)
            const value = dist.distanceValue

                if (value!=undefined && value <1500 ) {
                    Object.assign(el, {distance : value})
                    
                    prox.push(el)
                }
            })
           
            this.setState({userConnectedProx : prox})
            this.setState({userConnected : userList})
        })

        // let dist = await calculateDistanceBetween(myPositionString, "-23.3568925,43.664497")

        // console.log(dist)
        // lat : 37.4219463
        //log : -122.0841284
       

    }

    

    render() {
       
        return (
            <View style={{flex : 1, justifyContent : "center",alignItems : "center"}}>
                {this.state.isLoading === true && <Text>
                    Veuillez patientez...
                </Text>}

                {this.state.userConnected.length >0 && this.state.userConnected.map((user,i)=>{
                   return  <Text key={i}>{user.nomUser} {user.coords.lat},{user.coords.log}</Text>
                })}
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
