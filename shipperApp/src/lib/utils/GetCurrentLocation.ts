import GetLocation, {Location, LocationError} from 'react-native-get-location';

const GetCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 15000,
      rationale: {
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        message: 'We need your location to show you nearby drivers',
        title: 'Location permission',
      },
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
