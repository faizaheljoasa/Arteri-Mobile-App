import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const HasilTes = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('Tekanan Darah');
  const { examination } = useGlobalContext();

  const { updateExamination, updateMedicalRecord } = useGlobalContext();

  const [bloodPressureFontColor, setBloodPressureFontColor] = useState("");
  const [oxygenSaturationFontColor, setOxygenSaturationFontColor] = useState("");
  const [heartRateFontColor, setHeartRateFontColor] = useState("");

  const [bloodPressureInformation, setBloodPressureInformation] = useState("");
  const [oxygenSaturationInformation, setOxygenSaturationInformation] = useState("");
  const [heartRateInformation, setHeartRateInformation] = useState("");

  const handleTestResultsPress = async () => {
    setIsSubmitting(true);
    try {
      await updateExamination();
      await updateMedicalRecord();
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await handleTestResultsPress();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (examination.bloodPressure <= 25) {
      setBloodPressureInformation("Hipotensi Krisis");
      setBloodPressureFontColor("text-red-500");
    } else if (examination.bloodPressure > 25 && examination.bloodPressure <= 90) {
      setBloodPressureInformation("Hipotensi");
      setBloodPressureFontColor("text-secondary-100");
    } else if (examination.bloodPressure > 90 && examination.bloodPressure <= 119) {
      setBloodPressureInformation("Normal");
      setBloodPressureFontColor("text-green-500");
    } else if (examination.bloodPressure > 119 && examination.bloodPressure <= 139) {
      setBloodPressureInformation("Prahipertensi");
      setBloodPressureFontColor("text-secondary-100");
    } else if (examination.bloodPressure > 139 && examination.bloodPressure <= 159) {
      setBloodPressureInformation("Hipertensi Tahap 1");
      setBloodPressureFontColor("text-secondary-100");
    } else if (examination.bloodPressure > 159 && examination.bloodPressure <= 180) {
      setBloodPressureInformation("Hipertensi Tahap 2");
      setBloodPressureFontColor("text-red-500");
    } else {
      setBloodPressureInformation("Hipertensi Krisis");
      setBloodPressureFontColor("text-red-500");
    }
  }, [examination.bloodPressure]);

  useEffect(() => {
    if (examination.oxygenSaturation <= 67) {
      setOxygenSaturationInformation("Sianosis");
      setOxygenSaturationFontColor("text-red-500");
    } else if (examination.oxygenSaturation > 67 && examination.oxygenSaturation <= 85) {
      setOxygenSaturationInformation("Saturasi Oksigen Rendah");
      setOxygenSaturationFontColor("text-secondary-100");
    } else if (examination.oxygenSaturation > 85 && examination.oxygenSaturation <= 90) {
      setOxygenSaturationInformation("Oksigen pada Darah Rendah");
      setOxygenSaturationFontColor("text-secondary-100");
    } else if (examination.oxygenSaturation > 90 && examination.oxygenSaturation <= 92) {
      setOxygenSaturationInformation("Oksigen pada Darah Stabil");
      setOxygenSaturationFontColor("text-green-500");
    } else if (examination.oxygenSaturation > 92 && examination.oxygenSaturation <= 100) {
      setOxygenSaturationInformation("Saturasi Oksigen Normal");
      setOxygenSaturationFontColor("text-green-500");
    } else {
      setOxygenSaturationInformation("Sianosis Krisis");
      setOxygenSaturationFontColor("text-red-500");
    }
  }, [examination.oxygenSaturation]);

  useEffect(() => {
    if (examination.heartRate > 25 && examination.heartRate <= 60) {
      setHeartRateInformation("Sangat Baik");
      setHeartRateFontColor("text-green-500");
    } else if (examination.heartRate > 60 && examination.heartRate <= 69) {
      setHeartRateInformation("Hebat");
      setHeartRateFontColor("text-green-500");
    } else if (examination.heartRate > 69 && examination.heartRate <= 73) {
      setHeartRateInformation("Baik");
      setHeartRateFontColor("text-green-500");
    } else if (examination.heartRate > 73 && examination.heartRate <= 78) {
      setHeartRateInformation("Rata-rata");
      setHeartRateFontColor("text-secondary-100");
    } else {
      setHeartRateInformation("Dibawah rata-rata");
      setHeartRateFontColor("text-red-500");
    }
  }, [examination.heartRate]);
  
  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView 
            contentContainerStyle={{ height: '100vh' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <HeaderMenu 
              title="Hasil Tes"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />
              <View className="w-80 bg-white flex flex-row justify-between p-2 rounded-2xl mt-4">
                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Tekanan Darah' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Tekanan Darah')}
                >
                  <Text className={`text-xs ${activeSection === 'Tekanan Darah' ? 'text-white' : 'text-black-100'}`}>
                    Tekanan Darah
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Oksigen' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Oksigen')}
                >
                  <Text className={`text-xs ${activeSection === 'Oksigen' ? 'text-white' : 'text-black-100'}`}>
                    Oksigen
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Denyut Jantung' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Denyut Jantung')}
                >
                  <Text className={`text-xs ${activeSection === 'Denyut Jantung' ? 'text-white' : 'text-black-100'}`}>
                    Denyut Jantung
                  </Text>
                </TouchableOpacity>
              </View>

              {activeSection === 'Tekanan Darah' && (
                <View className="w-full h-full flex flex-col mt-4">
                  <View className="w-full flex flex-col justify-center items-center">
                    <TouchableOpacity
                      onPress={() => router.push('/alatSetting')}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={images.togglePower}
                        className="w-[200px] h-[200px]"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-purple mt-2">Mulai Tes</Text>
                  </View>
                  <View className="w-full bg-purple-200 flex flex-col p-4 rounded-2xl mt-4">
                    {examination ? (
                      <Text className={`text-xl ${bloodPressureFontColor} font-bold`}>{bloodPressureInformation}</Text>
                    ) : (
                      <Text className="text-xl text-secondary-100 font-bold"> - </Text>
                    )}
                    
                    <View className="flex w-full flex-row justify-start items-center gap-4">
                      <Image 
                        source={icons.speed}
                        className="w-[64px] h-[64px]"
                        resizeMode="contain"
                      />
                      <View className="flex flex-row">
                        <Text className="text-md text-white">Tekanan Darah: </Text>
                        {examination ? (
                          <Text className="text-md text-white font-bold">{'   '}{examination.bloodPressure} mmHg</Text>
                        ) : (
                          <Text className="text-md text-white font-bold">{'   '} - mmHg</Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <CustomButton 
                    title="Rekomendasi"
                    handlePress={() => router.push('/home')}
                    containerStyles="bg-secondary-200 mt-4 mb-6"
                    isLoading={isSubmitting}
                  />
                </View>
              )}

              {activeSection === 'Oksigen' && (
                <View className="w-full h-full flex flex-col mt-4">
                  <View className="w-full flex flex-col justify-center items-center">
                    <TouchableOpacity
                      onPress={() => router.push('/alatSetting')}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={images.togglePower}
                        className="w-[200px] h-[200px]"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-purple mt-2">Mulai Tes</Text>
                  </View>
                  <View className="w-full bg-purple-200 flex flex-col p-4 rounded-2xl mt-4">
                    {examination ? (
                      <Text className={`text-xl ${oxygenSaturationFontColor} font-bold`}>{oxygenSaturationInformation}</Text>
                    ) : (
                      <Text className="text-xl text-secondary-100 font-bold"> - </Text>
                    )}

                    <View className="flex w-full flex-row justify-start items-center gap-4">
                      <Image 
                        source={icons.speed}
                        className="w-[64px] h-[64px]"
                        resizeMode="contain"
                      />
                      <View className="flex flex-row">
                        <Text className="text-md text-white">Saturasi Oksigen: </Text>
                        {examination ? (
                          <Text className="text-md text-white font-bold">{'   '}{examination.oxygenSaturation} %</Text>
                        ) : (
                          <Text className="text-md text-white font-bold">{'   ' } - %</Text>
                        )}

                      </View>
                    </View>
                  </View>
                  <CustomButton 
                    title="Rekomendasi"
                    handlePress={() => router.push('/home')}
                    containerStyles="bg-secondary-200 mt-4 mb-6"
                    isLoading={isSubmitting}
                  />
                </View>
              )}

              {activeSection === 'Denyut Jantung' && (
                <View className="w-full h-full flex flex-col mt-4">
                  <View className="w-full flex flex-col justify-center items-center">
                    <TouchableOpacity
                      onPress={() => router.push('/alatSetting')}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={images.togglePower}
                        className="w-[200px] h-[200px]"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-purple mt-2">Mulai Tes</Text>
                  </View>
                  <View className="w-full bg-purple-200 flex flex-col p-4 rounded-2xl mt-4">
                    {examination ? (
                      <Text className={`text-xl ${heartRateFontColor} font-bold`}>{heartRateInformation}</Text>
                    ) : (
                      <Text className="text-xl text-secondary-100 font-bold"> - </Text>
                    )}

                    <View className="flex w-full flex-row justify-start items-center gap-4">
                      <Image 
                        source={icons.speed}
                        className="w-[64px] h-[64px]"
                        resizeMode="contain"
                      />
                      <View className="flex flex-row">
                        <Text className="text-md text-white">Denyut Jantung: </Text>
                        {examination ? (
                          <Text className="text-md text-white font-bold">{'   '}{examination.heartRate} bpm</Text>
                        ) : (
                          <Text className="text-md text-white font-bold">{'   ' } - bpm</Text>
                        )}

                      </View>
                    </View>
                  </View>
                  <CustomButton 
                    title="Rekomendasi"
                    handlePress={() => router.push('/home')}
                    containerStyles="bg-secondary-200 mt-4 mb-6"
                    isLoading={isSubmitting}
                  />
                </View>
              )}
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