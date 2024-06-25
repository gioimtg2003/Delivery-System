import GetLocation, {Location, LocationError} from 'react-native-get-location';

const GetCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location: Location) => {
        resolve(location);
      })
      .catch((error: LocationError) => {
        reject(error);
      });
  });
};

export default GetCurrentLocation;
