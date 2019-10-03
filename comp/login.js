import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: null,
      email: "",
      password: "",
      ids: ""
    };
  }
  onLogin = () => {
    if (this.state.email == "a@a.com" && this.state.password == 123456)
      this.props.navigation.navigate("admin");
    else {
      this.props.navigation.navigate("user");
    }
  };
  
  handleChange = key => val => {
    this.setState({ [key]: val });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>LOGIN</Text>
        <View style={{ width: "90%" }}>
          <TextInput
            style={styles.input}
            placeholder=" Username"
            onChangeText={text => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder=" Password"
            secureTextEntry
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userbtn} onPress={this.onLogin}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    width: "90%",
    backgroundColor: "#F5FCFF",
    height: 40,
    padding: 1,
    marginLeft: "5%",
    marginTop: "5%",
    borderWidth: 1
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "#0000ff"
  },
  btnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    marginTop: "6%"
  },
  userBtn: {
    backgroundColor: "white",
    color: "#3A59FF",
    padding: 20,
    width: "70%",
    borderRadius: 2
  },
  userBtn1: {
    backgroundColor: "#fff",
    padding: 40,
    width: "70%"
  },
  btnTxt: {
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "rgba(100, 172, 72, 0.5)",
    marginTop: "10%"
  }
});
