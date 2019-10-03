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
import ImagePicker from "react-native-image-picker";

const options = {
  title: "add items image",
  takePhotoButtonTitle: "use Camera",
  chooseFromLibraryButtonTitle: "Choose from library"
};
export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      od: [],
      key: [],
      things: []
    };
  }
  componentWillMount() {
    const rootRef = firebase.database().ref();
    const itemRef = rootRef.child("users");
    itemRef.on("value", snapshot => {
      var z = [];
      snapshot.forEach(child => {
        z.push({
          items: child.val(),
          key: child.key
        });
      });
      this.setState({
        od: z
      });
    });
    itemRef.on("child_added", value => {
      let d = value.key;
      this.setState(prevstate => {
        return {
          key: [...prevstate.key, d]
        };
      });
    });
  }
  renderRow = ({ item }) => {
    if (item.items.about.name) {
      return (
        <SafeAreaView style={styles.welcome}>
          <TouchableHighlight
            onPress={() => {
              this.onClick(item.key);
            }}
          >
            <Text style={{ fontSize: 30 }}>
              {item.items.delivery.address.address}
            </Text>
          </TouchableHighlight>
          <Text style={{ fontSize: 30 }}>{item.items.about.name}</Text>
          <View style={styles.container}>
            {/* <FlatList data={this.state.things} renderItem={this.renderKey} /> */}
          </View>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  };
  onClick = key => {
    this.props.navigation.navigate("orderdetail", {
      _key: key
    });
  };
  renderKey = ({ item }) => {
    return (
      <View style={styles.welcome}>
        <Text style={{ fontSize: 30 }}>{item.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.od} renderItem={this.renderRow} />
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
