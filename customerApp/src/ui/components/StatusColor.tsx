import React from 'react';
import {Text} from 'react-native';

export const StatusColor = (
  status:
    | 'pending'
    | 'pending_pickup'
    | 'picked_up'
    | 'delivery'
    | 'release'
    | 'cancel'
    | 'success',
): React.ReactElement => {
  switch (status) {
    case 'pending':
      return (
        <Text
          style={{
            color: '#EF9C66',
            fontSize: 14,
          }}>
          Đang chờ nhận đơn
        </Text>
      );
    case 'pending_pickup':
      return (
        <Text
          style={{
            color: 'green',
            fontSize: 14,
          }}>
          Đang chờ lấy hàng
        </Text>
      );
    case 'picked_up':
      return (
        <Text
          style={{
            color: 'green',
            fontSize: 14,
          }}>
          Đã lấy hàng
        </Text>
      );
    case 'delivery':
      return (
        <Text
          style={{
            color: 'green',
            fontSize: 14,
          }}>
          Đang giao hàng
        </Text>
      );
    case 'success':
      return (
        <Text
          style={{
            color: 'green',
            fontSize: 14,
          }}>
          Thành công
        </Text>
      );
    case 'cancel':
      return (
        <Text
          style={{
            color: 'red',
            fontSize: 14,
          }}>
          Đã hủy
        </Text>
      );
    default:
      return (
        <Text
          style={{
            color: 'red',
            fontSize: 14,
          }}>
          Chưa rõ
        </Text>
      );
  }
};
