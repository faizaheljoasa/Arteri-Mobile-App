import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants"
import CustomButton from "../components/CustomButton";

import { useGlobalContext} from "../context/GlobalProvider"
import { useEffect } from "react";
import { scheduleWeeklyNotifications } from "../lib/notification";

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  useEffect(() => {
    scheduleWeeklyNotifications();
  }, []);

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full justify-center items-center min-h-[87vh] px-4">
              <Image 
                source={images.logo}
                className="w-[240px] h-[114px]"
                resizeMode="contain"
              />

              <Image 
                source={images.hero}
                className="w-[340px] h-[184px]"
                resizeMode="contain"
              />

              <View className="relative mt-5">
                <Text className="text-3xl text-purple font-bold text-center">
                  Discover Endless Possibilities with {' '}
                  <Text className="text-secondary-200">Arteri</Text>
                </Text>

                <Image 
                  source={images.path}
                  className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                  resizeMode="contain"
                />
              </View>

              <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                where creativity meets innovations: embrek on a journey of limitless exploration with Arteri
              </Text>

              <CustomButton 
                title="Start with Arteri"
                handlePress={() => router.push('/sign-in')}
                containerStyles="w-full mt-7 bg-secondary-200"
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