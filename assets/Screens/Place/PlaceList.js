import React, { Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import { Container, Content } from "native-base";
import RenderStarReview from "./Review/ReviewStars";
import styles from "./styles";

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.GOOGLE_API_KEY = "AIzaSyBOoJBp0W8ksY21rV4yAGoHHCSaJRVyibs";
  }

  render() {
    var index = 0;
    const { places } = this.props;
    const baseImage =
      "https://images.unsplash.com/photo-1552334405-4929565998d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
    return (
      <Container style={styles.container2}>
        <Content>
        
          {places.length <= 0 && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {places.length > 0 && (
            <FlatList
              data={places}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <ListItem
                    key={item.id}
                    title={
                      <View style={styles.rowDirection}>
                        <Text>{item.name}</Text>
                      </View>
                    }
                    subtitle={
                        <View>
                          <View style={styles.startReviewsContainer}>
                            <RenderStarReview stars={item.rating ? item.rating : 0} />
                            <Text>
                            {item.rating ? item.rating.toFixed(1) : 0}
                            </Text>
                          </View>
                          <View>
                            {console.log('item ', item)}
                            <Text>{item.vicinity}</Text>
                          </View>
                        </View>
                      
                    }
                    // leftAvatar={{
                    //   rounded: false,
                    //   size: "large",
                    //   source: item.icon && {
                    //     uri:
                    //       item.photos.length > 0
                    //         ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&sensor=false&maxheight=${item.photos[0].height}&maxwidth=${item.photos[0].width}&key=${this.GOOGLE_API_KEY}`
                    //         : item.icon
                    //   }
                    // }}
                    bottomDivider
                    // chevron={{ color: "#e90000", size: 30 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => {
                index++;
                return index + ''
              }
              }
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default PlaceList;
