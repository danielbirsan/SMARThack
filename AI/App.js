import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import GPTreply from "./ai";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GPTreply />
    </SafeAreaView>
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
