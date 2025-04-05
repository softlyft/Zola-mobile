export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  unreadCount?: number
}

export interface ZolaState {
  conversations: Conversation[]
  currentConversation?: Conversation
  isLoading: boolean
}
