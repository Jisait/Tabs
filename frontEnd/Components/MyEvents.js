import React, { useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';



export default function ChooseYourEvent() {



    return (
      <Text style={styles.text}>BONJOUR MY EVENTS</Text>
        

    );

  }
      
  
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
    flex: 1 ,
    },

imgBackground2: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    flex: 1 ,
    },

});


