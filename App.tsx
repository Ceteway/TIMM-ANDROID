"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"

import Dashboard from "./src/screens/Dashboard"
import Batches from "./src/screens/Batches"
import CreateBatch from "./src/screens/CreateBatch"
import Loans from "./src/screens/Loans"
import Profile from "./src/screens/Profile"
import ChatBot from "./src/components/ChatBot"
import FloatingChatButton from "./src/components/FloatingChatButton"
import SplashScreen from "./src/components/SplashScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show splash for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof MaterialIcons.glyphMap = "home"

              switch (route.name) {
                case "Home":
                  iconName = "home"
                  break
                case "Batches":
                  iconName = "group"
                  break
                case "Create":
                  iconName = "add-circle"
                  break
                case "Loans":
                  iconName = "account-balance"
                  break
                case "Profile":
                  iconName = "person"
                  break
              }

              return <MaterialIcons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: "#2563eb",
            tabBarInactiveTintColor: "#6b7280",
            headerStyle: {
              backgroundColor: "#2563eb",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Dashboard}
            options={{
              title: "TiM App 🏦",
            }}
          />
          <Tab.Screen name="Batches" component={Batches} />
          <Tab.Screen name="Create" component={CreateBatch} />
          <Tab.Screen name="Loans" component={Loans} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>

      <FloatingChatButton onPress={() => setShowChat(true)} />
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      <StatusBar style="light" />
    </SafeAreaProvider>
  )
}
