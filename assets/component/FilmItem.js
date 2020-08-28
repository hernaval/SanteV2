import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
 class  FilmItem extends React.Component{
     render(){
       
    const film=this.props.film;
     return(
        <View style={styles.mainContenair}>
            <View style={styles.image}>

            </View>
            <View style={styles.Item}>
            <View style={styles.header}>
     <Text style={styles.titleText}>{film.title}</Text> 
             <Text style={styles.note}>{film.vote_average}</Text> 
            </View>
      
            <Text style={styles.description} numberOfLines={6}>{film.overview}</Text> 
           
            <View style={styles.dateCOntenair}>
     <Text style={styles.date}>{film.release_date}</Text> 
            </View>
            </View>
        </View>
     );
    }
 }
 const styles=StyleSheet.create(
     {
         mainContenair:{
        
             flexDirection:'row',
             marginTop:10
         },
         titleText:{
            fontSize:25,
            flex:1,
            flexWrap:'wrap',
            marginLeft:7
         },
         image:{
            flex:1,
            backgroundColor:'grey' 
         },
         note:{
            fontSize:20
         },
         date:{
            textAlign:'right',
            marginTop: 10
         },
         dateCOntenair:{
            
         },
         Item:{
             flex:2,
             flexDirection:'column'
         },
         header:{
             flexDirection:'row'
         },
         description:{
            marginLeft:7
         }


     }
 );
 export default FilmItem