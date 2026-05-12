import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { RouterDraw } from './src/main/routes';
function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <RouterDraw />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
