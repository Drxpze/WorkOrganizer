import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Criartarefas from "./screens/criartarefas";
import Login from "./screens/login";
import Professor from "./screens/professor";
import Tarefas from "./screens/tarefas";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="criartarefas"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="tarefas" component={Tarefas} />
      <Stack.Screen name="professor" component={Professor} />
      <Stack.Screen name="criartarefas" component={Criartarefas} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
