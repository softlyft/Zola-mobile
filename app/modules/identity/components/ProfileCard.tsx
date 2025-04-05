import React from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle } from "react-native"
import { Text } from "@/components"
import { colors, spacing } from "@/theme"
import { LinearGradient } from "expo-linear-gradient"

interface ProfileCardProps {
  user: {
    id: string
    fullName: string
    role: string
    department: string
    email: string
    avatar: string | null
    joinDate: Date
    employeeId: string
  }
}

const MOCK_USER = {
  id: "1",
  fullName: "John Doe",
  role: "Senior Software Engineer",
  department: "Engineering",
  email: "john.doe@softlyft.com",
  avatar: "https://i.pravatar.cc/150?u=john",
  joinDate: new Date("2024-01-15"),
  employeeId: "EMP-2024-001",
}

export function ProfileCard({ user = MOCK_USER }: ProfileCardProps) {
  return (
    <View style={$container}>
      <LinearGradient
        colors={[colors.palette.primary500, colors.palette.secondary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={$gradientBackground}
      >
        <View style={$header}>
          <View style={$avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={$avatar} />
            ) : (
              <View style={$avatarPlaceholder}>
                <Text text={user.fullName[0]} style={$avatarText} />
              </View>
            )}
          </View>
          <View style={$headerContent}>
            <Text text={user.fullName} style={$name} />
            <Text text={user.role} style={$role} />
          </View>
        </View>

        <View style={$divider} />

        <View style={$content}>
          <View style={$row}>
            <Text text="Employee ID" style={$label} />
            <Text text={user.employeeId} style={$value} />
          </View>
          <View style={$row}>
            <Text text="Department" style={$label} />
            <Text text={user.department} style={$value} />
          </View>
          <View style={$row}>
            <Text text="Email" style={$label} />
            <Text text={user.email} style={$value} />
          </View>
          <View style={$row}>
            <Text text="Join Date" style={$label} />
            <Text
              text={user.joinDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              style={$value}
            />
          </View>
        </View>

        <View style={$footer}>
          <Text text="Softlyft Technologies" style={$companyName} />
        </View>
      </LinearGradient>
    </View>
  )
}

const $container: ViewStyle = {
  margin: spacing.md,
  borderRadius: 16,
  overflow: "hidden",
  elevation: 4,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
}

const $gradientBackground: ViewStyle = {
  padding: spacing.md,
}

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.md,
}

const $avatarContainer: ViewStyle = {
  marginRight: spacing.md,
}

const $avatar: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
  borderWidth: 3,
  borderColor: colors.palette.neutral100,
}

const $avatarPlaceholder: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 3,
  borderColor: colors.palette.neutral100,
}

const $avatarText: TextStyle = {
  fontSize: 32,
  color: colors.palette.neutral800,
  fontWeight: "600",
}

const $headerContent: ViewStyle = {
  flex: 1,
}

const $name: TextStyle = {
  fontSize: 24,
  fontWeight: "600",
  color: colors.palette.neutral100,
  marginBottom: spacing.xs,
}

const $role: TextStyle = {
  fontSize: 16,
  color: colors.palette.neutral100,
  opacity: 0.9,
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: colors.palette.neutral100,
  opacity: 0.2,
  marginVertical: spacing.md,
}

const $content: ViewStyle = {
  marginBottom: spacing.lg,
}

const $row: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.sm,
}

const $label: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral100,
  opacity: 0.8,
}

const $value: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral100,
  fontWeight: "500",
}

const $footer: ViewStyle = {
  alignItems: "center",
}

const $companyName: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral100,
  opacity: 0.7,
  fontWeight: "500",
}
