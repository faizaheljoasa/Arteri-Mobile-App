import { TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { View, Text, Image } from "react-native"

import { icons } from "../constants"

const HeaderMenu = ({ title, isLoading }) => {
  return (
    <View className="flex flex-row w-full p-5 justify-between items-center">
      <TouchableOpacity
        onPress={() => router.push('/home')}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Image 
          source={icons.leftArrow}
          className="w-[18px] h-[18px]"
          resizeMode="contain"
          tintColor="black"
        />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-black">
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/home')}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Image 
          source={icons.menu}
          className="w-[18px] h-[18px]"
          resizeMode="contain"
          tintColor="black"
        />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderMenu

