import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, TextInput, Platform } from "react-native"
import { Screen, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { ChatListItem } from "../components/ChatListItem"
import { Conversation } from "../types"
import { FlashList } from "@shopify/flash-list"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ZolaStackParamList } from "../navigators/ZolaNavigator"

type TabType = "All" | "Groups" | "Direct" | "AI"

const TABS: TabType[] = ["All", "Groups", "Direct", "AI"]

// Create mock conversations with proper Date objects
const createMockConversations = (): Conversation[] => [
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
  {
    id: "product-ai",
    title: "Product Assistant",
    messages: [
      {
        id: "7",
        content: "I've analyzed the market trends for our new product line. Would you like to see the report?",
        role: "assistant",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
    ],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "marketing-group",
    title: "Marketing Strategy Group",
    messages: [
      {
        id: "8",
        content: "Jessica: The Q3 campaign results are in! We exceeded our targets by 15%.",
        role: "user",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
    ],
    unreadCount: 4,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "finance-team",
    title: "Finance Team",
    messages: [
      {
        id: "9",
        content: "Robert: Budget approvals for Q4 are due by Friday. Please submit your requests ASAP.",
        role: "user",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      },
    ],
    unreadCount: 2,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    messages: [
      {
        id: "10",
        content: "I've compiled the latest industry research papers you requested. Would you like me to summarize the key findings?",
        role: "assistant",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
    ],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
]

const MOCK_CONVERSATIONS: Conversation[] = createMockConversations()

export function ZolaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ZolaStackParamList>>()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("All")

  // Define the filtering logic
  const getFilteredConversations = () => {
    console.log("Running filter with tab:", activeTab)

    return MOCK_CONVERSATIONS.filter((conversation) => {
      // First filter by search query
      const matchesSearch = conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
      if (!matchesSearch) {
        console.log(`${conversation.title} filtered out by search`)
        return false
      }

      // Then filter by tab
      let result = false
      switch (activeTab) {
        case "Groups":
          result = conversation.title.includes("Group")
          break
        case "Direct":
          result = !conversation.title.includes("Group") && !conversation.title.includes("Assistant")
          break
        case "AI":
          result = conversation.title.includes("Assistant")
          break
        case "All":
          result = true // Explicitly handle All tab
          break
        default:
          result = true
      }

      if (!result) {
        console.log(`${conversation.title} filtered out by tab ${activeTab}`)
      }

      return result
    })
  }

  // Get filtered conversations
  const filteredConversations = getFilteredConversations()

  // Log conversation data for debugging
  React.useEffect(() => {
    console.log("ZolaScreen mounted, conversations count:", MOCK_CONVERSATIONS.length)
    console.log("First conversation:", JSON.stringify(MOCK_CONVERSATIONS[0]))

    // Debug each conversation title
    MOCK_CONVERSATIONS.forEach((conv, index) => {
      console.log(`Conversation ${index + 1}/${MOCK_CONVERSATIONS.length}: ${conv.title}`)
    })
  }, [])

  // Log filtered conversations when tab changes
  React.useEffect(() => {
    console.log(`Active tab: ${activeTab}, filtered count: ${filteredConversations.length}`)
  }, [activeTab, filteredConversations.length])

  function handleChatPress(conversation: Conversation) {
    navigation.navigate("Chat", { conversation })
  }

  return (
    <Screen
      preset="scroll" // Change to scroll preset for better content handling
      style={$container}
      safeAreaEdges={["bottom"]} // Remove top safe area to prevent double padding
      StatusBarProps={{ translucent: true }}
      keyboardOffset={0}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }} // Ensure content takes full height with no top padding
    >
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
        {filteredConversations.length > 0 ? (
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
            keyExtractor={(item) => item.id}
            ListEmptyComponent={null}
            showsVerticalScrollIndicator={true}
            onLoad={() => console.log("FlashList loaded with", filteredConversations.length, "items")}
            ListFooterComponent={<View style={{ height: 100 }} />} // Add extra space at the bottom
            drawDistance={200} // Increase draw distance
            overrideItemLayout={(layout) => {
              // Ensure consistent item height
              layout.size = 80
            }}
          />
        ) : (
          <View style={$emptyState}>
            <Text text="No conversations found" style={$emptyStateText} />
          </View>
        )}
      </View>

      {/* FAB for creating new AI conversation - positioned absolutely */}
      <View style={$fabContainer}>
        <TouchableOpacity
          style={$fab}
          activeOpacity={0.8}
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
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingTop: 0, // Remove any top padding that might be causing issues
  marginTop: 0, // Ensure no top margin
  height: "100%", // Ensure full height
  display: "flex", // Use flexbox
  flexDirection: "column", // Stack children vertically
  paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Add bottom padding on iOS
}

const $header: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xs, // Reduced top padding
  paddingBottom: spacing.sm,
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
  zIndex: 10, // Ensure header is above other content
  marginTop: Platform.OS === 'ios' ? 0 : 0, // Removed top margin
  marginBottom: 10, // Add some bottom margin
  position: 'relative', // Ensure proper positioning
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "600",
  marginBottom: spacing.xs, // Reduced bottom margin
  marginTop: 0, // Removed top margin
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  paddingHorizontal: spacing.sm,
  height: 40,
  marginTop: 5, // Add some top margin
  marginBottom: 5, // Add some bottom margin
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
  flex: 1, // Take up all available space
  backgroundColor: colors.background,
  minHeight: 400, // Increased minimum height
  paddingBottom: 100, // Increased padding for the FAB
  overflow: "visible", // Allow content to overflow
  flexGrow: 1, // Allow container to grow
  position: "relative", // Ensure proper positioning
  zIndex: 1, // Lower z-index than FAB
}

const $list: ViewStyle = {
  paddingTop: spacing.xs,
  paddingBottom: spacing.xl, // Add bottom padding
  flexGrow: 1, // Allow list to grow
}

const $emptyState: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
}

const $emptyStateText: TextStyle = {
  fontSize: 16,
  color: colors.textDim,
  textAlign: "center",
}

// Removed unused debug text style

const $fabContainer: ViewStyle = {
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  alignItems: "flex-end",
  padding: spacing.lg,
  paddingBottom: Platform.OS === 'ios' ? spacing.lg + 60 : spacing.lg + 50, // Add extra space for tab bar
  zIndex: 9999, // Increased z-index to ensure it's above everything
  pointerEvents: "box-none", // Allow touches to pass through to elements underneath
  elevation: 8, // Add elevation for Android
}

const $fab: ViewStyle = {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Ensure button is above everything
  ...Platform.select({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    android: {
      elevation: 8, // Increased elevation
    },
  }),
}
