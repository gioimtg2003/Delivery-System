import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../lib/context/auth.context';
import colors from '../../lib/constant/color';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppScreenParamList} from '../../types/ScreenParam';
const logo = require('../../../assets/images/logoDriver.png');
export default function PersonTab(): React.ReactElement {
  const navigation = useNavigation<NavigationProp<AppScreenParamList>>();
  const {onLogout, driver} = useAuth();
  return (
    <SafeAreaView style={styles.safe}>
      <Image source={logo} style={{width: 144, height: 144, marginTop: 20}} />
      <Text style={styles.name}>{driver?.Name}</Text>
      <Text style={styles.id}>Mã tài xế: {driver?.id}</Text>
      <TouchableOpacity
        style={styles.logout}
        activeOpacity={0.4}
        onPress={() => {
          onLogout().then(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'intro'}],
            });
          });
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
          }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 6,
    elevation: 2,
  },
  id: {fontSize: 18, fontWeight: '500', color: 'black', marginTop: 10},
  name: {fontSize: 24, fontWeight: '500', color: 'black', marginTop: 20},
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
