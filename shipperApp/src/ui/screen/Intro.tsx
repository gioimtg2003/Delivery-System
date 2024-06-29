import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {AppScreenParamList} from '../../types/ScreenParam';
import {useDriver} from '../../lib/context/Driver/Context';
const icon = require('../../../assets/images/Logo-2.png');
const IntroScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}) => {
  const positionAnimation = useSharedValue({y: 0, scale: 1});
  const {state} = useDriver();
  useEffect(() => {
    if (state.isAuth !== undefined) {
      setTimeout(() => {
        if (state.isAuth === true) {
          navigation.reset({
            index: 0,
            routes: [{name: 'home'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
        }
      }, 2000);
    }
  }, [navigation, state.isAuth]);
  useEffect(() => {
    positionAnimation.value = withSequence(
      withTiming({y: -20, scale: 1.2}, {duration: 500, easing: Easing.ease}),
      withTiming({y: 0, scale: 1}, {duration: 500, easing: Easing.ease}),
    );
  }, [positionAnimation]);

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: positionAnimation.value.y},
        {scale: positionAnimation.value.scale},
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={icon}
        style={[
          AnimatedStyle,
          {
            width: 100,
            height: 100,
            objectFit: 'cover',
          },
        ]}
      />
      <View style={styles.containerSpinner}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerSpinner: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default IntroScreen;
