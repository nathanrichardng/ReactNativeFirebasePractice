/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig');

//These are the components we are using from ReactNative import
const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

// currently have firebase app open to all. Need to change those to
// require firebase user permission.
const firebaseApp = firebase.initializeApp(firebaseConfig);

class AwesomeProject extends Component {
  constructor(props) {
      super(props);
      this.itemsRef = firebaseApp.database().ref().child('items');
      this.state = {
        items: [{
          title: "test init",
          _key: "key",
        }],
      }
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        items: items,
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  renderItems() {
    var itemNodes = this.state.items.map(function(item) {
      return <Text key={item._key}>{item.title}</Text>
    })
    return itemNodes;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.big}>
          Got it working on android!
        </Text>
        <Text style={styles.welcome}>
          This is my first lesson in React Native!
        </Text>
        <Text style={styles.instructions}>
          So far it seems pretty sweet.
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        {this.renderItems()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  big: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'steelblue',
    color: '#fff',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
