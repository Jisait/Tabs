import React, { useState, useEffect, useRef } from "react";
import AppLoading from "expo-app-loading";
import {
  Pressable,
  Image,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar
} from "react-native";
import HeaderScreen from "./Header";
import { Overlay, SearchBar } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from 'react-native-select-dropdown';
import DoubleClick from 'react-native-double-click';
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
} from "@expo-google-fonts/poppins";

var getDistance = require("getdistance");

function Discover(props) {
  const isFocused = useIsFocused();

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

  const [isLiked, setIsLiked] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [mapContent, setMapContent] = useState({ latitude: 0, longitude: 0 });
  const [wishListContent, setWishListContent] = useState([]);
  const [userID, setUserID] = useState("");
  const [confirmedCheck, setConfirmedCheck] = useState([]);
  const [inMemory, setInMemory] = useState([]);
  const [byPseudo, setByPseudo] = useState("");

   



const [eventsWithLocation, setEventsWithLocation] = useState([]);

  function financial(x) {
    return Number.parseFloat(x).toFixed(1);
  }



  useEffect(() => {
    async function askPermissions() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
        });
      }
    }
    askPermissions();
    var ip = '172.17.1.116'
    props.onSubmitIP(ip);

  }, [])

  function findCommonElements3(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
};

  useEffect(() => {
    if (isFocused == true) {
      async function loadData() {
        // CHANGE POUR TON IP LORS DE RESR

        const data = await fetch("http://"+props.ip+":3000/get-event");
        var eventData = await data.json();
        var neweventDATA = eventData.events
        var provisionalEVENTS = [];
        for(var i =0; i<neweventDATA.length; i++){

          var distanceFromEvent = financial(
            getDistance(
              currentLatitude,
              currentLongitude,
              neweventDATA[i].longitude,
              neweventDATA[i].latitude,
              "km"
            )
          );
 
          neweventDATA[i].distance = financial(distanceFromEvent)
          neweventDATA[i].totalParticipants = neweventDATA[i].interestedParticipants.length + neweventDATA[i].confirmedParticipants.length

          provisionalEVENTS.push(neweventDATA[i])
          
          }
          provisionalEVENTS.sort(function(a, b) {return new Date(a.dateUTC) - new Date(b.dateUTC);});

          if(props.tags.length>0){
            var tempResult = [];

            for(var i=0; i<provisionalEVENTS.length; i++){
        
              if (findCommonElements3(provisionalEVENTS[i].tags, props.tags)){
              tempResult.push(provisionalEVENTS[i])
            }
            }
            tempResult.sort(function(a, b) {return new Date(a.dateUTC) - new Date(b.dateUTC);});

            for(var i=0; i<provisionalEVENTS.length; i++){
        
              if (tempResult.includes(provisionalEVENTS[i]) == false){
              tempResult.push(provisionalEVENTS[i])
            }
            }

            provisionalEVENTS = tempResult
          }

          setEvents(provisionalEVENTS)
          setInMemory(provisionalEVENTS)
          
    

      }
      loadData();

      AsyncStorage.getItem("token", async function (error, token) {
        if (token) {
          const data = await fetch("http://"+props.ip+":3000/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "token=" + token,
          });

          const body = await data.json();

          props.onSubmitToken(body.user.token);

          setWishListContent(body.user.myEvents);
          setUserID(body.user._id);

          const confirmed = await fetch(
            "http://"+props.ip+":3000/get-Myevents",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: "token=" + token,
            }
          );
          const confirmedBody = await confirmed.json();
          setConfirmedCheck(confirmedBody.myEvents);
        } else {
        }
      });
    }


  }, [isFocused]);




  const toggleOverlay = (event) => {
    setVisible(!visible);
    setMapContent({ latitude: event.latitude, longitude: event.longitude });
  };



  var SubmitTokenExist = () => {
       if (props.token ===null) {
        {props.navigation.navigate('Login')}
       } 
}


  var addToWishlist = async (event, isLiked) => {
    if (isLiked === false) {
      const data = await fetch("http://"+props.ip+":3000/add-to-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "token=" + props.token + "&id=" + event._id,
      });
      const body = await data.json();

      setWishListContent(body.user.myEvents);
    } else {
      const data = await fetch("http://"+props.ip+":3000/remove-from-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "token=" + props.token + "&id=" + event._id,
      });
      const body = await data.json();

      setWishListContent(body.user.myEvents);
    }
  };

 
  
  const filters = ["Date", "Popularity", "Distance"]

  var filterByselected = (selectedItem, index) => {
    if (selectedItem == 'Distance'){
  
      var temp = [... events]
      temp.sort(function(a, b) {return (a.distance - b.distance)});
      setEvents(temp)
    }
    else if(selectedItem == 'Popularity'){
  
      var temp = [... events]
      temp.sort(function(a, b) {return (b.totalParticipants - a.totalParticipants)});
      setEvents(temp)
    }
    else if(selectedItem == 'Date'){

      var temp = [... events]
      temp.sort(function(a, b) {return new Date(a.dateUTC) - new Date(b.dateUTC);});
      setEvents(temp)
    }
  }
  var discoverList;




  discoverList = events.map((event, index) => {
    var date1 = new Date()
    

    var date2 = new Date(event.dateUTC)

    console.log('ICI BG', date1, 'ET LA', date2)


    if (event.publique == true && date1<date2){
    var likeColor = "white";
    var checkVisible = { display: "none" };
    var likeVisible = { display: "flex" };

    var confirmCheck = event.confirmedParticipants.find(
      (element) => element == userID
    );

    if (confirmCheck != undefined) {
      likeVisible = { display: "none" };
      checkVisible = { display: "flex" };
    }

    var isLiked = false;

    var result = wishListContent.find((element) => element == event._id);

    if (result != undefined) {
      isLiked = true;
      likeColor = "red";
    }

    var verifiedTag; 
    if (event.admin.verified == true){
      verifiedTag = <FontAwesome key={index} name="check-circle" size={20} color='#89CFF0' />
    }


    var tagsForDiscover = [];
    for (var i=0; i<event.tags.length; i++){
      tagsForDiscover.push (<Text style={styles.tags}>{event.tags[i]}</Text>)
    }



    return (
      
      
      <View
        style={{
          flex: 1,
          height: (7.5 / 10) * screen.height,
          flexDirection: "column",
          width: (9 / 10) * screen.width,
          paddingTop: 30,
        }}
      >


        <ImageBackground
          position="relative"
          source={{ uri: event.image }}
          imageStyle={{ borderRadius: 28, marginBottom: 25 }}
          style={styles.imgBackground}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "50%",
              borderRadius: 28,
            }}
          />
        </ImageBackground>

        <View style={{ position: "absolute", right: 20, top: 45 }}>
          <FontAwesome
            key={index}
            onPress={() => {addToWishlist(event, isLiked); SubmitTokenExist()}}
            name="heart"
            size={30}
            color={likeColor}
            style={likeVisible}
          />
          <Ionicons
            name="checkmark-circle"
            size={30}
            color="lightgreen"
            style={checkVisible}
          />
        </View>

        <View style={{ position: "absolute", right: 20, top: 80 }}>
          <Text style={styles.participants}>{event.totalParticipants} participants</Text>
          
        </View>
    {/*     <View style={{ position: "absolute", right: 20, top: 108 }}>
                    <Text style={styles.tags}>{event.tags[0]}</Text>
        </View>
        <View style={{ position: "absolute", right: 20, top: 134 }}>
                    <Text style={styles.tags}>{event.tags[1]}</Text>
        </View>
        <View style={{ position: "absolute", right: 20, top: 160 }}>
                    <Text style={styles.tags}>{event.tags[2]}</Text>
        </View>
 */}
        <View style={{ position: "absolute", left: 150, bottom: 166 }}>
          <FontAwesome name="share-alt" size={26} color="white" />
        </View>

        <View style={{ position: "absolute", left: 220, bottom: 166 }}>
          <Text style={styles.distance}>{event.distance} km</Text>
        </View>

        <View style={{ position: "absolute", left: 190, bottom: 166 }}>
          <FontAwesome5
            key={index}
            name="map-marker-alt"
            size={26}
            color="white"
            onPress={() => {
              toggleOverlay(event);
            }}
          />
        </View>

        <View
          style={{
            width: "85%",
            position: "absolute",
            left: 36,
            top: 0.873 * (6.5 / 10) * screen.height,
          }}
        >
          
          <Text style={styles.text}>{event.title.toUpperCase()}</Text>
          <Text style={styles.subtext}>{event.desc}</Text>

        <View style={{ position: "absolute", left: -10, top: -80}}>
        {tagsForDiscover}
        </View>


        </View>

        <View
          style={{ width: "100%", position: "absolute", left: 28, bottom: 32 }}
        >
          <View style={styles.hairlineWhite} />
        </View>

        <View
          style={{ width: "100%", position: "absolute", left: 28, bottom: 6 }}
        >
          <View style={styles.hairlineBlack} />
        </View>

        <View
          style={{ width: "100%", position: "relative", left: 36, bottom: 0 }}
        >
          <Text style={styles.date}>{event.dateFront}</Text>
        </View>

        <View
          style={{ width: "100%", position: "relative", left: 36, bottom: 0 }}
        >
          <Text style={styles.adresse}>{event.address}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            left: 20,
            top: 45,
          }}
        >
       <ImageBackground
            source={{ uri: event.admin.avatar }}
            imageStyle={{ borderRadius: 50 }}
            style={styles.imgAvatar}
          /> 
          
     <Text style={styles.pseudo}>{event.admin.username}&nbsp;&nbsp;{verifiedTag}</Text>
        </View>
      </View>

    );}
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

