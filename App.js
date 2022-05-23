/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CsvScreen from './src/screens/CsvScreen';
import PdfScreen from './src/screens/PdfScreen';

const App = () => {
  return (
    <View style={styles.MainContainer}>
      <PdfScreen />
      <CsvScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
});
