import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function scheduleTestNotification() {
  const permission = await Notifications.requestPermissionsAsync();

  if (permission.status !== 'granted') {
    alert('Permission not granted!');
    return;
  }

  const trigger = new Date(Date.now() + 5 * 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Notification',
      body: 'This is a test notification!',
      sound: 'default',
    },
    trigger: {
      seconds: 5,
      repeats: false,
    },
  });
}

export default function App() {
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Text className="mb-4 text-center">Selamat datang di aplikasi pemeriksaan mingguan!</Text>
      <View className="flex">
        <Button title="Schedule Test Notification" onPress={scheduleTestNotification} />
        <Button title="Back to Home" onPress={() => router.replace('/home')} />
      </View>
    </View>
  );
}
