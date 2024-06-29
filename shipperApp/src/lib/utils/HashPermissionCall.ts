import {PermissionsAndroid} from 'react-native';

const HashPermissionCall = async (): Promise<boolean> => {
  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    {
      title: 'Quyền truy cập vào điện thoại',
      message: 'Shippy App muốn truy cập vào điện thoại của bạn',
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

export default HashPermissionCall;
