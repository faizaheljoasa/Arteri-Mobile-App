import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";

const GrafikProgres = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <HeaderMenu 
              title="Grafik Progres"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />
              <Text>Grafik Progress</Text>
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

export default GrafikProgres