import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ToastAndroid} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Button from '../component/Button';
import {launchCamera} from 'react-native-image-picker';
import PlaceImgIdentity from '../component/PlaceImgIdentity';

import {Axios} from '../../lib/utils/axios';
import IMAGE from '../../lib/constant/img';
import {AppScreenParamList} from '../../types/ScreenParam';
import HashPermissionCam from '../../lib/utils/HashPermissionCam';
import UploadS3 from '../../lib/utils/UpLoadS3';

const IdentityScreen1 = ({
  navigation,
}: {
  readonly navigation: NavigationProp<AppScreenParamList>;
}): React.ReactElement => {
  const [imgFront, setImgFront] = useState<string | undefined>(undefined);
  const [imgBack, setImgBack] = useState<string | undefined>(undefined);
  const [key, setKey] = useState<{
    imgDriveLicenseBefore: string;
    imgDriverLicenseAfter: string;
  }>({
    imgDriveLicenseBefore: '',
    imgDriverLicenseAfter: '',
  });
  const shipper = useMemo(() => {
    return navigation.getState().routes.find(e => e.name === 'identity')
      ?.params as {
      idShipper?: number;
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
        });
        if (!result.didCancel) {
          const {data} = await new Axios()
            .getInstance()
            .post('/media/sign-url', {
              fileName: result.assets?.[0].uri,
              typeImg: IMAGE.DRIVE_LICENSE,
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
              setImgFront(result.assets?.[0].uri);
              setKey({
                ...key,
                imgDriveLicenseBefore: data.data.key,
              });
            } else {
              setImgBack(result.assets?.[0].uri);
              setKey({
                ...key,
                imgDriverLicenseAfter: data.data.key,
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
      if (err.response.data.code === 429) {
        ToastAndroid.show('Thao tác chậm lại', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.SHORT);
      }
    }
  }, [imgFront, shipper, key]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPic}>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="GPLX Mặt Trước" img={imgFront} />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="GPLX Mặt Sau" img={imgBack} />
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
            title={imgFront ? 'GPLX MẶT SAU' : 'GPLX MẶT TRƯỚC'}
            onPress={HandleUpload}
          />
        ) : (
          <Button
            title={'TIẾP THEO'}
            onPress={() => {
              navigation.navigate('imgVehicleRegistrationCert', key);
            }}
          />
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

export default IdentityScreen1;
