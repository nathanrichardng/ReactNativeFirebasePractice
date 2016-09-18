/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const AddCommentView = require('./AddCommentView.js');

//These are the components we are using from ReactNative import
const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AddCommentView
          firebaseApp={this.props.firebaseApp} />
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
    backgroundColor: '#F5FCFF',
  }
});

module.exports = HomePage;
