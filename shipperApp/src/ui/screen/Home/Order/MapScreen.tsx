import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppScreenParamList} from '../../../../types/ScreenParam';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapBox from '@rnmapbox/maps';
import axios from 'axios';
import colors from '../../../../lib/constant/color';
export default function MapScreen({
  route,
}: {
  readonly route: RouteProp<AppScreenParamList, 'mapScreen'>;
}): React.ReactElement {
  const icon = useMemo(
    () =>
      route.params.type === 'pickup'
        ? require('../../../../../assets/images/pickup-marker.png')
        : require('../../../../../assets/images/delivery-marker.png'),
    [route.params.type],
  );
  const [directions, setDirections] = useState<GeoJSON.Feature | null>(null);
  const [currentLocation, setCurrentLocation] = useState<number[] | null>(null);
  const [directionFetched, setDirectionFetched] = useState<boolean>(false);
  const [distance, setDistance] = useState<string>('0');
  const [show, setShow] = useState<boolean>(false);

  const getDirections = useCallback(async () => {
    try {
      if (currentLocation && !directionFetched) {
        const data = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation[0]},${currentLocation[1]};${route.params.destination[0]},${route.params.destination[1]}?alternatives=true&annotations=maxspeed&geometries=geojson&language=vi&overview=full&steps=true&access_token=pk.eyJ1IjoiZ2lvaW10ZzIwMDMiLCJhIjoiY2x4eWo1eWtrMDE2djJrc2J4YXdoYnFrYyJ9.64FARRTSE_P68B8VmWSBrA`,
        );
        setDistance(Number(data.data.routes[0].distance / 1000).toFixed(2));
        setDirections({
          type: 'Feature',
          properties: {},
          geometry: data.data.routes[0].geometry,
        });
        setDirectionFetched(true);
      }
    } catch (error) {
      console.log(error);
      console.log('error');
    }
  }, [route.params.destination, currentLocation, directionFetched]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
    (async () => {
      await getDirections();
    })();
  }, [getDirections]);

  return (
    <SafeAreaView style={styles.container}>
      <MapBox.MapView
        logoEnabled={false}
        zoomEnabled={true}
        styleURL={'mapbox://styles/gioimtg2003/cly3bplv3007k01qp87hradf3'}
        style={styles.map}>
        <MapBox.Camera
          followUserLocation={true}
          zoomLevel={12}
          centerCoordinate={[106.660172, 10.762622]}
          animationDuration={3000}
        />
        {show && directions && (
          <MapBox.ShapeSource id="exampleShapeSource" shape={directions}>
            <MapBox.LineLayer
              id="exampleLineLayer"
              style={{
                lineColor: colors.placeholder,
                lineWidth: 6,
              }}
            />
          </MapBox.ShapeSource>
        )}
        <MapBox.UserLocation
          visible={true}
          animated={true}
          onUpdate={location => {
            setCurrentLocation([
              location.coords.longitude,
              location.coords.latitude,
            ]);
          }}
          androidRenderMode={'gps'}
        />

        {show && (
          <MapBox.MarkerView
            id="1"
            coordinate={[
              route.params.destination[0],
              route.params.destination[1],
            ]}>
            <Image
              source={icon}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
          </MapBox.MarkerView>
        )}
      </MapBox.MapView>
      <View style={styles.bottom}>
        <View
          style={{
            width: '15%',
            height: 4,
            backgroundColor: '#5BBCFF',
            borderRadius: 10,
          }}
        />
        <View style={styles.row_1}>
          <View style={styles.row_1_}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                marginRight: 10,
              }}>
              Đến điểm {route.params.type === 'pickup' ? 'lấy' : 'giao'}
            </Text>
            <Image
              source={icon}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 10,
              color: colors.placeholder,
            }}>
            {distance} km
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row_1_: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row_1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});
