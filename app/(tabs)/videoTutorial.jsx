import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"
import HeaderMenu from "../../components/HeaderMenu";
import { useState } from "react";

import VideoPlayer from "../../components/videoPlayer";
import { videoUrls } from "../../constants/videoUrls";

const VideoTutorial = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState('Latihan Tangan');

  return (
    <View className="bg-[#F7DCB9]">
      <ImageBackground
      source={images.texture}
      >
        <SafeAreaView className="h-full">
          <ScrollView contentContainerStyle={{ height: '100vh' }}>
            <HeaderMenu 
              title="Video Tutorial"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />

            <View className="flex-1 p-4">
              <VideoPlayer dimension={'w-full h-52'} videoUrl={videoUrls[5]} />
            </View>

            <View className="flex-1 w-full items-center h-full px-4">
              <View className="w-80 bg-white flex flex-row justify-between p-2 rounded-2xl mt-4">
                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Latihan Tangan' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Latihan Tangan')}
                >
                  <Text className={`text-md ${activeSection === 'Latihan Tangan' ? 'text-white' : 'text-black-100'}`}>
                    Latihan Tangan
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Rehabilitasi' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Rehabilitasi')}
                >
                  <Text className={`text-md ${activeSection === 'Rehabilitasi' ? 'text-white' : 'text-black-100'}`}>
                    Rehabilitasi
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-2 rounded-xl ${activeSection === 'Pasca Stroke' ? 'bg-purple' : 'bg-white'}`}
                  onPress={() => setActiveSection('Pasca Stroke')}
                >
                  <Text className={`text-md ${activeSection === 'Pasca Stroke' ? 'text-white' : 'text-black-100'}`}>
                    Pasca Stroke
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {activeSection === 'Latihan Tangan' && (
              <View className="w-full h-full flex-1 flex-col mt-6 items-center mx-4 mb-4">
                <View className="flex flex-row items-center mt-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[0]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Latihan Tangan Tahap 1</Text>
                    <Text>8 min</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center mt-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[1]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Latihan Tangan Tahap 2</Text>
                    <Text>11 min</Text>
                  </View>
                </View>
              </View>
            )}

            {activeSection === 'Rehabilitasi' && (
              <View className="w-full h-full flex-1 flex-col mt-6 items-center mx-4 mb-4">
                <View className="flex flex-row items-center mt-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[2]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Cara Rehab Mandiri</Text>
                    <Text>40 min</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center mt-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[3]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Latihan Pasien Stroke 1</Text>
                    <Text>5 min</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center mt-4 mb-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[4]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Latihan Pasien Stroke 2</Text>
                    <Text>10 min</Text>
                  </View>
                </View>
              </View>
            )}

            {activeSection === 'Pasca Stroke' && (
              <View className="w-full h-full flex-1 flex-col mt-6 items-center mx-4 mb-4">
                <View className="flex flex-row items-center mt-4">
                  <VideoPlayer dimension={'w-36 h-24'} videoUrl={videoUrls[6]} />
                  <View className="flex-1 flex-col mx-4">
                    <Text className="font-bold text-md">Terapi Pasca Stroke</Text>
                    <Text>5 min</Text>
                  </View>
                </View>
              </View>
            )}

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

export default VideoTutorial