import React, { useState, useEffect }  from 'react';
import AppLoading from 'expo-app-loading';
import HeaderScreen from './Header' 

import { Pressable, Image, ImageBackground, Text, View,  StyleSheet, Dimensions, ScrollView, TextInput, Button, Platform, StatusBar } from 'react-native';
import { CheckBox, Overlay } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';



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

function CreateYourEvent(props) {
  
  
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
  
  // RECUPERATION DE LA PHOTO DEPUIS LA BIBLIOTHEQUE DU TELEPHONE
  
  const [image, setImage] = useState(null);
  const [imageBDD, setImageBDD] = useState('')
  
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
  
  const pickImage = async () => {
    let picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [360, 570],
      quality: 1,
      base64: true
    });
    
    if (!picture.cancelled) {
      setImage(picture.uri);
    }
    

    
    var data = new FormData();
    data.append("picture", {
      uri: picture.uri,
      type: "image/jpeg",
      name: "event_picture.jpg",
    });
    
    var rawResponse = await fetch("http://"+props.ip+":3000/pictureUpload", {
    method: "post",
    body: data,
  });
  
  var response = await rawResponse.json();
  setImageBDD(response.url)
  
};

var iconImagePicker = <Pressable onPress={pickImage}>
<Ionicons name="image-outline" size={110} color="black" style={{marginTop: 140, color: '#011520'}}/> 
</Pressable>

// GESTION DE LA DATE 

const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
};



const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

const showTimepicker = () => {
  showMode('time');
};



var transformDate = new Date(date);
var jour = transformDate.getDate();
if (jour === 1) { jour = '1st'}
else if (jour === 2) {jour = '2nd'}
else if (jour === 3) {jour = '3rd'}
else if (jour > 3) { jour = jour+'th'}
var month = transformDate.getMonth();
var monthsName = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];

var selectedMonthName = monthsName[month];

var year = transformDate.getFullYear()
var hour = transformDate.getHours()
var minutes = transformDate.getMinutes();
if (minutes < 10) {minutes = '0'+minutes}
var dateFront = selectedMonthName+' '+jour+', '+year+' - '+hour+':'+minutes

var dateView =   <View style={{width: '100%',position: 'relative', left: 36, bottom: 0}}>

</View>  

if(transformDate !== '1970') {
  dateView =   <View style={{width: '100%',position: 'relative', left: 22, bottom: 0, top: 3}}>
  <Text style={styles.date}>{dateFront}</Text>
  </View> }
  
  
  
  //GESTION DE L'ADRESSE
  
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [frontAddress, setFrontAddress] = useState('')
  
  var myRegex = / /gi;
  var addressAPIformat = address.replace(myRegex, "+");
  
  useEffect(() => {
    const findAddress = async() => {
      
      var rawResponse = await fetch("https://api-adresse.data.gouv.fr/search/?q="+addressAPIformat);
      var response = await rawResponse.json();
      
      setLatitude(response.features[0].geometry.coordinates[0]);
      setLongitude(response.features[0].geometry.coordinates[1]);
      setFrontAddress(response.features[0].properties.label)
      
    }
    
    findAddress()  
    
  }, [address]);
  
  
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
  

  
  /*       useEffect(() => {
    sports === true ? setTags([...tags, 'sports']) : setTags(currentTag => currentTag.filter(tags => tags !== 'sports'));
    games === true ? setTags([...tags, 'games']) : setTags(currentTag => currentTag.filter(tags => tags !== 'games'));
    
  }, [sports, games]);
  */

  
  
  //CREATION DE L'EVENT
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [visible, setVisible] = useState(false);
  
  
  
  
  var handlePublishOnDisco = async (title, desc, img, frontAddress, longitude, latitude, date, dateFront, tags) => {
    console.log('TAGS BEFORE SENT TO BACK =>',tags)
    if (props.token === null)
    {props.navigation.navigate('Login')}
    else{
      setVisible(true)
      const data = await fetch('http://'+props.ip+':3000/add-event', {
      method: 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'publique=true&title='+title+'&desc='+desc+'&image='+img+'&address='+frontAddress+'&longitude='+longitude+'&latitude='+latitude+'&dateUTC='+date+'&dateFront='+dateFront+'&tags='+tags+'&token='+props.token
    })
    const body =  await data.json();
  }
  
}

var handleTags = (tag)=>{

//SPORTS
  if (tag == 'sports'){
    if (sports == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'sports')
      setTags(temp)
    }
    setSports(!sports)
  }

