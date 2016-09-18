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

class Button extends Component {

	constructor(props) {
		super(props);
	}

	render() {
	    var TouchableElement = TouchableHighlight;
	    if (Platform.OS === 'android') {
	     TouchableElement = TouchableNativeFeedback;
	    }
	    return (
	      <TouchableElement
	        style={this.props.buttonStyle}
	        onPress={this.props.onPress}>
	        <View>
	          <Text style={this.props.textStyle}>{this.props.text}</Text>
	        </View>
	      </TouchableElement>        
	    );
	}
}

module.exports = Button;