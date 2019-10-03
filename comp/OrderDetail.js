import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  TouchableHighlight
} from "react-native";
import * as firebase from "firebase";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: [],
      _keys: []
    };
  }

  componentWillMount() {
    keys= this.props.navigation.getParam('_key')
   
    
        const rootRefx = firebase.database().ref('users')
          .child(keys)
          .child("things");
        rootRefx.on("child_added", value => {
          let c = value.val();       
            this.setState(prevstate=>{
              return{ 
                things: [...prevstate.things, c]
             }});
            })
  }
  renderRow = ({ item }) => {  
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>{item.name}</Text>
        <Text style={{ fontSize: 30 }}>{item.number}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.things} renderItem={this.renderRow} />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ffff"
  },
  welcome: {
    flex: 1,
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    color: "#0000ff",
    backgroundColor: "#deb887"
  }
});
