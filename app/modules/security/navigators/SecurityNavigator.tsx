import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SecurityScreen } from "../screens/SecurityScreen"
import { colors } from "@/theme"

export type SecurityStackParamList = {
  SecuritySettings: undefined
  // Add other security-related screens here
}

const Stack = createNativeStackNavigator<SecurityStackParamList>()

export function SecurityNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="SecuritySettings"
        component={SecurityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
