import React from "react"
import { View, ViewStyle, Switch, TextStyle } from "react-native"
import { Screen, Text, ListItem } from "@/components"
import { colors, spacing } from "@/theme"

export function SecurityScreen() {
  const [isTwoFactorEnabled, setTwoFactorEnabled] = React.useState(false)
  const [isBiometricsEnabled, setBiometricsEnabled] = React.useState(false)

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
    >
      <View style={$header}>
        <Text preset="heading" text="Security Settings" />
      </View>

      <View style={$section}>
        <Text preset="subheading" text="Authentication" style={$sectionHeader} />
        <View style={$card}>
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="🔒" style={$emojiIcon} />
              </View>
            }
            text="Two-Factor Authentication"
            subText="Add an extra layer of security"
            RightComponent={
              <Switch
                value={isTwoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: colors.palette.neutral400, true: colors.palette.primary100 }}
              />
            }
          />
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="👆" style={$emojiIcon} />
              </View>
            }
            text="Biometric Login"
            subText="Use FaceID or TouchID"
            RightComponent={
              <Switch
                value={isBiometricsEnabled}
                onValueChange={setBiometricsEnabled}
                trackColor={{ false: colors.palette.neutral400, true: colors.palette.primary100 }}
              />
            }
          />
        </View>
      </View>

      <View style={$section}>
        <Text preset="subheading" text="Privacy" style={$sectionHeader} />
        <View style={$card}>
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="🔑" style={$emojiIcon} />
              </View>
            }
            text="Change Password"
            subText="Last changed 30 days ago"
            onPress={() => {}}
          />
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="❓" style={$emojiIcon} />
              </View>
            }
            text="Security Questions"
            subText="Manage your security questions"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={$section}>
        <Text preset="subheading" text="Activity" style={$sectionHeader} />
        <View style={$card}>
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="📱" style={$emojiIcon} />
              </View>
            }
            text="Connected Devices"
            subText="Manage devices with access"
            onPress={() => {}}
          />
          <ListItem
            LeftComponent={
              <View style={$iconContainer}>
                <Text text="📊" style={$emojiIcon} />
              </View>
            }
            text="Security Audit"
            subText="Review your security status"
            onPress={() => {}}
          />
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $header: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
}

const $section: ViewStyle = {
  marginVertical: spacing.md,
}

const $sectionHeader: ViewStyle = {
  paddingHorizontal: spacing.lg,
  marginBottom: spacing.sm,
}

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.separator,
}

const $iconContainer: ViewStyle = {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.md,
}

const $emojiIcon: TextStyle = {
  fontSize: 18,
}
