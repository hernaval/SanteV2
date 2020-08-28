import React from 'react'
import {StyleSheet, View, Text,Share, Image, TextInput, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faHome,faShare,  faBars, faTimes, faCaretDown, faChevronLeft, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
  import * as DocumentPicker from 'expo-document-picker'
  import { connect } from "react-redux"
import axios from 'axios'
import Bdd from '../API/Bdd'
import * as Sharing from 'expo-sharing';
import * as  FileSystem  from 'expo-file-system';
class DocumentMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: []
        }
    }

    componentDidMount() {
        let id = this.props.second.second_users[this.props.second.indexSelected].id;
        let data = {
           user_id: id
        } 

        axios.post(Bdd.api_url+'/api/document/one', data)
            .then((response)=>{
                //.log('res document',response);
                this.setState({documents: response.data.documents}, ()=>{
                    //.log('state',this.state)
                })
            })

           // this.deleteImg();
        
    }



    goToMapping () {
        this.props.navigation.navigate("Home")
     }

    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
      //.log(result);
    }
    
    goToDocument(){
        this.props.navigation.navigate("Document")
    }

    goToDocumentMenu() {
        this.props.navigation.navigate("DocumentMenu")
    }

    goToDetail(id) {
 
        this.props.navigation.navigate("DocumentDetail", {id: id})
    }

    deleteDoc(id, index) {
        let data = {
            id: id,
            upload_preset: 'aoknragz'
         } 
        
         let documents = this.state.documents;

         documents.splice(index, 1);


         axios.post(Bdd.api_url+'/api/document/delete', data)
             .then((response)=>{
                 //.log('res document',response);
                if(response.data.status === 200) {
                    this.setState({documents: documents}, ()=>{
                        //.log('state',this.state)
                    })
                }
             })
    }




    deleteImg() {
        let apiUrl = 'https://api.cloudinary.com/v1_1/hb314jso8/image/destroy';
        let data = {
            public_id: "ajdyodjuaio90auykrbh",
            api_key: "551747958953532",
            signature: "5cd9286c497ff9ca46b6780ecb8c7a21a443ee31",
            timestamp: "2020-03-27T10:11:01Z"
        }

        fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
              let data = await r.json()
              //.log('les delete photo', data);

            //   if(data.error ) {
            //     return;
            //   }
            
               
              

              return data.secure_url
        }).catch(err=>console.log(err))
    }

    shareDoc = async (docId) => {
        await this.getDoc(docId)
        const image_source = Bdd.pict_url+this.state.uri
        FileSystem.downloadAsync(
            image_source,
            FileSystem.documentDirectory  +".jpg"
          )
            .then(({ uri }) => { 
                console.log('Finished downloading to ', uri);
  
                Sharing.shareAsync(uri); 
            })
            
      };
      getDoc = async (id) =>{
            let data = {
                id : id
            }
            axios.post(Bdd.api_url+"/api/document/detail",data)
                .then((response)=>{
                    this.setState({
                        name_doc : response.data.document.nam,
                        uri : response.data.document.url
                    })
                })
      }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.under3}>
                    <TouchableOpacity
                    style={{marginRight: wp("35%")}}
                    onPress={()=>{
                        this.goToMapping();
                    }}
                    >
                        <FontAwesomeIcon 
                            icon={faHome} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginLeft: wp("35%")}}
                        onPress={()=>{
                            this.goToDocument();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faChevronLeft} 
                            color="white" 
                            size={24} 
                            style={{}}
                            
                        />
                    </TouchableOpacity>
                </View>
                <View 
                        style={styles.link}
                    >
                        <Image
                            style={styles.imgLink}
                            source={require('../images/Icone_Documents.png')}
                        /> 
                        <Text style={styles.imgText}>Documents</Text>
                </View>
                {this.state.documents.length !== 0 && this.state.documents.map((document, index)=>{
                    return (<View style={styles.docView} key={index}>
                    <Text style={styles.docText}>{document.name}</Text>
                        <TouchableOpacity
                            style={styles.docButton}
                            onPress={()=>{
                                this.goToDetail(document.id)
                            }}
                        >
                                <Image
                                    style={{width: wp('10%'), height: wp('10%')}}
                                    source={require('../images/Icone_oeil.png')}
                                /> 
                                
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.docButton}
                            onPress={()=>{
                                this._pickDocument()
                            }}
                        >
                                <FontAwesomeIcon 
                                    icon={faTimesCircle} 
                                    color="white" 
                                    size={21} 
                                    style={{marginRight: wp('2%')}}
                                    onPress={()=>{
                                        this.deleteDoc(document.id, index);
                                    }}
                                /> 
                                
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.shareDoc(document.id)}
                        >
                        <FontAwesomeIcon 
                                    icon={faShare} 
                                    color="white" 
                                    size={21} 
                                    style={{marginRight: wp('2%')}}
                                   
                                />  
                        </TouchableOpacity>
                    </View>)
                }) }
                
                <TouchableOpacity
                    style={styles.docView2}
                    onPress={()=>{
                        this.goToDocument()
                    }}
                >
                    
                            <FontAwesomeIcon 
                                icon={faPlusCircle} 
                                color="white" 
                                size={24} 
                                style={{marginRight: wp('2%')}}
                                // onPress={()=>{
                                //     this.goToMappig();
                                // }}
                            />
                            <Text style={styles.docText}>Ajouter un nouveau document</Text>
            
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#008AC8",
 
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 40,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: wp('25%'),
        paddingTop: hp("7%"),
        paddingBottom: hp("1%")
    },
    imgLink: {
      width: wp('15%'),
      height: wp('15%'),
      backgroundColor: '#008AC8',
      borderRadius: 400/2,
      marginRight: wp('2%')
    },
    imgText: {
        color: "white",
        fontSize: 24
    },
    docView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("0%"),
        paddingLeft: wp("5%"),
        paddingRight: wp("5%"),
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        width: wp('70%'),
        marginLeft: wp('15%')
    },
    docButton: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp('1%'),
        marginRight: wp('1%'),
        borderRadius: 1,
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
  
    }, 
    docText: {
        color: "white"
    }, 
    buttonSave: {
        backgroundColor: "#00C1B4",
        marginTop: hp('5%'),
        width: wp('70%'),
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        
    },
    docText2: {
        color: "white",
        fontSize: 18
        
    },
    docView2: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("4%"),
        paddingBottom: hp("0%"),
        paddingLeft: wp("5%"),
        paddingRight: wp("5%"),
        flexDirection: "row",
       
        width: wp('70%'),
        marginLeft: wp('15%')
    }
});




const mapStateToProps = (store) => {
    return {
      user: store.user,
      contact: store.contact,
      second: store.second
    }
  }
  
  const mapDispatchToProps = {
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(DocumentMenu);

