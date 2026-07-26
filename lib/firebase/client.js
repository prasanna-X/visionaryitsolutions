"use client";

import { initializeApp, getApps } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

function getFirebaseApp() {
  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

// Registers the service worker, asks the browser for notification
// permission, and returns an FCM device token — or null if the browser
// doesn't support push, or the person declines permission.
export async function requestFcmToken() {
  if (typeof window === "undefined") return null;
  if (!(await isSupported())) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
  );

  const messaging = getMessaging(getFirebaseApp());
  const token = await getToken(messaging, {
    vapidKey: process.env.FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  return token || null;
}

// Listens for pushes that arrive while the admin dashboard tab is open
// and in the foreground (background pushes are handled by the service
// worker instead).
export async function onForegroundMessage(callback) {
  if (typeof window === "undefined") return () => {};
  if (!(await isSupported())) return () => {};

  const messaging = getMessaging(getFirebaseApp());
  return onMessage(messaging, callback);
}
