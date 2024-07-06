import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../lib/constant/color';
import {ITransport} from '../../lib/types/transport';
import {axiosInstance} from '../../lib/utils/axios';
import Loading from './Loading';
import {ConvertPrice} from '../../lib/utils/ConvertPrice';
interface CostInfo {
  Duration: string;
  Cost: number;
  Distance: string;
}
interface ICoordinate {
  lng: number;
  lat: number;
}
const ListTransport = ({
  setVehicle,
  sender,
  receiver,
}: {
  readonly setVehicle: (vehicle: ITransport) => void;
  readonly sender: ICoordinate | null;
  readonly receiver: ICoordinate | null;
}): React.ReactElement => {
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const touchableRefs = useRef<{[key: number]: any}>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleFocus = (id: number) => {
    setFocusedId(id);
  };
  const [infoCost, setInfoCost] = useState<(CostInfo & ITransport)[]>([]);
  useEffect(() => {
    if (sender && receiver) {
      setLoading(true);
      setTimeout(() => {
        (async () => {
          try {
            console.log(
              `/costs/calculate?origin=${sender.lat},${sender.lng}&destination=${receiver.lat},${receiver.lng}`,
            );
            let responseData = await (
              await axiosInstance()
            ).get(
              `/costs/calculate?origin=${sender.lat},${sender.lng}&destination=${receiver.lat},${receiver.lng}`,
            );
            console.log(responseData.data);
            setInfoCost(responseData.data.data);
          } catch (err) {
            console.log(err);
            ToastAndroid.show('Lỗi khi lấy thông tin giá', ToastAndroid.SHORT);
          } finally {
            setLoading(false);
          }
        })();
      }, 1000);
    }
  }, [sender, receiver]);
  return (
    <>
      {infoCost.map(transport => {
        return (
          <TouchableOpacity
            key={transport.id}
            style={[
              styles.container,
              {
                borderColor:
                  focusedId === transport.id ? colors.placeholder : '#ccc',
                backgroundColor:
                  focusedId === transport.id ? colors.bgInput : '#fff',
              },
            ]}
            onPress={() => setVehicle(transport)}
            activeOpacity={0.8}
            ref={el => (touchableRefs.current[transport.id] = el)}
            onPressIn={() => handleFocus(transport.id)}>
            <Image
              source={{
                uri: 'http://192.168.1.76:3000/api/images/' + transport.ImgUrl,
              }}
              style={{width: 50, height: 50}}
            />
            <View style={styles.containerText}>
              <Text style={styles.text}>
                {transport.Name} | {transport.Distance}
              </Text>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                }}>
                {ConvertPrice(Number(transport.Cost))} ({transport.Duration})
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {loading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  containerText: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default ListTransport;
