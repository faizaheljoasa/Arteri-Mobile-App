import { StatusBar } from "expo-status-bar";
import { Alert, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import { useState, useEffect } from "react";
import HeaderMenu from "../../components/HeaderMenu";
import MenuButton from "../../components/MenuButton";
import HeaderProfile from "../../components/HeaderProfile";
import Slider from '@react-native-community/slider';

import { updateHasilTest, getCurrentUser, createData } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";

const ApiHasilTest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bloodPressureSystolic, setBloodPressureSystolic] = useState(0);
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState(0);
  const [oxygenSaturation, setOxygenSaturation] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [readSensor, setReadSensor] = useState('');

  const { updateExamination, updateMedicalRecord } = useGlobalContext();

  const handleUpdateHasilTest = async () => {
    try {
      setIsSubmitting(true);

      const newData = {
        bloodPressure: parseInt(bloodPressureSystolic),
        oxygenSaturation: parseInt(oxygenSaturation),
        heartRate: parseInt(heartRate),
        date: new Date().toISOString(),
      }

      const hasilTest = {
        bloodPressure: parseInt(bloodPressureSystolic),
        oxygenSaturation: parseInt(oxygenSaturation),
        heartRate: parseInt(heartRate),
        bloodSYS: parseInt(bloodPressureSystolic),
        bloodDIA: parseInt(bloodPressureDiastolic),
        readSensors: readSensor,
      };

      await createData(newData);
      await updateHasilTest(hasilTest);

      Alert.alert('Hasil Test updated successfully');
      
      await updateExamination();
      await updateMedicalRecord();

      setBloodPressureSystolic('');
      setBloodPressureDiastolic('');
      setOxygenSaturation('');
      setHeartRate('');
      setReadSensor('')
    } catch (error) {
      console.error('Error updating hasil test:', error);
      Alert.alert('Failed to update hasil test');
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
              title="Testing API Hasil Test"
              isLoading={isSubmitting}
              backButton={() => router.push('/pengaturan')}
              menuButton={() => router.push('/home')}
            />

            <View className="w-full items-center h-full px-4">
              <View className="flex w-full justify-center items-center">
                <TextInput
                  className="border border-gray-300 rounded-lg p-6 text-center w-full text-white mb-2 bg-purple-100"
                  keyboardType="numeric"
                  value={bloodPressureSystolic ? String(bloodPressureSystolic) : 0}
                  onChangeText={setBloodPressureSystolic}
                  placeholder="Tekanan Darah Sistolik"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-6 text-center w-full text-white mb-2 bg-purple-100"
                  keyboardType="numeric"
                  value={bloodPressureDiastolic ? String(bloodPressureDiastolic) : 0}
                  onChangeText={setBloodPressureDiastolic}
                  placeholder="Tekanan Darah Diastolik"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-6 text-center w-full text-white mb-2 bg-purple-100"
                  keyboardType="numeric"
                  value={oxygenSaturation ? String(oxygenSaturation) : 0}
                  onChangeText={setOxygenSaturation}
                  placeholder="Saturasi Oksigen"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-6 text-center w-full text-white mb-2 bg-purple-100"
                  keyboardType="numeric"
                  value={heartRate ? String(heartRate) : 0}
                  onChangeText={setHeartRate}
                  placeholder="Denyut Jantung"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-6 text-center w-full text-white mb-2 bg-purple-100"
                  keyboardType="default"
                  value={readSensor ? String(readSensor) : ''}
                  onChangeText={setReadSensor}
                  placeholder="Pembacaan Sensor"
                />
              </View>

              <CustomButton 
                title="Submit"
                handlePress={handleUpdateHasilTest}
                containerStyles="mt-7 bg-secondary-200 w-full mb-7"
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

export default ApiHasilTest;
