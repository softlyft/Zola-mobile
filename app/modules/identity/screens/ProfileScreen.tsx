import React, { useEffect } from "react"
import { View, ViewStyle, TouchableOpacity, TextStyle, Platform } from "react-native"
import { Screen, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { ProfileCard } from "../components/ProfileCard"
import { PhoneSearch } from "../components/PhoneSearch"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons } from "@expo/vector-icons"

export const ProfileScreen = observer(function ProfileScreen() {
  const { identityStore } = useStores()
  const { currentUser, loadInitialData } = identityStore
  const navigation = useNavigation()

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  if (!currentUser) return null

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      backgroundColor={colors.background}
      statusBarStyle="dark"
    >
      <ProfileCard user={currentUser} />
      <View style={$divider} />
      <PhoneSearch />

      <View style={$featureContainer}>
        <Text text="New Features" style={$featureTitle} />

        <TouchableOpacity
          style={$featureButton}
          onPress={() => navigation.navigate('CallInterception' as never)}
        >
          <View style={$featureIconContainer}>
            <MaterialIcons name="phone-in-talk" size={24} color={colors.palette.primary500} />
          </View>
          <View style={$featureTextContainer}>
            <Text text="Call Interception" style={$featureButtonTitle} />
            <Text text="Identify callers automatically by matching phone numbers with profiles" style={$featureButtonDescription} />
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.palette.neutral500} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flexGrow: 1, // Use flexGrow instead of flex to allow content to expand beyond screen height
  backgroundColor: colors.background,
  paddingBottom: spacing.xl, // Add padding at the bottom to ensure content isn't cut off
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: colors.palette.neutral300,
  marginVertical: spacing.md,
  marginHorizontal: spacing.md,
}

const $featureContainer: ViewStyle = {
  marginTop: spacing.xl,
}

const $featureTitle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: spacing.sm,
  paddingHorizontal: spacing.md,
}

const $featureButton: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.background,
  padding: spacing.md,
  borderRadius: 8,
  marginHorizontal: spacing.md,
  marginBottom: spacing.sm,
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
}

const $featureIconContainer: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: colors.palette.primary100,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: spacing.md,
}

const $featureTextContainer: ViewStyle = {
  flex: 1,
}

const $featureButtonTitle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: spacing.xxs,
}

const $featureButtonDescription: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral600,
}
