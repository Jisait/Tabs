import React, { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';

import {
          useFonts,
          BenchNine_300Light,
          BenchNine_400Regular,
          BenchNine_700Bold,
        } from '@expo-google-fonts/benchnine';
import { Camera } from 'expo-camera';



export default function CardImage() {

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)

  var cameraRef = useRef(null);

  useEffect(() => {
      
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      console.log(status)
      setHasPermission(status === 'granted');
    })();
    
  }, []);

  let [fontsLoaded] = useFonts({
    BenchNine_300Light,
    BenchNine_400Regular,
    BenchNine_700Bold,
  });


    return <Text></Text>


    


    
    
  
}

const styles = StyleSheet.create({

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    },

  rectangle: {
   
    height: '100%',
    width: '100%',
    backgroundColor: 'salmon',
    borderRadius: 35,
    bottom: 28,
    },

  text: {
    flex: 1,
    fontSize: 42,
    color: 'yellow',
    
    fontFamily: 'BenchNine_400Regular'

  },

  subtext: {
    flex: 1,
    marginBottom: 'auto',
    fontSize: 20,
    color: 'yellow',

    lineHeight: 20,
    fontFamily: 'BenchNine_300Light'

  },

hairlineWhite: {
    backgroundColor: 'yellow',
    height: 118,
    width: 1,

    
  },

  adresse: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'BenchNine_300Light',
  },

  hairlineBlack: {
    backgroundColor: 'black',
    height: 20,
    width: 1,
    
  },
});


