/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

//These are the components we are using from ReactNative import
const {
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

class ListItemWithCoords extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.item.title}
        </Text>
        <Text>
          {this.props.item.latitude}, {this.props.item.longitude}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 75,
    alignSelf: 'stretch',
    borderColor: '#e1e1e1',
    borderWidth: 1,
  },
});

module.exports = ListItemWithCoords;
