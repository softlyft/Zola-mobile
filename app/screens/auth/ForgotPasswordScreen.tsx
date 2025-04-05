import React, { FC, useState } from "react"
import { TextStyle, ViewStyle, TouchableOpacity, ActivityIndicator } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text, TextField } from "@/components"
import { colors, spacing } from "@/theme"
import { useStores } from "@/models"
import { useNavigation } from "@react-navigation/native"
import { AuthStackScreenProps } from "@/navigators/AuthNavigator"

interface ForgotPasswordScreenProps extends AuthStackScreenProps<"ForgotPassword"> {}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = observer(function ForgotPasswordScreen(_props) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const navigation = useNavigation()
  
  const {
    authenticationStore: {
      resetPassword,
      isLoading,
      error,
    },
  } = useStores()

  function validateEmail(email: string): string {
    if (email.length === 0) return "Email can't be blank"
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return "Please enter a valid email address"
    return ""
  }

  const emailError = validateEmail(email)

  async function handleResetPassword() {
    setIsSubmitted(true)

    if (emailError) return

    const success = await resetPassword(email)
    
    if (success) {
      setResetSent(true)
    }
  }

  function navigateToLogin() {
    navigation.navigate("Login" as never)
  }

  return (
    <Screen preset="auto" contentContainerStyle={$screenContentContainer} safeAreaEdges={["top", "bottom"]}>
      <TouchableOpacity style={$backButton} onPress={navigateToLogin}>
        <Text text="← Back to Login" style={$backButtonText} />
      </TouchableOpacity>
      
      <Text text="Forgot Password" preset="heading" style={$title} />
      
      {resetSent ? (
        <>
          <Text text="Password Reset Email Sent" preset="subheading" style={$successTitle} />
          <Text 
            text={`We've sent an email to ${email} with instructions to reset your password.`} 
            style={$successMessage} 
          />
          <Button
            text="Back to Login"
            style={$button}
            preset="filled"
            onPress={navigateToLogin}
          />
        </>
      ) : (
        <>
          <Text 
            text="Enter your email address and we'll send you instructions to reset your password." 
            preset="subheading" 
            style={$subtitle} 
          />
          
          {error && <Text text={error} preset="default" style={$error} />}
          
          <TextField
            value={email}
            onChangeText={setEmail}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            labelTx="Email"
            placeholderTx="Enter your email"
            helper={isSubmitted ? emailError : undefined}
            status={isSubmitted && emailError ? "error" : undefined}
            onSubmitEditing={handleResetPassword}
          />

          <Button
            text="Send Reset Instructions"
            style={$button}
            preset="filled"
            onPress={handleResetPassword}
            disabled={isLoading}
            RightAccessory={isLoading ? () => <ActivityIndicator color={colors.palette.neutral100} /> : undefined}
          />
        </>
      )}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
}

const $backButton: ViewStyle = {
  marginBottom: spacing.xl,
}

const $backButtonText: TextStyle = {
  color: colors.palette.primary500,
}

const $title: TextStyle = {
  marginBottom: spacing.lg,
}

const $subtitle: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $button: ViewStyle = {
  marginTop: spacing.md,
}

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $successTitle: TextStyle = {
  marginBottom: spacing.md,
  color: colors.palette.primary500,
}

const $successMessage: TextStyle = {
  marginBottom: spacing.xl,
}
