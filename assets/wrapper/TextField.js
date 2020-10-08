import React from 'react'
import { View, TextInput, Text } from 'react-native'

const TextField =props =>(
    <View>
        <TextInput style={{ 
            backgroundColor:'#fff',
            height:40,
            marginTop:10,
            borderRadius:5,
            paddingLeft:20
            }}/>
        {props.error && <Text>{props.error}</Text>}
    </View>
) 
export default TextField
