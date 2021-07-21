import React from 'react';
import { ImageBackground, Image,  Text, View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import CardImage3 from './CardImage3.js'
import { Header } from 'react-native-elements';


export default function AppV2() {

  


   
    return (

    

        <View style={{flex:0.65, alignItems: 'center'}}>
 

{/* <ScrollView style={{flex:1}}> */}
 
    <CardImage3/>

{/* </ScrollView> */}
   


      </View>
     
    );
  }


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 19,
    marginBottom: 5,
  },
});


