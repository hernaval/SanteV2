import React, { Component } from 'react'
import { Text, View,Stylesheet,Image } from 'react-native'
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
                
            })
    }
    
    render() {

        return (
            <View style={{ flex: 1, backgroundColor : "white",justifyContent :"center" }}>
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Sauvez une vie</Text>
                 <Text style={styles.title}>Devenez le premier à sauver la personne</Text>
                 <Text style={styles.desc}>Si vous accepter de venir au secours, vous pouvez voir son emplacement dans la carte</Text>


                </View>
                <View>
                <Image  style={{width : wp("100%")}} source={require("../../images/secours.jpg")} />

                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.asignUserResponder()}}>
                   
                    <Text style={styles.saveText}>ACCEPTER DE VENIR AU SECOURS</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
      
        
        padding : 10,

        color : "white",
        width : wp("70%"),
        borderRadius: 10,
        backgroundColor: "#008ac8",
      alignSelf  : "center"
      },
      titleContainer : {
          margin : hp("2%")
      },
      title : {
        textAlign :"left",
        fontWeight : "bold",
        fontSize : 16
      },
      desc: {
          fontSize : 12,
          fontStyle : "italic"
      },
    saveText : {
        color : "white",
        textAlign :"center"
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
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserResponded)
