import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../lib/constant/color';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const BOX_SIZE = 42;

const SliderButton = ({
  onCLick,
  title,
}: {
  readonly onCLick: () => void;
  readonly title: string;
}) => {
  const [parentWidth, setParentWidth] = useState<number | undefined>(undefined);
  const [isAtRightEdge, setIsAtRightEdge] = useState(false);
  const x = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      x.value = 0;
    })
    .onUpdate(event => {
      const newX = event.translationX;
      if (parentWidth) {
        if (newX + BOX_SIZE > parentWidth - 20 && !isAtRightEdge) {
          runOnJS(setIsAtRightEdge)(true);
        } else if (newX + BOX_SIZE <= parentWidth && isAtRightEdge) {
          runOnJS(setIsAtRightEdge)(false);
        }
      }
      x.value = Math.min(Math.max(newX, 0), (parentWidth as number) - BOX_SIZE);
    })
    .onEnd(() => {
      x.value = 0;
    });

  useEffect(() => {
    if (isAtRightEdge) {
      x.value = 0;
      onCLick();
    }
  }, [isAtRightEdge, onCLick, x]);

  return (
    <GestureHandlerRootView
      style={styles.containerBtn}
      onLayout={e => {
        setParentWidth(e.nativeEvent.layout.width);
      }}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, styles.box]}>
          <Feather
            name="arrow-right-circle"
            size={30}
            color={colors.placeholder}
          />
        </Animated.View>
      </GestureDetector>
      <Text style={styles.text}>{title}</Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 20, color: 'white', flex: 7, textAlign: 'center', zIndex: 1},

  containerBtn: {
    width: '100%',
    height: 55,
    backgroundColor: '#5BBCFF',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  box: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    width: BOX_SIZE,
    height: BOX_SIZE,
    zIndex: 99,
  },
});

export default SliderButton;
