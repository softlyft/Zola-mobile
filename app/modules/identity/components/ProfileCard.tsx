import React, { useState } from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle, TouchableOpacity, Modal, Platform, ActivityIndicator, Alert } from "react-native"
import { Text, Icon, Button, TextField } from "@/components"
import { colors, spacing } from "@/theme"
import { LinearGradient } from "expo-linear-gradient"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
import { identityApi } from "../services/identityApi"

interface ProfileCardProps {
  user?: {
    id: string
    fullName: string
    role: string
    department: string
    email: string
    avatar: string | null
    joinDate: Date
    employeeId: string
  }
  editable?: boolean
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

export const ProfileCard = observer(({ user = MOCK_USER, editable = true }: ProfileCardProps) => {
  const { authenticationStore } = useStores()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: authenticationStore.user?.firstName || "",
    lastName: authenticationStore.user?.lastName || "",
    email: authenticationStore.user?.email || user.email,
    phone: authenticationStore.user?.phone || "",
    department: user.department,
    role: user.role,
  })

  // Combine first and last name for display
  const displayName = authenticationStore.user ?
    `${authenticationStore.user.firstName || ""} ${authenticationStore.user.lastName || ""}`.trim() :
    user.fullName

  // Use authentication store avatar if available
  const avatarUrl = authenticationStore.user?.avatar || user.avatar

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!authenticationStore.user?.id) {
      Alert.alert("Error", "User ID not found. Please log in again.")
      return
    }

    try {
      setIsSaving(true)

      const { success, error } = await identityApi.updateProfile(
        authenticationStore.user.id,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
        }
      )

      if (success) {
        // Update the local auth store with the new data
        // Note: We're updating the user object with the new values
        // The phone is stored in user metadata by Supabase auth.updateUser
        authenticationStore.setUser({
          ...authenticationStore.user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          // Also update department and role in our local state
          department: formData.department,
          role: formData.role,
        })

        Alert.alert("Success", "Profile updated successfully")
        setIsEditing(false)
      } else {
        Alert.alert("Error", error || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data and close modal
    setFormData({
      firstName: authenticationStore.user?.firstName || "",
      lastName: authenticationStore.user?.lastName || "",
      email: authenticationStore.user?.email || user.email,
      phone: authenticationStore.user?.phone || "",
      department: user.department,
      role: user.role,
    })
    setIsEditing(false)
  }

  return (
    <View style={$container}>
      <LinearGradient
        colors={[colors.palette.primary500, colors.palette.secondary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={$gradientBackground}
      >
        {editable && (
          <TouchableOpacity
            style={$editButton}
            onPress={() => setIsEditing(true)}
          >
            <Icon icon="edit" color={colors.palette.neutral100} size={20} />
          </TouchableOpacity>
        )}

        <View style={$header}>
          <View style={$avatarContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={$avatar} />
            ) : (
              <View style={$avatarPlaceholder}>
                <Text text={displayName[0] || "U"} style={$avatarText} />
              </View>
            )}
          </View>

          <View style={$headerContent}>
            <Text text={displayName} style={$name} />
            <Text text={formData.role} style={$role} />
          </View>
        </View>

        <View style={$content}>
          <View style={$row}>
            <Text text="Employee ID" style={$label} />
            <Text text={authenticationStore.user?.id || user.employeeId} style={$value} />
          </View>

          <View style={$row}>
            <Text text="Department" style={$label} />
            <Text text={formData.department} style={$value} />
          </View>

          <View style={$row}>
            <Text text="Email" style={$label} />
            <Text text={formData.email} style={$value} />
          </View>

          <View style={$row}>
            <Text text="Phone" style={$label} />
            <Text text={formData.phone || "Not provided"} style={$value} />
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
      </LinearGradient>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditing}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={$modalOverlay}>
          <View style={$modalContent}>
            <View style={$modalHeader}>
              <Text text="Edit Profile" style={$modalTitle} />
              <TouchableOpacity onPress={handleCancel}>
                <Icon icon="x" color={colors.text} size={24} />
              </TouchableOpacity>
            </View>

            <View style={$formContainer}>
              <View style={$nameRow}>
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(value) => setFormData({...formData, firstName: value})}
                  containerStyle={$nameField}
                />
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(value) => setFormData({...formData, lastName: value})}
                  containerStyle={$nameField}
                />
              </View>

              <TextField
                label="Email"
                value={formData.email}
                onChangeText={(value) => setFormData({...formData, email: value})}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={$formField}
              />

              <TextField
                label="Phone"
                value={formData.phone}
                onChangeText={(value) => setFormData({...formData, phone: value})}
                keyboardType="phone-pad"
                containerStyle={$formField}
              />

              <TextField
                label="Department"
                value={formData.department}
                onChangeText={(value) => setFormData({...formData, department: value})}
                containerStyle={$formField}
              />

              <TextField
                label="Role"
                value={formData.role}
                onChangeText={(value) => setFormData({...formData, role: value})}
                containerStyle={$formField}
              />
            </View>

            <View style={$buttonContainer}>
              <Button
                text="Cancel"
                preset="default"
                style={$cancelButton}
                onPress={handleCancel}
              />
              <Button
                text={isSaving ? "Saving..." : "Save"}
                preset="filled"
                style={$saveButton}
                onPress={handleSave}
                disabled={isSaving}
                RightAccessory={isSaving ? () => (
                  <ActivityIndicator color={colors.palette.neutral100} style={$saveButtonIndicator} />
                ) : undefined}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
})

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
  marginBottom: spacing.lg,
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
  backgroundColor: colors.palette.neutral300,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 3,
  borderColor: colors.palette.neutral100,
}

const $avatarText: TextStyle = {
  fontSize: 32,
  fontWeight: "bold",
  color: colors.palette.neutral100,
}

const $headerContent: ViewStyle = {
  flex: 1,
}

const $name: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: colors.palette.neutral100,
  marginBottom: spacing.xs,
}

const $role: TextStyle = {
  fontSize: 16,
  color: colors.palette.neutral100,
  opacity: 0.8,
}

const $content: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.md,
}

const $row: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: spacing.xs,
}

const $label: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
  color: colors.palette.neutral700,
}

const $value: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral900,
  textAlign: "right",
  flex: 1,
  marginLeft: spacing.sm,
}

const $saveButtonIndicator: ViewStyle = {
  marginLeft: spacing.xs,
}

const $editButton: ViewStyle = {
  position: "absolute",
  top: spacing.sm,
  right: spacing.sm,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: 20,
  padding: spacing.xs,
  zIndex: 1,
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
}

const $modalContent: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.lg,
  width: "100%",
  maxHeight: "80%",
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
}

const $modalHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.lg,
}

const $modalTitle: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
}

const $formContainer: ViewStyle = {
  marginBottom: spacing.lg,
}

const $nameRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.sm,
}

const $nameField: ViewStyle = {
  width: "48%",
}

const $formField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
}

const $cancelButton: ViewStyle = {
  marginRight: spacing.sm,
  minWidth: 100,
}

const $saveButton: ViewStyle = {
  minWidth: 100,
}
