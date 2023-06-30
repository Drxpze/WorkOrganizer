import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let fonts = {
  Sunshine: require("../assets/sunshineformulaDEMO.otf"),
};

export default class CriarTarefas extends Component {
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
  async addtarefa() {
    if (
      this.state.titulo &&
      this.state.materia &&
      this.state.data &&
      this.state.assunto
    ) {
      let tarefaData = {
        titulo: this.state.titulo,
        materia: this.state.materia,
        data: this.state.data,
        assunto: this.state.assunto,
        created_on: new Date(),
        likes: 0,
      };
      await firebase
        .database()
        .ref("/tarefas/" + Math.random().toString(36).slice(2))
        .set(tarefaData)
        .then(function (snapshot) {});
      //this.props.setUpdateToTrue();
    } else {
      alert(
        "Error",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
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
          <ScrollView>
            <TextInput
              style={styles.inputFont}
              onChangeText={(titulo) => this.setState({ titulo })}
              placeholder={"titulo"}
              placeholderTextColor="black"
            />
            <View style={styles.inputview}>
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(materia) => this.setState({ materia })}
                placeholder={"materia"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="black"
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(data) => this.setState({ data })}
                placeholder={"data"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="black"
              />
            </View>
            <TextInput
              style={[
                styles.inputFont,
                styles.inputFontExtra,
                styles.inputTextBig,
              ]}
              onChangeText={(assunto) => this.setState({ assunto })}
              placeholder={"assunto"}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="black"
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addtarefa();
              this.props.navigation.navigate("professor");
            }}
          >
            <Text style={styles.criatarefa}>criar tarefas</Text>
          </TouchableOpacity>
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
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  inputview: {
    flexDirection: "row",
    justifyContent: "center",
  },
  criatarefa: {
    backgroundColor: "#E8ECF9",
    width: 150,
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#15193c",
  },
});
