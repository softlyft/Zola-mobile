import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProfileScreen } from "../screens/ProfileScreen"
import { CallInterceptionScreen } from "../screens/CallInterceptionScreen"

export type IdentityStackParamList = {
  Profile: undefined
  CallInterception: undefined
}

const Stack = createNativeStackNavigator<IdentityStackParamList>()

export function IdentityNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CallInterception" component={CallInterceptionScreen} />
    </Stack.Navigator>
  )
}
