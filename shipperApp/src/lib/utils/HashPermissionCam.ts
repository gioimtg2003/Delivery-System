import {Linking, PermissionsAndroid} from 'react-native';

const HashPermissionCam = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Quyền truy cập camera Shippy App',
      message: 'Shippy App muốn sử dụng camera của bạn',
      buttonNeutral: 'Hỏi lại sau',
      buttonNegative: 'Không',
      buttonPositive: 'Đồng ý',
    })
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(true);
        } else {
          Linking.openSettings();
          resolve(false);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default HashPermissionCam;
