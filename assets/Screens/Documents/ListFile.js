import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

class ListFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          terme: ''
        }
        this.rechercher = ''
    }

    componentDidMount() {
        this.setState({
          terme: this.props.search
        })
        this.props.handleCate(this.state.terme, 1)
    }

    componentDidUpdate() {
      console.log('rech ', this.state.terme)
    }

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.contain_search}>
                <View style={{flex: 1}}>
                    <FontAwesomeIcon 
                    icon={faSearch} 
                    color="#636363" 
                    size={23} 
                    />
                </View>
      
                <View style={{flex: 5, marginLeft: -5}}>
                  <TextInput 
                  placeholder="Que cherchez vous ?"
                  style={styles.inputSearch}
                  onChangeText={(text) => console.log(text)}
                  />
                </View>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain_search: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1, 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        width: wp("87%"), 
        paddingTop: 17, 
        paddingLeft: 15, 
        height: 60, 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10
      },
})

export default ListFile