import React, {Component} from 'react';
import { StyleSheet, Text, View} from "react-native";


class WelcomeProSante extends Component {
    render() {
        return (
            <View style={styles.contain_welcome}>
                <Text style={styles.text_welcome}>Bienvenue sur Best4Santé ! </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain_welcome: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0
    },
    text_welcome : {
        fontWeight: '500',
        fontSize: 22
    }
})

export default WelcomeProSante