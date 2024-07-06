import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {IPramListScreen} from '../../../lib/types/ParamListScreen';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../../../lib/constant/color';
import {formatPhoneNumber} from '../../../lib/utils/fornatPhoneNumber';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import ModalSelectPayment from '../../components/ModalSelectPayment';
import Loading from '../../components/Loading';
import {axiosInstance} from '../../../lib/utils/axios';
import {useCustomer} from '../../../lib/context/context';
const hasSenderAddress = (
  params: any,
): params is {senderAddress: string; receiverAddress: string} => {
  return (
    params &&
    typeof params.senderAddress === 'string' &&
    typeof params.receiverAddress === 'string'
  );
};

interface IFocus {
  sendDetails?: boolean;
  sendPhone?: boolean;
  sendName?: boolean;
  receiveDetails?: boolean;
  receivePhone?: boolean;
  receiveName?: boolean;
  note?: boolean;
  cod?: boolean;
}
const OrderInfoScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<IPramListScreen, 'order-info'>;
  readonly navigation: NavigationProp<IPramListScreen>;
}): React.ReactElement => {
  const [focus, setFocus] = React.useState<IFocus>({});
  const [phone, setPhone] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [details, setDetails] = React.useState<string>('');
  const [warning, setWarning] = React.useState<boolean>(false);
  const [receiverPhone, setReceiverPhone] = React.useState<string>('');
  const [receiverName, setReceiverName] = React.useState<string>('');
  const [receiverDetails, setReceiverDetails] = React.useState<string>('');
  const [receiverWarning, setReceiverWarning] = React.useState<boolean>(false);
  const [note, setNote] = React.useState<string>('');
  const [isCOD, setIsCOD] = React.useState<boolean>(false);
  const [COD, setCOD] = React.useState<string>('');
  const [isPayment, setIsPayment] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isTakeShippingFee, setIsTakeShippingFee] =
    React.useState<boolean>(false);
  const {ReLoadHistoryOrder} = useCustomer();
  const submitOrder = useCallback(() => {
    setLoading(true);
    (async () => {
      const transportRoute = navigation
        .getState()
        .routes.find(route => route.name === 'transport');

      if (transportRoute && hasSenderAddress(transportRoute.params)) {
        let SenderAddress = transportRoute.params.senderAddress;
        let ReceiverAddress = transportRoute.params.receiverAddress;
        (await axiosInstance())
          .post('/customer/order', {
            senderName: name,
            senderPhone: `84${phone.replace(/ /g, '').substring(0, 9)}`,
            senderAddress: SenderAddress,
            senderDetailsAddress: details,
            receiverName: receiverName,
            receiverPhone: `84${receiverPhone
              .replace(/ /g, '')
              .substring(0, 9)}`,
            receiverAddress: ReceiverAddress,
            receiverDetailsAddress: receiverDetails,
            isTakeShippingFee: isTakeShippingFee,
            idTransport: route.params.idTransport,
            note: note,
            isCOD: isCOD,
            COD: COD,
          })
          .then(res => {
            if (res.data.status === 'success') {
              ReLoadHistoryOrder();
              Toast.show({
                type: 'success',
                text1: 'Đặt hàng thành công',
                text1Style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'normal',
                },
                visibilityTime: 2000,
              });
              navigation.reset({
                index: 0,
                routes: [{name: 'home'}],
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra',
                text1Style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'normal',
                },
                visibilityTime: 2000,
              });
            }
          })
          .catch(err => {
            if (err.response.data.message === 'not_support_location') {
              Toast.show({
                type: 'error',
                text1: 'Chưa hỗ trợ khu vực này',
                text1Style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'normal',
                },
                visibilityTime: 2000,
              });
            }
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1200);
          });
      } else {
        console.log('Address not found.');
        ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.SHORT);
      }
    })();
  }, [
    COD,
    ReLoadHistoryOrder,
    details,
    isCOD,
    isTakeShippingFee,
    name,
    navigation,
    note,
    phone,
    receiverDetails,
    receiverName,
    receiverPhone,
    route.params.idTransport,
  ]);
  const handleOrder = useCallback(() => {
    if (!phone && !warning) {
      Toast.show({
        text1: 'Vui lòng nhập số điện thoại người gửi',
        text1Style: {
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: 'normal',
        },
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    } else if (!name) {
      Toast.show({
        text1: 'Vui lòng nhập tên người gửi',
        text1Style: {
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: 'normal',
        },
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }
    if (!receiverPhone && !receiverWarning) {
      Toast.show({
        text1: 'Vui lòng nhập số điện thoại người nhận',
        text1Style: {
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: 'normal',
        },
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    } else if (!receiverName) {
      Toast.show({
        text1: 'Vui lòng nhập tên người nhận',
        text1Style: {
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: 'normal',
        },
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }
    setIsPayment(true);
  }, [phone, name, receiverPhone, receiverName, warning, receiverWarning]);
  const shippingFee = useMemo(
    () => (route.params.shippingFee ? Number(route.params.shippingFee) : 0),
    [route.params.shippingFee],
  );

  // If shippingFee is not a number, use a default value (0 in this case)
  const formattedShippingFee = useMemo(
    () =>
      !isNaN(shippingFee)
        ? shippingFee
            .toLocaleString('it-IT', {style: 'currency', currency: 'VND'})
            .replace('VND', '₫ ')
        : '₫ 0',
    [shippingFee],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.body}>
          <Text style={styles.title}>Địa chỉ người gửi</Text>
          <TextInput
            style={[
              styles._input,
              {
                borderColor: focus.sendDetails ? colors.placeholder : '#ddd',
              },
            ]}
            placeholder="Địa chỉ chi tiết"
            placeholderTextColor={'#aaa'}
            value={details}
            onChangeText={setDetails}
            onFocus={() => {
              setFocus({...focus, sendDetails: true});
            }}
            onBlur={() => {
              setFocus({...focus, sendDetails: false});
            }}
          />
          <View
            style={[
              styles.container_phone,
              {
                borderColor: focus.sendPhone ? colors.placeholder : '#ddd',
              },
            ]}>
            <Text style={{color: 'black', fontSize: 15}}>+84</Text>
            <TextInput
              onFocus={() => {
                setFocus({...focus, sendPhone: true});
              }}
              style={styles.inputPhone}
              placeholder="Số điện thoại người gửi"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={e =>
                setPhone(formatPhoneNumber(e[0] === '0' ? e.slice(1) : e))
              }
              placeholderTextColor={'#aaa'}
              onBlur={() => {
                setFocus({...focus, sendPhone: false});
                if (phone.replace(/ /g, '').length < 9) {
                  setWarning(true);
                } else {
                  setWarning(false);
                }
              }}
              maxLength={11}
            />
          </View>
          {warning && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                width: '100%',
                textAlign: 'left',
                marginTop: 4,
              }}>
              Số điện thoại không hợp lệ
            </Text>
          )}
          <TextInput
            value={name}
            onChangeText={setName}
            style={[
              styles._input,
              {
                borderColor: focus.sendName ? colors.placeholder : '#ddd',
              },
            ]}
            placeholder="Tên người gửi"
            placeholderTextColor={'#aaa'}
            onFocus={() => {
              setFocus({...focus, sendName: true});
            }}
            onBlur={() => {
              setFocus({...focus, sendName: false});
            }}
          />
        </View>

        <View style={[styles.body]}>
          <Text style={styles.title}>Địa chỉ người nhận</Text>
          <TextInput
            style={[
              styles._input,
              {
                borderColor: focus.receiveDetails ? colors.placeholder : '#ddd',
              },
            ]}
            placeholder="Địa chỉ chi tiết"
            placeholderTextColor={'#aaa'}
            value={receiverDetails}
            onChangeText={setReceiverDetails}
            onFocus={() => {
              setFocus({...focus, receiveDetails: true});
            }}
            onBlur={() => {
              setFocus({...focus, receiveDetails: false});
            }}
          />
          <View
            style={[
              styles.container_phone,
              {
                borderColor: focus.receivePhone ? colors.placeholder : '#ddd',
              },
            ]}>
            <Text style={{color: 'black', fontSize: 15}}>+84</Text>
            <TextInput
              onFocus={() => {
                setFocus({...focus, receivePhone: true});
              }}
              style={styles.inputPhone}
              placeholder="Số điện thoại người nhận"
              keyboardType="phone-pad"
              value={receiverPhone}
              onChangeText={e =>
                setReceiverPhone(
                  formatPhoneNumber(e[0] === '0' ? e.slice(1) : e),
                )
              }
              placeholderTextColor={'#aaa'}
              onBlur={() => {
                setFocus({...focus, receivePhone: false});
                if (receiverPhone.replace(/ /g, '').length < 9) {
                  setReceiverWarning(true);
                } else {
                  setReceiverWarning(false);
                }
              }}
              maxLength={11}
            />
          </View>
          {receiverWarning && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                width: '100%',
                textAlign: 'left',
                marginTop: 4,
              }}>
              Số điện thoại không hợp lệ
            </Text>
          )}
          <TextInput
            value={receiverName}
            onChangeText={setReceiverName}
            style={[
              styles._input,
              {
                borderColor: focus.receiveName ? colors.placeholder : '#ddd',
              },
            ]}
            placeholder="Tên người nhận"
            placeholderTextColor={'#aaa'}
            onFocus={() => {
              setFocus({...focus, receiveName: true});
            }}
            onBlur={() => {
              setFocus({...focus, receiveName: false});
            }}
          />
        </View>
        <View
          style={[
            styles.body,
            {
              borderBottomWidth: 0,
            },
          ]}>
          <View style={styles.COD}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setIsCOD(!isCOD);
              }}>
              <Feather
                name={isCOD ? 'check-square' : 'square'}
                size={20}
                color={isCOD ? colors.placeholder : '#aaa'}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 10,
                color: 'black',
                fontSize: 15,
                textAlign: 'left',
                flexWrap: 'wrap',
              }}>
              Thu hộ COD
            </Text>
          </View>
          {isCOD && (
            <TextInput
              style={[
                styles._input,
                {
                  borderColor: focus.cod ? colors.placeholder : '#ddd',
                },
              ]}
              placeholder="Số tiền thu hộ"
              placeholderTextColor={'#aaa'}
              value={COD}
              onChangeText={setCOD}
              onFocus={() => {
                setFocus({...focus, cod: true});
              }}
              onBlur={() => {
                setFocus({...focus, cod: false});
              }}
              keyboardType="number-pad"
            />
          )}
        </View>
        <View style={styles.body}>
          <TextInput
            style={[
              styles._input,
              {
                borderColor: focus.note ? colors.placeholder : '#ddd',
              },
            ]}
            placeholder="Ghi chú cho tài xế"
            placeholderTextColor={'#aaa'}
            value={note}
            onChangeText={setNote}
            onFocus={() => {
              setFocus({...focus, note: true});
            }}
            onBlur={() => {
              setFocus({...focus, note: false});
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          backgroundColor: 'white',
          elevation: 2,
        }}>
        <View
          style={{
            padding: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{fontSize: 20, color: 'black'}}>Tổng tiền</Text>
          <Text style={{fontSize: 17, color: 'black'}}>
            {formattedShippingFee}
          </Text>
        </View>
        <ModalSelectPayment
          visible={isPayment}
          onClose={() => {
            setIsPayment(false);
          }}
          receiverName={receiverName}
          senderName={name}
          setIsTakeShippingFee={setIsTakeShippingFee}
          onPress={submitOrder}
        />
        <TouchableOpacity
          style={{
            width: '98%',
            backgroundColor: colors.placeholder,
            marginBottom: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}
          activeOpacity={0.6}
          onPress={handleOrder}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  COD: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  _input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4a4a4a',
    width: '100%',
    marginBottom: 10,
  },
  container_phone: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputPhone: {
    fontSize: 15,
    marginLeft: 2,
    color: 'black',
    width: '80%',
  },
  body: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  header: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 5,
    elevation: 2,
    backgroundColor: 'white',
  },
});

export default OrderInfoScreen;
