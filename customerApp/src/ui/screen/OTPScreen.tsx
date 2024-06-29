import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IPramListScreen} from '../../lib/types/ParamListScreen';
import {OtpInput} from 'react-native-otp-entry';
import colors from '../../lib/constant/color';
import Loading from '../components/Loading';
import TimerCountdown from '../components/CountDown';
import {Axios} from '../../lib/utils/axios';

const OTPScreen = ({
  route,
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
  readonly route: RouteProp<IPramListScreen, 'otp-screen'>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60000 * 12);
  const [showReSend, setShowReSend] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (otp: string) => {
      setLoading(true);
      new Axios()
        .getInstance()
        .post('/customer/auth/verify-otp', {
          otp: otp,
          Phone: '84' + route.params.phone.replace(/ /g, ''),
        })
        .then(res => {
          if (res.data.code === 200) {
            setTimeout(() => {
              setLoading(false);
              ToastAndroid.show('Xác thực thành công', ToastAndroid.LONG);
              navigation.navigate('sign-in');
            }, 1200);
          }
        })
        .catch(err => {
          ToastAndroid.show(err?.response?.data.message, ToastAndroid.SHORT);
          setLoading(false);
        });
    },
    [navigation, route.params.phone],
  );

  const handleReSend = useCallback(() => {
    setLoading(true);
    new Axios()
      .getInstance()
      .post('/customer/auth/resend-otp', {
        Phone: '84' + route.params.phone.replace(/ /g, ''),
      })
      .then(res => {
        if (res.data.code === 200) {
          setCount(720000);
        }
      })
      .catch(err => {
        ToastAndroid.show(err?.response?.data.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      });
  }, [route.params.phone]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Xác minh số điện thoại của bạn</Text>
      <View style={styles.desContianer}>
        <Text style={styles.des}>
          Mã xác minh 4 chữ số đã được gửi đến số điện thoại
        </Text>
        <Text style={styles.phone}>+84 {route.params.phone}</Text>
      </View>
      <OtpInput
        numberOfDigits={4}
        focusColor={colors.placeholder}
        focusStickBlinkingDuration={500}
        onFilled={handleSubmit}
        secureTextEntry={false}
        theme={{
          containerStyle: {
            marginTop: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
          pinCodeContainerStyle: {
            width: '17%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            marginHorizontal: 10,
          },
          pinCodeTextStyle: {
            color: '#000000',
            fontSize: 22,
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
      <TimerCountdown
        initialSecondsRemaining={count}
        onTick={milliseconds => {
          setCount(milliseconds);
          if (milliseconds <= 720000 - 10000) {
            setShowReSend(true);
          } else {
            setShowReSend(false);
          }
        }}
        allowFontScaling={true}
        style={{fontSize: 20, marginTop: 20, color: colors.placeholder}}
      />
      {showReSend && (
        <View style={{marginTop: 40}}>
          <Text style={styles.des}>
            Bạn không nhận được mã xác minh?{' '}
            <Text onPress={handleReSend} style={{color: colors.placeholder}}>
              Gửi lại
            </Text>
          </Text>
        </View>
      )}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phone: {
    fontWeight: 'bold',
    color: '#000000',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    width: '100%',
    textAlign: 'left',
  },
  desContianer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 18,
  },
  des: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#000000',
    width: '100%',
    textAlign: 'left',
  },
});

export default OTPScreen;
