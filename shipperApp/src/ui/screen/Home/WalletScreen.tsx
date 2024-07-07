import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import colors from '../../../lib/constant/color';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryWallet from '../../component/HistoryWallet';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ConvertPrice} from '../../../lib/utils/converPrice';
import {useDriver} from '../../../lib/context/Driver/Context';
import {useAuth} from '../../../lib/context/auth.context';

const WalletScreen = ({
  navigation,
}: {
  readonly navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const data = [{key: 'header'}];
  const {reloadHistoryWallet} = useDriver();
  const [refreshing, setRefreshing] = useState(false);
  const {reload, driver} = useAuth();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      reload();
      reloadHistoryWallet();
    }, 500);
  }, [reload, reloadHistoryWallet]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.placeholder, 'green', 'blue']}
          />
        }
        data={data}
        keyExtractor={item => item.key}
        ListHeaderComponent={
          <>
            <View style={styles.containerHeader}>
              <View style={styles.rowHeader}>
                <SimpleLineIcons
                  name="wallet"
                  size={20}
                  color={colors.placeholder}
                />
                <Text style={styles.headerText}>Ví tiền của bạn</Text>
              </View>
              <Text style={styles.balanceTitle}>Số dư hiện có</Text>
              <Text style={styles.balance}>
                {ConvertPrice(driver?.Balance as number)}
              </Text>
              <View style={[styles.rowHeader, {marginTop: 20}]}>
                <Text
                  style={styles.actionText}
                  onPress={() => {
                    navigation.navigate('AddWalletScreen');
                  }}>
                  Nạp tiền
                </Text>
                <SimpleLineIcons
                  name="arrow-right"
                  size={20}
                  color={colors.placeholder}
                  style={styles.icon}
                />
                {/* <Text style={[styles.actionText, styles.marginLeft]}>
                  Rút tiền
                </Text>
                <SimpleLineIcons
                  name="arrow-right"
                  size={20}
                  color={colors.placeholder}
                  style={styles.icon}
                /> */}
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.containerHistory}>
              <View style={styles.rowHeader}>
                <MaterialCommunityIcons
                  name="history"
                  size={30}
                  color={colors.placeholder}
                />
                <Text style={styles.historyTitle}>Lịch sử yêu cầu</Text>
              </View>
            </View>
          </>
        }
        renderItem={() => <HistoryWallet />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  containerHeader: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: colors.bgInput,
    marginTop: 20,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'gray',
  },
  balanceTitle: {
    fontSize: 18,
    marginTop: 20,
    color: '#3a3a3a',
  },
  balance: {
    fontSize: 28,
    marginTop: 8,
    color: 'black',
  },
  actionText: {
    fontSize: 16,
    color: '#3a3a3a',
  },
  icon: {
    marginLeft: 10,
  },
  marginLeft: {
    marginLeft: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 20,
    elevation: 3,
  },
  containerHistory: {
    marginVertical: 20,
  },
  historyTitle: {
    fontSize: 18,
    marginLeft: 5,
    color: '#4a4a4a',
  },
});

export default WalletScreen;
