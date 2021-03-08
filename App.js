import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext } from 'react';

import Button from './components/button';
import Door from './components/door';
import { GarageStore } from './state/store';
import { StatusBar } from 'expo-status-bar';
import garage from './images/garage.png'
import { observer } from 'mobx-react';

const App = () => {
  const context = createContext(new GarageStore());
  const { allDoors, allButtons, allClocks } = useContext(context);

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <ImageBackground source={garage} style={styles.garage}>
          {allDoors.map(door => (
            <View key={door.id} style={styles.half_container}>
              <Door door={door} />
            </View>
          ))}
        </ImageBackground>
      </View>
      <View style={[styles.botom_container, styles.horizontal]}>
        {allButtons.map(button => (
          <Button key={button.id} button={button} />
        ))}
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555555',
    flexDirection: 'column',
  },
  top_container: {
    flex: 3,
  },
  botom_container: {
    flex: 2,
  },
  half_container: {
    flex: 1,
  },
  garage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    flexDirection: 'row',
  },
  horizontal: {
    flexDirection: 'row',
  },
});

export default observer(App);
