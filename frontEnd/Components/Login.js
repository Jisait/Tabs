import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Pressable, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, } from 'react-native';
import { Button, Input } from 'react-native-elements'

import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

function Login(props) {

const [loginType, setLoginType] = useState(true);

const [signUpEmail, setSignUpEmail] = useState('');
const [signUpUsername, setSignUpUsername] = useState('');
const [signUpPassword, setSignUpPassword] = useState('');

const [signInEmail, setSignInEmail] = useState('');
const [signInPassword, setSignInPassword] = useState('');

var avatar = 'https://cdn.laredoute.com/products/1200by1200/5/e/9/5e98a37d79d5a087d803de9a5dcb260c.jpg'


var handleSubmitSignUp = async (email, username, password, avatar) => {
    const data = await fetch('http://172.17.1.116:3000/sign-up', {
        method: 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'email='+email+'&username='+username+'&password='+password+'&avatar='+avatar
      })
    const body =  await data.json();
    console.log(body)
    props.onSubmitToken(body.token)
    AsyncStorage.setItem('token', body.token);

    }

var handleSubmitSignIn = async (email, password) => {
    const data = await fetch('http://172.17.1.116:3000/sign-in', {
        method: 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'email='+email+'&password='+password
        })
    const body =  await data.json();
    console.log(body)
    props.onSubmitToken(body.token)
    console.log(props.token)
    AsyncStorage.setItem('token', body.token);
}
    



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


  if (!fontsLoaded) {
    return <AppLoading />;
  } 
  else if (loginType == true)
   {
  
    return (
      <View style={{flex:1, alignItems: 'center'}}>
        <View style={{width: (10/10)*screen.width}}>
                <ImageBackground position= 'relative' source={require("../assets/Party.jpg")} imageStyle={{ borderBottomLeftRadius: 28,borderBottomRightRadius: 28}} style={ styles.imgBackground }>
                  <Text style={styles.createMyEvent}>{`Welcome Back`}</Text>
                </ImageBackground>
        </View>

        <View style= {{height: (3.5/10)*screen.height, flexDirection: 'column', alignItems: 'center', width: (7/10)*screen.width, backgroundColor: 'white', margin:(0.3/10)*screen.height, borderRadius: 3}}>
            
              <Input
        containerStyle={{ marginTop: 30, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setSignInEmail(val)}
      />


      <Input
        secureTextEntry={true}
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setSignInPassword(val)}
      />

            <Pressable style={styles.button} onPress={()=>handleSubmitSignIn(signInEmail, signInPassword)}>
                    <Text style={{ fontSize: 21, fontFamily: 'Poppins_700Bold', color: '#FFD99F'}}>LOGIN</Text>
            </Pressable>

        
        <Text style={{color: 'blue', fontSize: 15, marginTop: 20, textDecorationLine: 'underline' }} onPress={() => setLoginType(false)}>Don't have an account? Sign Up</Text>
            
        </View>

      </View>

        

    );

  }

else if (loginType == false){

    return (

    <View style={{flex:1, alignItems: 'center'}}>
        <View style={{width: (10/10)*screen.width}}>
                <ImageBackground position= 'relative' source={require("../assets/Party.jpg")} imageStyle={{ borderBottomLeftRadius: 28,borderBottomRightRadius: 28}} style={ styles.imgBackground }>
                  <Text style={styles.createMyEvent}>{`Get Started`}</Text>
                </ImageBackground>
        </View>
        

        <View style= {{height: (4.2/10)*screen.height, flexDirection: 'column', alignItems: 'center', width: (7/10)*screen.width, backgroundColor: 'white', margin:(0.3/10)*screen.height, borderRadius: 3}}>
            
        <Input
        containerStyle={{ marginTop: 30, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setSignUpEmail(val)}

      />
              <Input
        containerStyle={{ marginTop: 0, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Username'
        onChangeText={(val) => setSignUpUsername(val)}

      />


      <Input
        secureTextEntry={true}
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setSignUpPassword(val)}
      />

            <Pressable style={styles.button} onPress={()=>handleSubmitSignUp(signUpEmail, signUpUsername, signUpPassword, avatar)}>
                    <Text style={{ fontSize: 21, fontFamily: 'Poppins_700Bold', color: '#FFD99F'}}>SIGN UP</Text>
            </Pressable>

        
        <Text style={{color: 'blue', fontSize: 15, marginTop: 20, textDecoration: 'underline' }} onPress={() => setLoginType(true)}>Already have an account? Login</Text>
            
        </View>

      </View>)

}
}
      
const screen = Dimensions.get("screen"); 
  
const styles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 2,
        paddingHorizontal: 14,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0E0812',
      },

    imgBackground: {
        height: (3/10)*screen.height,
        justifyContent: 'center',
        alignItems: 'center',
     
        },
    
    textExpliquatif :{
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        marginTop: 14,
        marginHorizontal: 6
        },

    createMyEvent :{
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'Poppins_300Light',
        color: 'white',
        lineHeight: 85 * 0.4,
        paddingTop: 85 - (56 * 0.4),
        marginTop: 21
        },

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

function mapStateToProps(state) {
    return { token: state.token }
  }
  

function mapDispatchToProps(dispatch) {
    return {
      onSubmitToken: function (token) {
        dispatch({ type: 'saveUser', token: token })
      }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);