import React from "react"
import { View, ViewStyle, ScrollView, TouchableOpacity, ImageStyle, Image, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Icon } from "@/components"
import { colors, spacing } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "@/models"

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const { authenticationStore } = useStores()
  const user = authenticationStore.user

  const navigateTo = (screen) => {
    navigation.navigate(screen)
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      {/* Welcome Header */}
      <View style={$header}>
        <View>
          <Text preset="heading" text="Welcome back," />
          <Text preset="heading" text={user?.firstName || "User"} style={$userName} />
        </View>
        <TouchableOpacity 
          style={$profileButton}
          onPress={() => navigateTo("Identity")}
        >
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={$avatar} />
          ) : (
            <View style={$avatarPlaceholder}>
              <Text text={(user?.firstName?.[0] || "U")} style={$avatarText} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Dashboard Title */}
      <Text preset="subheading" text="Your Dashboard" style={$dashboardTitle} />

      {/* Main Dashboard Cards */}
      <View style={$cardsContainer}>
        {/* Identity Card */}
        <TouchableOpacity 
          style={$card} 
          onPress={() => navigateTo("Identity")}
        >
          <View style={$cardHeader}>
            <View style={[$iconContainer, { backgroundColor: colors.palette.primary100 }]}>
              <Icon icon="components" color={colors.palette.primary500} size={24} />
            </View>
            <Text text="Identity" preset="bold" style={$cardTitle} />
          </View>
          <View style={$cardContent}>
            <Text text="KYC Level 2" style={$cardText} />
            <View style={$actionRow}>
              <Text text="Complete profile" style={$actionText} />
              <Icon icon="chevronRight" color={colors.palette.primary500} size={16} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Communities Card */}
        <TouchableOpacity 
          style={$card} 
          onPress={() => navigateTo("Communities")}
        >
          <View style={$cardHeader}>
            <View style={[$iconContainer, { backgroundColor: colors.palette.secondary100 }]}>
              <Icon icon="community" color={colors.palette.secondary500} size={24} />
            </View>
            <Text text="Communities" preset="bold" style={$cardTitle} />
          </View>
          <View style={$cardContent}>
            <Text text="5 Active" style={$cardText} />
            <View style={$buttonRow}>
              <TouchableOpacity style={$smallButton}>
                <Text text="View" style={$smallButtonText} />
              </TouchableOpacity>
              <TouchableOpacity style={[$smallButton, $createButton]}>
                <Text text="Create" style={$smallButtonText} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Events & Polls Card */}
        <TouchableOpacity 
          style={$card} 
          onPress={() => navigateTo("Events")}
        >
          <View style={$cardHeader}>
            <View style={[$iconContainer, { backgroundColor: colors.palette.accent100 }]}>
              <Icon icon="components" color={colors.palette.accent500} size={24} />
            </View>
            <Text text="Events & Polls" preset="bold" style={$cardTitle} />
          </View>
          <View style={$cardContent}>
            <Text text="2 Active polls" style={$cardText} />
            <View style={$actionRow}>
              <Text text="Vote now" style={$actionText} />
              <Icon icon="chevronRight" color={colors.palette.primary500} size={16} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Security Card */}
        <TouchableOpacity 
          style={$card} 
          onPress={() => navigateTo("Security")}
        >
          <View style={$cardHeader}>
            <View style={[$iconContainer, { backgroundColor: colors.palette.primary100 }]}>
              <Icon icon="lock" color={colors.palette.primary500} size={24} />
            </View>
            <Text text="Security" preset="bold" style={$cardTitle} />
          </View>
          <View style={$cardContent}>
            <Text text="2FA enabled" style={$cardText} />
            <View style={$actionRow}>
              <Text text="Settings" style={$actionText} />
              <Icon icon="chevronRight" color={colors.palette.primary500} size={16} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Recent Activity Section */}
      <View style={$sectionHeader}>
        <Text text="Recent Activity" preset="subheading" />
        <TouchableOpacity>
          <Text text="View all" style={$viewAllText} />
        </TouchableOpacity>
      </View>

      <View style={$activityContainer}>
        {/* Activity Item 1 */}
        <View style={$activityItem}>
          <View style={$activityIconContainer}>
            <Icon icon="components" color={colors.palette.primary500} size={20} />
          </View>
          <View style={$activityContent}>
            <Text text="New poll available in Tech Community" style={$activityTitle} />
            <Text text="2 hours ago" style={$activityTime} />
          </View>
        </View>

        {/* Activity Item 2 */}
        <View style={$activityItem}>
          <View style={$activityIconContainer}>
            <Icon icon="components" color={colors.palette.primary500} size={20} />
          </View>
          <View style={$activityContent}>
            <Text text="Your KYC verification was approved" style={$activityTitle} />
            <Text text="Yesterday" style={$activityTime} />
          </View>
        </View>

        {/* Activity Item 3 */}
        <View style={$activityItem}>
          <View style={$activityIconContainer}>
            <Icon icon="components" color={colors.palette.primary500} size={20} />
          </View>
          <View style={$activityContent}>
            <Text text="New event: Virtual Meetup scheduled" style={$activityTitle} />
            <Text text="2 days ago" style={$activityTime} />
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={$sectionHeader}>
        <Text text="Quick Actions" preset="subheading" />
      </View>

      <View style={$quickActionsContainer}>
        <TouchableOpacity style={$quickActionButton}>
          <View style={$quickActionIcon}>
            <Icon icon="components" color={colors.palette.primary500} size={24} />
          </View>
          <Text text="Scan QR" style={$quickActionText} />
        </TouchableOpacity>

        <TouchableOpacity style={$quickActionButton}>
          <View style={$quickActionIcon}>
            <Icon icon="components" color={colors.palette.primary500} size={24} />
          </View>
          <Text text="Message" style={$quickActionText} />
        </TouchableOpacity>

        <TouchableOpacity style={$quickActionButton}>
          <View style={$quickActionIcon}>
            <Icon icon="components" color={colors.palette.primary500} size={24} />
          </View>
          <Text text="Notifications" style={$quickActionText} />
        </TouchableOpacity>

        <TouchableOpacity style={$quickActionButton}>
          <View style={$quickActionIcon}>
            <Icon icon="settings" color={colors.palette.primary500} size={24} />
          </View>
          <Text text="Settings" style={$quickActionText} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
  paddingBottom: spacing.xl,
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.lg,
}

