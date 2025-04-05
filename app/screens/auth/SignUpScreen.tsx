import React, { FC, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle, TouchableOpacity, ActivityIndicator, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "@/components"
import { colors, spacing } from "@/theme"
import { useStores } from "@/models"
import { useNavigation } from "@react-navigation/native"
import { AuthStackScreenProps } from "@/navigators/AuthNavigator"

interface SignUpScreenProps extends AuthStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigation = useNavigation()

  const {
    authenticationStore: {
      authEmail,
      authPassword,
      firstName,
      lastName,
      phone,
      setAuthEmail,
      setAuthPassword,
      setFirstName,
      setLastName,
      setPhone,
      signUpWithEmail,
      loginWithSocial,
      isLoading,
      error,
      validationError,
      passwordValidationError,
    },
  } = useStores()

  async function signUp() {
    setIsSubmitted(true)

    if (validationError || passwordValidationError) return

    const success = await signUpWithEmail()

    if (success) {
      // Navigation will be handled by the AuthNavigator
    }
  }

  async function signUpWithGoogle() {
    await loginWithSocial("google")
  }

  async function signUpWithFacebook() {
    await loginWithSocial("facebook")
  }

  function navigateToLogin() {
    navigation.navigate("Login" as never)
  }

  const PasswordRightAccessory = function PasswordRightAccessory(props: TextFieldAccessoryProps) {
    return (
      <TouchableOpacity
        style={props.style}
        onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
      >
        <Icon
          icon={isAuthPasswordHidden ? "view" : "hidden"}
          color={colors.palette.neutral800}
          size={20}
        />
      </TouchableOpacity>
    )
  }

  return (
    <Screen preset="auto" contentContainerStyle={$screenContentContainer} safeAreaEdges={["top", "bottom"]}>
      <Text text="Create Account" preset="heading" style={$title} />
      <Text text="Sign up to get started" preset="subheading" style={$subtitle} />

      {error && <Text text={error} preset="default" style={$error} />}

      <View style={$nameContainer}>
        <TextField
          value={firstName}
          onChangeText={setFirstName}
          containerStyle={$nameField}
          autoCapitalize="words"
          autoCorrect={false}
          labelTx="First Name"
          placeholderTx="Enter first name"
        />

        <TextField
          value={lastName}
          onChangeText={setLastName}
          containerStyle={$nameField}
          autoCapitalize="words"
          autoCorrect={false}
          labelTx="Last Name"
          placeholderTx="Enter last name"
        />
      </View>

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="Email"
        placeholderTx="Enter your email"
        helper={isSubmitted ? validationError : undefined}
        status={isSubmitted && validationError ? "error" : undefined}
      />

      <TextField
        value={phone}
        onChangeText={setPhone}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="phone-pad"
        labelTx="Phone Number (optional)"
        placeholderTx="Enter phone number"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="Password"
        placeholderTx="Create a password"
        helper={isSubmitted ? passwordValidationError : undefined}
        status={isSubmitted && passwordValidationError ? "error" : undefined}
        onSubmitEditing={signUp}
        RightAccessory={PasswordRightAccessory}
      />

      <Text text="By signing up, you agree to our Terms of Service and Privacy Policy" style={$termsText} />

      <Button
        text="Sign Up"
        style={$button}
        preset="filled"
        onPress={signUp}
        disabled={isLoading}
        RightAccessory={isLoading ? () => <ActivityIndicator color={colors.palette.neutral100} /> : undefined}
      />

      <View style={$orContainer}>
        <View style={$divider} />
        <Text text="OR" style={$orText} />
        <View style={$divider} />
      </View>

      <View style={$socialContainer}>
        <TouchableOpacity style={$socialButton} onPress={signUpWithGoogle}>
          <Icon icon="google" size={24} />
          <Text text="Google" style={$socialButtonText} />
        </TouchableOpacity>

        <TouchableOpacity style={$socialButton} onPress={signUpWithFacebook}>
          <Icon icon="facebook" size={24} />
          <Text text="Facebook" style={$socialButtonText} />
        </TouchableOpacity>
      </View>

      <View style={$footer}>
        <Text text="Already have an account? " />
        <TouchableOpacity onPress={navigateToLogin}>
          <Text text="Log In" style={$loginText} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xs,
}

const $subtitle: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md,
}

const $button: ViewStyle = {
  marginTop: spacing.md,
}

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $termsText: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral600,
  marginBottom: spacing.md,
  textAlign: "center",
}

const $orContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing.lg,
}

const $divider: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: colors.palette.neutral300,
}

const $orText: TextStyle = {
  marginHorizontal: spacing.md,
  color: colors.palette.neutral600,
}

const $socialContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.xl,
}

const $socialButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.sm,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  width: "48%",
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),
  backgroundColor: colors.palette.neutral100,
}

const $socialButtonText: TextStyle = {
  marginLeft: spacing.sm,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const $loginText: TextStyle = {
  color: colors.palette.primary500,
  fontWeight: "bold",
}

const $nameContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.md,
}

const $nameField: ViewStyle = {
  width: "48%",
}
