import React, { useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { Pressable, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
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



function ChooseYourEvent() {

    

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
             <View style= {{height: (2/10)*screen.height, flexDirection: 'column', width: (9.6/10)*screen.width, backgroundColor: 'white', margin:(0.1/10)*screen.height, borderTopLeftRadius: 36, borderBottomRightRadius: 16, position: 'relative'}}>
             <ImageBackground position= 'relative' source={require("../assets/dance.jpg")} imageStyle={{ borderTopLeftRadius: 36}} style={ styles.imgBackground }>
            
             </ImageBackground>
             <View style={{position: 'absolute'}}>
             <Text style={styles.date}>Mercredi 8 octobre 2021 </Text>
             <Text style={styles.title}>Dancing show </Text>
             <Text style={styles.desc}>En cela, le spectacle vivant désigne de nombreux modes d'expression artistique</Text>
             
             
             </View>
                    <View style={styles.iconContainer}>
                    <View style={{position: 'absolute', right: 22, top: 5}}>
                    <Ionicons name="close-circle-outline" size={32} color="red" />
                    </View>
                    <View style={{position: 'absolute', right: 72, top: 5}}>
                    <Ionicons name="checkmark-circle-outline" size={32} color="green" />
                    </View>
                    <View style={{position: 'absolute', left: 25, top: 5}}>
                    <Ionicons name="chatbox-ellipses" size={32} color="black" />
                    </View>
                    </View>
            </View>
            <View style= {{height: (2/10)*screen.height, flexDirection: 'column', width: (9.6/10)*screen.width, backgroundColor: 'white', margin:(0.1/10)*screen.height, borderTopLeftRadius: 36, borderBottomRightRadius: 16, position: 'relative'}}>
             <ImageBackground position= 'relative' source={require("../assets/dance.jpg")} imageStyle={{ borderTopLeftRadius: 36}} style={ styles.imgBackground }>
            
             </ImageBackground>
             <View style={{position: 'absolute'}}>
             <Text style={styles.date}>Mercredi 8 octobre 2021 </Text>
             <Text style={styles.title}>Dancing show </Text>
             <Text style={styles.desc}>En cela, le spectacle vivant désigne de nombreux modes d'expression artistique</Text>
             
             
             </View>
                    <View style={styles.iconContainer}>
                    <View style={{position: 'absolute', right: 22, top: 5}}>
                    <Ionicons name="close-circle-outline" size={32} color="red" />
                    </View>
                    <View style={{position: 'absolute', right: 72, top: 5}}>
                    <Ionicons name="checkmark-circle-outline" size={32} color="green" />
                    </View>
                    <View style={{position: 'absolute', left: 25, top: 5}}>
                    <Ionicons name="chatbox-ellipses" size={32} color="black" />
                    </View>
                    </View>
            </View>
        </View>
        

    );

  }}
      


  
const screen = Dimensions.get("screen"); 
console.log("prout", (2/10)*screen.width)
const styles = StyleSheet.create({

date: {
        fontSize: 12,
        marginLeft : (2/10)*screen.width+60,
        fontFamily: 'Poppins_500Medium',
        marginTop: 10,
        marginBottom: -8,
        },

title: {
    fontSize: 23,
    marginLeft : (2/10)*screen.width+9,
    fontFamily: 'Poppins_500Medium',
    marginTop: 5,
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
            }

});

function mapStateToProps(state) {
    return { token: state.token }
  }

  export default connect(
    mapStateToProps,
    null
  )(ChooseYourEvent);


