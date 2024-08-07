import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Redirect, router, Link } from "expo-router";
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLoggedIn, updateExamination, updateMedicalRecord, updateNoteMedicalRecord } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const submit = async () => {
    if(!form.email === "" || !form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields!')
    }

    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User Signed in successfully")

      await updateExamination();
      await updateMedicalRecord();
      await updateNoteMedicalRecord();

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-purple-200 h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[155px] h-[55px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Arteri
          </Text>

          <FormField 
            title="Email"
            textStyle="text-white"
            value={form.email}
            handleChangeText={(event) => setForm({ ...form, email: event })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            textStyle="text-white"
            value={form.password}
            handleChangeText={(event) => setForm({ ...form, password: event })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7 bg-secondary-200"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-l text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-l font-psemibold text-secondary-200">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn