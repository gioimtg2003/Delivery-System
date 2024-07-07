import React, {useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useAuth} from '../../../lib/context/auth.context';
const icon = require('../../../../assets/images/Logo.png');
const IntroScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}) => {
  const {isLoggedIn} = useAuth();
  const positionAnimation = useSharedValue({y: 0, scale: 1});

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn !== null) {
        if (isLoggedIn === true) {
          navigation.reset({
            index: 0,
            routes: [{name: 'home'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'intro_1'}],
          });
        }
      }
    }, 2000);
  }, [navigation, isLoggedIn]);
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
