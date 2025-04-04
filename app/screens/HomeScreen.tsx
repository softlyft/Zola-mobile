import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text } from "@/components"
import { colors, spacing } from "@/theme"

export const HomeScreen = observer(function HomeScreen() {
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
    >
      <View style={$welcomeContainer}>
        <Text text="Welcome to Zola" preset="heading" style={$title} />
        <Text
          text="Your personal AI companion for meaningful conversations and self-discovery."
          preset="subheading"
          style={$subtitle}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  padding: spacing.md,
  flex: 1,
}

const $welcomeContainer: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.xl,
}

const $title: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.sm,
  color: colors.text,
}

const $subtitle: TextStyle = {
  textAlign: "center",
  color: colors.textDim,
  maxWidth: "80%",
}
