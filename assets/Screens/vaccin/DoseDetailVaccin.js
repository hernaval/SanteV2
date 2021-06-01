import React, {Component} from 'react';
import {
    StyleSheet, SafeAreaView, Share, Alert, Text, View, Modal,
    AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Image, CheckBox
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class DoseDetailVaccin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.row}>
                    <Text style={[styles.complic_text, {color: "#000"}]}>
                    {this.props.nom}
                    </Text>
                    {
                                this.props.status == 1 && (
                                    <Text style={[styles.complic_text, {color: "#00C1B4"}]}>
                                        Réalisée
                                    </Text>
                                )
                    }
                    {
                                this.props.status == 0 && (
                                    <Text style={[styles.complic_text, {color: "red"}]}>
                                        En attente
                                    </Text>
                                )
                    }
                </View>

                {
                this.props.status == 1 && (
                    <View>
                        <View style={styles.row}>
                                    <Text style={styles.simple_text}>
                                        Date
                                    </Text>
                                    <Text style={styles.simple_text}>
                                    {this.props.date}
                                    </Text>
                        </View>
                        <View style={styles.row}>
                                    <Text style={styles.simple_text}>
                                        Lieu
                                    </Text>
                                    <Text style={styles.simple_text}>
                                    {this.props.lieu}
                                    </Text>
                        </View>   
                        <View style={styles.row}>
                                    <Text style={styles.simple_text}>
                                        Pays
                                    </Text>
                                    <Text style={styles.simple_text}>
                                    {this.props.pays}
                                    </Text>
                        </View>
                    </View>                    
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 10,
        marginBottom: 20
    },  
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    simple_text: {
        fontSize: 20,
        fontWeight: "100",
        color: "#666666"
    },
    complic_text: {
        fontSize: 20,
        fontWeight: "900"
    },
})

export default DoseDetailVaccin;