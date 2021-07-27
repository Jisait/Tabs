import React, { useState, useEffect }  from 'react';
import { Header, Button, Overlay, CheckBox  } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable} from 'react-native';





export default function HeaderScreen(props) {

    return (
<Pressable onPress={() => props.navigation.navigate('Settings')}>
            <Header
            placement="left"
            leftComponent={{  icon: 'settings', color: 'white', size: 30, marginTop: 10,  marginLeft: 12 }}
            containerStyle={{
            backgroundColor: '#011520',
            justifyContent: 'space-around',
            paddingBottom: 0,borderBottomColor: 'transparent', borderTopColor: 'transparent'
            }}
            rightComponent={{ text: 'tab.', style: { color: '#fff', fontFamily: 'Poppins_400Regular', fontSize: 28, marginTop: 5, marginRight: 14} }}/>
</Pressable>

    )}