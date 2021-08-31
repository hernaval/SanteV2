import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export class HeaderRouteProSante extends Component {
    constructor(props) {
        super(props)
    }
    
    _clickMenu() {
        console.log('Menu')
    }

    _back() {
        if (this.props.backRoute) {
            this.props.navigation.navigate(this.props.backRoute);
        } else {
            this.props.navigation.navigate("DashboardProSante");
        }
    }

    render() {
        return(
            <View style={styles.main_header}>
                <View>
                    <TouchableOpacity style={{padding: 10,}}  onPress={() => this._back()}>
                        <Image
                        source={require('./../../../images/icons/Retour.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title_header}>
                        {this.props.title}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this._clickMenu()}>
                        <Image
                        source={require('./../../../images/icons/burger.png')}/>
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
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30
    },
    title_header : {
        fontSize: 22,
        fontWeight: 'bold'
    }
})