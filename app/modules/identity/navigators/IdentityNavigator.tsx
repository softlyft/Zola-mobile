import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProfileScreen } from "../screens/ProfileScreen"

export type IdentityStackParamList = {
  Profile: undefined
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
    </Stack.Navigator>
  )
}