//THEATRE
  else if (tag == 'theatre'){
    if (theatre == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'theatre')
      setTags(temp)
    }

    setTheatre(!theatre)
  }

  //MOVIES
  else if (tag == 'movies'){
    if (movies == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'movies')
      setTags(temp)
    }
    setMovies(!movies)

  }

  //GAMES
  else if (tag == 'games'){
    if (games == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'games')
      setTags(temp)
    }
    setGames(!games)
  }

  //MUSIC
  else if (tag == 'music'){
    if (music == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'music')
      setTags(temp)
    }
    setMusic(!music)

  }
  else if (tag == 'fashion'){
    if (fashion == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'fashion')
      setTags(temp)
    }
    setFashion(!fashion)

  }
  else if (tag == 'politics'){
    if (politics == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'politics')
      setTags(temp)
    }
    setPolitics(!politics)

  }
  else if (tag == 'ecology'){
    if (ecology == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'ecology')
      setTags(temp)
    }
    setEcology(!ecology)

  }
  else if (tag == 'MILF'){
    if (milf == false){
      var temp = tags
      temp.push(tag)
      setTags(temp)
    }
    else{
      var temp = tags
      temp = temp.filter(tag => tag !== 'MILF')
      setTags(temp)
    }
    setMilf(!milf)
  }
console.log(tags)
}

if (image != null) {iconImagePicker= <View></View>} 


