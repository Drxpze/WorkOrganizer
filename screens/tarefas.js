import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let fonts = {
  Sunshine: require("../assets/sunshineformulaDEMO.otf"),
};

export default class Tarefas extends Component {
  constructor() {
    super(), (this.state = { isFontLoaded: false });
  }
  LoadFont = async () => {
    await Font.loadAsync(fonts);
    this.setState({ isFontLoaded: true });
  };
  componentDidMount() {
    this.LoadFont();
  }
  render() {
    if (this.state.isFontLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              source={require("../assets/quadronegro.png")}
              style={styles.Image}
            />
            <Text style={styles.Work}>WorkOrganizer</Text>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#E8ECF9", flex: 1 },
  Image: {
    flex: 0.8,
    //width: 120,
    //height: 120,
    resizeMode: "contain",
  },
  titleContainer: {
    flex: 0.13,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    justifyContent: "space-around",
  },
  Work: {
    fontFamily: "sunshine",
    fontSize: 50,
    textAlign: "center",
    marginTop: 20,
  },
});
