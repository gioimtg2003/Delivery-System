import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import colors from '../../lib/constant/color';
import {useDriver} from '../../lib/context/Driver/Context';

const {height} = Dimensions.get('window');
const modalHeight = height / 5;

const ModalOnline = ({
  visible,
  onClose,
  loading,
}: {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly loading: (loading: boolean) => void;
}) => {
  const {changeOnline, state} = useDriver();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text
                  style={{
                    fontSize: 15,
                  }}>
                  Thay đổi trạng thái làm việc
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={true ? colors.placeholder : '#000'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={e => {
                    loading(true);
                    changeOnline(e);
                    setTimeout(() => {
                      loading(false);
                    }, 1000);
                  }}
                  value={state.driver?.OnlineStatus === 1}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Làm tối nền phía sau modal
  },
  container: {
    width: '100%',
    height: modalHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
  },
  header: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ModalOnline;
