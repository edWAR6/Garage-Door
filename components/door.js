import { Image, StyleSheet, Text } from 'react-native';

import React from 'react';
import garage_door from '../images/door.png'
import { observer } from 'mobx-react';

const Door = ({door}) => {
  const { position, time } = door;

  return (
    <>
      <Image source={garage_door} style={[styles.door, {top: position}]} />
      <Text style={styles.clock}>{time.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  door: {
    flex: 9,
    resizeMode: 'stretch',
    width: '100%',
  },
  clock: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    paddingTop: 5,
  }
});

export default observer(Door);
