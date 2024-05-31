import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useState } from "react";

const HasilTes = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <HeaderMenu 
              title="Hasil Tes"
              isLoading={isSubmitting}
            />
            <View className="w-full justify-center items-center min-h-[75vh] px-4">
              <Text className="text-2xl text-purple-200 font-psemibold">
              Hasil Tes
              </Text>
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

export default HasilTes