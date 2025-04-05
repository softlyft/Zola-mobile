import React from 'react'
import { View, ViewStyle, TextStyle, Image, ImageStyle, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text, Card } from '@/components'
import { colors, spacing } from '@/theme'
import { useStores } from '@/models'
import { MaterialIcons } from '@expo/vector-icons'

export const CallerProfileCard = observer(function CallerProfileCard() {
  const { identityStore } = useStores()
  const { lastCallerProfile, isSearchingProfile } = identityStore
  
  if (isSearchingProfile) {
    return (
      <Card style={$card}>
        <View style={$loadingContainer}>
          <Text text="Searching for caller..." style={$loadingText} />
        </View>
      </Card>
    )
  }
  
  if (!lastCallerProfile) {
    return null
  }
  
  return (
    <Card style={$card}>
      <View style={$header}>
        <Text text="Incoming Call" style={$headerText} />
      </View>
      
      <View style={$profileContainer}>
        {lastCallerProfile.avatar ? (
          <Image source={{ uri: lastCallerProfile.avatar }} style={$avatar} />
        ) : (
          <View style={$avatarPlaceholder}>
            <Text text={lastCallerProfile.displayName.charAt(0)} style={$avatarText} />
          </View>
        )}
        
        <View style={$infoContainer}>
          <Text text={lastCallerProfile.displayName} style={$nameText} />
          
          {lastCallerProfile.role && (
            <View style={$infoRow}>
              <MaterialIcons name="work" size={16} color={colors.palette.neutral600} style={$icon} />
              <Text text={lastCallerProfile.role} style={$infoText} />
            </View>
          )}
          
          {lastCallerProfile.department && (
            <View style={$infoRow}>
              <MaterialIcons name="business" size={16} color={colors.palette.neutral600} style={$icon} />
              <Text text={lastCallerProfile.department} style={$infoText} />
            </View>
          )}
          
          <View style={$infoRow}>
            <MaterialIcons name="phone" size={16} color={colors.palette.neutral600} style={$icon} />
            <Text 
              text={lastCallerProfile.formattedNumber || 
                `${lastCallerProfile.countryCode || ''} ${lastCallerProfile.phoneNumber}`} 
              style={$infoText} 
            />
          </View>
          
          {lastCallerProfile.email && (
            <View style={$infoRow}>
              <MaterialIcons name="email" size={16} color={colors.palette.neutral600} style={$icon} />
              <Text text={lastCallerProfile.email} style={$infoText} />
            </View>
          )}
        </View>
      </View>
      
      <View style={$actions}>
        <TouchableOpacity style={$actionButton}>
          <MaterialIcons name="message" size={20} color={colors.palette.primary500} />
          <Text text="Message" style={$actionText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={$actionButton}>
          <MaterialIcons name="person" size={20} color={colors.palette.primary500} />
          <Text text="View Profile" style={$actionText} />
        </TouchableOpacity>
      </View>
    </Card>
  )
})

const $card: ViewStyle = {
  marginHorizontal: spacing.md,
  marginVertical: spacing.sm,
  padding: 0,
  overflow: 'hidden',
}

const $header: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  padding: spacing.sm,
  alignItems: 'center',
}

const $headerText: TextStyle = {
  color: colors.palette.neutral100,
  fontWeight: 'bold',
}

const $profileContainer: ViewStyle = {
  flexDirection: 'row',
  padding: spacing.md,
}

const $avatar: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
}

const $avatarPlaceholder: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: colors.palette.primary100,
  justifyContent: 'center',
  alignItems: 'center',
}

const $avatarText: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  color: colors.palette.primary500,
}

const $infoContainer: ViewStyle = {
  flex: 1,
  marginLeft: spacing.md,
}

const $nameText: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: spacing.xs,
}

const $infoRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: spacing.xxs,
}

const $icon: ViewStyle = {
  marginRight: spacing.xs,
}

const $infoText: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral700,
}

const $actions: ViewStyle = {
  flexDirection: 'row',
  borderTopWidth: 1,
  borderTopColor: colors.separator,
}

const $actionButton: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.sm,
}

const $actionText: TextStyle = {
  marginLeft: spacing.xs,
  color: colors.palette.primary500,
}

const $loadingContainer: ViewStyle = {
  padding: spacing.lg,
  alignItems: 'center',
}

const $loadingText: TextStyle = {
  color: colors.palette.neutral600,
}
