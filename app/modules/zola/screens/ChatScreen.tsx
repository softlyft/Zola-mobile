import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native"
import { Screen, Text, Icon, Button } from "@/components"
import { colors, spacing } from "@/theme"
import { Message } from "../types"
import { zolaApi } from "../services/zolaApi"

interface ChatMessageProps {
  message: Message
  isUser: boolean
}

function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <View style={[$messageContainer, isUser && $userMessage]}>
      <View style={[$messageBubble, isUser ? $userBubble : $botBubble]}>
        <Text text={message.content} style={[$messageText, isUser && $userMessageText]} />
        <Text
          text={new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          style={$timeText}
        />
      </View>
    </View>
  )
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Zola, your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSend() {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const response = await zolaApi.sendMessage(userMessage)
      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Screen preset="fixed" style={$container} safeAreaEdges={["top"]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={$keyboardAvoid}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage message={item} isUser={item.role === "user"} />
          )}
          contentContainerStyle={$messageList}
          inverted={false}
        />

        <View style={$inputContainer}>
          <TextInput
            style={$input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={colors.textDim}
            multiline
          />
          <Button
            preset="filled"
            onPress={handleSend}
            disabled={isLoading || !inputText.trim()}
            style={$sendButton}
          >
            <Icon icon="caretRight" size={20} color={colors.palette.neutral100} />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $keyboardAvoid: ViewStyle = {
  flex: 1,
}

const $messageList: ViewStyle = {
  flexGrow: 1,
  padding: spacing.md,
}

const $messageContainer: ViewStyle = {
  flexDirection: "row",
  marginVertical: spacing.xs,
}

const $userMessage: ViewStyle = {
  justifyContent: "flex-end",
}

const $messageBubble: ViewStyle = {
  maxWidth: "80%",
  padding: spacing.sm,
  borderRadius: 12,
  marginHorizontal: spacing.xs,
}

const $userBubble: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  borderBottomRightRadius: 4,
}

const $botBubble: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
  borderBottomLeftRadius: 4,
}

const $messageText: TextStyle = {
  fontSize: 16,
  color: colors.text,
}

const $userMessageText: TextStyle = {
  color: colors.palette.neutral100,
}

const $timeText: TextStyle = {
  fontSize: 10,
  color: colors.textDim,
  alignSelf: "flex-end",
  marginTop: spacing.xs,
}

const $inputContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.separator,
  backgroundColor: colors.background,
}

const $input: TextStyle = {
  flex: 1,
  minHeight: 40,
  maxHeight: 120,
  marginRight: spacing.sm,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 20,
  color: colors.text,
}

const $sendButton: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  padding: 0,
  justifyContent: "center",
  alignItems: "center",
}
