import React from 'react'
import Navigation from './assets/Navigation/navigation'
import store from './assets/Store/store'
import { Provider } from 'react-redux'
import { View } from 'react-native'

export default function App () {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </View>
    )
}
