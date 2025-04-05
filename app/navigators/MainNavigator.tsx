import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import { HomeScreen } from "@/screens/HomeScreen"
import { Icon } from "@/components"
import { colors } from "@/theme"
import { TextStyle, ViewStyle } from "react-native"
import { ZolaNavigator } from "@/modules/zola/navigators/ZolaNavigator"
import { SecurityNavigator } from "@/modules/security/navigators/SecurityNavigator"

export type MainTabParamList = {
  Home: undefined
  Zola: undefined
  Settings: undefined
}

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>
  Community: undefined
  Identity: undefined
  Security: undefined
  Zola: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <Icon icon="components" color={color} />,
        }}
      />
      <Tab.Screen
        name="Zola"
        component={ZolaNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <Icon icon="ladybug" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeScreen} // Temporarily using HomeScreen
        options={{
          tabBarIcon: ({ color }: { color: string }) => <Icon icon="settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: $headerStyle,
        headerTitleStyle: $headerTitleStyle,
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ 
          title: "Home",
          drawerIcon: ({ color }: { color: string }) => <Icon icon="components" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Community"
        component={HomeScreen} // Temporarily using HomeScreen
        options={{
          drawerIcon: ({ color }: { color: string }) => <Icon icon="community" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Identity"
        component={HomeScreen} // Temporarily using HomeScreen
        options={{
          drawerIcon: ({ color }: { color: string }) => <Icon icon="ladybug" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecurityNavigator}
        options={{
          drawerIcon: ({ color }: { color: string }) => <Icon icon="hidden" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Zola"
        component={ZolaNavigator}
        options={{
          drawerIcon: ({ color }: { color: string }) => <Icon icon="ladybug" color={color} />,
        }}
      />
    </Drawer.Navigator>
  )
}

const $headerStyle: ViewStyle = {
  backgroundColor: colors.background,
}

const $headerTitleStyle: TextStyle = {
  color: colors.text,
  fontSize: 16,
  fontWeight: "bold",
}
