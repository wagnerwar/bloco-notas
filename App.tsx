import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Router } from './src/main/routes';
function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <Router />          
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
