import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ZolaScreen } from "../screens/ZolaScreen"
import { ChatScreen } from "../screens/ChatScreen"
import { colors } from "@/theme"
import { Conversation } from "../types"

export type ZolaStackParamList = {
  ZolaList: undefined
  Chat: { conversation: Conversation }
}

const Stack = createNativeStackNavigator<ZolaStackParamList>()

export function ZolaNavigator() {
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
        name="ZolaList"
        component={ZolaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.conversation.title,
        })}
      />
    </Stack.Navigator>
  )
}