/// searchbypseudo

var searchPseudo = (value) => {


  setEvents(inMemory)

    const filteredPseudo = inMemory.filter((event, index) => {

    let pseudoLowercase = (
      event.admin.username
    ).toLowerCase();
    let searchTermLowercase = value.toLowerCase();

      return pseudoLowercase.indexOf(searchTermLowercase) > -1;

    
  });

  for (var i=0; i < filteredPseudo.length; i++) {

      
    var index = filteredPseudo.slice(i+1).findIndex(user => user.admin.username === filteredPseudo[i].admin.username)
    
    if (index != -1) {filteredPseudo.splice(i, 1)}

  }

  setByPseudo(filteredPseudo);
   
};



var filteredByPseudo = (item) => {
  
 var temp = []
  const SearchByPseudo = events.map((event, index) => {
    if(event.admin._id === item.admin._id)
    {temp.push(event)}
  
  })
      

  setEvents(temp)
}



if (byPseudo.length > 5) {
  var renderItem = ({item}) => ( <Text></Text>)
} else {
  
  var renderItem = ({ item }) => (
   
    <View style={styles.searchListPseudoBackground}>
      <Pressable
          onPress={() => filteredByPseudo(item)} >
            
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 3, marginHorizontal: 9, width: 150}}>
        <ImageBackground
      source={{ uri: item.admin.avatar }}
      imageStyle={{ borderRadius: 50 }}
      style={styles.imgAvatarSearchList}
    /> 
        <Text style={styles.PseudoSearchList}>
          {item.admin.username}
        </Text>
        </View>
      </Pressable>
    </View>
  );
}









    return (
      <View style={{ flex: 1, alignItems: "center" }}>
      
        <HeaderScreen navigation={props.navigation} />
        <StatusBar backgroundColor="#011520" />
        <View style={styles.searchBarContainer}>
        <SearchBar
            containerStyle={{
              height: 6,
              color: "black",
              position: "relative",
              backgroundColor: "transparent",
              borderRadius: 30,
              border: "black",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              width: (5 / 10) * screen.width,
            }}
            inputContainerStyle={{ backgroundColor: "transparent", border: 0 }}
            inputStyle={{ color: "black", fontSize: 14 }}
            placeholder="Add friends..."
            onChangeText={(value) => searchPseudo(value)}  
            clearIcon={false}
            value={events} 
          /> 


          <Pressable>
            <View style={{ marginTop: 12, marginRight: -5 }}>
            <SelectDropdown
            defaultButtonText='Filter by date'
            
              buttonStyle={{
                
                height: 25,
                color: "red",
                position: "relative",
                backgroundColor: "transparent",
                borderRadius: 0,
                border: "red",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                width: (5/ 10) * screen.width,
               
              }}
              buttonTextStyle={{
                fontSize: 14,
                color: 'grey'
              }}
              dropdownStyle= {{
                
                marginTop: -25,
                backgroundColor: 'white',
              
              }}
              rowStyle={{
                marginTop: -5,
                padding: -5, 
              }}
              rowTextStyle= {{
                fontSize: 14, 
              }}

              data={filters}
              onSelect={(selectedItem)=>{filterByselected(selectedItem)}}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
            </View>
          </Pressable>
        </View>
        <FlatList
                style={styles.listPseudo}
                data={byPseudo}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text></Text>}
              />  


        <ScrollView
          style={{ flex: 1 }}
          snapToInterval={(7.5 / 10) * screen.height}
          decelerationRate="fast"
        >
           {discoverList} 

          <View style={{
                height: (1/ 10) * screen.height,
                paddingTop: 30,
              }}>

          </View>

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View
              style={{
                height: (5 / 10) * screen.height,
                width: (7 / 10) * screen.width,
                paddingTop: 30,
              }}
            >
              <MapView
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 28,
                }}
                initialRegion={{
                  latitude: mapContent.longitude,
                  longitude: mapContent.latitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
              >
                <Marker
                  pinColor="#FFD99F"
                  coordinate={{
                    latitude: mapContent.longitude,
                    longitude: mapContent.latitude,
                  }}
                />
              </MapView>
            </View>
          </Overlay>
        </ScrollView>
      </View>
    );
  }
}

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  rectangle: {
    height: "94.5%",
    width: "100%",
    backgroundColor: "salmon",
    borderRadius: 28,
  },

  text: {
    flex: 1,
    fontSize: 28,
    color: "white",
    fontFamily: "Poppins_400Regular",
    textAlign: "justify",
  },

  subtext: {
    marginTop: -7,
    flex: 1,
    marginBottom: "auto",
    fontSize: 16,
    color: "white",
    lineHeight: 17,
    fontFamily: "Poppins_300Light",
  },

  hairlineWhite: {
    backgroundColor: "white",
    height: 118,
    width: 1,
  },

  adresse: {
    marginVertical: 0,
    padding: 0,
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins_300Light",
  },

  date: {
    marginTop: 3,
    fontSize: 18,
    color: "black",
    fontFamily: "Poppins_500Medium",
  },

  hairlineBlack: {
    backgroundColor: "black",
    height: 20,
    width: 1,
  },

  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  imgAvatar: {
    width: 45,
    height: 45,
  },

  imgAvatarSearchList: {
    width: 22,
    height: 22,
    marginRight: 10
  },

  PseudoSearchList: {
    fontFamily: "Poppins_500Medium",
    marginTop: 2,
    fontSize: 12

  },

  imgBackground2: {
    position: "absolute",
    width: "100%",
    height: "70%",
    flex: 1,
  },

  pseudo: {
    color: "white",
    marginLeft: 8,
    fontFamily: "Poppins_500Medium",
  },

  distance: {
    color: "white",
    textAlign: "right",
    fontFamily: "Poppins_500Medium",
  },

  participants: {
    color: "white",
    textAlign: "left",
    fontFamily: "Poppins_500Medium",
  },

 tags: {
    backgroundColor: '#011520', 
    borderRadius: 20,
    paddingTop: 2,
    paddingHorizontal: 10,
    color: "white",
    textAlign: "left",
    fontFamily: "Poppins_500Medium",
    fontSize: 12
  },

  tagsOff: {
 
  },

  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "white",
    height: (0.55 / 10) * screen.height,
    width: screen.width,
  },

  searchList: {
    flex: 1,
    backgroundColor: "red",

    height: (3 / 10) * screen.height,
    width: (3 / 10) * screen.width,
  },

  listPseudo: {
    position: 'absolute',
    top: 122,
    left: 40,
    zIndex: 1,
  },

  searchListPseudo: {
    fontFamily: "Poppins_300Light",
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 4,
    marginTop: 6,
  },

  searchListPseudoBackground: {
    backgroundColor: "white",
    
  },
});

/// TO REDUX

function mapStateToProps(state) {
  return { token: state.token, ip: state.ip, tags: state.tags };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: "saveUser", payload: token });
    },
    onSubmitIP: function (ip) {
      dispatch({ type: "getIP", ip: ip });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);