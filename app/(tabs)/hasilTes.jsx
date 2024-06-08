import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useState } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const HasilTes = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState('Tekanan Darah');
  const { examination } = useGlobalContext();

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100vh' }}>
            <HeaderMenu 
              title="Hasil Tes"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full items-center h-full px-4">
              <HeaderProfile />
              <View className="w-72 bg-white flex flex-row justify-between p-2 rounded-2xl mt-4">
                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Tekanan Darah' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Tekanan Darah')}
                >
                  <Text className={`text-md ${activeSection === 'Tekanan Darah' ? 'text-white' : 'text-black-100'}`}>
                    Tekanan Darah
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Saturasi Oksigen' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Saturasi Oksigen')}
                >
                  <Text className={`text-md ${activeSection === 'Saturasi Oksigen' ? 'text-white' : 'text-black-100'}`}>
                    Saturasi Oksigen
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
                      <Text className="text-xl text-secondary-100 font-bold">{examination.information}</Text>
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

              {activeSection === 'Saturasi Oksigen' && (
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
                    <Text className="text-xl text-secondary-100 font-bold">{examination.information}</Text>
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