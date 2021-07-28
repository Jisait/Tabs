import React, { useState, useEffect }  from 'react';
import { Header, Button, Overlay, CheckBox  } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StatusBar} from 'react-native';
import { connect } from 'react-redux';




export function HeaderScreen(props) {



if (props.token === null) {

    return (
    <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Header
                placement="left"
                leftComponent={{  icon: 'account-circle', color: 'white', size: 22, marginTop: 0,  marginLeft: 12 }}
                containerStyle={{
                backgroundColor: '#011520',
                justifyContent: 'space-around',
                paddingBottom: 0,borderBottomColor: 'transparent', borderTopColor: 'transparent'
                }}
                rightComponent={{ text: 'tab.', style: { color: '#fff', fontFamily: 'Poppins_400Regular', fontSize: 19, marginTop: -2, marginRight: 14} }}/>
    </Pressable>

    
    )  
} else {
    
    
    return (
<Pressable onPress={() => props.navigation.navigate('Settings')}>
            <Header
            placement="left"
            leftComponent={{  icon: 'account-circle', color: 'white', size: 22, marginTop: 0,  marginLeft: 12 }}
            containerStyle={{
            backgroundColor: '#011520',
            justifyContent: 'space-around',
            paddingBottom: 0,borderBottomColor: 'transparent', borderTopColor: 'transparent'
            }}
            rightComponent={{ text: 'tab.', style: { color: '#fff', fontFamily: 'Poppins_400Regular', fontSize: 19, marginTop: 0, marginRight: 14} }}/>
</Pressable>

    )}
        }





function mapStateToProps(state) {
    return { token: state.token }
    }
    
    export default connect(
    mapStateToProps,
    null
    )(HeaderScreen);