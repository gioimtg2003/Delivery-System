import React, {useCallback, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../lib/constant/color';
import {ConvertPrice} from '../../../lib/utils/converPrice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import Loading from '../../component/Loading';
import {Axios, axiosInstance} from '../../../lib/utils/axios';
import {useDriver} from '../../../lib/context/Driver/Context';
import UploadS3 from '../../../lib/utils/UpLoadS3';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../lib/context/auth.context';

const AddWalletScreen = (): React.ReactElement => {
  const {state, reloadHistoryWallet} = useDriver();
  const {driver} = useAuth();
  const [focus, setFocus] = useState(false);
  const [amount, setAmount] = useState('');
  const [isVisibleModalUpload, setIsVisibleModalUpload] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChangeText = useCallback((text: string) => {
    const rawValue = text.replace(/\D/g, '');
    setAmount(ConvertPrice(Number(rawValue)));
  }, []);
  const navigation = useNavigation();

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };
  const handleUpload = useCallback(() => {
    (async () => {
      try {
        let result = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5,
          maxWidth: 500,
          maxHeight: 500,
        });
        if (result.didCancel) {
          setIsVisibleModalUpload(false);
          return;
        } else if (result.assets) {
          setIsVisibleModalUpload(false);
          setLoading(true);
          console.log(result.assets[0]);
          const {uri, fileName, type} = result.assets[0];
          let {data} = await new Axios().getInstance().post('/media/sign-url', {
            fileName,
            typeImg: 'driverwallet',
            contentType: type,
            id: driver?.id,
          });
          let upload = await UploadS3(
            uri as string,
            type as string,
            data.data.url,
          );
          console.log(`upload: ${upload}`);
          if (upload) {
            let save = await (
              await axiosInstance()
            ).post('/shipper/wallet', {
              amount: Number(amount.replace(/\D/g, '')),
              keyImg: data.data.key,
            });
            if (save.data.status === 'success') {
              reloadHistoryWallet();
              setLoading(false);
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
              Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Yêu cầu của bạn đã được gửi thành công.',
                text1Style: {fontWeight: 'bold', fontSize: 16, color: 'black'},
                text2Style: {
                  fontSize: 14,
                  color: '#6a6a6a',
                  width: '100%',
                  flexWrap: 'wrap',
                },
              });
            }
          }
        } else {
          console.log('error');
        }
      } catch (error: any) {
        console.error(error.response.data);
        if (error.response.status === 429) {
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: 'Yêu cầu quá nhanh, vui lòng thử lại sau',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: 'Có lỗi xảy ra, vui lòng thử lại sau',
          });
        }
        setLoading(false);
      }
    })();
  }, [state.driver?.id, amount, navigation, reloadHistoryWallet]);
  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <Loading />}
      <View
        style={[
          styles.containerInput,
          focus && {borderColor: colors.placeholder},
        ]}>
        <TextInput
          placeholder="Nhập số tiền"
          keyboardType="number-pad"
          value={amount}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#aaa"
          style={{
            flex: 1,
            fontSize: 15,
            color: 'black',
          }}
        />
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={24}
          color={focus ? colors.placeholder : 'transparent'}
          onPress={() => {
            setAmount('');
          }}
        />
      </View>

      <Text style={styles.desTitle}>Chuyển tiền qua tài khoản</Text>
      <Text style={styles.des}>STK: 0367093723</Text>
      <Text style={styles.des}>Tên TK: Nguyen Cong Gioi</Text>
      <Text style={styles.des}>Nội Dung CK: ShippyDriver:Mã tài xế</Text>
      <Text style={styles.des}>Ví dụ: ShippyDriver:10</Text>
      <TouchableOpacity
        onPress={() => {
          if (!amount) {
            Toast.show({
              type: 'error',
              text1: 'Lỗi',
              text2: 'Vui lòng nhập số tiền',
              text1Style: {fontWeight: 'bold', fontSize: 16, color: 'black'},
              text2Style: {fontSize: 15, color: '#6a6a6a'},
            });
            return;
          } else if (Number(amount.replace(/\D/g, '')) < 100000) {
            Toast.show({
              type: 'error',
              text1: 'Lỗi',
              text2: 'Số tiền nạp tối thiểu là 100,000đ',
              text1Style: {fontWeight: 'bold', fontSize: 16, color: 'black'},
              text2Style: {fontSize: 15, color: '#6a6a6a'},
            });
            return;
          }
          setIsVisibleModalUpload(true);
        }}
        activeOpacity={0.6}
        style={{
          backgroundColor: colors.placeholder,
          padding: 12,
          borderRadius: 2,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          width: '96%',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Hoàn tất
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isVisibleModalUpload}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisibleModalUpload(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nạp tiền</Text>
            <Text style={styles.modalDes}>
              Bạn có chắc chắn muốn nạp tiền vào ví? Vui lòng tải lên hình ảnh
              chuyển khoản của bạn.
            </Text>
            <View style={styles.modalAction}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsVisibleModalUpload(false);
                }}>
                <Text style={styles.modalButtonTitle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleUpload}>
                <Text
                  style={[
                    styles.modalButtonTitle,
                    styles.modalButtonTitleConfirm,
                  ]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalDes: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  modalAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonConfirm: {
    backgroundColor: colors.placeholder,
  },
  modalButtonTitle: {
    fontSize: 16,
    color: 'black',
  },
  modalButtonTitleConfirm: {
    color: 'white',
  },

  containerInput: {
    marginTop: 20,
    borderRadius: 5,
    width: '96%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  des: {
    marginTop: 12,
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
    width: '96%',
  },
  desTitle: {
    marginHorizontal: 10,
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 20,
    height: 50,
    width: '96%',
  },
});

export default AddWalletScreen;
