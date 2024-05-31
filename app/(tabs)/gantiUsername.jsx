import { StatusBar } from "expo-status-bar";
import { Alert, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants"
import { useState } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import MenuButton from "../../components/MenuButton";
import FormField from "../../components/FormField";
import { changeUsername } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const GantiUsername = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { updateUser } = useGlobalContext();

  const [form, setForm] = useState({
    newUsername: '',
  })

  const handleChangeUsername = async () => {
    try {
      await changeUsername(form.newUsername);

      setForm({ 
        ...form, 
        newUsername: '',
      })

      Alert.alert('Success', 'Username berhasil diubah');
      await updateUser();
    } catch (error) {
      Alert.alert('Error', 'Gagal mengubah username. Coba lagi.');
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
              title="Ganti Username"
              isLoading={isSubmitting}
              backButton={() => router.push('/akunSetting')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <FormField 
                title="Nama Pengguna Baru"
                textStyle="text-black"
                value={form.newUsername}
                handleChangeText={(event) => setForm({ ...form, newUsername: event })}
                otherStyles="mt-7"
              />
              <CustomButton 
                title="Ganti Nama Pengguna"
                handlePress={handleChangeUsername}
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

export default GantiUsername