import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class DoseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <View style={styles.row}>
                            <Text style={styles.text_dosage}>
                                {this.props.nomination}
                            </Text>
                            {
                                this.props.status == 1 && (
                                    <Text style={[styles.text_status, {color: "#00C1B4"}]}>
                                        Réalisée
                                    </Text>
                                )
                            }
                            {
                                this.props.status == 0 && (
                                    <Text style={[styles.text_status, {color: "red"}]}>
                                        En attente
                                    </Text>
                                )
                            }

                        </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    text_dosage: {
        position: "relative",
        left: 40,
        fontSize: 20,
        fontWeight: "100"
    },
    text_status: {
        fontSize: 20,
        fontWeight: "100"
    }
});


export default DoseList;