const $userName: TextStyle = {
  color: colors.palette.primary500,
}

const $profileButton: ViewStyle = {
  height: 48,
  width: 48,
  borderRadius: 24,
  overflow: "hidden",
}

const $avatar: ImageStyle = {
  height: 48,
  width: 48,
}

const $avatarPlaceholder: ViewStyle = {
  height: 48,
  width: 48,
  borderRadius: 24,
  backgroundColor: colors.palette.primary100,
  justifyContent: "center",
  alignItems: "center",
}

const $avatarText: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: colors.palette.primary500,
}

const $dashboardTitle: TextStyle = {
  marginBottom: spacing.sm,
}

const $cardsContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: spacing.lg,
}

const $card: ViewStyle = {
  width: "48%",
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.sm,
  marginBottom: spacing.md,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}

const $cardHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xs,
}

const $iconContainer: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.xs,
}

const $cardTitle: TextStyle = {
  fontSize: 16,
}

const $cardContent: ViewStyle = {
  marginTop: spacing.xs,
}

const $cardText: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral600,
  marginBottom: spacing.xs,
}

const $actionRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $actionText: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary500,
  marginRight: spacing.xs,
}

const $buttonRow: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.xs,
}

const $smallButton: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
  borderRadius: 16,
  marginRight: spacing.xs,
}

const $createButton: ViewStyle = {
  backgroundColor: colors.palette.primary100,
}

const $smallButtonText: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral700,
}

const $sectionHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.lg,
  marginBottom: spacing.sm,
}

const $viewAllText: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary500,
}

const $activityContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.sm,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}

const $activityItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral200,
}

const $activityIconContainer: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: colors.palette.primary100,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.sm,
}

const $activityContent: ViewStyle = {
  flex: 1,
}

const $activityTitle: TextStyle = {
  fontSize: 14,
  marginBottom: spacing.xxs,
}

const $activityTime: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral600,
}

const $quickActionsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.xs,
}

const $quickActionButton: ViewStyle = {
  alignItems: "center",
  width: "22%",
}

const $quickActionIcon: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: colors.palette.primary100,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
}

const $quickActionText: TextStyle = {
  fontSize: 12,
  textAlign: "center",
}
