import { supabase } from "@/services/supabase"
import type { Message, Conversation } from "../types"

export const zolaApi = {
  async getConversations(): Promise<Conversation[]> {
    // Implement conversation fetching logic
    return []
  },

  async sendMessage(message: Omit<Message, "id">): Promise<Message> {
    // Implement message sending logic
    return {} as Message
  },

  async getConversation(id: string): Promise<Conversation> {
    // Implement single conversation fetching logic
    return {} as Conversation
  },
}
