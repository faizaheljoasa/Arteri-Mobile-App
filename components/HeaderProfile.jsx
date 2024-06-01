import { Image, View, Text } from "react-native"
import { images } from "../constants"
import { useGlobalContext } from "../context/GlobalProvider"

const HeaderProfile = () => {
  const { user } = useGlobalContext();

  return (
    <View className="w-full bg-purple-200 h-20 flex flex-row justify-start rounded-xl">
      <View className="flex justify-center p-4">
        <Image 
          source={images.photoProfile}
          className="w-[54px] h-[54px]"
          resizeMode="contain"
        />
      </View>
      <View className="flex flex-col justify-center">
      {user ? (
        <Text className="text-lg text-white font-bold">
          {user.username}
        </Text>
      ) : (
        <Text>Bapak/Ibu</Text>
      )}
      {user ? (
        <Text className="text-md text-white">
          User ID: {user.accountId}
        </Text>
      ) : (
        <Text>User ID: - </Text>
      )}
      </View>

    </View>
  )
}

export default HeaderProfile