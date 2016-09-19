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
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableHighlight,
} = ReactNative;

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this._showModal = this._showModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._submitModal = this._submitModal.bind(this);
    this.state = {
      modalVisible: false,
    }
  }

  _showModal() {
    this.setState({ modalVisible: true });
  }

  _hideModal() {
    this.setState({ modalVisible: false });
  }

  _submitModal() {
    this.props.onSubmit();
    this._hideModal();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
            <View style={styles.container}>
              {this.props.children}
                <Button 
                  buttonStyle={this.props.submitButtonStyle}
                  textStyle={this.props.submitTextStyle}
                  text={this.props.submitText}
                  onPress={this._submitModal} />
            </View>
        </Modal>
        <Button
          buttonStyle={this.props.buttonStyle}
          textStyle={this.props.textStyle}
          onPress={this._showModal}
          text={this.props.text} />
      </View> 
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 50,
    width: 300,
    backgroundColor: 'steelblue',
  },
  textStyle: {
    height: 50,
    textAlign: 'center',
    color: '#fff',
  },
  submit: {
    backgroundColor: 'steelblue',
    height: 50,
    width: 300,
  },
}

module.exports = ModalButton;
