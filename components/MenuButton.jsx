import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

const MenuButton = ({ title, handlePress, containerStyles, textStyles, isLoading, icon, ...props }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex flex-row w-full px-6 bg-purple-200 rounded-xl min-h-[62px] justify-between items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-xl ${textStyles}`}>
        {title}
      </Text>
      <Image 
        source={icon}
        className="w-10 h-10 my-4"
        resizeMode="contain"
        tintColor="#FFA62F"
      />
    </TouchableOpacity>
  )
}

export default MenuButton