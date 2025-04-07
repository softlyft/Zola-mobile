import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CommunityScreen } from "../screens/CommunityScreen"

export type CommunityStackParamList = {
  CommunityHome: undefined
}

const Stack = createNativeStackNavigator<CommunityStackParamList>()

export const CommunityNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
    </Stack.Navigator>
  )
}
