import { StatusBar } from "expo-status-bar";
import { Alert, Image, ImageBackground, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { updateHasilTest } from "../../lib/appwrite";

import { icons, images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import CardRecomendation from "../../components/CardRecomendation";
import { recommendationBloodPresure, recommendationHeartRate, recommendationOxygenSaturation } from "../../constants/rekomendasi";

const HasilTes = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('Tekanan Darah');
  const [activeView, setActiveView] = useState('Hasil Tes');
  const { examination } = useGlobalContext();

  const { updateExamination, updateMedicalRecord, updateNoteMedicalRecord } = useGlobalContext();

  const [bloodPressureFontColor, setBloodPressureFontColor] = useState("");
  const [oxygenSaturationFontColor, setOxygenSaturationFontColor] = useState("");
  const [heartRateFontColor, setHeartRateFontColor] = useState("");

  const [bloodPressureInformation, setBloodPressureInformation] = useState("");
  const [oxygenSaturationInformation, setOxygenSaturationInformation] = useState("");
  const [heartRateInformation, setHeartRateInformation] = useState("");

  const [recommendationForBloodPresure, setRecommendationForBloodPresure] = useState("");
  const [recommendationForHeartRate, setRecommendationForHeartRate] = useState("");
  const [recommendationForOxygenSaturation, setRecommendationForOxygenSaturation] = useState("");

  const [valueForBloodPresure, setValueForBloodPresure] = useState("");
  const [valueForHeartRate, setValueForHeartRate] = useState("");
  const [valueForOxygenSaturation, setValueForOxygenSaturation] = useState("");

  const [symptomForBloodPresure, setSymptomForBloodPresure] = useState("");
  const [symptomForHeartRate, setSymptomForHeartRate] = useState("");
  const [symptomForOxygenSaturation, setSymptomForOxygenSaturation] = useState("");

  const handleTestResultsPress = async () => {
    setIsSubmitting(true);
    try {
      await updateExamination();
      await updateMedicalRecord();
      await updateNoteMedicalRecord();
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

  const handleUpdateHasilTest = async () => {
    try {
      setIsSubmitting(true);

      const hasilTest = {
        readSensors: 'on',
      };

      await updateHasilTest(hasilTest);

      Alert.alert('Hasil Test updated successfully');
      
      await updateExamination();
      await updateMedicalRecord();

    } catch (error) {
      console.error('Error updating hasil test:', error);
      Alert.alert('Failed to update hasil test');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (examination.bloodSYS <= 89) {
      setBloodPressureInformation("Hipotensi Krisis");
      setBloodPressureFontColor("text-red-500");
      setValueForBloodPresure(recommendationBloodPresure.hipotensiKrisis.value);
      setSymptomForBloodPresure(recommendationBloodPresure.hipotensiKrisis.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.hipotensiKrisis.recommendation);
    } else if (examination.bloodSYS > 89 && examination.bloodSYS <= 100) {
      setBloodPressureInformation("Hipotensi");
      setBloodPressureFontColor("text-secondary-100");
      setValueForBloodPresure(recommendationBloodPresure.hipotensi.value);
      setSymptomForBloodPresure(recommendationBloodPresure.hipotensi.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.hipotensi.recommendation);
    } else if (examination.bloodSYS > 100 && examination.bloodSYS <= 120) {
      setBloodPressureInformation("Normal");
      setBloodPressureFontColor("text-green-500");
      setValueForBloodPresure(recommendationBloodPresure.normal.value);
      setSymptomForBloodPresure(recommendationBloodPresure.normal.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.normal.recommendation);
    } else if (examination.bloodSYS > 120 && examination.bloodSYS <= 139) {
      setBloodPressureInformation("Prahipertensi");
      setBloodPressureFontColor("text-secondary-100");
      setValueForBloodPresure(recommendationBloodPresure.prahipertensi.value);
      setSymptomForBloodPresure(recommendationBloodPresure.prahipertensi.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.prahipertensi.recommendation);
    } else if (examination.bloodSYS > 139 && examination.bloodSYS <= 159) {
      setBloodPressureInformation("Hipertensi Tahap 1");
      setBloodPressureFontColor("text-secondary-100");
      setValueForBloodPresure(recommendationBloodPresure.hipertensi1.value);
      setSymptomForBloodPresure(recommendationBloodPresure.hipertensi1.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.hipertensi1.recommendation);
    } else if (examination.bloodSYS > 159 && examination.bloodSYS <= 180) {
      setBloodPressureInformation("Hipertensi Tahap 2");
      setBloodPressureFontColor("text-red-500");
      setValueForBloodPresure(recommendationBloodPresure.hipertensi2.value);
      setSymptomForBloodPresure(recommendationBloodPresure.hipertensi2.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.hipertensi2.recommendation);
    } else {
      setBloodPressureInformation("Hipertensi Krisis");
      setBloodPressureFontColor("text-red-500");
      setValueForBloodPresure(recommendationBloodPresure.hipertensiKrisis.value);
      setSymptomForBloodPresure(recommendationBloodPresure.hipertensiKrisis.symptom);
      setRecommendationForBloodPresure(recommendationBloodPresure.hipertensiKrisis.recommendation);
    }
  }, [examination.bloodSYS]);

  useEffect(() => {
    if (examination.oxygenSaturation > 70 && examination.oxygenSaturation <= 85) {
      setOxygenSaturationInformation("Sianosis");
      setOxygenSaturationFontColor("text-red-500");
      setValueForOxygenSaturation(recommendationOxygenSaturation.sianosis.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.sianosis.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.sianosis.recommendation);
    } else if (examination.oxygenSaturation > 85 && examination.oxygenSaturation <= 89) {
      setOxygenSaturationInformation("Saturasi Oksigen Rendah");
      setOxygenSaturationFontColor("text-secondary-100");
      setValueForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenRendah.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenRendah.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenRendah.recommendation);
    } else if (examination.oxygenSaturation > 89 && examination.oxygenSaturation <= 94) {
      setOxygenSaturationInformation("Oksigen pada Darah Rendah");
      setOxygenSaturationFontColor("text-secondary-100");
      setValueForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahRendah.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahRendah.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahRendah.recommendation);
    } else if (examination.oxygenSaturation > 94 && examination.oxygenSaturation <= 97) {
      setOxygenSaturationInformation("Oksigen pada Darah Stabil");
      setOxygenSaturationFontColor("text-green-500");
      setValueForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahStabil.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahStabil.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.oksigenDarahStabil.recommendation);
    } else if (examination.oxygenSaturation > 97 && examination.oxygenSaturation <= 100) {
      setOxygenSaturationInformation("Saturasi Oksigen Normal");
      setOxygenSaturationFontColor("text-green-500");
      setValueForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenNormal.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenNormal.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.saturasiOksigenNormal.recommendation);
    } else {
      setOxygenSaturationInformation("Sianosis Krisis");
      setOxygenSaturationFontColor("text-red-500");
      setValueForOxygenSaturation(recommendationOxygenSaturation.sianosisKrisis.value);
      setSymptomForOxygenSaturation(recommendationOxygenSaturation.sianosisKrisis.symptom);
      setRecommendationForOxygenSaturation(recommendationOxygenSaturation.sianosisKrisis.recommendation);
    }
  }, [examination.oxygenSaturation]);

  useEffect(() => {
    if (examination.heartRate > 25 && examination.heartRate <= 60) {
      setHeartRateInformation("Sangat Baik");
      setHeartRateFontColor("text-green-500");
      setValueForHeartRate(recommendationHeartRate.sangatBaik.value);
      setSymptomForHeartRate(recommendationHeartRate.sangatBaik.symptom);
      setRecommendationForHeartRate(recommendationHeartRate.sangatBaik.recommendation);
    } else if (examination.heartRate > 60 && examination.heartRate <= 69) {
      setHeartRateInformation("Hebat");
      setHeartRateFontColor("text-green-500");
      setValueForHeartRate(recommendationHeartRate.hebat.value);
      setSymptomForHeartRate(recommendationHeartRate.hebat.symptom);
      setRecommendationForHeartRate(recommendationHeartRate.hebat.recommendation);
    } else if (examination.heartRate > 69 && examination.heartRate <= 79) {
      setHeartRateInformation("Baik");
      setHeartRateFontColor("text-green-500");
      setValueForHeartRate(recommendationHeartRate.baik.value);
      setSymptomForHeartRate(recommendationHeartRate.baik.symptom);
      setRecommendationForHeartRate(recommendationHeartRate.baik.recommendation);
    } else if (examination.heartRate > 79 && examination.heartRate <= 89) {
      setHeartRateInformation("Rata-rata");
      setHeartRateFontColor("text-secondary-100");
      setValueForHeartRate(recommendationHeartRate.rataRata.value);
      setSymptomForHeartRate(recommendationHeartRate.rataRata.symptom);
      setRecommendationForHeartRate(recommendationHeartRate.rataRata.recommendation);
    } else {
      setHeartRateInformation("Dibawah rata-rata");
      setHeartRateFontColor("text-red-500");
      setValueForHeartRate(recommendationHeartRate.dibawahRataRata.value);
      setSymptomForHeartRate(recommendationHeartRate.dibawahRataRata.symptom);
      setRecommendationForHeartRate(recommendationHeartRate.dibawahRataRata.recommendation);
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

              {activeView === 'Hasil Tes' && (
                <>
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
                          onPress={handleUpdateHasilTest}
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
                          <View className="flex flex-col">
                            <View className="flex flex-row">
                              <Text className="text-md text-white">Tekanan Sistolik   : </Text>
                              {examination ? (
                                <Text className="text-md text-white font-bold">{'   '}{examination.bloodSYS} mmHg</Text>
                              ) : (
                                <Text className="text-md text-white font-bold">{'   '} - mmHg</Text>
                              )}
                            </View>
                            <View className="flex flex-row">
                              <Text className="text-md text-white">Tekanan Diastolik : </Text>
                              {examination ? (
                                <Text className="text-md text-white font-bold">{'   '}{examination.bloodDIA} mmHg</Text>
                              ) : (
                                <Text className="text-md text-white font-bold">{'   '} - mmHg</Text>
                              )}
                            </View>

                          </View>
                        </View>
                      </View>
                      <CustomButton 
                        title="Rekomendasi"
                        handlePress={() => setActiveView('Rekomendasi')}
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
                        handlePress={() => setActiveView('Rekomendasi')}
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
                        handlePress={() => setActiveView('Rekomendasi')}
                        containerStyles="bg-secondary-200 mt-4 mb-6"
                        isLoading={isSubmitting}
                      />
                    </View>
                  )}
                </>
              )}

              {activeView === 'Rekomendasi' && (
                <View className="w-full h-full flex flex-col mt-4">
                  <CardRecomendation 
                    title="Tekanan Darah"
                    value={valueForBloodPresure}
                    symptom={symptomForBloodPresure}
                    recommendation={recommendationForBloodPresure}
                  />
                  <CardRecomendation 
                    title="Saturasi Oksigen"
                    value={valueForOxygenSaturation}
                    symptom={symptomForOxygenSaturation}
                    recommendation={recommendationForOxygenSaturation}
                  />
                  <CardRecomendation 
                    title="Detak Jantung"
                    value={valueForHeartRate}
                    symptom={symptomForHeartRate}
                    recommendation={recommendationForHeartRate}
                  />

                  <CustomButton 
                    title="Hasil Tes Pasien"
                    handlePress={() => setActiveView('Hasil Tes')}
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