import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoginScreen } from "@/screens/auth/LoginScreen"
import { SignUpScreen } from "@/screens/auth/SignUpScreen"
import { ForgotPasswordScreen } from "@/screens/auth/ForgotPasswordScreen"

export type AuthStackParamList = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: "#FFFFFF",
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}
