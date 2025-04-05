import { createClient } from '@supabase/supabase-js'
import { load } from '@/config/env'

const env = load()
const supabaseUrl = env.SUPABASE_URL
const supabaseAnonKey = env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type-safe database interface
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          username: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      phone_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string
          phone_number: string
          country_code: string | null
          formatted_number: string | null
          department: string | null
          role: string | null
          avatar: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name: string
          phone_number: string
          country_code?: string | null
          formatted_number?: string | null
          department?: string | null
          role?: string | null
          avatar?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string
          phone_number?: string
          country_code?: string | null
          formatted_number?: string | null
          department?: string | null
          role?: string | null
          avatar?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
