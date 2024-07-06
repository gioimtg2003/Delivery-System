import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {height, width} from '../../lib/constant/dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../lib/constant/color';
import {useDebouncedCallback} from 'use-debounce';
import axios from 'axios';
import hashPermissionLocation from '../../lib/utils/hashPermissionLocation';
import Loading from './Loading';

interface IAddress {
  address: {
    label: string;
    city: string;
  };
  id: string;
}
interface ModalInputProps {
  setAddress: (address: string) => void;
  visible: boolean;
  onClose: () => void;
  onPress?: () => void;
}
function ModalInput(props: Readonly<ModalInputProps>) {
  const [data, setData] = useState<IAddress[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const searchAddress = useDebouncedCallback(async (text: string) => {
    if (text === '') {
      setData([]);
      return;
    }
    try {
      let response = await axios.get(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${text}&limit=8&lang=vi_VN&in=countryCode:VNM&apiKey=587XSa96XuwYywlauSpCMNQf5bb79MSyZLPgXwAF3Bs`,
      );
      setData(response.data.items);
    } catch (error) {
      ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.LONG);
    }
  }, 400);

  const handleMyLocation = useCallback(async () => {
    try {
      let hashPermission = await hashPermissionLocation();
      if (hashPermission) {
        ToastAndroid.show('Hiện tính năng này đang bảo trì', ToastAndroid.LONG);
        // let location = await getLocation();
        // navigation.navigate('order-info', {
        //   lng: location.longitude,
        //   lat: location.latitude,
        //   type: props.type,
        // });
      }
    } catch (err: any) {
      if (err.code === 'UNAVAILABLE') {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      } else if (err.code === 'CANCELLED') {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.LONG);
      }
    }
  }, []);
  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={props.onClose}
      onSwipeComplete={props.onClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      swipeDirection={'down'}
      deviceWidth={height * 0.8}
      deviceHeight={width}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        paddingTop: 20,
      }}>
      <View style={styles.container}>
        <View style={styles.t} />
        <View style={styles.containerInput}>
          <SimpleLineIcons
            name="magnifier"
            size={20}
            color="#bbb"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Tìm kiếm"
            style={{flex: 1, marginLeft: 10, color: '#000', fontSize: 15}}
            placeholderTextColor={'#aaa'}
            value={search}
            onChangeText={text => {
              setSearch(text);
              searchAddress(text);
            }}
          />
        </View>
        {data.length <= 0 && (
          <TouchableOpacity
            style={styles.location}
            activeOpacity={0.7}
            onPress={handleMyLocation}>
            <SimpleLineIcons
              name="location-pin"
              size={20}
              color={colors.placeholder}
              style={{marginLeft: 10}}
            />
            <Text
              style={{
                flex: 1,
                marginLeft: 18,
                color: '#5c5c5b',
                fontSize: 15,
              }}>
              Sử dụng vị trí hiện tại
            </Text>
          </TouchableOpacity>
        )}
        <FlatList
          style={{width: '90%', marginTop: 20}}
          data={data}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.result}
              activeOpacity={0.5}
              onPress={() => {
                setLoading(true);
                props.setAddress(item.address.label);
                setTimeout(() => {
                  setLoading(false);
                  props.onClose();
                }, 1000);
              }}>
              <SimpleLineIcons
                name="location-pin"
                size={20}
                color={colors.placeholder}
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 18,
                  color: '#5c5c5b',
                  fontSize: 15,
                }}>
                {item.address.label}
              </Text>
            </TouchableOpacity>
          )}
        />
        {loading && <Loading />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  location: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  result: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingBottom: 7,
    marginTop: 20,
  },
  containerInput: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 10,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  t: {
    width: '40%',
    height: 8,
    backgroundColor: '#bbb',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default ModalInput;
