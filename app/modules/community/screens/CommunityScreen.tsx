import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export const CommunityScreen = observer(function CommunityScreen() {
  const { theme } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <View style={$headerContainer}>
        <Text preset="heading" text="Welcome to Community" style={$heading} />
        <Text
          text="Connect with others and join discussions on topics that matter to you."
          style={$description}
        />
      </View>

      <View style={$contentContainer}>
        <View style={$card}>
          <Text preset="subheading" text="Popular Communities" style={$cardTitle} />
          <Text text="• Tech Enthusiasts" style={$cardItem} />
          <Text text="• Book Club" style={$cardItem} />
          <Text text="• Fitness & Wellness" style={$cardItem} />
          <Text text="• Travel Adventures" style={$cardItem} />
          <Text text="• Food & Cooking" style={$cardItem} />
        </View>

        <View style={$card}>
          <Text preset="subheading" text="Recent Discussions" style={$cardTitle} />
          <Text text="No recent discussions yet." style={$emptyState} />
          <Text
            text="Join a community or start a new discussion to get the conversation going!"
            style={$emptyStateDescription}
          />
        </View>

        <View style={$card}>
          <Text preset="subheading" text="Your Communities" style={$cardTitle} />
          <Text text="You haven't joined any communities yet." style={$emptyState} />
          <Text
            text="Explore popular communities and join ones that interest you."
            style={$emptyStateDescription}
          />
        </View>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.md,
}

const $headerContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $heading: TextStyle = {
  fontSize: 28,
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
}

const $description: TextStyle = {
  fontSize: 16,
  color: colors.palette.neutral600,
}

const $contentContainer: ViewStyle = {
  gap: spacing.lg,
}

const $card: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.md,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}

const $cardTitle: TextStyle = {
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
}

const $cardItem: TextStyle = {
  fontSize: 15,
  marginBottom: spacing.xs,
  color: colors.text,
}

const $emptyState: TextStyle = {
  fontSize: 15,
  fontStyle: "italic",
  color: colors.palette.neutral600,
  marginBottom: spacing.xs,
}

const $emptyStateDescription: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral600,
}
