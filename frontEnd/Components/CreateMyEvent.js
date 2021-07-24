import React, { useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { Image, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


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

export default function CreateYourEvent(props) {


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

const [likeColor, setLikeColor] = useState('white')

let changeLikeColor = () => {
  if (likeColor === 'white')
        {setLikeColor('#FF0202')}
  else if (likeColor === '#FF0202')
            {setLikeColor('white')}
      }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  
    return (
      <View style={{flex:1, alignItems: 'center',  backgroundColor: '#FFF1DC'}}>
        
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.createText}>
                {'create your '}
            </Text>
            <Text style={styles.createTextBold}>
                {'private '}
            </Text>
            <Text style={styles.createText}>
                {'event '}
            </Text>
        </View>

<ScrollView style={{flex:1}} snapToInterval={(6.5/10)*screen.height} decelerationRate='fast'> 
      
      
      <View style={{flex: 1, height: (6.5/10)*screen.height, flexDirection: 'column', width: (9/10)*screen.width, paddingTop: 30}}>
      
  
           
       <ImageBackground position= 'relative' imageStyle={{ borderRadius: 28, marginBottom: 25}} style={styles.imgBackground}>
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
                   <View style={{ top: 0, right: 0, bottom: 0, left: 0}}>
          <Ionicons name="image-outline" size={110} color="black" style={{marginTop: 140, color: '#011520'}}/> 
          </View>
          </ImageBackground>
         
        

          <View style={{width: '85%', position: 'absolute', marginLeft: 24, bottom: 100, color: 'red'}}>
          <TextInput style= {styles.inputEventName} placeholderTextColor="white" placeholder="Event's name" containerStyle={{ width: '70%' }}/>
          <TextInput style= {styles.inputEventDesc} placeholderTextColor="white" placeholder="Event's name" containerStyle={{ width: '70%' }}/>
          </View>

          <View style={{width: '85%', marginLeft: 24,position: 'relative', color: 'red'}}>
          <TextInput style= {styles.inputEventAddress} placeholderTextColor="black" placeholder="Event's address" containerStyle={{ width: '70%' }}/>

            </View>
    
        </View>
        <CheckBox
        title='sports'
        checked={false}
        containerStyle={{backgroundColor: 'transparent'}}
        checkedColor='red'/>
        
        
     

        

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

inputEventName: {
  color: 'white',
  borderBottomWidth: 1,
  borderColor: 'white',

  fontSize: 28,
  fontFamily: 'Poppins_400Regular'},
  

inputEventDesc: {
  color: 'white',
  borderBottomWidth: 1,
  borderColor: 'white',

  fontSize: 16,
  fontFamily: 'Poppins_400Regular'},

inputEventAddress: {
  color: 'black',
  borderBottomWidth: 1,
  borderColor: 'black',

  fontSize: 16,
  fontFamily: 'Poppins_400Regular'},

createText: {
    
    fontSize: 24,
    color: '#011520',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
    marginTop: 20
    },

createTextBold: {

  fontSize: 24,
  color: '#011520',
  fontFamily: 'Poppins_600SemiBold',
  textAlign: 'justify',
  marginTop: 20
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
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins_300Light',
    },

hairlineBlack: {
    backgroundColor: 'black',
    height: 20,
    width: 1,
    },

imgBackground: {
    width: '100%',
    height: '100%',
    
    alignItems: 'center',
    flex: 1 ,
    backgroundColor: '#FFD99F',
    borderRadius: 28,
    marginBottom: 10
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

input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
},

});


