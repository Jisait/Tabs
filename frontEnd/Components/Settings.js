import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { } from 'react-native-elements';
import {  Pressable , Image, Text, View,  StyleSheet, Dimensions, ScrollView, ImageComponent, ImageBackground } from 'react-native';
import { Header, Button, Overlay, CheckBox  } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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



function Settings(props) {

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };


const [image, setImage] = useState(null);
const [avatar, setAvatar] = useState(require('../assets/defaultAvatar.jpeg'))

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

if (image === null) {avatarView = <Image source={require('../assets/defaultAvatar.jpeg')} style={styles.avatar}/>}

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

const [tags, setTags] = useState([])


  
  console.log((2/10)*screen.height)

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
      <View style={styles.overlay}>
      <View style= {{justifyContent: 'center', alignItems: 'center'}}>
      <Text style= {styles.title}>My account</Text>
      <Text style= {styles.userName}>UserPseudo</Text>
          {/*   <View style= {{position: 'relative', marginTop: 7}}>
                           {avatarView} 
                  <Pressable style={styles.avatarChange} onPress={pickAvatar} ></Pressable>
            </View> */}
        <Text style= {styles.nbreEvent}>Number of event organize : 76</Text>
        <Text style= {styles.nbreEventPresent}>I've been to 137 events</Text>
        <View style= {styles.hairline}></View>
        <Text style= {styles.settingsTitle}>Settings</Text>
        <Text style= {styles.userName}>Choose your favorite theme</Text>

  <View style= {{border: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 80}}>
      <View style={{flexDirection: 'column', marginBottom: 0}}>

          <CheckBox
          title='sports'
          textStyle={styles.checkBoxText}
          checked={sports}
          onPress={()=> {sports === false ? setSports(true) : setSports(false); sports === false ? setTags([...tags, 'sports']) : setTags(currentTag => currentTag.filter(tags => tags !== 'sports'))}}
          checkedIcon='check-square'
          uncheckedIcon='square'
          containerStyle={styles.checkBoxContainer}
          checkedColor='#FFF1DC'
          uncheckedColor='white'/>
        <CheckBox
        title='theatre'
        textStyle={styles.checkBoxText}
        checked={theatre}
        onPress={()=> {theatre === false ? setTheatre(true) : setTheatre(false); theatre === false ? setTags([...tags, 'theatre']) : setTags(currentTag => currentTag.filter(tags => tags !== 'theatre'))}}
        checkedIcon='check-square'
        uncheckedIcon='square'
       containerStyle={styles.checkBoxContainer}
        checkedColor='#FFF1DC'
        uncheckedColor='white'/>
            <CheckBox
            title='movies'
            textStyle={styles.checkBoxText}
            checked={movies}
            onPress={()=> {movies === false ? setMovies(true) : setMovies(false); movies === false ? setTags([...tags, 'movies']) : setTags(currentTag => currentTag.filter(tags => tags !== 'movies'))}}
            checkedIcon='check-square'
            uncheckedIcon='square'
           containerStyle={styles.checkBoxContainer}
            checkedColor='#FFF1DC'
            uncheckedColor='white'/>
         </View>
         
         <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <CheckBox
            title='games'
            textStyle={styles.checkBoxText}
            checked={games}
            onPress={()=> {games === false ? setGames(true) : setGames(false); games === false ? setTags([...tags, 'games']) : setTags(currentTag => currentTag.filter(tags => tags !== 'games'))}}
            checkedIcon='check-square'
            uncheckedIcon='square'
            containerStyle={styles.checkBoxContainer}
            checkedColor='#FFF1DC'
            uncheckedColor='white'/>
        <CheckBox
        title='music'
        textStyle={styles.checkBoxText}
        checked={music}
        onPress={()=> {music === false ? setMusic(true) : setMusic(false); music === false ? setTags([...tags, 'music']) : setTags(currentTag => currentTag.filter(tags => tags !== 'music'))}}
        checkedIcon='check-square'
        uncheckedIcon='square'
       containerStyle={styles.checkBoxContainer}
        checkedColor='#FFF1DC'
        uncheckedColor='white'/>
            <CheckBox
            title='fashion'
            textStyle={styles.checkBoxText}
            checked={fashion}
            onPress={()=> {fashion === false ? setFashion(true) : setFashion(false); fashion === false ? setTags([...tags, 'fashion']) : setTags(currentTag => currentTag.filter(tags => tags !== 'fashion'))}}
            checkedIcon='check-square'
            uncheckedIcon='square'
           containerStyle={styles.checkBoxContainer}
            checkedColor='#FFF1DC'
            uncheckedColor='white'/>
         </View>
      
         <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <CheckBox
            title='politics'
            textStyle={styles.checkBoxText}
            checked={politics}
            onPress={()=> {politics === false ? setPolitics(true) : setPolitics(false); politics === false ? setTags([...tags, 'politics']) : setTags(currentTag => currentTag.filter(tags => tags !== 'politics'))}}
            checkedIcon='check-square'
            uncheckedIcon='square'
           containerStyle={styles.checkBoxContainer}
            checkedColor='#FFF1DC'
            uncheckedColor='white'/>
        <CheckBox
        title='ecology'
        textStyle={styles.checkBoxText}
        checked={ecology}
        onPress={()=> {ecology === false ? setEcology(true) : setEcology(false); ecology === false ? setTags([...tags, 'ecology']) : setTags(currentTag => currentTag.filter(tags => tags !== 'ecology'))}}
        checkedIcon='check-square'
        uncheckedIcon='square'
       containerStyle={styles.checkBoxContainer}
        checkedColor='#FFF1DC'
        uncheckedColor='white'/>
            <CheckBox
            title='MILF'
            textStyle={styles.checkBoxText}
            checked={milf}
            onPress={()=> {milf === false ? setMilf(true) : setMilf(false); milf === false ? setTags([...tags, 'milf']) : setTags(currentTag => currentTag.filter(tags => tags !== 'milf'))}}
            checkedIcon='check-square'
            uncheckedIcon='square'
            containerStyle={styles.checkBoxContainer}
            checkedColor='#FFF1DC'
            uncheckedColor='white'/>
         </View>
         
         </View>


      </View>
      


  
    </View>
            );
          }}


const screen = Dimensions.get("screen"); 
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
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(Settings);