if (!fontsLoaded) {
  return <AppLoading />;
} else {
  
  return (
    <View style={{flex:1}}>
       <HeaderScreen navigation={props.navigation}/>
       <StatusBar backgroundColor="#011520" />
    <View style={{flex:1, alignItems: 'center',  backgroundColor: 'transparent'}}>
          
    <LinearGradient
    colors={['#FFF1DC','#FFF1DC']}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom:0,
      height: '100%',
      
    }}/>
    
    <Overlay isVisible={visible}>
    
    <View style={{display: 'flex', alignItems: 'center', height: (5/10)*screen.height, width: (7/10)*screen.width, paddingTop: 30, paddingHorizontal: 20, borderRadius: 70}}>
    <Ionicons name="ios-checkmark-circle-outline" size={120} color="#1AC83C" />
    <Text style={styles.createTextBold}>Congratulations!</Text>
    
    <Text style={styles.createTextConfirm}>Your Event has been posted</Text>
    <Pressable style={styles.buttonConfirm} onPress={() => {props.navigation.navigate('Disco'), setVisible(false)}}>
    <Text style={styles.text}>Go to home</Text>
    </Pressable>
    </View>
    </Overlay>
    
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    <Text style={styles.createText}>
    {'create your '}
    </Text>
    <Text style={styles.createTextBold}>
    {'public '}
    </Text>
    <Text style={styles.createText}>
    {'event '}
    </Text>
    </View>
    
    <ScrollView style={{flex:1}}> 
    
    
    <View style={{flex: 1, height: (6.5/10)*screen.height, flexDirection: 'column', width: (9/10)*screen.width, paddingTop: 30}}>
    
    
    
    <ImageBackground position= 'relative' imageStyle={{ borderRadius: 28, marginBottom: 25}} style={styles.imgBackground}>
    {image && <Image source={{ uri: image }} style={styles.imgBackground} />}
    
    <LinearGradient
    colors={['transparent','rgba(0,0,0,0.8)']}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom:0,
      height: '50%',
      borderRadius: 28
    }}/>
    <View style={{ top: 0, right: 0, bottom: 0, left: 0}}>
    {iconImagePicker}
    </View>
    </ImageBackground>
    
    
    
    <View style={{width: '85%', position: 'absolute', marginLeft: 24, bottom: 100, color: 'red'}}>
    <TextInput  style= {styles.inputEventName}
    placeholderTextColor="white"
    placeholder="Event's name"
    containerStyle={{ width: '70%' }}
    onChangeText={(val) => setTitle(val)}/>
    
    <TextInput  style= {styles.inputEventDesc}
    placeholderTextColor="white" 
    placeholder="Event's name" 
    containerStyle={{ width: '70%' }}
    onChangeText={(val) => setDesc(val)}/>
    
    </View>
    <View style={{flexDirection: 'row',justifyContent: 'space-around' }}>
    
    <Pressable style={styles.button}>
    <Text style={styles.dateButton} onPress={showDatepicker}>Select a date</Text>
    </Pressable>
    <Pressable style={styles.button}>
    <Text style={styles.dateButton} onPress={showTimepicker}>Select a schedule</Text>
    </Pressable>
    
    
    {show && (
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
      />
      )}
      
      </View>
      
      {dateView}
      
      
      
      </View>
      
      <View style={{width: '85%', marginLeft: 24,position: 'relative', color: 'red'}}>
      <TextInput  style= {styles.inputEventAddress}
      placeholderTextColor="black"
      placeholder="Event's address"
      containerStyle={{ width: '70%' }}
      onChangeText={(val) => setAddress(val)}/>
      
      </View>
      
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.hairlineBlack}></View>
      <Text style={styles.Select}>Select 3 tags</Text>
      <View style={styles.hairlineBlack}></View>
      </View>
      
      <View style= {{flex: 1,border: 2, flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 0}}>
      
      <CheckBox
      title='sports'
      checked={sports}
      onPress={() => {handleTags('sports')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='theatre'
      checked={theatre}
      onPress={()=> {handleTags('theatre')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='movies'
      checked={movies}
      onPress={()=> {handleTags('movies')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      </View>
      
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
      <CheckBox
      title='games'
      checked={games}
      onPress={()=> {handleTags('games')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='music'
      checked={music}
      onPress={()=> {handleTags('music')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='fashion'
      checked={fashion}
      onPress={()=> {handleTags('fashion')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      </View>
      
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
      <CheckBox
      title='politics'
      checked={politics}
      onPress={()=> {handleTags('politics')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='ecology'
      checked={ecology}
      onPress={()=> {handleTags('ecology')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      <CheckBox
      title='MILF'
      checked={milf}
      onPress={()=> {handleTags('MILF')}}
      checkedIcon='check-square'
      uncheckedIcon='square'
      containerStyle={styles.checkBoxContainer}
      checkedColor='#011520'
      uncheckedColor='white'/>
      </View>
      
      </View>
      
      
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 70, marginBottom: 170}}>
      <Pressable style={styles.button}>
      <Text style={styles.text} onPress={()=>{handlePublishOnDisco(title, desc, imageBDD, frontAddress, longitude, latitude, date, dateFront, tags)}}>GO TO OVERVIEW</Text>
      </Pressable>
      </View>
      
      
      
      
      
      
      
      
      
      
      
      
      </ScrollView>
      
      </View>
      </View>
      
      
      );
      
    }}
    
    
    const styles = StyleSheet.create({
      
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


      
      inputEventName: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        fontSize: 28,
        fontFamily: 'Poppins_400Regular'},
        
        
        inputEventDesc: {
          color: 'white',
          borderBottomWidth: 1,
          borderColor: 'white',
          
          fontSize: 16,
          fontFamily: 'Poppins_400Regular'},
          
          inputEventDate: {
            color: 'black',
            borderBottomWidth: 1,
            borderColor: 'black',
            fontSize: 18,
            fontFamily: 'Poppins_500Medium'},
            
            inputEventAddress: {
              color: 'black',
              borderBottomWidth: 1,
              borderColor: 'black',
              fontSize: 16,
              fontFamily: 'Poppins_400Regular'},
              
              Select: {
                fontSize: 23,
                marginTop: 40,
                marginHorizontal: 12,
                marginBottom: 10,
                fontFamily: 'Poppins_500Medium'
                
              },
              
              hairlineBlack: {
                backgroundColor: 'black',
                height: 2,
                width: 40,
                marginTop: 24,
              },
              
              
              checkBoxContainer: {
                borderColor: 'transparent', 
                backgroundColor: 'transparent', 
                margin: 2, 
                padding: 2},
                
                createText: {
                  fontSize: 24,
                  color: '#011520',
                  fontFamily: 'Poppins_400Regular',
                  textAlign: 'justify',
                  marginTop: 20
                },

                createTextConfirm :{
                  fontSize: 24,
                  color: '#011520',
                  fontFamily: 'Poppins_400Regular',
                  textAlign: 'center',
                  marginTop: 20
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

                buttonConfirm: {
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 5,
                  paddingBottom: 2,
                  paddingHorizontal: 14,
                  borderRadius: 4,
                  elevation: 3,
                  backgroundColor: '#0E0812',
                },
                text: {
                  fontSize: 16,
                  fontFamily: 'Poppins_700Bold',
                  color: '#FFD99F',
                },
                
                createTextBold: {
                  
                  fontSize: 24,
                  color: '#011520',
                  fontFamily: 'Poppins_600SemiBold',
                  textAlign: 'justify',
                  marginTop: 20
                },
                
                
                
                imgBackground: {
                  width: '100%',
                  height: '100%',
                  
                  alignItems: 'center',
                  flex: 1 ,
                  backgroundColor: '#FFD99F',
                  borderRadius: 28,
                  marginBottom: 10
                },
                
                dateButton : {
                  fontSize: 16,
                  fontFamily: 'Poppins_400Regular',
                  color: '#FFF1DC',
                },
                
                date: {
                  marginTop: 3,
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins_500Medium',
                  
                },
                
                
              });
              
              function mapStateToProps(state) {
                return { token: state.token, ip: state.ip  }
              }
              
              export default connect(
                mapStateToProps,
                null
                )(CreateYourEvent);
                
                
                