import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from '../../lib/constant/color';
const Button = ({
  title,
  style,
  onPress,
  color = colors.placeholder,
  disabled = true,
}: {
  readonly title: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
  readonly color?: string;
  readonly disabled?: boolean;
}): React.ReactElement => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.3}
      style={[styles.btn, style, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
