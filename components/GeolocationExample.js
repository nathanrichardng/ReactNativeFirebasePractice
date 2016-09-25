/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

const {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class GeolocationExample extends React.Component {
  state = {
    initialPosition: {coords: {latitude: 'unknown', longitude: 'unknown'}},
    lastPosition: {coords: {latitude: 'unknown', longitude: 'unknown'}},
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getPosition() {
  	return this.state.lastPosition;
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          	{this.state.initialPosition.coords.latitude}, {this.state.initialPosition.coords.longitude}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          	{this.state.lastPosition.coords.latitude}, {this.state.lastPosition.coords.longitude}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

module.exports = GeolocationExample;