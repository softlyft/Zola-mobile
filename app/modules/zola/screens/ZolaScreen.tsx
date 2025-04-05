import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, TextInput, Platform } from "react-native"
import { Screen, Text } from "@/components"
import { colors, spacing, $styles } from "@/theme"
import { ChatListItem } from "../components/ChatListItem"
import { Conversation } from "../types"
import { FlashList } from "@shopify/flash-list"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ZolaStackParamList } from "../navigators/ZolaNavigator"

type TabType = "All" | "Groups" | "Direct" | "AI"

const TABS: TabType[] = ["All", "Groups", "Direct", "AI"]

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "john",
    title: "John Doe",
    messages: [
      {
        id: "1",
        content: "Hey, are you coming to the meetup?",
        role: "user",
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
    ],
    unreadCount: 2,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "tech-group",
    title: "Tech Innovators Group",
    messages: [
      {
        id: "2",
        content: "Sarah: Looking forward to the hackathon!",
        role: "user",
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      },
    ],
    unreadCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "alice",
    title: "Alice Smith",
    messages: [
      {
        id: "3",
        content: "Great! I'll see you there 👋",
        role: "user",
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ],
    unreadCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "zola",
    title: "Zola Assistant",
    messages: [
      {
        id: "4",
        content: "How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
    unreadCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev-team",
    title: "Development Team",
    messages: [
      {
        id: "5",
        content: "Mike: New sprint planning at 2 PM",
        role: "user",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
    ],
    unreadCount: 3,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "design-group",
    title: "Design Group",
    messages: [
      {
        id: "6",
        content: "Emma: Updated mockups are ready for review",
        role: "user",
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      },
    ],
    unreadCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
  },
]

export function ZolaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ZolaStackParamList>>()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("All")

  const filteredConversations = MOCK_CONVERSATIONS.filter((conversation) => {
    const matchesSearch = conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false

    switch (activeTab) {
      case "Groups":
        return conversation.title.includes("Group")
      case "Direct":
        return !conversation.title.includes("Group") && !conversation.title.includes("Assistant")
      case "AI":
        return conversation.title.includes("Assistant")
      default:
        return true
    }
  })

  function handleChatPress(conversation: Conversation) {
    navigation.navigate("Chat", { conversation })
  }

  return (
    <Screen preset="fixed" style={$container} safeAreaEdges={["top"]}>
      <View style={$header}>
        <Text preset="heading" text="Messages" style={$title} />
        <View style={$searchContainer}>
          <Ionicons name="search" size={20} color={colors.textDim} style={$searchIcon} />
          <TextInput
            style={$searchInput}
            placeholder="Search"
            placeholderTextColor={colors.textDim}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Ionicons name="options-outline" size={20} color={colors.textDim} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={$tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[$tabButton, activeTab === tab && $activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text text={tab} style={[$tabText, activeTab === tab && $activeTabText]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={$listContainer}>
        <FlashList
          data={filteredConversations}
          renderItem={({ item }) => (
            <ChatListItem
              conversation={item}
              onPress={handleChatPress}
              isAI={item.title.includes("Assistant")}
            />
          )}
          estimatedItemSize={80}
          contentContainerStyle={$list}
        />
      </View>

      <TouchableOpacity
        style={$fab}
        onPress={() => {
          const newConversation: Conversation = {
            id: Date.now().toString(),
            title: "Zola Assistant",
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          handleChatPress(newConversation)
        }}
      >
        <Ionicons name="add" size={24} color={colors.palette.neutral100} />
      </TouchableOpacity>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $header: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
  paddingBottom: spacing.sm,
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "600",
  marginBottom: spacing.sm,
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  paddingHorizontal: spacing.sm,
  height: 40,
}

const $searchIcon: ViewStyle = {
  marginRight: spacing.xs,
}

const $searchInput: TextStyle = {
  flex: 1,
  height: 40,
  color: colors.text,
  fontSize: 16,
  marginRight: spacing.sm,
}

const $tabsContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $tabButton: ViewStyle = {
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  marginRight: spacing.md,
}

const $activeTabButton: ViewStyle = {
  borderBottomWidth: 2,
  borderBottomColor: colors.tint,
}

const $tabText: TextStyle = {
  fontSize: 14,
  color: colors.textDim,
}

const $activeTabText: TextStyle = {
  color: colors.tint,
  fontWeight: "600",
}

const $listContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  minHeight: 1, // Add minimum height to ensure FlashList has valid dimensions
}

const $list: ViewStyle = {
  paddingTop: spacing.xs,
}

const $fab: ViewStyle = {
  position: "absolute",
  right: spacing.lg,
  bottom: spacing.lg + 50, // Add extra space for tab bar
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
  elevation: 4,
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
}
