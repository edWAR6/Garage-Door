import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { observer } from 'mobx-react';

const Button = ({button}) => {
  const { text, color, toggle } = button;
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => toggle()}
        style={[styles.button, {backgroundColor: color}]}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 5,
    width: 150,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  }
});

export default observer(Button);
