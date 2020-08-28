import React from 'react'
import {View,Text,StyleSheet,Image,TextInput,Button, Alert,TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native'
import question from '../Helpers/question'
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        Idquestion : state.Idquestion,
        point :state.point,
        age:state.age,
        taille:state.taille,
        poids:state.poids
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
class AutoDiagnostique extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            index:1,
            error: null,
            isLoading: false,
            text:"0"
          }  
          this.age=28
          this.taille=175
          this.poid=70 
          this.textInput="";   
    }

  
    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" color="#008ac8" />
            </View>
          )
        }
      }
      displayHoldPlacer(){
          if(this.qs.id===2)
          {
            return "votre temperature"
          }
          if(this.qs.id===11)
          {
            return "votre âge"
          }
          if(this.qs.id===12)
          {
            return "en cm"
          }
          if(this.qs.id===13)
          {
            return "en kg"
          }
      }
    nexIndex(p){
        this.setState({ isLoading: true })
        const index=this.qs.id+1;
        const point=this.props.Idquestion.point+p;
        const ques={Id:index,point:point,age:this.age,taille:this.taille,poids:this.poid}
        console.log(this.qs.id+"==="+question.length)
        if(this.qs.id===question.length){
            console.log("test mety")
            this.setState({index:index,point:point})
            this.props.navigation.navigate("DiagResult") 
        }
        else{
            const action = { type: "Next", value: ques}
            this.props.dispatch(action)
            this.setState({index:index,point:point})
        }
        
        
    }
    setLoad(){
        if(this.state.isLoading){
            setTimeout(() => this.setState({ isLoading: false }), 5000)
        }
       
    }
    onChangeInput(text){
        console.log("yope")
        if(text===""){
            if(this.qs.id===2)
            {
            }
            if(this.qs.id===11)
            {
                this.age=text        
            }
            if(this.qs.id===12)
            {
                this.taille=text
            }
            if(this.qs.id===13)
            {
                this.poid=text
            }
        }

      }

    testButtonOrTextBox(){
        if(this.qs.reponse===0){
            if(this.qs.id===2){
                return(
                    <View style={styles.main_Input}>
                        <TextInput style={styles.Input} defaultValue="37"  clearButtonMode="always"  onChangeText={(text) => this.onChangeInput(text)}  placeholder={this.displayHoldPlacer()} keyboardType={'numeric'}   />
                       <View style={styles.seConnecter}>
                       <TouchableOpacity style={{alignSelf:'center'}} question={this.qs}  onPress={() => this.nexIndex(this.qs.siOui)}>
                           <Text style={styles.textConnexion}>Valider</Text>
                         </TouchableOpacity>
                       </View>
                    </View>
                        ); 
            }
            if(this.qs.id===11)
          {
            return(
                <View style={styles.main_Input}>
                    <TextInput style={styles.Input} defaultValue="28"  clearButtonMode="always"  onChangeText={(text) => this.onChangeInput(text)}  placeholder={this.displayHoldPlacer()} keyboardType={'numeric'}   />
                   <View style={styles.seConnecter}>
                   <TouchableOpacity style={{alignSelf:'center'}} question={this.qs}  onPress={() => this.nexIndex(this.qs.siOui)}>
                       <Text style={styles.textConnexion}>Valider</Text>
                     </TouchableOpacity>
                   </View>
                </View>
                    );          
          }
          if(this.qs.id===12)
          {
            return(
                <View style={styles.main_Input}>
                    <TextInput style={styles.Input} defaultValue="175" clearButtonMode="always"  onChangeText={(text) => this.onChangeInput(text)}  placeholder={this.displayHoldPlacer()} keyboardType={'numeric'}  />
                   <View style={styles.seConnecter}>
                   <TouchableOpacity style={{alignSelf:'center'}} question={this.qs}  onPress={() => this.nexIndex(this.qs.siOui)}>
                       <Text style={styles.textConnexion}>Valider</Text>
                     </TouchableOpacity>
                   </View>
                </View>
                    );
          }
          if(this.qs.id===13)
          {
            return(
                <View style={styles.main_Input}>
                    <TextInput style={styles.Input} defaultValue="70"  clearButtonMode="always"  onChangeText={(text) => this.onChangeInput(text)}  placeholder={this.displayHoldPlacer()} keyboardType={'numeric'}  />
                   <View style={styles.seConnecter}>
                   <TouchableOpacity style={{alignSelf:'center'}} question={this.qs}  onPress={() => this.nexIndex(this.qs.siOui)}>
                       <Text style={styles.textConnexion}>Valider</Text>
                     </TouchableOpacity>
                   </View>
                </View>
                    );
          }
 
        }
        if(this.qs.reponse===2){
            return(
                <View>
                <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() =>this.nexIndex(this.qs.siOui)}>
                       <Image style={styles.imageFacebook} source={require('../images/yes.png')}/>
                       <Text style={styles.textFacebook}>Oui</Text>
                     </TouchableOpacity>
                   </View>      
                   <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() => this.nexIndex(0)}>
                       <Image style={styles.imageFacebook} source={require('../images/non.png')}/>
                       <Text style={styles.textFacebook}>Non</Text>
                     </TouchableOpacity>
                   </View> 
                   </View>
            )
        }
        if(this.qs.reponse===3){
            return(
                <View>
                <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() =>this.nexIndex(this.qs.siOui)}>
                       <Image style={styles.imageFacebook} source={require('../images/yes.png')}/>
                       <Text style={styles.textFacebook}>Oui</Text>
                     </TouchableOpacity>
                   </View>      
                   <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() => this.nexIndex(0)}>
                       <Image style={styles.imageFacebook} source={require('../images/non.png')}/>
                       <Text style={styles.textFacebook}>Non</Text>
                     </TouchableOpacity>
                   </View> 
                  {this.ifEnceinte()}
                   </View>
            )
        }
    }
    ifEnceinte(){
        if(this.qs.siNeSaitPas===1){
            const nb=(this.qs.siOui/2)+3
            return(
                <View>
                <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() => this.nexIndex(nb)}>
                   <Image style={styles.imageFacebook} source={require('../images/nonApp.png')}/>
                       <Text style={styles.textFacebook}>non applicable</Text>
                     </TouchableOpacity>
                   </View> 
                </View>
            )
        }
        else{
            const nb=this.qs.siOui/2
            return(
                <View>
                <View style={styles.divDiag}>
                   <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}  onPress={() => this.nexIndex(nb)}>
                   <Image style={styles.imageFacebook} source={require('../images/dontknow.png')}/>
                       <Text style={styles.textFacebook}>ne sait pas</Text>
                     </TouchableOpacity>
                   </View> 
                </View>
            )
        }
    }
    render(){
      //  this.setLoad()
      console.log(this.props.Idquestion.Idquestion)
        this.qs = question.find(x => x.id == this.props.Idquestion.Idquestion);
        this.state.index=this.qs.id
        
        
        return(
           
            <ScrollView  style={styles.main_contenair}>
                
            <View style={styles.main_contenair}>
                <View style={styles.main}>
                <Text style={styles.question}>{this.qs.question}</Text>
                <View style={styles.divQuestion}>
                {this.testButtonOrTextBox()}
                 </View>    
                </View>
                
            </View>
            </ScrollView>
        )
    }

}
const styles=StyleSheet.create({
   main_contenair:{
       backgroundColor:"#00C1B4",
       flex:1
   },
   main_Input:{
    flex:3,
    alignSelf:'center',
    width:250,
    marginTop:5
  
    
},
   textConnexion:{
    color: '#FFF',
    fontSize:15,
    width:200,
    marginTop:10,
    textAlign:'center',
    fontWeight:'bold'
},
    main:{
        alignContent:'center',
        alignItems:'center',
        marginTop:200
    },
    divQuestion:{
        marginTop:45
    },
    Input:{
        backgroundColor:'#fff',
        height:50,
        marginTop:20,
        borderRadius:5,
        paddingLeft:20
    
    },
    seConnecter:{
        height:50,
        backgroundColor:'#00C1BC',
        textAlign:'center',
        alignContent:'center',
        marginTop:10,
        borderWidth:0.2,
        borderRadius:5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize:15,
        shadowColor: 'rgba(1, 161, 156, 1)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20 ,
        shadowOffset : { width: 1, height: 13},
        backgroundColor: '#00C1BC',
        color: '#FFFFFF'
    },
    question:{
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        fontSize:18,
        color:'#fff',
        fontWeight:'bold',
        marginLeft:35,
        marginRight:35
        
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
    divDiag:{
        height:50,
        backgroundColor:'#00C1BC',
        textAlign:'center',
        alignContent:'center',
        marginTop:10,
        borderWidth:0.2,
        borderRadius:5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize:15,
        shadowColor: 'rgba(23, 149, 205, 0.5)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20 ,
        shadowOffset : { width: 1, height: 13},
        backgroundColor: '#FFF',
        color: '#1795cd',
    },
    imageFacebook:{
        width:40,
        height:40,
        
    },
    textFacebook:{
        color: '#000',
        fontSize:15,
        width:150,
        marginTop:10,
        marginLeft:-25,
        fontWeight:'bold',
        textAlign:'center'
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(AutoDiagnostique);