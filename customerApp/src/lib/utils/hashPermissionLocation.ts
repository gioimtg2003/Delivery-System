import {Linking, PermissionsAndroid, ToastAndroid} from 'react-native';

const hashPermissionLocation = async (): Promise<boolean> => {
  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Quyền truy cập vị trí',
      message: 'Shippy App muốn truy cập vị trí của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    Linking.openSettings();
    ToastAndroid.show('Quyền truy cập vị trí bị từ chối', ToastAndroid.SHORT);
    return false;
  }
};

export default hashPermissionLocation;
