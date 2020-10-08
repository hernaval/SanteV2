import React, { Component } from 'react'
import { Text, View, TouchableOpacity ,Image} from 'react-native'
import ImageView from "react-native-image-viewing";

export default class Zooming extends Component {

    constructor(){
        super()
        this.state = {
            isVisible :true,
        }
    }

    render() {
        const images = [
            {
              uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
            },
            {
              uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
            },
            {
              uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
            },
          ];
        return (
            
                <ImageView
                images={[{
                    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
                  }]}
                imageIndex={0}
                visible={this.state.isVisible}
                onRequestClose={() => this.setState({isVisible : false})}
            />
           
            
        )
    }
}
