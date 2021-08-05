import React, { useState, useEffect, useRef }  from 'react';
import AppLoading from 'expo-app-loading';
import { Image, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, StatusBar,} from 'react-native';
import {Input, Icon } from 'react-native-elements'

import HeaderScreen from './Header' 
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
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


  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  const [userId, setUserId] = useState('');
  const [userPseudo, setUserPseudo] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [eventId, setEventId]= useState(props.route.params.eventId)
  const [newMessage, setNewMessage] = useState({})


  
 
  var temp;

  useEffect( () => {
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

  }, []);

  
  useEffect(() => {
    socket.on('sendMessageFromBack', (message, user, event, date)=> {
      console.log('LOOK HERE =>', temp, listMessage)
      if (event == eventId){
     var messageFromSocket = {userId: {_id: user.id, avatar: user.avatar, username: user.pseudo}, eventId: event, content: message, date: date}
     temp.push(messageFromSocket)
     setListMessage(temp)
   }
     console.log(newMessage)
    })
    }, [listMessage]);
  

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
    backgroundColor: "#011520",
    width: 250,
    padding:10,
    marginLeft: '45%',
    borderRadius: 5,
    marginTop: 10,
    marginRight: "5%",
    maxWidth: '75%',
    alignSelf: 'flex-end',    
    borderRadius: 20,
  }} >

  <Text style={{ fontSize: 16, color: "#fff", }}>{message.content}</Text>
  <View style={styles.rightArrow}></View>
  <View style={styles.rightArrowOverlap}></View> 
  <Text style={{color: 'white', fontSize: 10, fontStyle: 'italic'}}>{dateFront}</Text>
  </View>
    )}

    else {
      return(
  
  <View style={{
    backgroundColor: "white",
    padding:10,
    width: 250,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: "5%",
    maxWidth: '75%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  }} >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Image source={{uri: message.userId.avatar}} style={styles.avatar}/>
  <Text style={{color: 'black', fontSize: 10, fontStyle: 'italic'}}>{message.userId.username}</Text>
    </View>
  <Text style={{ fontSize: 16, color: "#000",justifyContent:"center", marginTop: 8 }} > {message.content} </Text>
  <View style={styles.leftArrow}>
  </View>
  <View style={styles.leftArrowOverlap}></View>
  <Text style={{color: 'black', fontSize: 10, fontStyle: 'italic', marginTop: 8, opacity: 0.5}}>{dateFront}</Text>
  </View>)
    }

  })

  
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
      <StatusBar backgroundColor="#011520" />
      
      <ImageBackground source={{ uri: props.route.params.eventURL }} style={{width: '100%', height: 50,}}>
      <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "95%",
          
            }}
          />
          
          </ImageBackground>
    
      <Text style={styles.headerText}>{props.route.params.eventTitle.toUpperCase() }</Text>

      <ScrollView style={{flex:1, marginTop: 0, backgroundColor: '#FFF1DC'}} ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {messagesList}
      </ScrollView >


      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
     
      <Input
      inputContainerStyle={{backgroundColor: "white", borderBottomWidth:0, borderRadius: 50}}
      containerStyle = {{backgroundColor: '#FFF1DC', paddingTop: 20}}
      placeholder='Write message'
      inputStyle= {{marginLeft: 22}}
      onChangeText={(msg)=>setCurrentMessage(msg)}
      value={currentMessage}
      rightIcon={
        <Icon
        iconStyle={{marginRight: 10}}
           name={"send" }
           size= {24} 
           color= {'#011520'}
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
        }/>
    }
      
      />


    </KeyboardAvoidingView>
    
    </View>
    
    
    
    );
    
  }
}

const styles = StyleSheet.create({

  avatar: {
    
    height: 20,
    width: 20,
    borderRadius: 50,
    marginRight: 5
  },

  headerText: {
    top: 85,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: 25,
    position: 'absolute',
    },
  
  rightArrow: {
    position: "absolute",
    backgroundColor: "#011520",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },
  
  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#FFF1DC",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20
    
  },
  
  leftArrow: {
    position: "absolute",
    backgroundColor: "white",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
  },
  
  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#FFF1DC",
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