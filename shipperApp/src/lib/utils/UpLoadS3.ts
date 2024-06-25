import ReactNativeBlobUtil from 'react-native-blob-util';

const UploadS3 = (
  file: string,
  type: string,
  uri: string,
): Promise<boolean> => {
  console.log('UploadS3:', file, type, uri);
  return new Promise((resolve, reject) => {
    ReactNativeBlobUtil.config({
      timeout: 60000, // Consider increasing if necessary
    })
      .fetch('PUT', uri, {'Content-Type': type}, ReactNativeBlobUtil.wrap(file))
      .then(res => {
        console.log(res);
        if (res.respInfo.status === 200) {
          resolve(true);
        } else {
          reject(new Error('Upload failed'));
        }
      })
      .catch(err => {
        console.log('Upload error:', err);
        reject(err);
      });
  });
};

export default UploadS3;
