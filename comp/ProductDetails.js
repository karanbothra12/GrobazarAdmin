import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob'
const options = {
  title: "pic",
  takePhotoButtonTitle: "take photo with camera",
  chooseFromLibraryButtonTitle: "add image from library"
};
const Blob= RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.Blob=Blob
window.XMLHttpRequest =RNFetchBlob.polyfill.XMLHttpRequest
export default class ProductDetails extends Component {

 
  constructor(props) {
    super(props);
    this.state = {
      d: [],
      newAnswer: "",
      CATEGORY:'',
      DESCRIPTION:'',
      QUANTITY:'',
      ImageSource: "",
      visible: 'true'
    };
  }

  componentDidMount() {
    key= this.props.navigation.getParam('_key')
  

    const rootRef = firebase.database().ref();
    const itemRef = rootRef.child("d").child(key);
    itemRef.on("value", snapshot => {
      var z = [];
      z.push({
      CATEGORY : snapshot.val().CATEGORY,
        value: snapshot.val(),
        QUANTITY: snapshot.val().QUANTITY,
        DESCRIPTION: snapshot.val().DESCRIPTION,
        url: snapshot.val().url
      });
      
      // snapshot.forEach(child => {
        // z.push({
        //   value: child.val(),
        //   name: child.val().name,
        //   // _key: child.key,
        //   CATEGORY: child.val().CATEGORY,
        //   QUANTITY: child.val().QUANTITY,
        //   DESCRIPTION: child.val().DESCRIPTION,
        //   url: child.val().url
        // });
      // });
      this.setState({
        d: z
      });
    });
  }
  onPressAdd = () => {
    const rootRef = firebase.database().ref();
    const itemRef = rootRef.child("d");

    if (this.state.newAnswer.trim() == "") {
      alert("NOOOOOOOOO");
      return;
    }
    itemRef.push({
      name: this.state.newAnswer,
      DESCRIPTION:this.state.DESCRIPTION,
      CATEGORY: this.state.CATEGORY,
      QUANTITY: this.state.QUANTITY
    });
  };

  renderRow = ({ item }) => {
    this.setState({
      name: item.name
    });
    return (
      <SafeAreaView style={styles.welcome}>
        <Image
          source={{ uri: item.url }}
          style={{
            width: 200,
            height: 200,
            margin: 1,
            borderWidth: 1,
            backgroundColor: "#FFEB3B"
          }}
        />
          <Text style={{ fontSize: 30 }}>{item.name}</Text>
        <TouchableHighlight onPress={() => this.addImage(item.name, item._key)}>
          <Text>addImage</Text>
        </TouchableHighlight>
        <View>
        <Text style={{ fontSize: 30 }}>{item.CATEGORY}</Text>
          <Text style={{ fontSize: 30 }}>{item.DESCRIPTION}</Text>
          <Text style={{ fontSize: 30 }}>{item.QUANTITY}</Text>
          <Text>{this.state.ImageSource}</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  uploadImage = (uri, _key, name) => {

    // firebase.storage().ref('d').child(name).put(uri)
    let mime = "Image/jpeg";
    storageRef = firebase
      .storage()
      .ref("Images")
      .child(name);
    fs.readFile(uri, "base64")
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return storageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return storageRef.getDownloadURL();
      })
      .then(url => {
        firebase
          .database()
          .ref("d")
          .child(_key)
          .set({
            name: name,
            url: url
          });
      });
  };
 
  addImage = (name, _key) => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response =", response);
      if (response.didCancel) {
        console.log("user cancelled");
      } else if (response.error) {
        console.log("ImagePicker error", response.error);
      } else {
        let uri1 = response.uri;

        this.uploadImage(uri1, _key, name);
      }
    });

    // const option ={}
    //   ImagePicker.launchImageLibrary(options, response=>{
    //     console.log('response',response)
    //   })
  };

  render() {
    return (
      <View style={styles.container}>
       
       <TouchableOpacity style={styles.userbtn} onPress={this.onLogin}>
            <Text style={styles.btnTxt}>PRODUCTS</Text>
          </TouchableOpacity>
        <FlatList
          style={styles.welcome}
          data={this.state.d}
          renderItem={this.renderRow}
        />
         <Modal
          animationType="slide"
          transparent={false}
          visible ={this.state.visible}
         >
          <View style={{ fontSize: 30 }}>
            <Text>Name</Text>
          <TextInput
          style={styles.input}
          onChangeText={text => {
            this.setState({ newAnswer: text });
          }}
        /> 
         <Text style={{ fontSize: 30 }}>CATEGORY</Text>
        <TextInput
        style={styles.input}
        onChangeText={text => {
          this.setState({ CATEGORY: text });
        }}
      />  
      <Text style={{ fontSize: 30 }}>DESCRIPTION</Text>
      <TextInput
      style={styles.input}
      onChangeText={text => {
        this.setState({ DESCRIPTION: text });
      }}
    />  
    <Text style={{ fontSize: 30 }}>QUANTITY</Text>
    <TextInput
    style={styles.input}
    onChangeText={text => {
      this.setState({ QUANTITY: text });
    }}
  />
        <TouchableHighlight
          style={{ marginRight: 15 }}
          underlayColor="tomato"
          onPress={this.onPressAdd}
        >
          <Text
            style={{
              fontSize: 60,
              textAlign: "center",
              // marginTop: 20,
            }}
          > ADD</Text>
        </TouchableHighlight>
        <TouchableOpacity
         onPress={()=>this.setState({visible: false})}>
          <Text>HIDE</Text>
        </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
        onPress={()=>this.setState({visible: true})}
        >
          <Text>OPEN</Text>
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
    // marginTop: 20,
    margin: 1,
    padding: 5
  }
});
