import React, { FC, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle, TouchableOpacity, ActivityIndicator, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "@/components"
import { colors, spacing } from "@/theme"
import { useStores } from "@/models"
import { useNavigation } from "@react-navigation/native"
import { AuthStackScreenProps } from "@/navigators/AuthNavigator"

interface LoginScreenProps extends AuthStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigation = useNavigation()
  
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      loginWithEmail,
      loginWithSocial,
      isLoading,
      error,
      validationError,
      passwordValidationError,
    },
  } = useStores()

  async function login() {
    setIsSubmitted(true)

    if (validationError || passwordValidationError) return

    const success = await loginWithEmail()
    
    if (success) {
      // Navigation will be handled by the AuthNavigator
    }
  }

  async function loginWithGoogle() {
    await loginWithSocial("google")
  }

  async function loginWithFacebook() {
    await loginWithSocial("facebook")
  }

  function navigateToSignUp() {
    navigation.navigate("SignUp" as never)
  }

  function navigateToForgotPassword() {
    navigation.navigate("ForgotPassword" as never)
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
      <Text text="Log In" preset="heading" style={$title} />
      <Text text="Enter your details to continue" preset="subheading" style={$subtitle} />
      
      {error && <Text text={error} preset="default" style={$error} />}
      
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
        placeholderTx="Enter your password"
        helper={isSubmitted ? passwordValidationError : undefined}
        status={isSubmitted && passwordValidationError ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />
      
      <TouchableOpacity style={$forgotPassword} onPress={navigateToForgotPassword}>
        <Text text="Forgot Password?" style={$forgotPasswordText} />
      </TouchableOpacity>

      <Button
        text="Log In"
        style={$button}
        preset="filled"
        onPress={login}
        disabled={isLoading}
        RightAccessory={isLoading ? () => <ActivityIndicator color={colors.palette.neutral100} /> : undefined}
      />
      
      <View style={$orContainer}>
        <View style={$divider} />
        <Text text="OR" style={$orText} />
        <View style={$divider} />
      </View>
      
      <View style={$socialContainer}>
        <TouchableOpacity style={$socialButton} onPress={loginWithGoogle}>
          <Icon icon="google" size={24} />
          <Text text="Google" style={$socialButtonText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={$socialButton} onPress={loginWithFacebook}>
          <Icon icon="facebook" size={24} />
          <Text text="Facebook" style={$socialButtonText} />
        </TouchableOpacity>
      </View>
      
      <View style={$footer}>
        <Text text="Don't have an account? " />
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text text="Sign Up" style={$signUpText} />
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

const $forgotPassword: ViewStyle = {
  alignSelf: "flex-end",
  marginBottom: spacing.md,
}

const $forgotPasswordText: TextStyle = {
  color: colors.palette.primary500,
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

const $signUpText: TextStyle = {
  color: colors.palette.primary500,
  fontWeight: "bold",
}
