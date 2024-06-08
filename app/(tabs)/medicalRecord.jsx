import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import { getAllData } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const MedicalRecord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { medicalRecord } = useGlobalContext();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100vh' }}>
            <HeaderMenu
              title="Medical Record"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />
              <View className="flex w-full justify-center items-center mt-4 mb-6">
                {medicalRecord ? (
                  medicalRecord.slice().reverse().map((item, index) => (
                    <View key={index} className="bg-purple-100 p-6 w-full rounded-lg mb-2">
                      <Text className="text-white">{formatDate(item.date)}</Text>
                      <Text className="text-white font-bold text-lg">{item.information}</Text>
                    </View>
                  ))
                ) : (
                  <Text>{'   '}</Text>
                )}
              </View>
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

export default MedicalRecord