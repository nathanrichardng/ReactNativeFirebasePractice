/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const ListItem = require('./ListItem.js');

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} = ReactNative;

class List extends Component {
  constructor(props) {
    super(props);
  }

  renderItems() {
    var itemNodes = this.props.items.map(function(item) {
      return <ListItem text={item.title} key={item._key} />
    })
    return itemNodes;
  }

  render() {
    return (
      <View style={styles.list}>
        <ScrollView>
          {this.renderItems()}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  list: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  }
}

module.exports = List;
