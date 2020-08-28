import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faTimes, faCaretDown, faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios'
import Bdd from '../API/Bdd'
import * as Sharing from 'expo-sharing';
import { FileSystem } from 'expo';
import TopMenu from "./Menu/TopMenu"
import PopNav from "./Menu/PopNav"
const image_source = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

class DocumentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_doc: "",
            doc_uri: ""
        }
    }

    componentDidMount() {
        //.log(this.props.navigation.state.params.id);

        let data = {
            id: this.props.navigation.state.params.id
        };
        axios.post(Bdd.api_url + '/api/document/detail', data)
            .then((response) => {
                //.log('res document',response);
                this.setState({ name_doc: response.data.document.name, uri: response.data.document.url })
            })
    }



    goToDocument() {
        this.props.navigation.navigate("DocumentMenu")
    }

    goToMapping() {
        this.props.navigation.navigate("Home")
    }


    onClickUpdate() {

    }


    render() {
        let url = Bdd.pict_url + this.state.url;
        console.log(Bdd.pict_url + this.state.uri)
        //.log(url);
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.under_ios : styles.under}>
                    <TopMenu navigation={this.props.navigation} />
                </View>

                <View>
                    <PopNav navigation={this.props.navigation} color ={"white"} />
                </View>
                <View
                    style={styles.link}
                >
                    <Image
                        style={styles.imgLink}
                        source={require('../images/Icone_Documents.png')}
                    />
                    <Text style={styles.imgText}>{this.state.name_doc.split("__")[0]}</Text>
                </View>
                <View style={styles.docView}>
                    
                    <Image
                        style={{ width: wp('90%'), height: wp('120%') }}
                        source={{ uri: Bdd.pict_url + this.state.uri }}
                    />
                </View>

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
        borderRadius: 400 / 2,
        marginRight: wp('2%')
    },
    imgText: {
        color: "white",
        fontSize: 22,
        textAlign : "center"
    },
    docView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("2%"),
        paddingBottom: hp("0%"),
        paddingLeft: wp("5%"),
        paddingRight: wp("5%"),

        width: wp('70%'),
        marginLeft: wp('15%')
    },
    docButton: {
        alignItems: "center",
        justifyContent: "center",

        borderRadius: 1,
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),

    },
    docText: {
        color: "white",
        fontSize: 20,
        marginBottom: hp("2%")
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


export default DocumentDetail;