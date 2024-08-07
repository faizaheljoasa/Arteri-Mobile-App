import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Redirect, router, Link } from "expo-router";

import { createData, createUser, updateHasilTest } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn, updateExamination, updateMedicalRecord, updateNoteMedicalRecord } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const submit = async () => {
    if(!form.username === "" || !form.email === "" || !form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields!')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(form.username, form.email, form.password)
      setUser(result);
      setIsLoggedIn(true);

      const newData = {
        bloodPressure: parseInt(0),
        oxygenSaturation: parseInt(0),
        heartRate: parseInt(0),
        date: new Date().toISOString(),
      }

      const hasilTest = {
        bloodPressure: parseInt(0),
        oxygenSaturation: parseInt(0),
        heartRate: parseInt(0),
      };

      await createData(newData);
      await updateHasilTest(hasilTest);

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
            Sign up to Arteri
          </Text>

          <FormField 
            title="Username"
            textStyle="text-white"
            value={form.username}
            handleChangeText={(event) => setForm({ ...form, username: event })}
            otherStyles="mt-7"
          />

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
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7 bg-secondary-200"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-l text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-l font-psemibold text-secondary-200">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp