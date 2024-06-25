import React, {useCallback, useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  View,
  ToastAndroid,
  Linking,
  Image,
  Text,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Button from '../component/Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PlaceImgIdentity from '../component/PlaceImgIdentity';
import {getBlob} from '../../lib/utils/image';

import axios from 'axios';
import {axiosInstance} from '../../lib/utils/axios';
import IMAGE from '../../lib/constant/img';
import {IdentityScreenParamList} from '../../types/ScreenParam';

const IdentityScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<IdentityScreenParamList>;
}): React.ReactElement => {
  const [imgFront, setImgFront] = useState<string | undefined>(undefined);
  const [imgBack, setImgBack] = useState<string | undefined>(undefined);
  console.log(navigation.getState().routes);

  const requestPermission = useCallback(async (type: 'back' | 'front') => {
    navigation.navigate('imgDriveLicense', {
      identityAfter: '',
      identityBefore: 'imgBack',
    });
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Quyền truy cập camera Shippy App',
          message: 'Shippy App muốn sử dụng camera của bạn',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Không',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        const result = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
        });
        const {data} = await (
          await axiosInstance()
        ).post('/media/sign-url', {
          fileName: result.assets?.[0].uri,
          typeImg: IMAGE.IDENTITY,
          contentType: type,
          id: id ?? '',
        });

        setImgFront(result.assets?.[0].uri);
        if (!result.didCancel) {
          console.log(result.assets?.[0]);
          const uri = result.assets?.[0].uri;
          RNFetchBlob.fetch(
            'PUT',
            'https://tmp-filename.s3.ap-southeast-1.amazonaws.com/imgdrivelicense_59-1718675738859.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASNQLR5DGHRF4LL6V%2F20240618%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240618T015538Z&X-Amz-Expires=300&X-Amz-Signature=0c195c9cce276c4c71f7126189344d7e1cd2a96c51a19ec9fcb0f7f8d0e9288a&X-Amz-SignedHeaders=host&x-id=PutObject',
            {
              'Content-Type': 'image/jpeg',
            },
            RNFetchBlob.wrap(uri as string),
          )
            .then(res => {
              console.log(res.respInfo);
            })
            .catch(err => {
              console.log(err);
            });
          // const blob = await getBlob(uri as string);
          // console.log(blob);
          // console.log(result.assets?.[0]);
          // let put = await axios.put(
          //   'https://tmp-filename.s3.ap-southeast-1.amazonaws.com/imgdrivelicense_59-1718173033667.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASNQLR5DGHRF4LL6V%2F20240612%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240612T061713Z&X-Amz-Expires=300&X-Amz-Signature=59a71d8bdbd43a13bc9d7b52b708c9ab3056569a41624fbdfb20901e79d89cbd&X-Amz-SignedHeaders=host&x-id=PutObject',
          //   blob,
          //   {
          //     headers: {
          //       'Content-Type': 'image/jpeg',
          //     },
          //   },
          // );
          // console.log(put);
        }
      } else {
        Linking.openSettings();
        ToastAndroid.show(
          'Quyền truy cập camera bị từ chối',
          ToastAndroid.SHORT,
        );
      }
    } catch (err: any) {
      console.log(err);
      ToastAndroid.show('Có lỗi xảy ra', ToastAndroid.SHORT);
    }
  }, []);
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
          <PlaceImgIdentity title="CCCD Mặt Sau" />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Button title="CCCD Mặt Trước" onPress={requestPermission} />
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
