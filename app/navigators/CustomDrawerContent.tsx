import React from "react"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import { View, ViewStyle, TextStyle, TouchableOpacity, Alert } from "react-native"
import { Icon, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { useStores } from "@/models"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"

export const CustomDrawerContent = observer((props) => {
  const { authenticationStore } = useStores()
  const { theme } = useAppTheme()
  
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await authenticationStore.logout()
            // Navigation will be handled by the AppNavigator
          },
        },
      ]
    )
  }
  
  return (
    <View style={$container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      <View style={$footer}>
        <TouchableOpacity style={$logoutButton} onPress={handleLogout}>
          <Icon icon="exit" color={theme.colors.error} size={24} style={$logoutIcon} />
          <Text text="Logout" style={[$logoutText, { color: theme.colors.error }]} />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $footer: ViewStyle = {
  padding: spacing.md,
  borderTopWidth: 1,
  borderTopColor: colors.separator,
}

const $logoutButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
}

const $logoutIcon: ViewStyle = {
  marginRight: spacing.sm,
}

const $logoutText: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
}
