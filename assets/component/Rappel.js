import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faHome,  faBars, faTimes, faCaretDown, faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
  import * as DocumentPicker from 'expo-document-picker';
  import { connect } from 'react-redux';
  import Bdd from '../API/Bdd'
  import axios from 'axios';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import RNPickerSelect from 'react-native-picker-select';
  import TopMenu from './Menu/TopMenu';
  import BottomMenu from "./Menu/BottomMenu"
class Rappel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matin: false,
            midi: false,
            soir: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thirsday: false,
            friday: false,
            saturday: false,
            sunday: false,
            name: "",
            time: new Date(),
            matinHour: null,
            midiHour: null,
            soirHour: null,
            type: "matin",
            isOpenTime: false,
            isOpenDate :false,

            rappelCategorie : "rdv",
            rappelDate : ""
        }
    }

    componentDidMount() {

        //console.log('matinHour',this.state.matinHour);
      

    }

   
    goToRappelMenu() {
        this.props.navigation.navigate("Reminder")
    }

    goToMapping () {
        this.props.navigation.navigate("Mapping")
     }

    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
    
	}

    changeDay(day) {
        let newDay = !this.state[day];
        this.setState({[day]: newDay}, ()=>{
         
        });
    }

    onClickSaveRappel() {
        
        const tempName = this.state.name+"__"+this.state.rappelCategorie+"__"+this.state.rappelDate
        
        let data = {
            name: tempName,
            monday: this.state.monday === true ? 1 : 0,
            tuesday: this.state.tuesday === true ? 1 : 0,
            wednesday: this.state.wednesday === true ? 1 : 0,
            thirsday: this.state.thirsday === true ? 1 : 0,
            friday: this.state.friday === true ? 1 : 0,
            saturday: this.state.saturday === true ? 1 : 0,
            sunday: this.state.sunday === true ? 1 : 0,
            morning: this.state.matin === true ? 1 : 0,
            hd: this.state.midi === true ? 1 : 0,
            evening: this.state.soir === true ? 1 : 0,
            matinHour: this.state.matinHour,
            midiHour: this.state.midiHour,
            soirHour: this.state.soirHour,
            user_id: this.props.second.second_users[this.props.second.indexSelected].id
        }

      

        axios.post(Bdd.api_url+"/api/rappel/add",  data)
            .then((response)=>{
               
                if(response.data.status === 200) {
                    this.goToRappelMenu();
                }
            })
    }

    change(event, selectedDate) {
      

        let hours = selectedDate.getHours()+':'+selectedDate.getMinutes()

        if(this.state.type=== "matin") {

            this.setState({matinHour: hours, isOpenTime: false})

        } else if(this.state.type=== "midi") {

            this.setState({midiHour: hours, isOpenTime: false})

        } else if (this.state.type=== "soir") {

            this.setState({soirHour: hours, isOpenTime: false})

        }
    //const currentDate = selectedDate || this.state.time;
    //setShow(Platform.OS === 'ios');
    //setDate(currentDate);
    // this.setState({time: currentDate});
  };



    render(){
        return (
            <View style={styles.container}>
                 <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} />
                </View>
                
                <View 
                        style={styles.link}
                    >
                        <Image
                            style={styles.imgLink}
                            source={require('../images/Icone_Clockwhite.png')}
                        /> 
                        <Text style={styles.imgText}>Rappels</Text>
                </View>
                <View style={styles.docView}>
                    <TextInput
                        placeholder="Nom du rappel"
                        style={{borderColor : "#000",borderWidth : 1, width: wp('70%'), textAlign: "center", color: "#008AC8", paddingTop: hp('2%'), paddingBottom: hp('2%')}}
                        onChangeText={(text)=>{
                            this.setState({name: text});
                        }}
                    />
                </View>
                <View >
          <RNPickerSelect
            style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10,
                },
                placeholder: {
                  color: 'purple',
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              }}
            placeholder={{
                label: 'Type de rappel',
                value: null,
                color: 'red',
              }}
            onValueChange={(value) =>this.setState({rappelCategorie : value})}
            items={[
                { label: 'Rendez-vous', value: 'rdv' },
                { label: 'Traitement', value: 'trt' },
                { label: 'Vaccins', value: 'vcc' },
               
            ]}
        />
          </View>
                {/* <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={this.state.monday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('monday');
                        }}
                    >
                            <Text style={this.state.monday ? styles.docTextSelected : styles.docText}>Lun</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.tuesday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('tuesday');
                        }}
                    >
                            <Text style={this.state.tuesday ? styles.docTextSelected : styles.docText}>Mar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.wednesday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('wednesday');
                        }}
                    >
                            <Text style={this.state.wednesday ? styles.docTextSelected : styles.docText}>Mer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.thirsday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('thirsday');
                        }}
                    >
                            <Text style={this.state.thirsday ? styles.docTextSelected : styles.docText}>Jeu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.friday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('friday');
                        }}
                    >
                            <Text style={this.state.friday ? styles.docTextSelected : styles.docText}>Ven</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.saturday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('saturday');
                        }}
                    >
                            <Text style={this.state.saturday ? styles.docTextSelected : styles.docText}>Sam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.sunday ? styles.viewButtonSelected : styles.viewButton}
                        onPress={()=>{
                            this.changeDay('sunday');
                        }}
                    >
                            <Text style={this.state.sunday ? styles.docTextSelected : styles.docText}>Dim</Text>
                    </TouchableOpacity>
                </View> */}
                
                <View>
                    <TouchableOpacity onPress={()=> this.setState({isOpenDate : true})}>
                        <Text style={styles.rappeldate}>choisir une date</Text>
                        {this.state.isOpenDate && 
                        <DateTimePicker
                          testID="dateTimePicker"
                        
                          value={this.state.time}
                          mode="date"
                         display="calendar"
                          onChange={(event, selectedDate)=>{
                              const d = selectedDate.getDate()
                              const m = selectedDate.getMonth()+1
                              const y = selectedDate.getFullYear()
                              let date = d+"-"+m+"-"+y
                              console.log(date)
                            this.setState({rappelDate : date, isOpenDate : false})
                          }}
                        />
                    }
                    </TouchableOpacity>
                </View>
                <View style={styles.docView}>
                    {this.state.isOpenTime && <View>
                        <DateTimePicker
                          testID="dateTimePicker"
                          timeZoneOffsetInMinutes={0}
                          value={this.state.time}
                          mode="time"
                          is24Hour={true}
                          display="default"
                          onChange={(event, selectedDate)=>{
                            this.change(event, selectedDate);
                          }}
                        />
                    </View>}
                   
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={()=>{
                            this.onClickSaveRappel()
                        }}
                    >
                        <Text style={styles.docText2}>Sauvegarder le rappel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rappeldate : {
        padding : 5,
       
        textDecorationLine :"underline",
       textAlign :"center"

    },
    pickerSelectStyles : {
        fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 40,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
       

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
        
        fontSize: 24
    },
    docView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
    },
    docButton: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "white",
        borderStyle: 'dashed',
        borderRadius: 1,
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        width: wp('70%')
    }, 
    docText: {
        color: "#000"
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
    viewButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("4%")
    },
    viewButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        borderWidth: 1,
        borderColor: "red"
    },
    viewButtonSelected: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: "white"
    },
    docTextSelected: {
        color: "#00C1B4"
    }, 
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp('5%'),
        color: "white"
    },
    showHour: {
        marginTop: hp("2%"),
        marginBottom: hp("2%"),
        backgroundColor : "#008AC8",
        padding : 5
    },
    showHourText: {
        color : "white",
        borderBottomWidth: 1,
        borderBottomColor: "white"
    }
});const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });






const mapStateToProps = (store) => {
    return {
      user: store.user,
      contact: store.contact,
      favorite: store.favorite,
      second: store.second
    }
  }
  
  const mapDispatchToProps = {
    
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Rappel);