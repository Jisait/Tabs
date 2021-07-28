import React, { useState, useEffect } from "react";
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
  const [byPseudo, setByPseudo] = useState("");




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
  }, []);

  useEffect(() => {
    if (isFocused == true) {
      async function loadData() {
        // CHANGE POUR TON IP LORS DE RESR
        const data = await fetch("http://172.17.1.71:3000/get-event");
        var eventData = await data.json();
        setEvents(eventData.events);
      }
      loadData();

      AsyncStorage.getItem("token", async function (error, token) {
        if (token) {
          const data = await fetch("http://172.17.1.71:3000/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "token=" + token,
          });

          const body = await data.json();

          props.onSubmitToken(body.user.token);

          setWishListContent(body.user.myEvents);
          setUserID(body.user._id);

          const confirmed = await fetch(
            "http://172.17.1.71:3000/get-Myevents",
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

  function financial(x) {
    return Number.parseFloat(x).toFixed(1);
  }

  var addToWishlist = async (event, isLiked) => {
    if (isLiked === false) {
      const data = await fetch("http://172.17.1.71:3000/add-to-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "token=" + props.token + "&id=" + event._id,
      });
      const body = await data.json();

      setWishListContent(body.user.myEvents);
    } else {
      const data = await fetch("http://172.17.1.71:3000/remove-from-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "token=" + props.token + "&id=" + event._id,
      });
      const body = await data.json();

      setWishListContent(body.user.myEvents);
    }
  };

  let discoverList = events.map((event, index) => {
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
    var distance = financial(
      getDistance(
        currentLatitude,
        currentLongitude,
        event.longitude,
        event.latitude,
        "km"
      )
    );

    //// RECHERCHE PAR PSEUDO

  /* console.log("voyonsles pseudo", events[2].admin.username)  */
/*   const [searchPseudo, setSearchPseudo] =  */
/* 
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
          setContacts(data);
          setInMemory(data);
        }
      })();
    }, []); */







 /*    if (contacts.length > 5) {
      var renderItem = ({ item }) => <View></View>;
    } else {
      var renderItem = ({ item }) => (
        <View style={styles.searchListPseudoBackground}>
          <Pressable
            onPress={() => {
              setPressItem([...pressItem, item]);
              setContacts("");
            }}
          >
            <Text style={styles.searchListPseudo}>
              {item.firstName + " " + item.lastName}
            </Text>
          </Pressable>
        </View>
      );
    } */

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
            onPress={() => addToWishlist(event, isLiked)}
            name="heart"
            size={30}
            color={likeColor}
            style={likeVisible}
          />
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color="lightgreen"
            style={checkVisible}
          />
        </View>

        <View style={{ position: "absolute", left: 150, bottom: 166 }}>
          <FontAwesome name="share-alt" size={26} color="white" />
        </View>

        <View style={{ position: "absolute", left: 220, bottom: 166 }}>
          <Text style={styles.distance}>{distance} km</Text>
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
     <Text style={styles.pseudo}>{event.admin.username}</Text>
        </View>
      </View>
    );
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <HeaderScreen navigation={props.navigation} />
        <View style={styles.searchBarContainer}>
          <SearchBar
            containerStyle={{
              height: 4,
              color: "red",
              position: "relative",
              backgroundColor: "transparent",
              borderRadius: 30,
              border: "red",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              width: (5 / 10) * screen.width,
            }}
            inputContainerStyle={{ backgroundColor: "transparent", border: 0 }}
            inputStyle={{ color: "red", fontSize: 12 }}
            placeholder="Add friends..."
            onChangeText={(value) => setByPseudo(value)}
            clearIcon={false}
            value={byPseudo}
          />

        {/*   <FlatList
                style={styles.listPseudo}
                data={contacts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text></Text>}
              /> */}

          <Pressable>
            <View style={{ marginTop: 12, marginRight: 20 }}>
              <Text>...by popularity</Text>
            </View>
          </Pressable>
        </View>

        {/*     <View style={styles.searchList}>
          </View> */}

        <ScrollView
          style={{ flex: 1 }}
          snapToInterval={(7.5 / 10) * screen.height}
          decelerationRate="fast"
        >
          {discoverList}

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
    borderBottomWidth: 0.5,
    width: 300,
    marginHorizontal: 30,
  },
});

/// TO REDUX

function mapStateToProps(state) {
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: "saveUser", token: token });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
