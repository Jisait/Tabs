import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import { } from 'react-native-elements';
import {  Pressable , Image, Text, Button, View,  StyleSheet, Dimensions, ScrollView, ImageComponent, ImageBackground } from 'react-native';
import { Overlay, CheckBox, Input  } from 'react-native-elements';
import HeaderScreen from './Header' 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
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
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';



function Settings(props) {

  const isFocused = useIsFocused();


  console.log("inSett", props.token)
 
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')


  const [sports, setSports] = useState(false);
  const [party, setParty] = useState(false);
  const [games, setGames] = useState(false);
  const [politics, setPolitics] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [ecology, setEcology] = useState(false);
  const [indoor, setIndoor] = useState(false);
  const [culture, setCulture] = useState(false);
  const [misc, setMisc] = useState(false);



const [tags, setTags] = useState([])


  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
    setName(newName)
  };

  const [visibleDisconnect, setVisibleDisconnect] = useState(false);
  const toggleOverlayDisconnect = () => {
    setVisibleDisconnect(!visibleDisconnect);
  };

  const changeName = async () => {
    const dataName = await fetch('http://'+props.ip+':3000/edit-userName', {
      method: 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'token='+props.token+'&name='+newName
    }) 
  }

var verified={display: 'none'}

    useEffect(() => {
      (async () => {
        const data = await fetch('http://'+props.ip+':3000/get-user', {
          method: 'POST', 
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: 'token='+props.token
        })
        const body =  await data.json();
        console.log("???", body.user.verified)
        setAvatar(body.user.avatar)
        setName(body.user.username)
        verified = {display: 'flex'}
    
          })();
      }, []);  

      useEffect(() => {
      if (props.tags.some(x => x=='Sports')){
        setSports(true);
      }
      if (props.tags.some(x => x=='Games')){
        setGames(true)
}
      if (props.tags.some(x => x=='Party')){

        setParty(true);
}
      if (props.tags.some(x => x=='Politics')){
        setPolitics(true);
}
     if (props.tags.some(x => x=='Outdoor')){
        setOutdoor(true);
}
      if (props.tags.some(x => x=='Ecology')){
        setEcology(true);
}
        if (props.tags.some(x => x=='Indoor')){
        setIndoor(true);
}
        if (props.tags.some(x => x=='Culture')){
        setCulture(true);
}
        if (props.tags.some(x => x=='Misc')){
        setMisc(true);
}

setTags(props.tags)
console.log(props.tags)

      }, [isFocused]);  
 


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
          }

          var data = new FormData();
          data.append("picture", {
            uri: avatar.uri,
            type: "image/jpeg",
            name: "event_picture.jpg",
          });
          
          var rawResponse = await fetch("http://"+props.ip+":3000/pictureUpload", {
          method: "post",
          body: data,
          
          });

          var response = await rawResponse.json();
          console.log('voyons', response.url)
          setAvatar(response.url)

          const dataAvatar = await fetch('http://'+props.ip+':3000/edit-userAvatar', {
            method: 'POST', 
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'token='+props.token+'&avatar='+response.url
          }) 

      }



var avatarView = image && <Image source={{uri: image}} style={styles.avatar}/>

