import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { Pressable, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, Image, StatusBar } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import HeaderScreen from './Header' 
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
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



function ChooseYourEvent(props) {

    

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

            const isFocused = useIsFocused();
            const[wishListContent, setWishListContent] = useState([]);
            const[userID, setUserId] = useState('');
            const[hosted, setHosted] = useState([]);
            const[participant, setParticipant] = useState(true)



            useEffect(() => {
         
                async function loadData(){
                  

                    const data = await fetch('http://'+props.ip+':3000/get-Myevents', {
                      method: 'POST', 
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      body: 'token='+props.token
                    })
                    const body =  await data.json();
                    var temp = body.myEvents
                   

                    const nonPublic = await fetch('http://'+props.ip+':3000/get-myPrivateEvents', {
                      method: 'POST', 
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      body: 'token='+props.token
                    })

                    const dataPrivate = await nonPublic.json()

                    temp = [...temp, ...dataPrivate.result]
                    temp.sort(function(a, b) {return new Date(a.dateUTC) - new Date(b.dateUTC);});
                    setWishListContent(temp)
                  

                 
                   
                   
                    const userData = await fetch('http://'+props.ip+':3000/get-user', {
                      method: 'POST', 
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      body: 'token='+props.token
                    })
          
                    const dataUser =  await userData.json();
                    console.log("111",dataUser)
               
                    setUserId(dataUser.user._id)

                    const hostedData = await fetch('http://'+props.ip+':3000/get-hostedEvents', {
                      method: 'POST', 
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      body: 'token='+props.token
                    })
          
                    const dataHosted =  await hostedData.json();
               
                    setHosted(dataHosted.hostedEvents)

                    
                }
                if (isFocused == true){
              
                    if (props.token){
                 

                        loadData();
                  }
                  else {
                    console.log('Not connected')
                  }
                }
              }
            , [isFocused]); 

  var addToConfirm = async (event, isConfirmed) =>{
    if(isConfirmed === false){
    const userData = await fetch('http://'+props.ip+':3000/add-to-confirm', {
            method: 'POST', 
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'token='+props.token+'&id='+event._id
          })
    const user =  await userData.json();
    
    setUserId(user.user)

    const data = await fetch('http://'+props.ip+':3000/get-Myevents', {
      method: 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'token='+props.token
    })
    const body =  await data.json();
    var temp = body.myEvents
   

    const nonPublic = await fetch('http://'+props.ip+':3000/get-myPrivateEvents', {
      method: 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'token='+props.token
    })

    const dataPrivate = await nonPublic.json()

    temp = [...temp, ...dataPrivate.result]
    temp.sort(function(a, b) {return new Date(a.dateUTC) - new Date(b.dateUTC);});
    setWishListContent(temp)
  
  }
  }
  
var myEventsList;
if (participant == true){
myEventsList = wishListContent.map( (event, index) => {
  var styleButtons = {display: 'flex'}
  var styleConfirmed = {display: 'none'}

  var isConfirmed = false
  var check = event.confirmedParticipants
console.log(event._id)
  
  var result = check.find(element => element == userID);


  if(result != undefined){
    isConfirmed = true
    styleButtons = {display: 'none'}
    styleConfirmed = {display: 'flex',
                      color: 'white',
                      fontSize: 13,
                      marginTop : 5,
                      backgroundColor: '#011520',
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 20}
  }

  var bannerPrivate = <View></View>

  if (event.publique === false) {
    bannerPrivate = <View style={{position:'absolute', left: 220}}>
    <View style={styles.triangleCorner} />
    <Text style={styles.EventType}>Private Event</Text>
  </View>
}


  


    return (
<View 
style= {{height: (2/10)*screen.height, flexDirection: 'column', width: (9.6/10)*screen.width, backgroundColor: 'white', marginHorizontal:(0.1/10)*screen.height, marginVertical:(0.2/10)*screen.height, borderTopLeftRadius: 36, borderBottomRightRadius: 16, position: 'relative'}}
key={index}
>
             <ImageBackground position= 'relative' source={{uri: event.image}} imageStyle={{ borderTopLeftRadius: 36}} style={ styles.imgBackground }>
            
             </ImageBackground>
             <View style={{position: 'absolute'}}>
               <View style={{flexDirection: 'row'}}>
             <Text style={styles.date}>{event.dateFront}</Text>
              {bannerPrivate}
            
             </View>
             <Text style={styles.title}>{event.title}</Text>
             <Text style={styles.desc}>{event.desc}</Text>
             
             
             </View>
                    <View style={styles.iconContainer}>
                    <View style={{position: 'absolute', right: 22, top: 5}}>
                    <Ionicons name="close-circle-outline" size={32} color="#011520" style={styleButtons}/>
                    </View>
                    <View style={{position: 'absolute', right: 22, top: 5}}>
                    <Text style={styleConfirmed}>You confirmed your presence</Text>
                    </View>
                    <View style={{position: 'absolute', right: 72, top: 5}}>
                    <Ionicons name="checkmark-circle-outline" size={32} color="#011520" style={styleButtons} onPress={() => addToConfirm(event, isConfirmed)}/>
                    </View>
                    <View style={{position: 'absolute', left: 25, top: 5}}>
                    <Ionicons name="chatbox-ellipses" size={32} color="black" onPress={() => props.navigation.navigate('ChatScreen',{
            eventId: event._id,
            eventURL: event.image,
            eventTitle: event.title
          })}/>
                    </View>
                    
                    </View>
            </View>
            )
    }
)}
else{
  myEventsList = hosted.map( (event, index) => {
   var styleConfirmed = {display: 'flex',
    color: 'white',
    fontSize: 13,
    marginTop : 5,
    backgroundColor: '#011520',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20}


    
      return (
  <View 
  style= {{height: (2/10)*screen.height, flexDirection: 'column', width: (9.6/10)*screen.width, backgroundColor: 'white', marginHorizontal:(0.1/10)*screen.height, marginVertical:(0.2/10)*screen.height, borderTopLeftRadius: 36, borderBottomRightRadius: 16, position: 'relative'}}
  key={index}
  >
               <ImageBackground position= 'relative' source={{uri: event.image}} imageStyle={{ borderTopLeftRadius: 36}} style={ styles.imgBackground }>
              
               </ImageBackground>
               <View style={{position: 'absolute'}}>
                 <View style={{flexDirection: 'row'}}>
               <Text style={styles.date}>{event.dateFront}</Text>
               <View style={{position:'absolute', left: 268}}>
                  <View style={styles.triangleCornerAdmin} />
                  <View style={styles.EventTypeAdmin}>
                    <FontAwesome name="star" size={14} color="#FFEA00" /></View>
              </View>
              
               </View>
               <Text style={styles.title}>{event.title}</Text>
               <Text style={styles.desc}>{event.desc}</Text>
               
               
               </View>
               <View style={styles.iconContainer}>
               <View style={{position: 'absolute', right: 20, top: 5}}>
                    <Text style={styleConfirmed}>Interested : {event.interestedParticipants.length}</Text>
                </View>
                <View style={{position: 'absolute', right: 130, top: 5}}>
                    <Text style={styleConfirmed}>Confirmed : {event.confirmedParticipants.length}</Text>
                </View>
                <View style={{position: 'absolute', left: 25, top: 5}}>
                    <Ionicons name="chatbox-ellipses" size={32} color="black" onPress={() => props.navigation.navigate('ChatScreen',{
            eventId: event._id,
            eventURL: event.image,
            eventTitle: event.title
          })}/>
                    </View>
               </View>
                      
</View>
              )
      }
  )

}
var styleParticipant = {width: (5/ 10) * screen.width, height: (0.55 / 10) * screen.height, display: 'flex', alignItems: 'center', justifyContent: 'center'}
var styleHost = {width: (5/ 10) * screen.width, height: (0.55 / 10) * screen.height, display: 'flex', alignItems: 'center', justifyContent: 'center'}
if (participant == true){
  styleParticipant = {width: (5/ 10) * screen.width, height: (0.55 / 10) * screen.height, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1DC'}
}
else {
  styleHost  = {width: (5/ 10) * screen.width, height: (0.55 / 10) * screen.height, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1DC'}
}
    return (
        <View style={{flex:1, alignItems: 'center', backgroundColor: '#FFF1DC'}}>
    
           <HeaderScreen navigation={props.navigation}/>
           <StatusBar backgroundColor="#011520" />
           <View style={styles.searchBarContainer}>
             
            <Pressable 
            style={styleParticipant}
            onPress={() => setParticipant(true)}
            >
              <Text style={styles.PartiHost}>Participating</Text>
            </Pressable>
            

            
              <Pressable 
              style={styleHost}
              onPress={() => setParticipant(false)}
              >
              <Text style={styles.PartiHost}>Hosting</Text>
            </Pressable>
            
          </View>
            <ScrollView style={{flex:1}} snapToInterval={(2/10)*screen.height} decelerationRate='fast'>
             {myEventsList}
             <View style= {{height: (0.5/10)*screen.height}}>
              </View>

             </ScrollView>
        </View>
        

    );

  }
  
const screen = Dimensions.get("screen"); 

const styles = StyleSheet.create({

  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "white",
    height: (0.55 / 10) * screen.height,
    width: screen.width,
  },

date: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 12,
        marginLeft : (2/10)*screen.width+9,
        fontFamily: 'Poppins_500Medium',
        marginTop: 0,
        paddingTop: 5,
        marginBottom: -8,
        },

EventType: {
  color: 'white',
  backgroundColor: '#EB1F0B',
  paddingHorizontal : 5,
  paddingVertical: 2,
  fontSize: 10,
  left: 69,
  top: -5,
  textAlign: "center"
  },

title: {
    color: '#011520',
    fontSize: 23,
    marginLeft : (2/10)*screen.width+9,
    fontFamily: 'Poppins_500Medium',
    marginTop: 5,
    },

triangleCorner: {
  position: 'absolute',
  right: 0,
  top: -5,
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 5,
  borderBottomWidth: 5,
  borderLeftColor: "transparent",
  borderBottomColor: "#A11C01",
},

triangleCornerAdmin: {
  position: 'absolute',
  left: 64,
  top: -5,
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 5,
  borderBottomWidth: 5,
  borderLeftColor: "transparent",
  borderBottomColor: "#8B8C8E",
},


EventTypeAdmin: {
  position: 'absolute',
  color: 'white',
  backgroundColor: '#011520',
  paddingHorizontal : 5,
  paddingVertical: 4,
  fontSize: 10,
  left: 69,
  top: -5,
  textAlign: "center"
  },
    
desc: {
    fontSize: 15,
    marginLeft : (2/10)*screen.width+9,
    fontFamily: 'Poppins_300Light',
    marginTop: -12,
    lineHeight: 38 * 0.4,
    paddingTop: 20 - (20 * 0.4),
    
    },

imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    width: (2/10)*screen.width
    },

iconContainer: {
    marginBottom: 'auto',
    height: '26%', width: '100%',
    backgroundColor: '#FFD99F',
    borderBottomRightRadius: 16
            },

  PartiHost:{
    fontFamily: 'Poppins_500Medium',
    textTransform: 'uppercase',
  }

});

function mapStateToProps(state) {
    return { token: state.token, ip: state.ip }
  }

  export default connect(
    mapStateToProps,
    null
  )(ChooseYourEvent);