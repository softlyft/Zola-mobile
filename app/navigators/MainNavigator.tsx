import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import { HomeScreen } from "@/screens/HomeScreen"
import { Icon } from "@/components"
import { colors } from "@/theme"
import { TextStyle, ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { ZolaNavigator } from "@/modules/zola/navigators/ZolaNavigator"
import { SecurityNavigator } from "@/modules/security/navigators/SecurityNavigator"
import { IdentityNavigator } from "@/modules/identity/navigators/IdentityNavigator"
import { CustomDrawerContent } from "./CustomDrawerContent"

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
  // Get the current theme
  const { theme } = useAppTheme()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tint,
        tabBarInactiveTintColor: theme.colors.textDim,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.separator,
          height: 60,
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
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
  // Get the current theme
  const { theme } = useAppTheme()

  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: { color: theme.colors.text, fontSize: 16, fontWeight: "bold" },
        drawerType: "front",
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
        drawerLabelStyle: {
          color: theme.colors.text,
          fontSize: 16,
        },
        drawerActiveTintColor: theme.colors.tint,
        drawerInactiveTintColor: theme.colors.textDim,
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
        component={IdentityNavigator}
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

// Styles are now applied directly in the screenOptions
