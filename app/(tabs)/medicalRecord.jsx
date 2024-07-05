import { StatusBar } from "expo-status-bar";
import { ImageBackground, ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import { useGlobalContext } from "../../context/GlobalProvider";
import MenuButton from "../../components/MenuButton";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { createNote } from "../../lib/appwrite";

const MedicalRecord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { medicalRecord, noteMedicalRecord, updateNoteMedicalRecord} = useGlobalContext();

  const [activeView, setActiveView] = useState('Medical Record');

  const [note, setNote] = useState('');

  const newNote = {
    notePatient: note,
    date: new Date().toISOString(),
  }

  const handleAddNote = async () => {
    try {
      setIsSubmitting(true);

      await createNote(newNote);

      Alert.alert('Success', 'Catatan berhasil ditambahkan.');
      
      setNote('');
      setActiveView("Catatan Pemeriksaan");
      await updateNoteMedicalRecord();
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan catatan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOxygenSaturationInformation = (oxygenSaturation) => {
    if (oxygenSaturation > 70 && oxygenSaturation <= 85) {
      return "Harap cepat ditingkatkan";
    } else if (oxygenSaturation > 85 && oxygenSaturation <= 89) {
      return "Harap ditingkatkan";
    } else if (oxygenSaturation > 89 && oxygenSaturation <= 94) {
      return "Pemeriksaan belum sesuai target";
    } else if (oxygenSaturation > 94 && oxygenSaturation <= 97) {
      return "Pemeriksaan sesuai target";
    } else if (oxygenSaturation > 97 && oxygenSaturation <= 100) {
      return "Sesuai target. Tetap pertahankan";
    } else if (oxygenSaturation === 0) { 
      return "Mendaftar Program Arteri";
    } else {
      return "Belum sesuai target";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground source={images.texture}>
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle='h-full'>
            <HeaderMenu
              title="Medical Record"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />

              {activeView === 'Medical Record' && (
                <>
                  <MenuButton 
                    title="Catatan Pemeriksaan"
                    handlePress={() => setActiveView("Catatan Pemeriksaan")}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                    icon={icons.recordArteri}
                  />
                  <View className="flex w-full justify-center items-center mt-4 mb-6">
                    {medicalRecord ? (
                      medicalRecord.slice().reverse().map((item, index) => (
                        <View key={index} className="bg-purple-100 p-6 w-full rounded-lg mb-2">
                          <Text className="text-white">{formatDate(item.date)}</Text>
                          <Text className="text-white font-bold text-lg">
                            {getOxygenSaturationInformation(item.oxygenSaturation)}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text className="text-center text-lg">Tidak ada data medis tersedia</Text>
                    )}
                  </View>
                </>
              )}

              {activeView === 'Catatan Pemeriksaan' && (
                <>
                  <MenuButton 
                    title="Medical Record"
                    handlePress={() => setActiveView("Medical Record")}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                    icon={icons.recordArteri}
                  />

                  <View className="flex w-full justify-center items-center mt-4 mb-6">
                    {noteMedicalRecord ? (
                      noteMedicalRecord.slice().reverse().map((item, index) => (
                        <View key={index} className="bg-purple-100 p-6 w-full rounded-lg mb-2">
                          <Text className="text-white">{formatDate(item.date)}</Text>
                          <Text className="text-white font-bold text-lg">
                            {item.notePatient}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text className="text-center text-lg">Tidak ada catatan</Text>
                    )}
                  </View>
                  
                  <CustomButton 
                    title="+"
                    handlePress={() => setActiveView('Tambah Catatan')}
                    containerStyles="bg-secondary-200 mb-6 w-full"
                    isLoading={isSubmitting}
                  />
                </>
              )}

              {activeView === 'Tambah Catatan' && (
                <>
                  <FormField 
                    title="Catatan pemeriksaan baru"
                    textStyle="text-black"
                    placeholder="Tuliskan catatan Anda.."
                    value={note ? String(note) : ''}
                    handleChangeText={setNote}
                    otherStyles="mt-7"
                    isTextArea={true}
                  />

                  <View className="flex flex-row w-full justify-end">
                    <CustomButton 
                      title="Batal"
                      handlePress={() => setActiveView('Catatan Pemeriksaan')}
                      containerStyles="w-1/3 mt-7 bg-red-500 mr-3"
                    />
                    <CustomButton 
                      title="Tambah"
                      handlePress={handleAddNote}
                      containerStyles="w-1/3 mt-7 bg-secondary-200"
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
          <StatusBar backgroundColor="#F7DCB9" style="dark" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MedicalRecord;
