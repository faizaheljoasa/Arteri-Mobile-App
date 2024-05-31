import { StatusBar } from "expo-status-bar";
import { Alert, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images, icons } from "../../constants"
import { useState } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import CustomButton from "../../components/CustomButton";
import MenuButton from "../../components/MenuButton";
import { logout } from "../../lib/appwrite";


const AkunSetting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogout = async () => {
    try {
      await logout();
      
      router.replace('/sign-in')
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout dibatalkan"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: handleLogout,
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <HeaderMenu 
              title="Pengaturan Akun"
              isLoading={isSubmitting}
              backButton={() => router.push('/pengaturan')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <MenuButton 
                title="Ganti Nama Pengguna"
                handlePress={() => router.push('/gantiUsername')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.idCard}
              />
              <MenuButton 
                title="Ganti Password"
                handlePress={() => router.push('/gantiPassword')}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                icon={icons.padLock}
              />
              <CustomButton 
                title="Logout"
                handlePress={confirmLogout}
                containerStyles="w-full mt-7 bg-red-500"
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

export default AkunSetting