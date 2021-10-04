import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export class HeaderRoutePatient extends Component {
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
            this.props.navigation.navigate("DashboardPatient");
        }
    }

    render() {
        return(
            <View style={styles.main_header}>
                <View>
                    <TouchableOpacity style={{padding: 10,}}  onPress={() => this._back()}>
                        <Image style={{height: 8, width: 20, position: 'relative', bottom: 2}}
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
                        <Image style={{height: 20, width: 20, top: 5, position: 'relative'}}
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    title_header : {
        fontSize: 20,
        fontWeight: 'bold'
    }
})