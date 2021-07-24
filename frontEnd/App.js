import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading';
import Animated from 'react-native-reanimated';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './Components/Discover';
import ChooseYourEvent from './Components/ChooseYourEvent';
import MyEvents from './Components/MyEvents';
import Login from './Components/Login'
import { Ionicons } from '@expo/vector-icons';
import CreateMyEvent from './Components/CreateMyEvent';
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
              <Header
                placement="left"
                leftComponent={{ icon: 'settings', color: 'white', size: 30, marginTop: 10,  marginLeft: 12 }}
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
