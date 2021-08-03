import React, { useState, useEffect, useRef }  from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Pressable, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import HeaderScreen from './Header' 
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketIOClient from "socket.io-client";



import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

function Chat(props) {
  var socket = socketIOClient("http://"+props.ip+":3000");
  const scrollViewRef = useRef();


  const isFocused = useIsFocused();

  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  const [userId, setUserId] = useState('');
  const [userPseudo, setUserPseudo] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [eventId, setEventId]= useState(props.route.params.eventId)
  const [newMessage, setNewMessage] = useState({})


  
 

  useEffect( () => {
    var temp;
    (async () => {
    const data = await fetch("http://"+props.ip+":3000/get-messages", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "eventId="+props.route.params.eventId+"&token="+props.token
          });
    
    var response = await data.json();
    setListMessage(response.message)
    setUserId(response.user._id)
    setUserPseudo(response.user.username)
    setUserAvatar(response.user.avatar)

    temp = response.message
  })();

  
  socket.on('sendMessageFromBack', (message, user, event, date)=> {
    console.log('LOOK HERE =>', temp, listMessage)
    if (event == eventId){
   var messageFromSocket = {userId: {_id: user.id, avatar: user.avatar, username: user.pseudo}, eventId: event, content: message, date: date}
   temp.push(messageFromSocket)
   setListMessage(temp)
 }
   console.log(newMessage)
  })

  }, []);

  
  useEffect(() => {
    console.log('LOOK HERE AGAIN 2 =>', listMessage)
  }, [listMessage]);
  
  /* useEffect(() => {
   
    socket.on('sendMessageFromBack', (message, userId, event, date)=> {
      var temp = [...listMessage]
      console.log('LOOK HERE =>', temp, listMessage)
      if (event == eventId){
     var messageFromSocket = {userId: userId, eventId: event, content: message, date: date}
     temp.push(messageFromSocket)
     setListMessage(temp)
   }
     console.log(newMessage)
    })
    
  }, []); */


  var messagesList = listMessage.map((message, index)=>{

    var transformDate = new Date(message.date);
    var jour = transformDate.getDate();
if (jour === 1) { jour = '1st'}
else if (jour === 2) {jour = '2nd'}
else if (jour === 3) {jour = '3rd'}
else if (jour > 3) { jour = jour+'th'}
var month = transformDate.getMonth();
var monthsName = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];

var selectedMonthName = monthsName[month];

var year = transformDate.getFullYear()
var hour = transformDate.getHours()
var minutes = transformDate.getMinutes();
if (minutes < 10) {minutes = '0'+minutes}
var dateFront = selectedMonthName+' '+jour+', '+year+' - '+hour+':'+minutes

    if (message.userId._id == userId){
    return(
  
  <View style={{
    backgroundColor: "#0078fe",
    padding:10,
    marginLeft: '45%',
    borderRadius: 5,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: '50%',
    alignSelf: 'flex-end',    
    borderRadius: 20,
  }} >
  <Image source={{uri: message.userId.avatar}} style={styles.avatar}/>

  <Text style={{ fontSize: 16, color: "#fff", }}>{message.content}</Text>
  <View style={styles.rightArrow}></View>
  <View style={styles.rightArrowOverlap}></View> 
  <Text style={{color: 'white', fontSize: 10, fontStyle: 'italic'}}>{dateFront}</Text>
  </View>
    )}

    else {
      return(
  
  <View style={{
    backgroundColor: "#dedede",
    padding:10,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: "5%",
    maxWidth: '50%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  }} >
  <Image source={{uri: message.userId.avatar}} style={styles.avatar}/>
  <Text style={{color: 'black', fontSize: 10, fontStyle: 'italic'}}>{message.userId.username}</Text>

  <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }} > {message.content} </Text>
  <View style={styles.leftArrow}>
  </View>
  <View style={styles.leftArrowOverlap}></View>
  <Text style={{color: 'black', fontSize: 10, fontStyle: 'italic'}}>{dateFront}</Text>
  </View>)
    }

  })

  const screen = Dimensions.get("screen");
  
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } 
  else 
  {
    
    return (

      
      <View style={{flex:1}}>

      <HeaderScreen navigation={props.navigation}/>
      
      <ScrollView style={{flex:1, marginTop: 50}} ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {messagesList}
      </ScrollView >


      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Input
      containerStyle = {{marginBottom: 5}}
      placeholder='Write message'
      onChangeText={(msg)=>setCurrentMessage(msg)}
      value={currentMessage}
      />

      <Button

      title="Send"
      Color= '#0078fe'
      type="outline"
      onPress={ async ()=> {
        var date = new Date()
        console.log('Data to send =>', props.token, currentMessage, props.route.params.eventId, date)

        socket.emit("sendMessage", currentMessage, {id: userId, pseudo: userPseudo, avatar: userAvatar}, props.route.params.eventId, date)

        const data = await fetch("http://"+props.ip+":3000/add-message", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "token=" + props.token + "&content="+currentMessage+"&eventId="+props.route.params.eventId+"&date="+date
          });
        setCurrentMessage('');
      }
    }
    />

    </KeyboardAvoidingView>
    
    </View>
    
    
    
    );
    
  }
}

const screen = Dimensions.get("screen"); 

const styles = StyleSheet.create({

  avatar: {
    
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  
  rightArrow: {
    position: "absolute",
    backgroundColor: "#0078fe",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },
  
  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20
    
  },
  
  /*Arrow head for recevied messages*/
  leftArrow: {
    position: "absolute",
    backgroundColor: "#dedede",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
  },
  
  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20
    
  },
  
});

function mapStateToProps(state) {
  return { token: state.token, ip: state.ip}
}


function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: 'saveUser', payload: token })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Chat);