import React, { Component } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen' 
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "expo-chart-kit";
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export class EvolutionProfilPatient extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.main_graph}>
                <View>
                <BarChart
                    data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                        ]
                    }]
                    }}
                    width={Dimensions.get('window').width - 50} // from react-native
                    height={220}
                    chartConfig={{
                    backgroundColor: '#00C1B4',
                    backgroundGradientFrom: '#00C1B4',
                    backgroundGradientTo: '#008ac8',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 5
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 20,
                    borderRadius: 5
                    }}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_graph : {
        marginTop: 20

    }
})