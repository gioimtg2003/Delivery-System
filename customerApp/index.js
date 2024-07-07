/**
 * @format
 */
import PushNotification from 'react-native-push-notification';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
