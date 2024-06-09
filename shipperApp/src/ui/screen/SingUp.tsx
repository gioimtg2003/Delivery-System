import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import ImageSignUp from '../component/ImageSignUp';

const SignUpScreen = (): React.ReactElement => {
  const [showKeyBoard, setShowKeyBoard] = useState<boolean>(false);
  useEffect(() => {
    const showKeyBoard = Keyboard.addListener('keyboardDidShow', () => {
      setShowKeyBoard(true);
    });
    const hideKeyBoard = Keyboard.addListener('keyboardDidHide', () => {
      setShowKeyBoard(false);
    });
    return () => {
      showKeyBoard.remove();
      hideKeyBoard.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#fff',
          flexDirection: 'column',
          width: '100%',
        }}>
        {!showKeyBoard && (
          <View style={styles.containerImg}>
            <ImageSignUp />
          </View>
        )}

        <View style={styles.containerInput}>
          <TextInput
            placeholder="Nhập tên của bạn"
            style={{borderWidth: 1, borderColor: '#000', width: '100%'}}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  containerImg: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    width: '80%',
    height: '40%',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
export default SignUpScreen;
