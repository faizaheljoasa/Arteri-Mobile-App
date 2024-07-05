import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, textStyle, isTextArea = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base ${textStyle} font-pmedium`}>{title}</Text>

      <View className={`border-2 border-purple-200 w-full ${isTextArea ? 'h-32' : 'h-16'} px-4 bg-[#612976] rounded-xl focus:border-secondary-200 items-center flex-row`}>
        <TextInput 
          className="flex-1 font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === 'Password' && !showPassword) ||
            (title === 'Password Lama' && !showPassword) ||
            (title === 'Password Baru' && !showPassword) ||
            (title === 'Konfirmasi Password' && !showPassword)
          }
          multiline={isTextArea}
          numberOfLines={isTextArea ? 4 : 1}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />

          </TouchableOpacity>
        )}
        {title === 'Password Lama' && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />

          </TouchableOpacity>
        )}
        {title === 'Password Baru' && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />

          </TouchableOpacity>
        )}
        {title === 'Konfirmasi Password' && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />

          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField