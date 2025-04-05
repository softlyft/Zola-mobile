import React, { useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "@/components"
import { colors, spacing } from "@/theme"
import { ProfileCard } from "../components/ProfileCard"
import { PhoneSearch } from "../components/PhoneSearch"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"

export const ProfileScreen = observer(function ProfileScreen() {
  const { identityStore } = useStores()
  const { currentUser, loadInitialData } = identityStore

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
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: colors.palette.neutral300,
  marginVertical: spacing.md,
  marginHorizontal: spacing.md,
}
