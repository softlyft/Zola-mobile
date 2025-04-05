import React, { useState } from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity, TextInput, Platform } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Screen, Text, Button } from '@/components'
import { colors, spacing } from '@/theme'
import { useStores } from '@/models'
import { useCallInterception } from '../services/callInterceptor'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CallerProfileCard } from '../components/CallerProfileCard'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const CallInterceptionScreen = observer(function CallInterceptionScreen() {
  const { identityStore } = useStores()
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigation = useNavigation()

  // Set up call interception with permissions handling
  const { permissionsGranted, loading, requestPermissions } = useCallInterception()

  // Function to simulate an incoming call
  const simulateIncomingCall = () => {
    if (phoneNumber.trim()) {
      identityStore.handleIncomingCall(phoneNumber.trim())
    }
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <View style={$header}>
        <TouchableOpacity
          style={$backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text preset="heading" text="Call Interception" style={$title} />
      </View>

      <Text text="This screen demonstrates how the app intercepts incoming calls, extracts the phone number, and searches for matching profiles in Supabase." style={$description} />

      {/* Permissions Status Card */}
      <View style={$permissionsCard}>
        <View style={$permissionsHeader}>
          <Text text="Permissions Status" style={$sectionTitle} />
          {loading ? (
            <Text text="Checking..." style={$permissionsStatusText} />
          ) : permissionsGranted ? (
            <View style={$permissionsGranted}>
              <MaterialCommunityIcons name="check-circle" size={20} color={colors.palette.primary500} />
              <Text text="Granted" style={[$permissionsStatusText, $permissionsGrantedText]} />
            </View>
          ) : (
            <View style={$permissionsDenied}>
              <MaterialCommunityIcons name="alert-circle" size={20} color={colors.error} />
              <Text text="Not Granted" style={[$permissionsStatusText, $permissionsDeniedText]} />
            </View>
          )}
        </View>

        <Text text="The app needs permission to access your phone state and call logs to detect incoming calls." style={$permissionsDescription} />

        {!permissionsGranted && !loading && (
          <Button
            text="Request Permissions"
            preset="default"
            style={$permissionsButton}
            onPress={requestPermissions}
          />
        )}
      </View>

      <View style={$card}>
        <Text text="How it works:" style={$sectionTitle} />
        <View style={$bulletPoint}>
          <MaterialIcons name="fiber-manual-record" size={8} color={colors.text} style={$bulletIcon} />
          <Text text="When a call comes in, the app detects it using platform-specific APIs" style={$bulletText} />
        </View>
        <View style={$bulletPoint}>
          <MaterialIcons name="fiber-manual-record" size={8} color={colors.text} style={$bulletIcon} />
          <Text text="The phone number is extracted from the call information" style={$bulletText} />
        </View>
        <View style={$bulletPoint}>
          <MaterialIcons name="fiber-manual-record" size={8} color={colors.text} style={$bulletIcon} />
          <Text text="The app makes an API call to Supabase to search for matching profiles" style={$bulletText} />
        </View>
        <View style={$bulletPoint}>
          <MaterialIcons name="fiber-manual-record" size={8} color={colors.text} style={$bulletIcon} />
          <Text text="If a match is found, the caller's profile information is displayed" style={$bulletText} />
        </View>
      </View>

      <View style={$simulatorContainer}>
        <Text text="Incoming Call Simulator" style={$sectionTitle} />
        <Text text="Enter a phone number to simulate an incoming call:" style={$simulatorText} />

        <View style={$inputContainer}>
          <TextInput
            style={$input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="e.g., +1 (555) 123-4567"
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={$clearButton}
            onPress={() => setPhoneNumber('')}
            disabled={!phoneNumber}
          >
            <MaterialIcons
              name="clear"
              size={20}
              color={phoneNumber ? colors.palette.neutral700 : colors.palette.neutral400}
            />
          </TouchableOpacity>
        </View>

        <Button
          text="Simulate Incoming Call"
          preset="filled"
          style={$simulateButton}
          onPress={simulateIncomingCall}
          disabled={!phoneNumber.trim()}
        />
      </View>

      <CallerProfileCard />

      <View style={$noteContainer}>
        <Text text="Note: In a real implementation, this would use platform-specific libraries like react-native-callkeep for iOS and react-native-call-detection for Android to detect actual incoming calls." style={$noteText} />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  padding: spacing.md,
  flexGrow: 1, // Use flexGrow instead of flex to allow content to expand beyond screen height
  paddingBottom: spacing.xl, // Add padding at the bottom to ensure content isn't cut off
}

const $header: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing.md,
}

const $backButton: ViewStyle = {
  marginRight: spacing.sm,
  padding: spacing.xs,
}

const $title: TextStyle = {
  flex: 1, // Take up remaining space in the header row
}

const $description: TextStyle = {
  marginBottom: spacing.lg,
}

const $card: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 8,
  padding: spacing.md,
  marginBottom: spacing.lg,
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
}

const $sectionTitle: TextStyle = {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: spacing.sm,
}

const $bulletPoint: ViewStyle = {
  flexDirection: 'row',
  marginBottom: spacing.xs,
  alignItems: 'flex-start',
}

const $bulletIcon: ViewStyle = {
  marginTop: 6,
  marginRight: spacing.xs,
}

const $bulletText: TextStyle = {
  flex: 1,
}

const $simulatorContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 8,
  padding: spacing.md,
  marginBottom: spacing.lg,
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
}

const $simulatorText: TextStyle = {
  marginBottom: spacing.sm,
}

const $inputContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.separator,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral100,
}

const $input: TextStyle = {
  flex: 1,
  padding: spacing.sm,
  fontSize: 16,
}

const $clearButton: ViewStyle = {
  padding: spacing.sm,
}

const $simulateButton: ViewStyle = {
  marginBottom: spacing.sm,
}

const $noteContainer: ViewStyle = {
  marginTop: spacing.lg,
  padding: spacing.sm,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
}

const $noteText: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral700,
}

// Permission styles
const $permissionsCard: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 8,
  padding: spacing.md,
  marginBottom: spacing.lg,
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
}

const $permissionsHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.sm,
}

const $permissionsStatusText: TextStyle = {
  fontSize: 14,
  marginLeft: spacing.xs,
}

const $permissionsGranted: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const $permissionsGrantedText: TextStyle = {
  color: colors.palette.neutral700,
  fontWeight: 'bold',
}

const $permissionsDenied: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const $permissionsDeniedText: TextStyle = {
  color: colors.palette.neutral700,
  fontWeight: 'bold',
}

const $permissionsDescription: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral600,
  marginBottom: spacing.md,
}

const $permissionsButton: ViewStyle = {
  marginTop: spacing.xs,
}
