import React from 'react'
import {Animated, PanResponder, View, Text ,Image, Linking, StyleSheet, TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
  import {withNavigation} from 'react-navigation'
import { faAngleUp, faAngleDown, faPhoneSquareAlt, faDirections,  faStar } from '@fortawesome/free-solid-svg-icons'

  import { connect } from 'react-redux'
import {addFavorite, deleteFavorite} from '../Action'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from "axios"
import Bdd from "../API/Bdd"
const CARD_INITIAL_POSITION_Y = hp('78%')
const CARD_INITIAL_POSITION_X = wp('5%')

const CARD_OPEN_POSITION = hp('35%')


class DetailCard extends React.Component{
    constructor(props) {
        super(props)
        this.position = new Animated.ValueXY
        this.state = {
            panResponder : undefined,
            isOpen : false,
            isFavorite : false,
            favoriteId : false
        }
    }

    componentDidMount(){
         this._onFocusListener = this.props.navigation.addListener(
            "willFocus",
            payload =>{
                this.setState({isCardOpen : false})
                this.resetOpenPosition()
            }
        ) 

        this.position.setValue({
            x : CARD_INITIAL_POSITION_X,
            y : CARD_INITIAL_POSITION_Y
        })
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder : () => true
        })

        this.setState({panResponder : panResponder}, () => {})

        
    }

    resetOpenPosition = () =>{
        Animated.spring(this.position, {
            toValue : {
                x : CARD_INITIAL_POSITION_X,
                y : CARD_INITIAL_POSITION_Y
            }
        }).start(this.setState({
            isOpen : false
        }))
    }

    setOpenPosition = () => {
        Animated.spring(this.position, {
			toValue: {x: CARD_INITIAL_POSITION_X, y: CARD_OPEN_POSITION}
        }).start(this.setState({isOpen: true}));
    }

    getCardStyle() {
		return {
			width: wp('90%'),
			height: hp("110%"),
			zIndex: 90,
            backgroundColor: "#01dcd5",
            borderColor: "white",
            borderWidth: 4,
			elevation: 1,
			shadowColor: "black",
			shadowOpacity: 0.2,
			shadowOffset: {height: 2, width: 2},
			position: "absolute",
			left: CARD_INITIAL_POSITION_X,
			padding: wp("2%"),
			...this.position.getLayout()
		}
    }

    createRate(rate){
        let num = Math.round(parseFloat(rate))

        let stars = [] 
        
        for(let i = 0; i < 5; i++) {
            if (i < num ) {
                stars.push('white');
            } else {
                stars.push('blue');
            }
        }

        return stars.map((star, index)=>{
            
            if(star == "white") {
                return (<Image
                    key={index}
                    style={{width: wp('5%'), height: wp('5%')}}
                    source={require('../images/Icone_Star_full.png')}
                />)
            } else {
                return (<Image
                    key={index}
                    style={{width: wp('5%'), height: wp('5%')}}
                    source={require('../images/Icone_Star_empty.png')}
                />)
            }
        })

    }

    createCalendar = (dates) =>{
        let now = new Date();
        let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        //.log('lesdates',dates);
        let calendars = [
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []
                        ]

        dates.map((date, index)=>{
           if(   date.close.day !== undefined) {
                calendars[date.close.day].push({close: date.close});
                calendars[date.close.day].push({open: date.open});
           }
           
        });


        return (
            <View
                style={{flexDirection: "row", marginLeft: wp('2%'), marginRight: wp('2%'), marginTop: hp('3%')}}
            >
                
                <View
                    style={{flex:1}}
                >
                    <Text style={styles.title3}>Lundi :  
                        {calendars[1].length === 0 && 'Fermé'}
                         {calendars[1].length === 2 && calendars[1][1].open.time.substring(0,2)+"h"+calendars[1][1].open.time.substring(2)+' - '+calendars[1][0].close.time.substring(0,2)+"h"+calendars[1][0].close.time.substring(2)}
                        {calendars[1].length === 4 && 'Fermé'}
                    </Text>
                    <Text style={styles.title3}>Mardi :  
                        {calendars[2].length === 0 && 'Fermé'}
                         {calendars[2].length === 2 && calendars[2][1].open.time.substring(0,2)+"h"+calendars[2][1].open.time.substring(2)+' - '+calendars[2][0].close.time.substring(0,2)+"h"+calendars[2][0].close.time.substring(2)}
                        {calendars[2].length === 4 && 'Fermé'}
                    </Text>
                    <Text style={styles.title3}>Mercredi :  
                        {calendars[3].length === 0 && 'Fermé'}
                         {calendars[3].length === 2 && calendars[3][1].open.time.substring(0,2)+"h"+calendars[3][1].open.time.substring(2)+' - '+calendars[3][0].close.time.substring(0,2)+"h"+calendars[3][0].close.time.substring(2)}
                        {calendars[3].length === 4 && 'Fermé'}
                    </Text>
                </View>

                <View
                    style={{flex:1}}
                >
                    <Text style={styles.title3}>Jeudi :  
                        {calendars[4].length === 0 && 'Fermé'}
                         {calendars[4].length === 2 && calendars[4][1].open.time.substring(0,2)+"h"+calendars[4][1].open.time.substring(2)+' - '+calendars[4][0].close.time.substring(0,2)+"h"+calendars[4][0].close.time.substring(2)}
                        {calendars[4].length === 4 && 'Fermé'}
                    </Text>
                    <Text style={styles.title3}>Vendredi :  
                        {calendars[5].length === 0 && 'Fermé'}
                         {calendars[5].length === 2 && calendars[5][1].open.time.substring(0,2)+"h"+calendars[5][1].open.time.substring(2)+' - '+calendars[5][0].close.time.substring(0,2)+"h"+calendars[5][0].close.time.substring(2)}
                        {calendars[5].length === 4 && 'Fermé'}
                    </Text>
                    <Text style={styles.title3}>Samedi :  
                        {calendars[6].length === 0 && 'Fermé'}
                         {calendars[6].length === 2 && calendars[6][1].open.time.substring(0,2)+"h"+calendars[6][1].open.time.substring(2)+' - '+calendars[6][0].close.time.substring(0,2)+"h"+calendars[6][0].close.time.substring(2)}
                        {calendars[6].length === 4 && 'Fermé'}
                    </Text>
                </View>

            </View>
        )

    }

    callPerson = (phone) =>{
        if(Platform.OS === 'ios') {
            Linking.openURL('tel://'+phone)
        }
        else if(Platform.OS === 'android') {
            Linking.openURL('tel:'+phone)
        }
    }

    isFavoriteToggle = () =>{
        //.log(this.props.isFavo)
        if(this.props.isFavo === false) {
            return (
                <TouchableOpacity
                    style={{flex:1, textAlign: 'center', zIndex: 2, alignItems: "center"}}
                    onPress={(e) =>{
                        this.onClickAddFavorite()
                    }}
                >
                        <Image
                            style={{width: wp('25%'), height: wp('25%')}}
                            source={require('../images/favoris.png')}     
                        />
                        <Text style={styles.title2}>Ajouter aux favoris</Text>

                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity
                    style={{flex:1, textAlign: 'center', zIndex: 2, alignItems: "center"}}
                    onPress={(e)=>{
                        this.onClickDeleteFavorite();
                    }}
                >

                <Image
                    style={{width: wp('25%'), height: wp('25%')}}
                    source={require('../images/Icone_Star_full.png')}
                /> 
                <Text style={styles.title2}>Retirer</Text>

                </TouchableOpacity>
            )
        }
    }
    
    onClickAddFavorite =async  () =>{
        let favorite = {
            geoIdFavoris : this.props.detail.place_id,
            idUser : this.props.user.user.idUser
        }

        console.log(favorite)

        if(this.props.isFavo === false) {
           
            await  axios.post(`${Bdd.api_url}/favoris`,favorite)
                .then(async _=>{
                    this.props.onChangeFavo()
                })  
        }
    }

    onClickDeleteFavorite() {
        //.log("fav id "+this.props.favoriteId)
         if(this.props.favoriteId !== null) {
             let favorite_obj = {
                 g_id: this.props.favoriteId,
                 user_id: this.props.user.user.idUser
             }
 
             //.log('props favo dans delete',this.props.isFavo)
             //.log('favoriteId', favorite_obj)
             if (this.props.isFavo === true) {
                 this.props.deleteFavorite(favorite_obj);
                 this.props.onChangeFavo();
             }
        }
      
    }

    render(){

        //.log("render details")
         return this.state.panResponder ? 
            <Animated.View
                {...this.state.panResponder.panHandlers}
                style={this.getCardStyle()}
            >
                <View style={styles.buttons}>
                    {this.state.isOpen===false && 
                        <TouchableOpacity
                            style={{flex : 3, marginTop : hp("1%"),width : wp("14%"),height : hp("7%"),marginBottom : hp("1%"),marginLeft: wp('35%'), marginRight: wp('30%'), zIndex: 2}}
                            onPress={(e) => {this.setOpenPosition()}}
                        >
                            <FontAwesomeIcon icon={faAngleUp} size={45} color ="white" />

                        </TouchableOpacity>
                    }
                    {this.state.isOpen === true && 
                        <TouchableOpacity 
                            style={{ flex:3, marginTop: hp("1%"), width: wp("14%"), marginBottom: hp('1%'), marginLeft: wp('35%'), marginRight: wp('30%'), zIndex: 2 }}
                            onPress={(e) =>{this.resetOpenPosition()}}
                        >
                            <FontAwesomeIcon size={45}  icon={ faAngleDown } color="white"/>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                            onPress={(e)=>{this.props.onClickClose()}}
                            style={{marginTop: hp('1%'), marginRight: wp('2%'), backgroundColor: "white", height: hp("3%"),width: hp('3%'), borderRadius: 400/2, display: "flex", justifyContent: "center", alignItems: 'center', color: "#008AC8" }}
                        
                    >
                        <Text style={{fontWeight : "bold", color : "#008AC8"}}>X</Text>
                    </TouchableOpacity>
                   
                </View>
                <Text style={styles.title}>{this.props.detail.name}</Text>
                <Text style={styles.title2}>{this.props.detail.formatted_address}</Text>
                
                <View>
                    {this.props.detail.opening_hours && this.createCalendar(this.props.detail.opening_hours.periods)}
                </View>

                <View style={{flexDirection : "row", justifyContent : "center",marginTop : hp("4%")}}>
                    <Text style={{color : "white"}}>Note :</Text>
                    {this.createRate(this.props.detail.rating)}
                </View>

                <View style={styles.direction}>

                    <TouchableOpacity
                        style={{flex : 1, textAlign : "center",zIndex : 2 ,alignItems :"center"}}
                        onPress={(e) =>this.callPerson(this.props.detail.international_phone_number)}
                        >
                        <Image 
                            style ={{width : wp("25%"), height : wp("25%")}}
                            source={require("../images/apeller_icon.png")}
                        />
                        <Text style={styles.title2}>Appeler</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{flex : 1, textAlign : "center", zIndex : 2,alignItems : "center"}}
                        onPress = {(e) => {
                            this.props.onClickDirection()
                            this.resetOpenPosition()
                        }}
                    >
                        <Image 
                             style={{width: wp('25%'), height: wp('25%')}}
                             source={require('../images/itineraire_full.png')}
                            
                        />
                        <Text style={styles.title2}>Itinéraire GPS</Text>
                    </TouchableOpacity>
                   {this.isFavoriteToggle()}
                </View>

            </Animated.View>
            :
            <View /> 
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: hp('1%'),
        color:"white"
    },
    title2: {
        textAlign: 'center',
        color:"white",
        marginBottom: hp("2%")
    },
    title3: {
        color:"white"
    },
    buttons: {
        flexDirection: 'row'
    },
    direction: {
        flexDirection: 'row',
        width: wp('85%'),
      
        justifyContent: 'space-around'
    }
})


const mapStateToProps = (store) => {
    return {
        favorite: store.favorite,
        user: store.user
    }
  }

const mapDispatchToProps = {
    addFavorite,
    deleteFavorite
}

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(DetailCard))