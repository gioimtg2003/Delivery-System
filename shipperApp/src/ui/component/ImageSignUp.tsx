import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');

function roundOff(v: number) {
  return Math.round(v);
}

function dimensions() {
  let _borderRadius = roundOff((height + width) / 2),
    _height = roundOff(height),
    _width = roundOff(width);

  return {_borderRadius, _height, _width};
}
const imgUrl = require('../../../assets/images/Logo-2.png');
console.log(Dimensions.get('window'));
export default function ImageSignUp() {
  return (
    <View style={styles.circleView}>
      <Image source={imgUrl} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  circleView: {
    height: dimensions()._height * 0.2,
    width: dimensions()._height * 0.2,
    borderRadius: dimensions()._borderRadius,
    backgroundColor: '#7DCBF7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
