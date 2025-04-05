import React from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle, Image } from "react-native"
import { Text } from "@/components"
import { colors, spacing } from "@/theme"
import { Conversation } from "../types"

interface ChatListItemProps {
  conversation: Conversation
  onPress: (conversation: Conversation) => void
  isAI?: boolean
}

export function ChatListItem({ conversation, onPress, isAI }: ChatListItemProps) {
  // Safely get the last message if messages array exists and has items
  const lastMessage = conversation.messages && conversation.messages.length > 0
    ? conversation.messages[conversation.messages.length - 1]
    : null

  function getRelativeTime(date: Date | string) {
    try {
      const dateObj = date instanceof Date ? date : new Date(date)
      const now = new Date()
      const diff = now.getTime() - dateObj.getTime()

      const minutes = Math.floor(diff / 60000)
      if (minutes < 60) return `${minutes}m ago`

      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}h ago`

      const days = Math.floor(hours / 24)
      return `${days}d ago`
    } catch (error) {
      console.error("Error parsing date:", error)
      return "recently"
    }
  }

  function getAvatarContent() {
    if (isAI) {
      return (
        <View style={[$avatar, $aiAvatar]}>
          <Text text="🤖" style={$avatarEmoji} />
        </View>
      )
    }

    if (conversation.title.includes("Group")) {
      return (
        <View style={[$avatar, $groupAvatar]}>
          <Text text="👥" style={$avatarEmoji} />
        </View>
      )
    }

    // For individual users, show first letter of name
    return (
      <View style={[$avatar, $userAvatar]}>
        <Text text={conversation.title[0]} style={$avatarText} />
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={$container}
      onPress={() => onPress(conversation)}
      activeOpacity={0.7}
    >
      {getAvatarContent()}

      <View style={$content}>
        <View style={$topRow}>
          <Text text={conversation.title} style={$title} numberOfLines={1} />
          <Text
            text={conversation.updatedAt ? getRelativeTime(conversation.updatedAt) : ""}
            style={$time}
          />
        </View>

        {lastMessage && (
          <View style={$bottomRow}>
            <Text
              text={lastMessage.content}
              style={$preview}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            {conversation.unreadCount ? (
              <View style={$badge}>
                <Text text={conversation.unreadCount.toString()} style={$badgeText} />
              </View>
            ) : null}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  backgroundColor: colors.background,
}

const $avatar: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.sm,
}

const $aiAvatar: ViewStyle = {
  backgroundColor: colors.tint,
}

const $groupAvatar: ViewStyle = {
  backgroundColor: colors.palette.secondary300,
}

const $userAvatar: ViewStyle = {
  backgroundColor: colors.palette.neutral300,
}

const $avatarText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 20,
  fontWeight: "600",
}

const $avatarEmoji: TextStyle = {
  fontSize: 24,
}

const $content: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $topRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.xxs,
}

const $bottomRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $title: TextStyle = {
  flex: 1,
  fontSize: 16,
  fontWeight: "600",
  color: colors.text,
  marginRight: spacing.xs,
}

const $preview: TextStyle = {
  flex: 1,
  fontSize: 14,
  color: colors.textDim,
  marginRight: spacing.xs,
}

const $time: TextStyle = {
  fontSize: 12,
  color: colors.textDim,
}

const $badge: ViewStyle = {
  backgroundColor: colors.tint,
  minWidth: 20,
  height: 20,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.xxs,
}

const $badgeText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 12,
  fontWeight: "600",
}
