/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 //TODO: add submit button and use firebase to add comment.

import React, { Component } from 'react';
import ReactNative from 'react-native';
const StatusBar = require('./StatusBar.js');
const Button = require('./Button.js');
const ModalButton = require('./ModalButton');
const List = require('./List.js');

//These are the components we are using from ReactNative import
const {
  AppRegistry,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  AlertIOS,
} = ReactNative;

class AddCommentView extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = props.firebaseApp.database().ref().child('items');
    this._setCommentText = this._setCommentText.bind(this);
    this._submitComment = this._submitComment.bind(this);
    this.state = {
      comment: '',
      items: [
        {
          title: "test init",
          _key: "key",
        }
      ],
    } 
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _setCommentText(text) {
    this.setState({ comment: text });
  }

  _submitComment() {
    if(this.state.comment.trim() == '') { return false; }
    this.itemsRef.push({ title: this.state.comment });
    this.setState({ comment: '' });
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Comments" />
        <List items={this.state.items} />
        <ModalButton
          buttonStyle={styles.submit}
          textStyle={styles.submitText}
          text="Add Comment"
          submitButtonStyle={styles.submit}
          submitTextStyle={styles.submitText}
          submitText="Submit Comment"
          onSubmit={this._submitComment}>
            <View style={styles.comment}>
              <TextInput
                  style={styles.commentText}
                  onChangeText={this._setCommentText}
                  value={this.state.comment} />
            </View>
        </ModalButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch',
  },
  comment: {
    backgroundColor: 'orange',
    height: 50,
    width: 300,
    marginBottom: 10,
  },
  commentText: {
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  submitButton: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  submit: {
    backgroundColor: 'steelblue',
    height: 50,
    width: 300,
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

module.exports = AddCommentView;
