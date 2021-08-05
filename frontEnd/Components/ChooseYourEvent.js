import React, { useState }  from 'react';
import AppLoading from 'expo-app-loading';
import HeaderScreen from './Header' 
import { } from 'react-native-elements';
import {  Pressable ,  Text, View,  StyleSheet, Dimensions, ImageBackground, StatusBar} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { connect } from 'react-redux';
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




  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  

    return (
      <View style={{flex:1, alignItems: 'center', backgroundColor: '#FFF1DC'}}>
         <HeaderScreen navigation={props.navigation}/>
         <StatusBar backgroundColor="#011520" />
      
          {/*   <View style={{width: (10/10)*screen.width}}>
                <ImageBackground position= 'relative' source={require("../assets/Party.jpg")} imageStyle={{ borderBottomLeftRadius: 28,borderBottomRightRadius: 28}} style={ styles.imgBackground }>
                  <Text style={styles.createMyEvent}>{`Create\nmy event`}</Text>
                </ImageBackground>
            </View> */}
            
            
          <View style= {{height: (3.7/10)*screen.height, flexDirection: 'column', alignItems: 'center', width: (9/10)*screen.width, backgroundColor: 'white', marginTop:(0.2/10)*screen.height, borderRadius: 24}}>
            <ImageBackground style= {{width: '100%', height: '100%'}}source={require("../assets/PublicEvent.jpg")} imageStyle={{ borderRadius: 28}}>
            <LinearGradient
              colors={[
                
                "transparent",
                "rgba(0,0,0,0.3)",
                "transparent",
                
              ]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "100%",
                borderRadius: 28,
              }}
            />
            
              <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Pressable style={styles.button} onPress={() => props.navigation.navigate('CreateMyPublicEvent')}>
                        <Text style={styles.text}>PUBLIC EVENT</Text>
                </Pressable>
              </View>
              </ImageBackground>
          </View>
          
          <View style= {{height: (3.7/10)*screen.height, flexDirection: 'column', alignItems: 'center', width: (9/10)*screen.width, backgroundColor: 'white', marginTop:(0.2/10)*screen.height, borderRadius: 24}}>
          <ImageBackground style= {{width: '100%', height: '100%'}}source={require("../assets/PrivateEvent.jpg")} imageStyle={{ borderRadius: 28}}>
          <LinearGradient
              colors={[
                
                "transparent",
                "rgba(0,0,0,0.7)",
                "transparent",
                
              ]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "100%",
                borderRadius: 28,
              }}
            />
    {/*          <Text style= {styles.textExpliquatif}>Un évenement publique peut-etre publier à l'ensemble des utilisateurs de Tabs. !</Text> */}
              <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Pressable style={styles.button} onPress={() => props.navigation.navigate('CreateMyPrivateEvent')}>
                        <Text style={styles.text}>PRIVATE EVENT</Text>
                </Pressable>
              </View>
              </ImageBackground>
          </View>

          
  
        </View>
            );
          }}


const screen = Dimensions.get("screen"); 
const styles = StyleSheet.create({

  imgBackground: {
          height: (2/10)*screen.height,
          justifyContent: 'center',
          alignItems: 'center',
       
          },

  createMyEvent :{
          fontSize: 42,
          textAlign: 'center',
          fontFamily: 'Poppins_300Light',
          color: '#FFD99F',
          lineHeight: 85 * 0.4,
          paddingTop: 85 - (56 * 0.4),
          marginTop: 21
          },

  textExpliquatif :{
          fontSize: 18,
          textAlign: 'center',
          fontFamily: 'Poppins_400Regular',
          marginTop: 14,
          marginHorizontal: 6
          },
  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 14,
    borderRadius: 4,
    
    backgroundColor: 'transparent',
  },

  text: {
    fontSize: 30,
    fontFamily: 'Poppins_700Bold',
    color: 'white',
  },
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(ChooseYourEvent);