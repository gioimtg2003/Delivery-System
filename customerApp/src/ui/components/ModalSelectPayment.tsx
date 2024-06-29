import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../lib/constant/color';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalSelectPayment = ({
  visible,
  onClose,
  receiverName,
  senderName,
  setIsTakeShippingFee,
  onPress,
}: {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly receiverName: string;
  readonly senderName: string;
  readonly setIsTakeShippingFee: (value: boolean) => void;
  readonly onPress: () => void;
}): React.ReactElement => {
  const [selectedPayer, setSelectedPayer] = useState<'sender' | 'receiver'>(
    'sender',
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={{flex: 1, backgroundColor: '#00000000'}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialIcons
              name="payment"
              size={26}
              color={colors.placeholder}
            />
            <Text style={styles.title}>Phương thức thanh toán</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={{color: colors.placeholder, fontSize: 16}}>
              Tiền mặt
            </Text>
            <MaterialIcons
              name="check-circle"
              size={26}
              color={colors.placeholder}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.4}
            style={[
              styles.selection,
              selectedPayer === 'sender' && styles.selectedBorder,
            ]}
            onPress={() => {
              setSelectedPayer('sender');
              setIsTakeShippingFee(false);
            }}>
            <EvilIcons name="location" size={24} color="#A0DEFF" />
            <Text style={styles.label}>Người gửi: {senderName} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            style={[
              styles.selection,
              selectedPayer === 'receiver' && styles.selectedBorder,
            ]}
            onPress={() => {
              setSelectedPayer('receiver');
              setIsTakeShippingFee(true);
            }}>
            <Entypo name="location-pin" size={24} color="#5BBCFF" />
            <Text style={styles.label}>Người nhận: {receiverName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completeButton}
            activeOpacity={0.6}
            onPress={onPress}>
            <Text style={styles.completeButtonText}>Hoàn tất </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  paymentMethod: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.placeholder,
  },
  selection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 7,
  },
  selectedBorder: {
    borderWidth: 1,
    borderColor: colors.placeholder,
    backgroundColor: colors.bgInput,
  },
  completeButton: {
    width: '98%',
    backgroundColor: colors.placeholder,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ModalSelectPayment;
