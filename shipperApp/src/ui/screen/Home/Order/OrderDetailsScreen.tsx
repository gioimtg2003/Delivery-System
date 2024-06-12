import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BOX_SIZE = 100;

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isAtRightEdge, setIsAtRightEdge] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Kiểm tra nếu nút đã tới cuối góc phải màn hình
        if (gestureState.moveX + BOX_SIZE >= SCREEN_WIDTH && !isAtRightEdge) {
          setIsAtRightEdge(true);
        } else if (
          gestureState.moveX + BOX_SIZE < SCREEN_WIDTH &&
          isAtRightEdge
        ) {
          setIsAtRightEdge(false);
        }

        // Cập nhật vị trí của pan
        Animated.event([null, {dx: pan.x, dy: new Animated.Value(0)}], {
          useNativeDriver: false,
        })(event, gestureState);
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (isAtRightEdge) {
      Alert.alert('You have reached the right edge');
    }
  }, [isAtRightEdge]);

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'blue',
  },
});

export default App;
