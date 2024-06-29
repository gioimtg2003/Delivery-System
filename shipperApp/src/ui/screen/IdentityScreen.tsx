import React, {useCallback, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ToastAndroid} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Button from '../component/Button';
import {launchCamera} from 'react-native-image-picker';
import PlaceImgIdentity from '../component/PlaceImgIdentity';

import {axiosInstance} from '../../lib/utils/axios';
import IMAGE from '../../lib/constant/img';
import {AppScreenParamList} from '../../types/ScreenParam';
import HashPermissionCam from '../../lib/utils/HashPermissionCam';
import UploadS3 from '../../lib/utils/UpLoadS3';

const IdentityScreen = ({
  route,
  navigation,
}: {
  readonly route: RouteProp<AppScreenParamList, 'identity'>;
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
            typeImg: IMAGE.IDENTITY,
            contentType: result.assets?.[0].type,
            id: route.params.idShipper,
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
                identityBefore: data.data.key,
              });
            } else {
              setKey({
                ...key,
                identityAfter: data.data.key,
              });
              setImgBack(result.assets?.[0].uri);
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
  }, [imgFront, route.params.idShipper, key]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPic}>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="CCCD Mặt Trước" img={imgFront} />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
          }}>
          <PlaceImgIdentity title="CCCD Mặt Sau" img={imgBack} />
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
            title={imgFront ? 'CCCD MẶT SAU' : 'CCCD MẶT TRƯỚC'}
            onPress={HandleUpload}
          />
        ) : (
          <Button
            title={'TIẾP THEO'}
            onPress={() => {
              navigation.navigate('imgDriveLicense', key);
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

export default IdentityScreen;
