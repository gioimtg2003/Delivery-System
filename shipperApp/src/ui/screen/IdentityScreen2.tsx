import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ToastAndroid} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Button from '../component/Button';
import {launchCamera} from 'react-native-image-picker';
import PlaceImgIdentity from '../component/PlaceImgIdentity';

import {Axios, axiosInstance} from '../../lib/utils/axios';
import IMAGE from '../../lib/constant/img';
import {AppScreenParamList} from '../../types/ScreenParam';
import HashPermissionCam from '../../lib/utils/HashPermissionCam';
import UploadS3 from '../../lib/utils/UpLoadS3';
import Toast from 'react-native-toast-message';

const IdentityScreen2 = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<AppScreenParamList, 'imgVehicleRegistrationCert'>;
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [imgFront, setImgFront] = useState<string | undefined>(undefined);
  const [imgBack, setImgBack] = useState<string | undefined>(undefined);
  const [key, setKey] = useState<{
    identityBefore: string;
    identityAfter: string;
  }>({
    identityBefore: '',
    identityAfter: '',
  });
  const shipper = useMemo(() => {
    return navigation.getState().routes.find(e => e.name === 'identity')
      ?.params as {
      idShipper?: number;
    };
  }, [navigation]);
  const identity = useMemo(() => {
    return navigation.getState().routes.find(e => e.name === 'imgDriveLicense')
      ?.params as {
      identityAfter: string;
      identityBefore: string;
    };
  }, [navigation]);

  const HandleUpload = useCallback(async () => {
    try {
      let permission = await HashPermissionCam();
      if (permission === false) {
        ToastAndroid.show(
          'Quyền truy cập camera bị từ chối',
          ToastAndroid.SHORT,
        );
        return;
      } else {
        const result = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
        });
        if (!result.didCancel) {
          const {data} = await (
            await axiosInstance()
          ).post('/media/sign-url', {
            fileName: result.assets?.[0].uri,
            typeImg: IMAGE.VEHICLE_REGISTRATION,
            contentType: result.assets?.[0].type,
            id: shipper.idShipper,
          });

          let putImg = await UploadS3(
            result.assets?.[0].uri as string,
            result.assets?.[0].type as string,
            data.data.url,
          );
          if (putImg === true) {
            if (imgFront === undefined) {
              setKey({
                ...key,
                identityBefore: data.data.key,
              });
              setImgFront(result.assets?.[0].uri);
            } else {
              setImgBack(result.assets?.[0].uri);
              setKey({
                ...key,
                identityAfter: data.data.key,
              });
            }
          } else {
            ToastAndroid.show(
              'Có lỗi xảy ra trong quá trình upload ảnh',
              ToastAndroid.LONG,
            );
          }
        }
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.code === 429) {
        ToastAndroid.show('Thao tác chậm lại', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.SHORT);
      }
    }
  }, [imgFront, shipper.idShipper, key]);

  const handle = useCallback(async () => {
    try {
      let update = await new Axios()
        .getInstance()
        .post('/shipper/auth/identity', {
          idShipper: shipper.idShipper,
          ImgVehicleRegistrationCertBefore: key.identityBefore,
          ImgVehicleRegistrationCertAfter: key.identityAfter,
          ImgDriveLicenseBefore: route.params.imgDriveLicenseBefore,
          ImgDriveLicenseAfter: route.params.imgDriverLicenseAfter,
          ImgIdentityCardBefore: identity.identityBefore,
          ImgIdentityCardAfter: identity.identityAfter,
        });
      if (update.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Cập nhật thành công',
          text2: 'Vui lòng chờ 1-2 ngày để xác minh thông tin',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        });
      }
    } catch (err: any) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Vui lòng thử lại',
      });
    }
  }, [key, shipper, navigation, route, identity]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPic}>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="Cà vẹt Mặt Trước" img={imgFront} />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="Cà vẹt Mặt Sau" img={imgBack} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        {(imgFront && imgBack) === undefined ? (
          <Button
            title={imgFront ? 'Cà vẹt MẶT SAU' : 'Cà vẹt MẶT TRƯỚC'}
            onPress={HandleUpload}
          />
        ) : (
          <Button title={'HOÀN TẤT'} onPress={handle} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  containerPic: {
    flex: 9,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

export default IdentityScreen2;
