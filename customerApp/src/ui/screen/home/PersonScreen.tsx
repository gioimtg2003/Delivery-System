import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../../lib/context/auth.context';
import {IPramListScreen} from '../../../lib/types/ParamListScreen';

export default function PersonScreen() {
  const navigation = useNavigation<NavigationProp<IPramListScreen>>();
  const {onLogout} = useAuth();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={async () => {
          onLogout().then(() => {
            console.log('logout');
            navigation.navigate('intro');
          });
        }}
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#5AB2FF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 16,
          }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