if (image === null) {avatarView = <Image source={{uri: avatar}} style={styles.avatar}/>}




  


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

    var handleTags = (tag)=>{

      //SPORTS
        if (tag == 'Sports'){
          if (sports == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Sports')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setSports(!sports)
        }
      
        else if (tag == 'Party'){
          if (party == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Party')
            setTags(temp)
            props.onSubmitTags(temp);
          }
      
          setParty(!party)
        }
      
        else if (tag == 'Culture'){
          if (culture == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Culture')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setCulture(!culture)
      
        }
      
        //GAMES
        else if (tag == 'Games'){
          if (games == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Games')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setGames(!games)
        }
      
        else if (tag == 'Indoor'){
          if (indoor == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Indoor')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setIndoor(!indoor)
      
        }
        else if (tag == 'Outdoor'){
          if (outdoor == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Outdoor')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setOutdoor(!outdoor)
      
        }
        else if (tag == 'Politics'){
          if (politics == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Politics')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setPolitics(!politics)
      
        }
        else if (tag == 'Ecology'){
          if (ecology == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);

          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Ecology')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setEcology(!ecology)
      
        }
        else if (tag == 'Misc'){
          if (misc == false){
            var temp = tags
            temp.push(tag)
            setTags(temp)
            props.onSubmitTags(temp);
          }
          else{
            var temp = tags
            temp = temp.filter(tag => tag !== 'Misc')
            setTags(temp)
            props.onSubmitTags(temp);
          }
          setMisc(!misc)
        }
      console.log(tags)
      console.log('redux', props.tags)

      }

 
  

    return (
      <View style={styles.overlay}>
              <HeaderScreen navigation={props.navigation}/>
            
              <MaterialCommunityIcons  onPress={toggleOverlayDisconnect} style= {{position: 'absolute', right: 30, top: 130}} name="account-cancel" size={24} color="white" />

              <Overlay isVisible={visibleDisconnect}>
    
                  <View style={{display: 'flex', alignItems: 'center', height: (3.8/10)*screen.height, width: (7/10)*screen.width, paddingTop: 30, paddingHorizontal: 20, borderRadius: 70}}>
                    <MaterialCommunityIcons  name="account-cancel" size={120} color="#BA0000" />
                
                  
                  <Text style={styles.createTextConfirm}>Hope to see you soon !</Text>
                  <Pressable style={styles.buttonConfirm} onPress={() => {AsyncStorage.clear(), setVisibleDisconnect(false), props.navigation.navigate('Disco'),  props.onSubmitToken()}}>
                      <Text style={styles.textConfirm}>Disconnect ?</Text>
                  </Pressable>
                  </View>
              </Overlay>
        
      <View style= {{justifyContent: 'center', alignItems: 'center'}}>
      <Text style= {styles.title}>My account</Text>
      
      <Pressable onPress={toggleOverlay} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Text style= {styles.userName}>{name}</Text><Text style={verified}><FontAwesome name="check-circle" size={20} color='#89CFF0' /></Text>

      </Pressable>

      <Overlay style={styles.overlayContainer} isVisible={visible} onBackdropPress={() => {toggleOverlay();changeName()}}>
        <View >

          <Text style={styles.overlayText}>Want to change your pseudo ?</Text>
        <Input
              placeholder={name}
              
              style={styles}
              onChangeText={(val) => setNewName(val)}/>
 
        </View>
      </Overlay>

     <View style= {{position: 'relative', marginTop: 7}}>
                           {avatarView} 
      <Pressable style={styles.avatarChange} onPress={pickAvatar} ></Pressable>
  </View> 
        <Text style= {styles.nbreEvent}>Hosted events: 3</Text>
        <Text style= {styles.nbreEventPresent}>Attended events: 12</Text>
        <View style= {styles.hairline}></View>
        <Text style= {styles.settingsTitle}>Settings</Text>
        <Text style= {styles.userName}>Choose your favorite themes</Text>

  <View style= {{border: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 80}}>



      <View style={{flexDirection: 'column', marginBottom: 0}}>
        
      <CheckBox
      title='Sports'
      textStyle={styles.checkBoxText}
      checked={sports}
      onPress={() => {handleTags('Sports')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Party'
      textStyle={styles.checkBoxText}
      checked={party}
      onPress={()=> {handleTags('Party')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Misc'
      textStyle={styles.checkBoxText}
      checked={misc}
      onPress={()=> {handleTags('Misc')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      </View>
      
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
      <CheckBox
      title='Games'
      textStyle={styles.checkBoxText}
      checked={games}
      onPress={()=> {handleTags('Games')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Outdoor'
      textStyle={styles.checkBoxText}
      checked={outdoor}
      onPress={()=> {handleTags('Outdoor')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Indoor'
      textStyle={styles.checkBoxText}
      checked={indoor}
      onPress={()=> {handleTags('Indoor')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      </View>
      
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
      <CheckBox
      title='Politics'
      textStyle={styles.checkBoxText}
      checked={politics}
      onPress={()=> {handleTags('Politics')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Ecology'
      textStyle={styles.checkBoxText}
      checked={ecology}
      onPress={()=> {handleTags('Ecology')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#FFF1DC'
      uncheckedColor='white'/>
      <CheckBox
      title='Culture'
      textStyle={styles.checkBoxText}
      checked={culture}
      onPress={()=> {handleTags('Culture')}}
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

  overlayContainer: {
      
      backgroundColor: 'white',
      width: 200,
      height: 100

  },

  text: {
    flex: 1,
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify'
  },
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

  textConfirm: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#FFD99F',
  },

  createTextConfirm: {
    fontSize: 18,
    color: '#011520',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
    marginTop: 20
    },


  buttonConfirm: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 14,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0E0812',},

  overlayText: {
      fontFamily: 'Poppins_300Light',
      fontSize: 12,
  },

  overlay: {
    flex: 1,
    
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


 function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function () {
      dispatch({ type: "deconnectUser" });
    },
    onSubmitTags: function (tags) {
      dispatch({ type: "addTags", tags: tags });
    },
  };
} 


function mapStateToProps(state) {
  return { token: state.token, ip: state.ip, tags: state.tags  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);