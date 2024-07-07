import {Linking, PermissionsAndroid, ToastAndroid} from 'react-native';

const hashPermissionNotification = async (): Promise<boolean> => {
  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    {
      title: 'Quyền truy cập thông báo',
      message: 'Shippy App muốn truy cập thông báo của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    Linking.openSettings();
    ToastAndroid.show(
      'Quyền truy cập thông báo bị từ chối ',
      ToastAndroid.SHORT,
    );
    return false;
  }
};

export default hashPermissionNotification;
