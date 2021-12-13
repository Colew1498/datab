import logo from './logo.svg';
import './App.css';
import React, { useState,} from 'react';
import fire from './firebase/index'
import 'firebase/compat/firestore'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tind from './photos/tinder-header.png'
import noPic from './photos/not-found.png'

const Stack = createStackNavigator();

const Homescreen = ({ navigation }) => {
  return(
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <p></p>
      <button 
        title="Login Page"
        onClick={() =>
          navigation.navigate('login')
        }
        >Continue to Login</button>
    </header>
  </div>
  );
}


function Loginscreen({ navigation }){  
  const [name, setName] = useState("");
  
  const onSubmitPress = () => {
    if(name !== ""){
      navigation.navigate('profile', { input: name});
    } else {
      alert("Name cannot be blank");
    }
  }

  return(
    <div class="opening-container">
      <img src={tind} className="tinder" alt="t-logo" />
      <p></p>
          <strong>Please enter your capitalized name in the following format:</strong>
          <p>FirstnameLastinitial</p>
          <View style={{

          }}>
          <TextInput 
            onChangeText={(text) => setName(text)} 
            placeholder="Name..."
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              backgroundColor: "#DDDDDD",
    
            }}
          />
                    </View>
        <div className="app">

          <TouchableOpacity onPress={() => onSubmitPress()} style={{ 
                paddingTop: 10,
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                padding: 10,
                paddingBottom: 10,
          }}>
            <Text style={{}}>Submit</Text>
          </TouchableOpacity>
          <p/>
          <button 
            title="Back"
            onClick={() =>
            navigation.navigate('Stack Page')
          }
          >Back</button>
          </div>
          </div>
          )
          }
  

const Profilescreen = ({ route, navigation }) => {
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [newbio, setNewbio] = useState("");
  const [pic, setPic] = useState(noPic);
  const [url, setUrl] = useState("");

  var name = route.params.input;
  var first = name.toString().slice(0,-1);

  const upload = () => {
    if(image === "")
      return;
    fire.storage().ref('/images/' + name + "/" + image.name).put(image);
    fire.firestore().collection('users').doc(name).update({
      image: image.name
    });
    downloadimg();
}
const fetchImage = async () => {
  let result = fire.storage().ref(('/images/' + name + "/" + image.name));
  const url = await result.getDownloadURL();
  setPic(url);
  setImage("");
  setUrl(url);
};

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    newUse();
  });

  return unsubscribe;
}, [navigation]);

  const downloadimg = () => {
    fire.firestore().collection('users').doc(name).get().then(docsnap => {
      if(typeof(docsnap.data().image) != 'undefined'){
        setImage(docsnap.data().image);
    }
  })
    fetchImage();
}

  const newUse = () => { 
    fire.firestore().collection('users').doc(name).get().then((doc) =>{
    if(doc.exists){
      getbio();
      downloadimg();
    } else {
      fire.firestore().collection('users').doc(name).set({
        name: first,
        bio: 'bio here',
        image: noPic
      });
      setBio('bio here');
      setImage('');
    }
  }
  );
  }

  const updateBio = () =>{
    fire.firestore().collection('users').doc(name).update({
      bio: newbio
    });
    setBio(newbio);
  }

  const getbio = () => {
    fire.firestore().collection('users').doc(name).get().then(docsnap => {
      if(docsnap.data().bio != 'undefined'){
        setBio(docsnap.data().bio);
    }
  })
}


  return(
   <div class="profile">
     <>
     {first}
     </>
     <center>
      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={upload}>Upload</button>
      </center>
      <div class="opening-container">
      <img src={pic} alt="profile image"/>
      <p>{bio}</p>
      <TextInput 
            onChangeText={(text) => setNewbio(text)} 
            placeholder="New Bio..."
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              backgroundColor: "#DDDDDD",
              
            }}
          />
          <TouchableOpacity onPress={() => updateBio()} style={{ 
                paddingTop: 10,
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                padding: 10,
                paddingBottom: 10,
                width: 100,
          }}>
            <Text style={{}}>Submit Bio</Text>
          </TouchableOpacity>
          <p></p>
          <button 
            title="Back"
            onClick={() =>
            navigation.navigate('login')
          }
          >Back</button>
          </div>
   </div>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Stack Page" component={Homescreen}/>
        <Stack.Screen name="login" component={Loginscreen}/>
        <Stack.Screen name="profile" component={Profilescreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
