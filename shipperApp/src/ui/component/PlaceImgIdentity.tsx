import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../lib/constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PlaceImgIdentity = ({
  title,
  img,
}: {
  readonly title: string;
  readonly img?: string;
}): React.ReactElement => {
  return (
    <View style={styles.container}>
      {img ? (
        <Image
          source={{uri: img}}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
      ) : (
        <>
          <MaterialIcons
            name="photo-camera-back"
            size={30}
            color={colors.placeholder}
          />
          <Text style={styles.text}>{title}</Text>
        </>
      )}

      {/*  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 2,
  },
  text: {
    color: colors.placeholder,
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default PlaceImgIdentity;
