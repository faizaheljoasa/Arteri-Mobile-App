import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants"
import { useState } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import MenuButton from "../../components/MenuButton";

const TestingApi = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <HeaderMenu 
              title="Testing API"
              isLoading={isSubmitting}
              backButton={() => router.push('/pengaturan')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <MenuButton
                title="API Hasil Test"
                handlePress={() => router.push('/apiHasilTest')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.testArteri}
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

export default TestingApi