import React, { Component, PropTypes } from "react";
import { FlatList, View, Dimensions, StyleSheet, Text, Image } from "react-native";
import { observer, inject } from "mobx-react";
import Button from 'antd-mobile/lib/button';

import ibmsStore from "../../stores/ImbsStore";

var WIDTH = Dimensions.get("window").width;

const initData = function () {
  // return Promise.all([ibmsStore.getBroadcastnew(), ibmsStore.getItems()]);
};
@observer
export default class List extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    initData().then(data => { });
  }
  renderItem = ({ item, indx }) => {
    return (

      <View style={styles.itemStyle}>
        <Image source={{ uri: item.icon }} style={styles.image} />
        <View>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
      </View>

    );
  };

  render() {

    return (
      <View>
        <FlatList
          style={styles.flatStyle}
          data={ibmsStore.list}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => item.id}
        />
        <Button>default</Button>
        <Button type="primary" size="large" inline>small</Button>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  itemStyle: {
    height: 100,
    width: WIDTH,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 0.25,
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 49,
    height: 49,
    margin: 12
  },
  textStyle: {
    marginTop: 8
  },
  flatStyle: {
    width: 490,
    height: 490,
    backgroundColor: "green"
  }
});
