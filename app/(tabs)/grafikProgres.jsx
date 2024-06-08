import { StatusBar } from "expo-status-bar";
import { ImageBackground, ScrollView, Text, View, Dimensions } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from 'react-native-chart-kit';
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";

import { images } from "../../constants";
import HeaderMenu from "../../components/HeaderMenu";
import HeaderProfile from "../../components/HeaderProfile";

const screenWidth = Dimensions.get('window').width;

const GrafikProgres = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { medicalRecord } = useGlobalContext();

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const validRecords = medicalRecord.filter(item => {
    return item.bloodPressure && item.oxygenSaturation && !isNaN(item.bloodPressure) && !isNaN(item.oxygenSaturation) && new Date(item.date) !== "Invalid Date";
  }).slice(-5);

  const chartData = {
    labels: validRecords.map(item => formatDate(item.date)),
    datasets: [
      {
        data: validRecords.map(item => item.bloodPressure),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
        legend: "Tekanan Darah",
      },
      {
        data: validRecords.map(item => item.oxygenSaturation),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
        legend: "Saturasi Oksigen",
      }
    ],
  };

  const handleDataPointClick = (data) => {
    const { dataset, index } = data;
    const selectedValue = dataset.data[index];
    const label = chartData.labels[index];
    const dataType = dataset.legend; // Menyimpan jenis data (Tekanan Darah atau Saturasi Oksigen)
    setSelectedData({ value: selectedValue, label, type: dataType });
    setTimeout(() => {
      setSelectedData(null); // Menghapus data terpilih setelah 2 detik
    }, 2000);
  };

  return (
    <View className="bg-[#F7DCB9] h-full">
      <ImageBackground source={images.texture} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <HeaderMenu 
              title="Grafik Progres"
              isLoading={isSubmitting}
              backButton={() => router.push('/home')}
              menuButton={() => router.push('/home')}
            />
            <View className="w-full px-4">
              <HeaderProfile />
              <View className="flex justify-center items-center mt-4 mb-6">
                {medicalRecord ? (
                  <>
                    <LineChart
                      data={chartData}
                      width={screenWidth - 32}
                      height={320}
                      yAxisSuffix=""
                      yAxisInterval={1}
                      chartConfig={{
                        backgroundColor: '#F7DCB9', 
                        backgroundGradientFrom: '#FFE0B5', 
                        backgroundGradientTo: '#FFF2D7', 
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                          r: '4',
                          strokeWidth: '2',
                          stroke: '#ffa726',
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                      onDataPointClick={handleDataPointClick}
                    />
                    {selectedData && (
                      <View className="absolute bg-white bg-opacity-70 rounded-lg p-4 top-[20px] left-[10px]">
                        <Text style={{ color: 'black' }}>{`Date: ${selectedData.label}`}</Text>
                        <Text style={{ color: 'black' }}>{`Value: ${selectedData.value}`}</Text>
                        <Text style={{ color: 'black' }}>{`Type: ${selectedData.type}`}</Text>
                      </View>
                    )}
                    <View className="flex-row justify-center items-center mt-4">
                      <View className="flex-row items-center">
                        <View style={{ width: 20, height: 20, backgroundColor: 'rgba(134, 65, 244, 1)', marginRight: 5, borderRadius: 16, }} />
                        <Text>Tekanan Darah</Text>
                      </View>
                      <View className="flex-row items-center ml-4">
                        <View style={{ width: 20, height: 20, backgroundColor: 'rgba(255, 0, 0, 1)', marginRight: 5, borderRadius: 16, }} />
                        <Text>Saturasi Oksigen</Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <Text>{'   '}</Text>
                )}
              </View>
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

export default GrafikProgres;
