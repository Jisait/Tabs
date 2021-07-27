import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { Pressable, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
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

            useEffect(() => {
                async function loadData(){
                    const data = await fetch('http://192.168.1.20:3000/get-Myevents', {
                      method: 'POST', 
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      body: 'token='+props.token
                    })
                    const body =  await data.json();
                    setWishListContent(body.myEvents)
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

let myEventsList = wishListContent.map( (event, index) => {
    return (
<View style= {{height: (2/10)*screen.height, flexDirection: 'column', width: (9.6/10)*screen.width, backgroundColor: 'white', margin:(0.1/10)*screen.height, borderTopLeftRadius: 36, borderBottomRightRadius: 16, position: 'relative'}}>
             <ImageBackground position= 'relative' source={{uri: event.image}} imageStyle={{ borderTopLeftRadius: 36}} style={ styles.imgBackground }>
            
             </ImageBackground>
             <View style={{position: 'absolute'}}>
             <Text style={styles.date}>{event.dateFront}</Text>
             <Text style={styles.title}>{event.title}</Text>
             <Text style={styles.desc}>{event.desc}</Text>
             
             
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
            )
    }
)


    return (
        <View style={{flex:1, alignItems: 'center', backgroundColor: '#FFF1DC'}}>
            <ScrollView style={{flex:1}} snapToInterval={(7.5/10)*screen.height} decelerationRate='fast'>
             {myEventsList}
             </ScrollView>
        </View>
        

    );

  }
      


  
const screen = Dimensions.get("screen"); 

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


