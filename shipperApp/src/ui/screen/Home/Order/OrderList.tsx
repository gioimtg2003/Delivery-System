import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../../../lib/constant/color';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalOnline from '../../../component/ModalOnline';
import ListOrder from '../../../component/ListOrder';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const OrderListScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerName}>
          <SimpleLineIcons
            name="user"
            size={16}
            color={colors.placeholder}
            style={{
              marginRight: 5,
            }}
          />
          <Text>Nguyễn Công Giới</Text>
          <Entypo name="dot-single" size={25} color={'green'} />
        </View>
        <SimpleLineIcons
          name="settings"
          size={20}
          color={'black'}
          onPress={() => {
            setOpenModal(true);
          }}
        />
      </View>
      <View style={styles.main}>
        <ListOrder navigation={navigation} />
      </View>
      <ModalOnline visible={openModal} onClose={() => setOpenModal(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  containerName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderListScreen;
