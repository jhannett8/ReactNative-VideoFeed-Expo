import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from "./app/screens/Feed";

export default function App() {
  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
