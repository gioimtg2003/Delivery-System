import React from 'react';
import {Button, Modal, Text, View} from 'react-native';
import {useDriver} from '../../lib/context/Driver/Context';

const Warning = (): React.ReactElement => {
  const {state, hideWarning} = useDriver();
  return (
    <Modal visible={state.showWarning} transparent={true}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 20,
                color: 'black',
              }}>
              {state.warning?.content}
            </Text>
            <Button
              title="OK"
              onPress={() => {
                console.log('OK');
                hideWarning();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Warning;
