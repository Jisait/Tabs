import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { Image, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function Discover() {


/*   var Event :[{}] */

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

const [likeColor, setLikeColor] = useState('white');
const [events, setEvents] = useState([]);


let changeLikeColor = () => {
  if (likeColor === 'white')
        {setLikeColor('#FF0202')}
  else if (likeColor === '#FF0202')
            {setLikeColor('white')}
      }


      useEffect(() => {

        async function loadData(){
    
          // CHANGE POUR TON IP LORS DE RESR
          const data = await fetch("http://192.168.1.20:3000/get-event")
          var  eventData =  await data.json();
          setEvents(eventData.events)

          console.log("map", events)

        }
        loadData()
    
      }, []);

console.log(events)
let discoverList = events.map((event) => {

  console.log(event.image)
   return (
    <View style={{flex: 1, height: (6.5/10)*screen.height, flexDirection: 'column', width: (9/10)*screen.width, paddingTop: 30}}>     
       <ImageBackground position= 'relative' source={{uri: event.image}} imageStyle={{ borderRadius: 28, marginBottom: 25}} style={ styles.imgBackground }>
              <LinearGradient
                  colors={['transparent','rgba(0,0,0,0.8)']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom:0,
                    height: '50%',
                    borderRadius: 28
                  }}/>
          </ImageBackground>
          <View style={{position: 'absolute', right: 20, top: 45}}>
            <FontAwesome onPress={() => changeLikeColor()} name="heart" size={30} color={likeColor} />
          </View>
          <View style={{position: 'absolute', left: 150, bottom: 166}}>
            <FontAwesome name="share-alt" size={26} color="white" />
          </View>
          <View style={{position: 'absolute', left: 220, bottom: 166}}>
            <Text style={styles.distance}>{event.latitude}</Text>
          </View>
          <View style={{position: 'absolute', left: 190, bottom: 166}}>
            <FontAwesome5 name="map-marker-alt" size={26} color="white" />
          </View>
          <View style={{width: '85%', position: 'absolute', left: 36, bottom: 114}}>
              <Text style={styles.text}>{event.title.toUpperCase()}</Text>
          </View>
          <View style={{width: '85%',position: 'absolute', left: 36, top: (0.78)*(6.5/10)*screen.height}}>
              <Text style={styles.subtext}>{event.desc}</Text>
          </View>
          <View style={{width: '100%',position: 'absolute', left: 28, bottom: 32}}>
            <View style={styles.hairlineWhite} />
          </View>
          <View style={{width: '100%',position: 'absolute', left: 28, bottom: 6}}>
              <View style={styles.hairlineBlack} />
          </View> 
          <View style={{width: '100%',position: 'relative', left: 36, bottom: 0}}>
              <Text style={styles.date}>{event.date} / 20h00</Text>
          </View>
          <View style={{width: '100%',position: 'relative', left: 36, bottom: 0}}>
              <Text style={styles.adresse}>{event.address}</Text>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row', position: 'absolute', left: 20, top: 45}}>
              <ImageBackground source={require("../assets/avatar_fake.jpg")} imageStyle={{ borderRadius: 50}} style={ styles.imgAvatar}/>
              <Text style={styles.pseudo}>Cool_Girl_75</Text>
          </View>
        </View>
        );
      });



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  
    return (
      <View style={{flex:1, alignItems: 'center'}}>

<ScrollView style={{flex:1}} snapToInterval={(6.5/10)*screen.height} decelerationRate='fast'> 
      
      
      <View style={{flex: 1, height: (6.5/10)*screen.height, flexDirection: 'column', width: (9/10)*screen.width, paddingTop: 30}}>
      
  
           
       <ImageBackground position= 'relative' source={require("../assets/dance.jpg")} imageStyle={{ borderRadius: 28, marginBottom: 25}} style={ styles.imgBackground }>
              <LinearGradient
                  colors={['transparent','rgba(0,0,0,0.8)']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom:0,
                    height: '50%',
                    borderRadius: 28
                  }}/>
          </ImageBackground>

          <View style={{position: 'absolute', right: 20, top: 45}}>
            <FontAwesome onPress={() => changeLikeColor()} name="heart" size={30} color={likeColor} />
          </View>

          <View style={{position: 'absolute', left: 150, bottom: 166}}>
            <FontAwesome name="share-alt" size={26} color="white" />
          </View>

          <View style={{position: 'absolute', left: 220, bottom: 166}}>
            <Text style={styles.distance}>1,6 km</Text>
          </View>

          <View style={{position: 'absolute', left: 190, bottom: 166}}>
            <FontAwesome5 name="map-marker-alt" size={26} color="white" />
          </View>
       
          <View style={{width: '85%', position: 'absolute', left: 36, bottom: 114}}>
              <Text style={styles.text}>DANCE SHOW</Text>
          </View>

          <View style={{width: '85%',position: 'absolute', left: 36, top: (0.78)*(6.5/10)*screen.height}}>
              <Text style={styles.subtext}>En cela, le spectacle vivant désigne de nombreux modes d'expression artistique.</Text>
          </View>

          <View style={{width: '100%',position: 'absolute', left: 28, bottom: 32}}>
            <View style={styles.hairlineWhite} />
          </View>

          <View style={{width: '100%',position: 'absolute', left: 28, bottom: 6}}>
              <View style={styles.hairlineBlack} />
          </View> 
        
          <View style={{alignItems: 'center', flexDirection: 'row', position: 'absolute', left: 20, top: 45}}>
              <ImageBackground source={require("../assets/avatar_fake.jpg")} imageStyle={{ borderRadius: 50}} style={ styles.imgAvatar}/>
              <Text style={styles.pseudo}>Cool_Girl_75</Text>
           
            
          </View>
       
    
        </View>
        <View style={{width: '100%',position: 'relative', left: 36, bottom: 0}}>
              <Text style={styles.date}>24 octobre 2021 / 20h00</Text>
          </View>
          <View style={{width: '100%',position: 'relative', left: 36, bottom: 0}}>
              <Text style={styles.adresse}>101 boulevard Voltaire, 75011 Paris</Text>
          </View>
        
     
{discoverList}
        

        </ScrollView>
        </View>

        

    );

  }}
      
  
const styles = StyleSheet.create({

rectangle: {
    height: '94.5%',
    width: '100%',
    backgroundColor: 'salmon',
    borderRadius: 28,
    },

text: {
    flex: 1,
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify'
    },

subtext: {
    flex: 1,
    marginBottom: 'auto',
    fontSize: 16,
    color: 'white',
    lineHeight: 17,
    fontFamily: 'Poppins_300Light'
    },

hairlineWhite: {
    backgroundColor: 'white',
    height: 118,
    width: 1,
    },

adresse: {
    marginVertical: 0,
    padding: 0,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins_300Light',

    },
    
date: {
    marginTop: 3,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins_500Medium',

    },

hairlineBlack: {
    backgroundColor: 'black',
    height: 20,
    width: 1,
    },

imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    },

imgAvatar: {
    width: 45,
    height: 45,
},

imgBackground2: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    flex: 1
    },

pseudo: {
    color: 'white',
    marginLeft: 8,
    fontFamily: 'Poppins_500Medium',

    },

distance: {
  color:'white',
  textAlign: 'right',
  fontFamily: 'Poppins_500Medium',
},

});


