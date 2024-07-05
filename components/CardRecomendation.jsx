import { View, Text } from "react-native";

const CardRecomendation = ({ title, value, symptom, recommendation }) => {
  return (
    <View className="flex w-full p-4 bg-purple-200 rounded-xl mb-4">
      <Text className="text-lg font-bold text-white mb-2">{title}</Text>
      <View className="flex w-full mb-2">
        <Text className="text-white font-semibold">Hasil pemeriksaan: {'  '}</Text>
        <Text className="text-white">{value}</Text>
      </View>
      <View className="flex w-full mb-2">
        <Text className="text-white font-semibold">Gejala yang mungkin dialami: {'  '}</Text>
        <Text className="text-white">{symptom}</Text>
      </View>
      <View className="flex w-full mb-2">
        <Text className="text-white font-semibold">Rekomendasi pasien: {'  '}</Text>
        <Text className="text-white">{recommendation}</Text>
      </View>
    </View>
  )
}

export default CardRecomendation;