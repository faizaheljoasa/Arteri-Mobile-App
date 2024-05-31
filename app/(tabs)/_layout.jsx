import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from "../../constants"

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      {/* <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text> */}
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA62F',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#4A1763'
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="hasilTes"
          options={{
            title: "Hasil Tes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.testArteri}
                color={color}
                name="Hasil Tes"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="grafikProgres"
          options={{
            title: "Grafik Progres",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.statistikArteri}
                color={color}
                name="Grafik Progres"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="videoTutorial"
          options={{
            title: "Video Tutorial",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.tutorialArteri}
                color={color}
                name="Video Tutorial"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="medicalRecord"
          options={{
            title: "Medical Record",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.recordArteri}
                color={color}
                name="Medical Record"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="pengaturan"
          options={{
            title: "Pengaturan",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.setting}
                color={color}
                name="Pengaturan"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout