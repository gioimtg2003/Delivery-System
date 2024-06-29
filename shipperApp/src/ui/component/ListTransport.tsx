import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ITransport} from '../../types/transport';
import colors from '../../lib/constant/color';

const ListTransport = ({
  data,
  setVehicle,
  close,
}: {
  readonly data: ITransport[];
  readonly setVehicle: (vehicle: ITransport) => void;
  readonly close: () => void;
}): React.ReactElement => {
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const touchableRefs = useRef<{[key: number]: any}>({});

  const handleFocus = (id: number) => {
    setFocusedId(id);
  };

  return (
    <>
      {data.map(transport => {
        return (
          <TouchableOpacity
            key={transport.id}
            style={[
              styles.container,
              {
                borderColor:
                  focusedId === transport.id ? colors.placeholder : '#ccc',
              },
            ]}
            onPress={() => {
              setVehicle(transport);
              close();
            }}
            activeOpacity={0.5}
            ref={el => (touchableRefs.current[transport.id] = el)}
            onPressIn={() => handleFocus(transport.id)}>
            <Image
              source={{
                uri: `http://10.0.2.2:3000/api/images/` + transport.ImgUrl,
              }}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.text}>{transport.Name}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
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
    width: '40%',
  },
});

export default ListTransport;
