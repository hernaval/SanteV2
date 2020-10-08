import React from 'react'
import {View,TextInput,Button,StyleSheet,FlatList,Text} from 'react-native'
import Film from '../Helpers/Films'
import FilmItem from './FilmItem'
import getFilmsFromApiWithSearchedText from '../API/TMDBApi'
 class Search extends React.Component {
     constructor(props){
         super(props)
         this.state={films:[]}
         this._films=[]

     }
     getFilms(){
        getFilmsFromApiWithSearchedText("star").then(data=>{
            this.setState({films:data.results})
        })
    }
     render(){
       console.log("RENDER ")
    return (
      <View style={style.barreRecherche}>
        <TextInput style={style.textSearch} placeholder="Titre du film"/>
        <Button title="rechercher" onPress={()=>this.getFilms()}/>
        <FlatList
        data={this.state.films}
        keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=><FilmItem film={item}/>}
        />
      </View>
    
    );
}

  }
   const style=StyleSheet.create({
     barreRecherche:{
         marginTop:70,
         flex:1
     },
     textSearch:{
        marginLeft:5 ,
        marginRight:5,
        height:50,
        borderColor: '#000000',
        borderWidth: 1, 
        paddingLeft: 5
     }
   })
  export default Search;