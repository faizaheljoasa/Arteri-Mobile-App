import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import { useState, useEffect } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import MenuButton from "../../components/MenuButton";
import HeaderProfile from "../../components/HeaderProfile";
import Slider from '@react-native-community/slider';

import { updateSettings, getCurrentUser } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";

const AlatSetting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mode, setMode] = useState('off');
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [loading, setLoading] = useState(false);

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const handleUpdateSettings = async () => {
    try {
      setLoading(true);

      const hoursInt = parseInt(hours) || 0;
      const minutesInt = parseInt(minutes) || 0;
      const secondsInt = parseInt(seconds) || 0;

      const time = (hoursInt * 3600) + (minutesInt * 60) + secondsInt;

      setMode('on');

      const settings = {
        mode: 'on',
        speed: parseInt(speed),
        angle: parseInt(angle),
        time: parseInt(time)
      };
      await updateSettings(settings);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const stop = async () => {
    try {
      setIsSubmitting(true);
      const settings = {
        mode: 'off',
        speed: 0,
        angle: 0,
        time: 0,
      }
      await updateSettings(settings);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground source={images.texture}>
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100vh' }}>
            <HeaderMenu
              title="Pengaturan Alat Arteri"
              isLoading={isSubmitting}
              backButton={() => router.push('/pengaturan')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />

              <Text className="text-lg font-bold mb-4 mt-4">Mulai Pemeriksaan</Text>
              <TouchableOpacity
                onPress={handleUpdateSettings}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Image
                  source={images.togglePower}
                  className="w-[200px] h-[200px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View className="bg-purple-200 flex p-4 rounded-3xl justify-center items-center mt-6">
                <Text className="text-lg font-bold mb-2 text-white">Waktu</Text>
                <View className="flex-row justify-between mb-5 bg-purple-100">
                  <TextInput
                    className="border border-gray-300 rounded p-2 text-center w-1/4 text-white"
                    keyboardType="numeric"
                    value={hours ? String(hours) : ''}
                    onChangeText={setHours}
                    placeholder="Jam"
                  />
                  <TextInput
                    className="border border-gray-300 rounded p-2 text-center w-1/4 text-white"
                    keyboardType="numeric"
                    value={minutes ? String(minutes) : ''}
                    onChangeText={setMinutes}
                    placeholder="Menit"
                  />
                  <TextInput
                    className="border border-gray-300 rounded p-2 text-center w-1/4 text-white"
                    keyboardType="numeric"
                    value={seconds ? String(seconds) : ''}
                    onChangeText={setSeconds}
                    placeholder="Detik"
                  />
                </View>
                <View>

                </View>
              </View>

              <View className="flex bg-purple-100 rounded-xl p-4 w-full mt-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-white">Kecepatan</Text>
                  <Text className="text-secondary-200 font-bold">{speed}%</Text>
                </View>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#FFA62F"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#b9e4c9"
                  style={{ width: '100%', height: 40 }}
                />
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-white">0%</Text>
                  <Text className="text-white">100%</Text>
                </View>
              </View>

              <View className="flex bg-purple-100 rounded-xl p-4 w-full mt-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-white">Sudut</Text>
                  <Text className="text-secondary-200 font-bold">{angle}%</Text>
                </View>
                <Slider
                  value={angle}
                  onValueChange={setAngle}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#FFA62F"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#b9e4c9"
                  style={{ width: '100%', height: 40 }}
                />
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-white">0%</Text>
                  <Text className="text-white">100%</Text>
                </View>
              </View>

              <CustomButton 
                title="Emergency"
                handlePress={stop}
                containerStyles="mt-7 bg-red-500 w-full mb-7"
                isLoading={isSubmitting}
              />
            </View>
          </ScrollView>
          <StatusBar backgroundColor="#F7DCB9" style="dark" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default AlatSetting;
