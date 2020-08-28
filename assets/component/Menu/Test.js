import React,{Component} from 'react';
import { Animated, View, Text, PanResponder, ScrollView, Image, Linking, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import {withNavigation} from 'react-navigation'
import axios from 'axios'
import Header from './Menu/Header'
import Footer from './Menu/Footer'
import TopMenu from "./Menu/TopMenu"
import BottomMenu from "./Menu/BottomMenu"
import { deleteFavorite} from '../Action'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleUp, faAngleDown, faPhoneSquareAlt, faDirections,  faStar } from '@fortawesome/free-solid-svg-icons'

const API_KEY = 'AIzaSyBNegn2v9IlLcgolkdiHwGavcGy7IS19bY';

 class Favorite extends Component {

    constructor(props) {
		super(props);
		this.position = new Animated.ValueXY();
		this.state ={
            favorites: []
		}
    }

    componentDidMount() {

      
         let favorites = []
        if(this.props.favorite.favorite !== null) {
            this.props.favorite.favorite.data.favorites.map((favorite)=>{
                axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id='+favorite.g_id+'&key='+API_KEY)
                .then((res)=>{
                   // console.log('es',res)
                    favorites.push(res.data.result)
                    let result = res.data.result;

                    // misy bug result.isOpen = false;
                    this.setState({favorites: [...this.state.favorites, result]},()=>{
                        
                        //console.log('state favorite',this.state.favorites);
                    });
                })
            })
        }  

    }

    goToFavoriteDetail(product_id) {
        this.props.navigation.navigate('Detail', {
            itemId: product_id
        });
    }
    
    goToHome() {
        this.props.navigation.push("Home")
      }


    callPerson(phone){
        if(Platform.OS === 'ios') {
            Linking.openURL('tel://'+phone)
        }
        else if(Platform.OS === 'android') {
            Linking.openURL('tel:'+phone)
        }
        
    }

    onClickDelete(place_id, index) {

      
         let favorite_obj = {
            g_id: place_id,
            user_id: this.props.user.user.data.user[0].id
        }

        this.props.deleteFavorite(favorite_obj);
        let favorites = this.state.favorites.filter(favorite => favorite.place_id !== place_id );
        this.setState({favorites: favorites}); 
       // this.setState({favorites: this.state.favorites.splice(index, 1)})

    }



    listDetail(favorite){

        return (
            <View>
                <View>
                    <TouchableOpacity
                           
                            onPress={(e)=>{
                                this.callPerson(favorite.formatted_phone_number);
                            }}
                        >
                            <Image
                                style={{width: wp('25%'), height: wp('25%')}}
                                source={require('../images/apeller_icon.png')}
                            /> 
                            <Text style={styles.title2}>Appeler</Text>
                    </TouchableOpacity>
                </View>
                
              
            </View>
        )
    }

    createCalendar(dates) {
        let now = new Date();
        let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        console.log('lesdates',dates);
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
            calendars[date.close.day].push({close: date.close});
            calendars[date.close.day].push({open: date.open});
        });
      //  console.log('calendar', calendars )

        return (
            <View
                style={{flexDirection: "row", marginLeft: wp('2%'), marginRight: wp('2%')}}
            >
                
                <View
                    style={{flex:1}}
                >
                    <Text ><Text style={styles.title3}>Lundi : </Text> 
                        <Text style={styles.title4}> {calendars[1].length === 0 && 'Fermé'}
                         {calendars[1].length === 2 && calendars[1][1].open.time.substring(0,2)+"h"+calendars[1][1].open.time.substring(2)+' - '+calendars[1][0].close.time.substring(0,2)+"h"+calendars[1][0].close.time.substring(2)}
                        {calendars[1].length === 4 && 'Fermé'}</Text>
                    </Text>
                    <Text><Text style={styles.title3}>Mardi : </Text> 
                        <Text style={styles.title4}>{calendars[2].length === 0 && 'Fermé'}
                         {calendars[2].length === 2 && calendars[2][1].open.time.substring(0,2)+"h"+calendars[2][1].open.time.substring(2)+' - '+calendars[2][0].close.time.substring(0,2)+"h"+calendars[2][0].close.time.substring(2)}
                        {calendars[2].length === 4 && 'Fermé'}</Text>
                    </Text>
                    <Text><Text style={styles.title3}>Mercredi : </Text> 
                        <Text style={styles.title4}>{calendars[3].length === 0 && 'Fermé'}
                         {calendars[3].length === 2 && calendars[3][1].open.time.substring(0,2)+"h"+calendars[3][1].open.time.substring(2)+' - '+calendars[3][0].close.time.substring(0,2)+"h"+calendars[3][0].close.time.substring(2)}
                        {calendars[3].length === 4 && 'Fermé'}</Text>
                    </Text>
                </View>

                <View
                    style={{flex:1}}
                >
                    <Text><Text style={styles.title3}>Jeudi : </Text> 
                        <Text style={styles.title4}>{calendars[4].length === 0 && 'Fermé'}
                         {calendars[4].length === 2 && calendars[4][1].open.time.substring(0,2)+"h"+calendars[4][1].open.time.substring(2)+' - '+calendars[4][0].close.time.substring(0,2)+"h"+calendars[4][0].close.time.substring(2)}
                        {calendars[4].length === 4 && 'Fermé'}</Text>
                    </Text>
                    <Text><Text style={styles.title3}>Vendredi : </Text>  
                        <Text style={styles.title4}>{calendars[5].length === 0 && 'Fermé'}
                         {calendars[5].length === 2 && calendars[5][1].open.time.substring(0,2)+"h"+calendars[5][1].open.time.substring(2)+' - '+calendars[5][0].close.time.substring(0,2)+"h"+calendars[5][0].close.time.substring(2)}
                        {calendars[5].length === 4 && 'Fermé'}</Text>
                    </Text>
                    <Text><Text style={styles.title3}>Samedi : </Text>  
                        <Text style={styles.title4}>{calendars[6].length === 0 && 'Fermé'}
                         {calendars[6].length === 2 && calendars[6][1].open.time.substring(0,2)+"h"+calendars[6][1].open.time.substring(2)+' - '+calendars[6][0].close.time.substring(0,2)+"h"+calendars[6][0].close.time.substring(2)}
                        {calendars[6].length === 4 && 'Fermé'}</Text>
                    </Text>
                </View>

            </View>
        )


    }
    createRate(rate) {
        let num = Math.round(parseFloat(rate));
        let stars = []

        for(let i = 0; i < 5; i++) {
            if (i < num ) {
                stars.push('white');
            } else {
                stars.push('blue');
            }
        }
      //  console.log('starsss', stars);
        return stars.map((star, index)=>{
            if(star == "white") {
                return <FontAwesomeIcon key={index} icon={ faStar } color={ 'white' } />
            } 
        })

    }

    onClickOpen(index) {
        let favorites = this.state.favorites


        favorites[index].opening_hours.open_now = !favorites[index].opening_hours.open_now
        
        this.setState({favorites: favorites}, ()=>{console.log('laaaa',this.state.favorites)})
    }

    
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>}
                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                <TopMenu navigation ={this.props.navigation} />
            </View>
                <View style={styles.main}>
                <Image
                    style={{ width: wp('15%'), height: wp('15%'), marginTop: hp('1%')}}
                    source={require('../images/favoris.png')}
                />
                <Text style={styles.title1}>FAVORIS</Text>
                    <ScrollView > 
                        <View style={styles.main2}>
                            
                            {
                                this.state.favorites.length !== 0 && this.state.favorites.map((favorite, index)=>{
                                  
                                    return (
                                        <View key={favorite.id} style={styles.listItem}>
                                            
                                            <View style={styles.headItem}>
                                                <Text style={{position: 'relative', bottom: hp("3%"), textAlign: "center", width: wp('70%'), fontSize:18, color: "#00C1B4"}}>Docteur {favorite.name}</Text>
                                                
                                            </View>
                                            <View>
                                                <Text style={styles.textDesc}>{favorite.address_components[0].long_name+' '+favorite.address_components[1].long_name}</Text>
                                                {favorite.address_components[6] &&<Text style={styles.textDesc}>{favorite.address_components[6].long_name+' '+favorite.address_components[2].long_name}</Text>}
                                            </View>
                                            <View >
                                                {(favorite.opening_hours !== undefined && favorite.opening_hours.open_now === false ) && <FontAwesomeIcon 
                                                    icon={ faAngleDown }
                                                    size={45} 
                                                    color="#00C1B4"
                                                    onPress={(e)=>{
                                                        this.onClickOpen(index);
                                                    }}
                                                />}

                                                {(favorite.opening_hours !== undefined && favorite.opening_hours.open_now ===true) && <FontAwesomeIcon 
                                                    icon={ faAngleUp }
                                                    size={45} 
                                                    color="#00C1B4"
                                                    onPress={(e)=>{
                                                        this.onClickOpen(index);
                                                    }}
                                                />}
                                            </View>
                                            {(favorite.opening_hours !== undefined && favorite.opening_hours.open_now ===true) && <View style={styles.insideDetail}>
                                            {this.listDetail(favorite)}
                                            { (favorite.opening_hours !== undefined && favorite.opening_hours.open_now ===true) && this.createCalendar(favorite.opening_hours.periods)}
                                                <View style={{flexDirection: "row", marginTop: hp("2%")}}> 
                                                    <Text style={styles.title2}>Note: </Text>{this.createRate(favorite.rating)}
                                            </View>
                                            </View>}
                                            
                                            <TouchableOpacity
                                                    style={{position: "relative",   alignItem: "center", justifyContent: 'center', }}
                                                    onPress={(e)=>{this.onClickDelete(favorite.place_id, index)}}
                                                    title="supprimer"
                                                >
                                                    <Text style={{color:"red", textDecorationLine : "underline", textAlign: 'center', fontWeight: 'bold'}}>Supprimer</Text>
                                            </TouchableOpacity>
                                            
                                        </View>
                                    )
                                })
                            }
                            {
                                this.state.favorites.length === 0 && <View style={styles.mainEmpty}>
                                    <Text style={styles.emptyTitle1}>Vous n'avez toujours pas ajouté de favoris...</Text>
                                    <Text style={styles.emptyTitle2}>Ajoutez-en depuis la carte de recherche</Text>
                                    <Text
                                        style={styles.footer2}
                                        onPress={(e)=>{
                                            this.goToHome();
                                        }}
                                    >
                                        Retour sur la carte
                                    </Text>
                                </View>
                            }              
                        </View>
                    </ScrollView>

                </View>
                <BottomMenu navigation={this.props.navigation} />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
      backgroundColor: '#00C1B4'
    },
    main: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: wp('100%'),
        backgroundColor: '#00C1B4',
        alignItems: 'center'
    },
    title1: {
        color: 'white',
        fontSize: 36,
        marginBottom: hp('5%'),
        fontWeight: "bold"
    },
    title3: {
        color:"white",
        fontWeight: "bold",
        fontSize: 13
    },
    title4: {
        color:"white",
        opacity: 0.7,
        fontSize: 11
    },
    footer: {
        height: hp('10%')
    },
    listItem: {
        
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: "white",
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
        backgroundColor: "white",
        paddingTop: hp("3%"),
        paddingBottom: hp("3%")
    },
    listItem2: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem3: {
        flex: 1,
        marginTop: hp("3%"), 
        width: wp("60%"),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 10

    },
    headItem: {
        flexDirection: 'row',
        justifyContent: "center",
        width: wp('100%'),
        marginBottom: hp('2%')
    },
    buttonStyle: {
        marginTop: hp("3%"), 
        width: wp("60%"), 
        borderColor:'red',
        backgroundColor: "#449b7d",
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        borderRadius: 10,
        marginBottom: hp("5%")
      },
      buttonText: {
        color: 'white',
        textAlign: "center",
        fontSize: 20
      },
    loading_container: {
        position: 'absolute',
        zIndex:10,
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    under: {
        height: hp('10%'),
        zIndex: 99
      },
    main2: {
        width: wp("100%"),
        paddingBottom: hp("4%"),
        paddingTop: hp("4%")
    },
    textDesc: {
        color: "#008AC8",
        textAlign: "center",
        width: wp('100%'),
        position: 'relative',
        bottom: hp('3%'),
        textAlign: 'center'
    
    },
    insideDetail: {
        backgroundColor: "#00C1B4", 
        width: wp("80%"), 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: hp("2%"),
        paddingTop: hp("1%"),
        paddingBottom: hp("1%"),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%')
    },
    title2: {
        textAlign: 'center',
        color:"white",
        marginBottom: hp("2%")
    },
    mainEmpty: {
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: wp('15%'),
        paddingRight: wp('15%')
    },
    emptyTitle1: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center",
        marginBottom: hp('4%')
    },
    emptyTitle2: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: hp('4%')
    },
    footer2: {
        
        zIndex:4,
        textAlign:'center',
        paddingTop: 15,
        paddingBottom: 15,
        width: wp('60%'),
        color: "white",
        backgroundColor: "#008AC8"
    }
})

const mapStateToProps = (store) =>{
    return {
        user : store.user,
        favorite : store.favorite,
        contact : store.contact
    }
}

const mapDispatchToProps = {
    deleteFavorite
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorite)