import { LogBox } from 'react-native';
import React, { useState, useEffect }  from 'react';
LogBox.ignoreLogs(['Warning: ...']);
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading';
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderScreen from './Components/Header' 
import { Header, Button, Overlay, CheckBox  } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './Components/Discover';
import ChooseYourEvent from './Components/ChooseYourEvent';
import MyEvents from './Components/MyEvents';
import Settings from './Components/Settings';
import Login from './Components/Login'
import { Ionicons } from '@expo/vector-icons';
import CreateMyPublicEvent from './Components/CreateMyPublicEvent';
import CreateMyPrivateEvent from './Components/CreateMyPrivateEvent';
import * as ImagePicker from 'expo-image-picker';
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

import { connect } from 'react-redux';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import token from './reducers/user';
import ip from './reducers/ip'
import tags from './reducers/tags'


const store = createStore(combineReducers({token, ip, tags}));

const screen = Dimensions.get("screen");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  
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
  } else 
  
  return (
    
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Create') {
          iconName = 'ios-add-circle-outline';
        } else if (route.name === 'Disco') {
          iconName = 'md-home-outline';
        } else if (route.name === 'MyEvent') {
          iconName = 'ios-heart-outline';
        }
        else if (route.name === 'Login') {
          iconName = 'ios-heart-outline';
        }
        return <Ionicons name={iconName} size={28} color={color} />;
      },
    })}
    
    tabBarOptions={
      { showLabel: false,
        
        activeTintColor: 'black',
        inactiveTintColor: '#565656',
        style: {
          backgroundColor:'rgba(255, 255, 255, 0.4)',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
        },
      }}>
      
      <Tab.Screen name="Disco" component={Discover} />
      <Tab.Screen name="Create" component={ChooseYourEvent} />
      <Tab.Screen name="MyEvent" component={MyEvents} />
      
      </Tab.Navigator>
      
      
      
      
      );
    }
    
export default function (props) {
      

      
  /*     const [visible, setVisible] = useState(false);
      const toggleOverlay = () => {
        setVisible(!visible);
      };
      
      
      const [image, setImage] = useState(null);
      const [avatar, setAvatar] = useState(require('./assets/defaultAvatar.jpeg'))
      const [token, setToken] = useState('')
      
      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
       [];})
      
      const pickAvatar = async () => {
        let avatar = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [200, 200],
          quality: 1,
          base64: true
        });
        
        if (!avatar.cancelled) {
        setImage(avatar.uri);
        setAvatar(avatar.uri)
      }}

var avatarView = image && <Image source={{uri: image}} style={styles.avatar}/>

if (image === null) {avatarView = <Image source={require('./assets/defaultAvatar.jpeg')} style={styles.avatar}/>}

// GESTION DES TAGS

const [sports, setSports] = useState(false);
const [theatre, setTheatre] = useState(false);
const [games, setGames] = useState(false);
const [politics, setPolitics] = useState(false);
const [music, setMusic] = useState(false);
const [ecology, setEcology] = useState(false);
const [fashion, setFashion] = useState(false);
const [milf, setMilf] = useState(false);
const [movies, setMovies] = useState(false);

const [tags, setTags] = useState([]) */
    
    
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
  } else 

  return (
    <Provider store={store}>
        <NavigationContainer>
         
              <Stack.Navigator headerMode='none'>
            
                <Stack.Screen name="TabNav" component={TabNav} />
                <Stack.Screen name="CreateMyPublicEvent" component={CreateMyPublicEvent} />
                <Stack.Screen name="CreateMyPrivateEvent" component={CreateMyPrivateEvent} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Header" component={HeaderScreen} />
                <Stack.Screen name="Settings" component={Settings} />


              </Stack.Navigator>
        </NavigationContainer> 
    </Provider>

  );}

  const styles = StyleSheet.create({

    overlay: {
        height: (7/10)*screen.height,
        width: (8/10)*screen.width,
        backgroundColor: '#011520'
              },

    title: {
      color: 'white',
      fontFamily: 'Poppins_200ExtraLight',
      fontSize : 12,
      marginTop: 10
    },

    settingsTitle: {
      color: 'white',
      fontFamily: 'Poppins_200ExtraLight',
      fontSize : 12,
      marginTop: 17

    },

    userName: {
      color: 'white',
      fontFamily: 'Poppins_400Regular',
      fontSize : 20,
      marginTop: 10
    },

    avatar: {
      
      height: 80,
      width: 80,
      borderRadius: 80,
      position: 'absolute'
    },

    avatarChange:  {
      backgroundColor: 'transparent',
      height: 80,
      width: 80,
      borderRadius: 80,
      
    },

    nbreEvent: {
      color: 'white',
      fontFamily: 'Poppins_400Regular',
      fontSize : 12,
      marginTop: 20
      },
    
    nbreEventPresent: {
      color: 'white',
      fontFamily: 'Poppins_400Regular',
      fontSize : 12,
      marginTop: 2
      },
    
    hairline: {
      backgroundColor: 'white',
      width: 210,
      height: 1,
      marginTop: 40
    },

    checkBoxContainer: {
      borderColor: 'transparent', 
      backgroundColor: 'transparent', 
      margin: 18, 
      padding: 2
    },

    checkBoxText: {
      color: 'white'

    }

      })
