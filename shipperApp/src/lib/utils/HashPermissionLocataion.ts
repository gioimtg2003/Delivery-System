import {Linking, PermissionsAndroid} from 'react-native';

const HashPermissionLocation = async (): Promise<boolean> => {
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
  let granted2 = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: 'Quyền truy cập vị trí',
      message: 'Shippy App muốn truy cập vị trí của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    },
  );

  let granted3 = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    {
      title: 'Quyền truy cập vị trí',
      message: 'Shippy App muốn truy cập vị trí của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    },
  );
  if (
    granted === PermissionsAndroid.RESULTS.GRANTED &&
    granted2 === PermissionsAndroid.RESULTS.GRANTED &&
    granted3 === PermissionsAndroid.RESULTS.GRANTED
  ) {
    return true;
  } else {
    Linking.openSettings();
    return false;
  }
};

export default HashPermissionLocation;
