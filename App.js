import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View,
  TextInput
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from "./comp/login";
import * as firebase from 'firebase';
import ProductDetails from './comp/ProductDetails'
import Admin from "./comp/Admin";
import Orders from "./comp/Orders";
import OrderDetail from "./comp/OrderDetail";
import products from './comp/Products';

const firebaseConfig = {
  apiKey: "AIzaSyAqO81E1f2CGN6Z8XTKM7QtzTMQzlPdTbE",
  authDomain: "grobazarapp.firebaseapp.com",
  databaseURL: "https://grobazarapp.firebaseio.com",
  projectId: "grobazarapp",
  storageBucket: "grobazarapp.appspot.com",
  messagingSenderId: "78371074254",
  appId: "1:78371074254:web:554b635460a4750091609f"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }
  render() {
    return <Appcontainer />;
  }
}
const RootStack = createStackNavigator(
  {
    // Login: LoginScreen,
    admin: Admin,
    order: Orders,
    orderdetail: OrderDetail,
    products : products,
    productdetails: ProductDetails
  },
  {
    intialRouteName: "Login"
  }
);
const Appcontainer = createAppContainer(RootStack);
