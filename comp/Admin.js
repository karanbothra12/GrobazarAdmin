import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";

export default class Admin extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  // componentDidMount() {
  //   var storageRef = firebase
  //     .storage()
  //     .ref("Images")
  //     .child("d");

  //   const rootRef = firebase.database().ref();
  //   const itemRef = rootRef.child("d");
  //   itemRef.on("value", snapshot => {
  //     var z = [];
  //     snapshot.forEach(child => {
  //       z.push({
  //         name: child.val().name,
  //         _key: child.key,
  //         url: child.val().url
  //       });
  //     });
  //     this.setState({
  //       d: z
  //     });
  //   });
  // }
  // onPressAdd = () => {
  //   const rootRef = firebase.database().ref();
  //   const itemRef = rootRef.child("d");

  //   if (this.state.newAnswer.trim() == "") {
  //     alert("NOOOOOOOOO");
  //     return;
  //   }
  //   itemRef.push({
  //     name: this.state.newAnswer
  //   });
  // };

  logout = () => {
    firebase.auth().signOut();
  };
  onProducts=()=>{
    this.props.navigation.navigate("products");
 }
 onOrders=()=>{
  this.props.navigation.navigate("order");
}
onAddProducts=()=>{
  this.props.navigation.navigate("addproducts");
}
    // const option ={}
    //   ImagePicker.launchImageLibrary(options, response=>{
    //     console.log('response',response)
    //   })
  

  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput
          style={styles.input}
          onChangeText={text => {
            this.setState({ newAnswer: text });
          }}
        />
        <TouchableHighlight
          style={{ marginRight: 15 }}
          underlayColor="tomato"
          onPress={this.onPressAdd}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              marginTop: 20,
              color: "#0000ff"
            }}
          >
            ADD
          </Text>
        </TouchableHighlight> */}
        <TouchableHighlight onPress={this.logout}>
          <Text style={{ fontSize: 30 }}>Logout</Text>
        </TouchableHighlight>
        <TouchableOpacity  onPress={this.onProducts}>
            <Text style={{fontSize : 40}}>PRODUCTS</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onOrders}>
            <Text style={{fontSize : 40}}>ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onAddProducts}>
            <Text style={{fontSize : 40}}>ADDPRODUCTS</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    width: "90%",
    height: 60,
    padding: 5,
    borderWidth: 1
  },
  welcome: {
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    margin: 10,
    padding: 5
  }
});
