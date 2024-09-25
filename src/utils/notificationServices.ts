import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new genrated token');
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error in fcmToken');
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
    console.log(
      'Notification caused app to open from background state bla bla:',
      remoteMessage,
    );
  });
  messaging().onMessage(async (remoteMessage: any) => {
    console.log(remoteMessage, 'onMessageonMessageonMessage');
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    console.log(remoteMessage, 'setBackgroundMessageHandler');
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage: any) => {});
};
