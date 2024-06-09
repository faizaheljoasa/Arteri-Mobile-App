import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants"
import MenuButton from "../../components/MenuButton";

import { getCurrentUser } from "../../lib/appwrite";
import { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/GlobalProvider";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { scheduleWeeklyNotifications } from "../../lib/notification";

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useGlobalContext();

  useEffect(() => {
    scheduleWeeklyNotifications();

    if (Device.isDevice) {
      Notifications.requestPermissionsAsync().then(({ status }) => {
        if (status !== 'granted') {
          alert('Please enable notifications in settings');
        }
      });
    } else {
      alert('Must use physical device for notifications');
    }
  }, []);

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100vh' }}>
            <View className="w-full justify-center items-center min-h-[95vh] px-4">
              <View className="flex flex-row w-full justify-between items-center mt-2">
                <View className="flex flex-col">
                  <Text className="text-xs text-purple font-bold">Salam Sehat,</Text>
                  {user ? (
                    <Text className="text-md text-gray-700 font-bold">
                      {'     '}{user.username}
                    </Text>
                  ) : (
                    <Text>{'     '}Bapak/Ibu</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => router.replace('/notification')}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={icons.notification}
                    className="w-[32px] h-[32px]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <Image 
                source={images.heroMenu}
                className="w-[340px] h-[184px] mt-6"
                resizeMode="contain"
              />

              <View className="relative mt-5">
                <Text className="text-3xl text-purple font-bold text-center">
                  {' '} Selamat Datang Kembali di {' '}
                  <Text className="text-secondary-200">Arteri</Text>
                </Text>

                <Image 
                  source={images.path}
                  className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                  resizeMode="contain"
                />
              </View>

              <MenuButton 
                title="Hasil Tes"
                handlePress={() => router.push('/hasilTes')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.testArteri}
              />
              <MenuButton 
                title="Garifk Progres"
                handlePress={() => router.push('/grafikProgres')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.statistikArteri}
              />
              <MenuButton 
                title="Video Tutorial"
                handlePress={() => router.push('/videoTutorial')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.tutorialArteri}
              />
              <MenuButton 
                title="Medical Record"
                handlePress={() => router.push('/medicalRecord')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.recordArteri}
              />
              <MenuButton 
                title="Pengaturan"
                handlePress={() => router.push('/pengaturan')}
                containerStyles="mt-7 mb-10"
                isLoading={isSubmitting}
                icon={icons.setting}
              />
            </View>
          </ScrollView>
          <StatusBar 
            backgroundColor="#F7DCB9"
            style="dark"
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default Home