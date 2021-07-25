import { LogBox } from 'react-native';
import React, { useState, useEffect }  from 'react';
LogBox.ignoreLogs(['Warning: ...']);
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading';
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import { Header, Button, Overlay  } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './Components/Discover';
import ChooseYourEvent from './Components/ChooseYourEvent';
import MyEvents from './Components/MyEvents';
import Login from './Components/Login'
import { Ionicons } from '@expo/vector-icons';
import CreateMyEvent from './Components/CreateMyEvent';
import * as ImagePicker from 'expo-image-picker';
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
              <Tab.Screen name="Login" component={Login} />

          </Tab.Navigator>
           
       
  
     
  );
  }

  export default function App() {

    const [visible, setVisible] = useState(false);
      const toggleOverlay = () => {
        setVisible(!visible);
      };

  
    const [image, setImage] = useState(null);
    const [avatar, setAvatar] = useState(require('./assets/defaultAvatar.jpeg'))

   useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
    
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

        <NavigationContainer>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} backdropStyle={{backgroundColor: 'rgba(0,0,0,0.6)'}} overlayStyle={styles.overlay}>
        <View style= {{justifyContent: 'center', alignItems: 'center'}}>
        <Text style= {styles.title}>My account</Text>
        <Text style= {styles.userName}>UserPseudo</Text>
              <View style= {{position: 'relative', marginTop: 7}}>
                              {avatarView}
                    <Pressable style={styles.avatarChange} onPress={pickAvatar} ></Pressable>
              </View>
          <Text style= {styles.nbreEvent}>Number of event organize : 76</Text>
          <Text style= {styles.nbreEventPresent}>I've been to 137 events</Text>
          <View style= {styles.hairline}></View>
        </View>
      </Overlay>
              <Header
                placement="left"
                leftComponent={{  icon: 'settings', color: 'white', size: 30, marginTop: 10,  marginLeft: 12, onPress: () => toggleOverlay() }}
                containerStyle={{
                  backgroundColor: '#011520',
                  justifyContent: 'space-around',
                  paddingBottom: 0
                }}
                rightComponent={{ text: 'teub.', style: { color: '#fff', fontFamily: 'Poppins_400Regular', fontSize: 28, marginTop: 5, marginRight: 14} }}/>

              <Stack.Navigator headerMode='none'>
                <Stack.Screen name="TabNav" component={TabNav} />
                <Stack.Screen name="CreateMyEvent" component={CreateMyEvent} />
              </Stack.Navigator>
        </NavigationContainer> 
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
    }

      })
