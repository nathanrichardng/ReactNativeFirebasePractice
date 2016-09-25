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
const CrumbList = require('./CrumbList.js');
const GeolocationExample = require('./GeolocationExample.js');

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
          latitude: "test latitude",
          longitude: "test longitude",
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
    const coords = this.refs.gps.getPosition().coords;
    this.itemsRef.push({ title: this.state.comment, latitude: coords.latitude, longitude: coords.longitude });
    this.setState({ comment: '' });
    this.refs.addCommentModal._hideModal();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        item = child.val();
        items.push({
          title: item.title,
          latitude: item.latitude,
          longitude: item.longitude,
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
        <GeolocationExample ref="gps" />
        <CrumbList items={this.state.items} />
        <ModalButton
          ref="addCommentModal"
          buttonStyle={styles.addCommentButton}
          textStyle={styles.submitText}
          text="Add Comment"
          submitButtonStyle={styles.submitButton}
          submitTextStyle={styles.submitText}
          submitText="Submit Comment"
          onSubmit={this._submitComment}>
            <View style={styles.comment}>
              <TextInput
                  autoFocus={true}
                  onSubmitEditing={this._submitComment}
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
    backgroundColor: 'steelblue', 
    justifyContent: 'center',
    width: 300,
  },
  addCommentButton: {
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

module.exports = AddCommentView;
