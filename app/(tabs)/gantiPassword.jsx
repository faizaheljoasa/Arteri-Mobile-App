import { StatusBar } from "expo-status-bar";
import { Alert, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"
import { useState } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

import { changePassword } from "../../lib/appwrite";

const GantiPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      Alert.alert('Error', 'Password baru dan konfirmasi password tidak cocok');
      return;
    }

    try {
      await changePassword(form.oldPassword, form.newPassword);

      setForm({ 
        ...form, 
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      Alert.alert('Success', 'Password berhasil diubah');
    } catch (error) {
      Alert.alert('Error', 'Gagal mengubah password. Pastikan password lama Anda benar.');
    }
  };

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <HeaderMenu 
              title="Ganti Password"
              isLoading={isSubmitting}
              backButton={() => router.push('/akunSetting')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <FormField 
                title="Password Lama"
                textStyle="text-black"
                value={form.oldPassword}
                handleChangeText={(event) => setForm({ ...form, oldPassword: event })}
                otherStyles="mt-7"
              />
              <FormField 
                title="Password Baru"
                textStyle="text-black"
                value={form.newPassword}
                handleChangeText={(event) => setForm({ ...form, newPassword: event })}
                otherStyles="mt-7"
              />
              <FormField 
                title="Konfirmasi Password"
                textStyle="text-black"
                value={form.confirmPassword}
                handleChangeText={(event) => setForm({ ...form, confirmPassword: event })}
                otherStyles="mt-7"
              />

              <CustomButton 
                title="Ganti Password"
                handlePress={handleChangePassword}
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

export default GantiPassword