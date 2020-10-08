import React from 'react'
import {StyleSheet,View} from 'react-native'

function TestFlexBox(){
    return(
      <View style={styles.view1}>
      <View style={styles.view4}>
          
      </View>
      </View>
      
      

    );
}
var styles=StyleSheet.create(
    {
    view1:{
            backgroundColor:"#00C1B4",
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        },
        view2:{
            backgroundColor:"red",
            height: 50, width: 50
        },
        view3:{
            backgroundColor:"green",
            height: 50, width: 50
        },
        view4:{
            backgroundColor:"blue",
            height: 500, width: 300
        }
    }
)
export default TestFlexBox;