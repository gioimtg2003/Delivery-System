import React, {useState} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import colors from '../../lib/constant/color';

const Loading = (): React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View
          style={{
            padding: 30,
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator
            size="large"
            color={colors.placeholder}
            animating={true}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
