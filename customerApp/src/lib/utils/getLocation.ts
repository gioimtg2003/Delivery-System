import GetLocation, {Location} from 'react-native-get-location';

const getLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        resolve(location);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default getLocation;
