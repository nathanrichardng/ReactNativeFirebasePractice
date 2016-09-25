/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig');
const LoginPage = require('./components/LoginPage.js');
const HomePage = require('./components/HomePage.js');

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
    this.state = {
      view: 'LoginPage',
      user: false,
    } 
  }

  componentDidMount() {
    this._watchForAuthChange();
  }

  _watchForAuthChange() {
    var showHomePage = function(user) {this.setState({view: 'HomePage', user: user.email})}.bind(this);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        showHomePage(user);
      } else {
        // No user is signed in.
      }
    });
  }

  _handleLogin(loginInfo) {
    firebaseApp.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error code " + error.code + " : " + error.message);
      // ...
    });
  }

  _handleSignUp(loginInfo) {
    firebaseApp.auth().createUserWithEmailAndPassword(loginInfo.email, loginInfo.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  render() {
    if(this.state.view == 'LoginPage') {
      return <LoginPage
                login={this._handleLogin}
                signUp={this._handleSignUp} />
    }
    else {
      return (
        <HomePage
          user={this.state.user}
          firebaseApp={firebaseApp} />
      );
    }
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
