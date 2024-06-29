import {PermissionsAndroid} from 'react-native';

const HashPermissionSMS = async (): Promise<boolean> => {
  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    {
      title: 'Quyền truy cập vào tin nhắn',
      message: 'Shippy App muốn truy cập vào tin nhắn của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    return false;
  }
};

export default HashPermissionSMS;
