import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export class HeaderPatient extends Component {
    constructor(props) {
        super(props)
    }

    _clickMenu() {
        console.log('Menu')
    }

    _back() {
        this.props.navigation.navigate("FirstPage");
    }

    render() {
        return(
            <View style={styles.main_header}>
                <View>
                    <TouchableOpacity onPress={() => this._back()} style={{padding: 10}}>
                        <Image style={{height: 8, width: 20, position: 'relative', bottom: 5}}
                        source={require('./../../images/icons/Retour.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this._clickMenu()}>
                        <Image style={{height: 20, width: 20}}
                        source={require('./../../images/icons/burger.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 15
    }
})