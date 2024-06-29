import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const {height} = Dimensions.get('screen');

export default function TestScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const translationY = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translationY.value}],
  }));

  const [translateY, setTranslateY] = useState(0);

  const handleGesture = event => {
    const {translationY, state} = event.nativeEvent;
    if (state === State.ACTIVE) {
      setTranslateY(translationY);
    } else if (state === State.END) {
      if (translationY > height / 3) {
        setModalVisible(false);
      } else {
        setTranslateY(0);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ReactNativeModal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down">
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={handleGesture}>
          <View style={[styles.modalContent, {transform: [{translateY}]}]}>
            <View style={styles.handle} />
            <Text>Modal Content</Text>
          </View>
        </PanGestureHandler>
      </ReactNativeModal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'red',
  },
  modalContent: {
    backgroundColor: 'red',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    minHeight: height / 3,
  },
  handle: {
    width: 40,
    height: 6,
    backgroundColor: 'red',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
});
