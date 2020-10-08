import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default class PopNav extends Component {
    render() {
        return (
            <View style={{margin : 7}}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <FontAwesomeIcon color={this.props.color} size={23} icon={faChevronCircleLeft} />
                </TouchableOpacity>
            </View>
        )
    }
}
