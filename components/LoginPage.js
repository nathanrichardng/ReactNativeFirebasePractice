/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const Button = require('./Button.js');

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

class LoginPage extends Component {
  constructor(props) {
      super(props);
      this.state = { email: '', password: '' };
      this._setEmail = this._setEmail.bind(this);
      this._setPassword = this._setPassword.bind(this);
      this._login = this._login.bind(this);
      this._signUp = this._signUp.bind(this);
  }

  _login() {
    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(loginInfo);
  }

  _signUp() {
    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.signUp(loginInfo);
  }

  _setEmail(text) {
    this.setState({email: text});
  }

  _setPassword(text) {
    this.setState({password: text});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            Please Login
          </Text>
        </View>
        <View style={styles.emailTitle}>
          <Text>
              Email
          </Text>
        </View>
        <View style={styles.email}>
          <TextInput
            style={styles.emailText}
            onChangeText={this._setEmail}
            value={this.state.email} />
        </View>
        <View style={styles.passwordTitle}>
          <Text>
              Password
          </Text>
        </View>
        <View style={styles.password}>
          <TextInput
            style={styles.passwordText}
            onChangeText={this._setPassword}
            value={this.state.password} />
        </View>
        <View style={styles.login}>
          <Button
            onPress={this._login}
            buttonStyle={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
            textStyle={styles.loginText}
            text="Log In" />
        </View>
        <View style={styles.signUp}>
          <Button
            onPress={this._signUp}
            buttonStyle={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
            textStyle={styles.signUpText}
            text="Sign Up" />
        </View>
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
  },
  welcome: {
    height: 100,
    width: 300,
  },
  welcomeText: {
    fontSize: 50,
    textAlign: 'center',
  },
  emailTitle: {
    width: 300,
  },
  email: {
    backgroundColor: 'orange',
    height: 50,
    width: 300,
    marginBottom: 10,
  },
  emailText: {
    textAlign: 'center',
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  passwordTitle: {
    width: 300,
  },
  password: {
    backgroundColor: 'green',
    height: 50,
    width: 300,
    marginBottom: 50,
  },
  passwordText: {
    textAlign: 'center',
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  login: {
    backgroundColor: 'steelblue',
    height: 50,
    width: 300,
  },
  loginText: {
    textAlign: 'center',
  },
  signUp: {
    backgroundColor: 'red',
    height: 50,
    width: 300,
  },
  signUpText: {
    textAlign: 'center',
  },
});

module.exports = LoginPage;
