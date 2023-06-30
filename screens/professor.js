import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

SplashScreen.preventAutoHideAsync();

let fonts = {
  Sunshine: require("../assets/sunshineformulaDEMO.otf"),
};

export default class Professor extends Component {
  constructor() {
    super(), (this.state = { isFontLoaded: false });
  }
  LoadFont = async () => {
    await Font.loadAsync(fonts);
    this.setState({ isFontLoaded: true });
  };
  componentDidMount() {
    this.LoadFont();
    this.fetchTarefas();
  }
  fetchTarefas = () => {
    firebase
      .database()
      .ref("/tarefas/")
      .on(
        "value",
        (snapshot) => {
          let tarefas = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              tarefas.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ tarefas: tarefas });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };
  renderItem = ({ item: tarefa }) => {
    return <TarefaCard tarefa={tarefa} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("criartarefas");
            }}
          >
            <Text style={styles.textbutton}>criar tarefas</Text>
          </TouchableOpacity>
          {!this.state.stories[0] ? (
            <View style={styles.noStories}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.noStoriesTextLight
                    : styles.noStoriesText
                }
              >
                Nenhuma História Disponível
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.tarefas}
                renderItem={this.renderItem}
              />
            </View>
          )}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { backgroundColor: "darkgrey", flex: 1 },
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
  button: {
    backgroundColor: "#E8ECF9",
    width: 150,
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#15193c",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Sunshine",
  },
  textbutton: {},
});
