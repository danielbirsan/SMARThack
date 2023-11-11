import React, { useState } from "react";
import WelcomePage from "./components/firstpage";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import PickerPage from "./components/picker";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import GPTreply from "./ai";
import FlatListBasics from "./lista_cumparaturi";

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fintech">
        <Stack.Screen name="Fintech" component={WelcomePage} />
        <Stack.Screen name="PickerPage" component={PickerPage} />
         <Stack.Screen name="FlatListBasics" component={FlatListBasics} />
          
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  responseText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
