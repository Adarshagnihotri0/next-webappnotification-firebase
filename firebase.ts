import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0MV5kwT-Le4dzXRhywMcbRcRn-HAmFIc',
  authDomain: 'webpushnotification-cc01d.firebaseapp.com',
  projectId: 'webpushnotification-cc01d',
  storageBucket: 'webpushnotification-cc01d.appspot.com',
  messagingSenderId: '254464963916',
  appId: '1:254464963916:web:57f03c582480038ba68be9',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
