import { createClient } from '@supabase/supabase-js'
import { load } from '@/config/env'

const env = load()
const supabaseUrl = env.SUPABASE_URL
const supabaseAnonKey = env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type-safe database interface
export type Database = {
  // Add your database types here
  // Example:
  // public: {
  //   Tables: {
  //     profiles: {
  //       Row: {
  //         id: string
  //         username: string
  //         // ... other fields
  //       }
  //       Insert: {
  //         id: string
  //         username: string
  //         // ... other fields
  //       }
  //       Update: {
  //         id?: string
  //         username?: string
  //         // ... other fields
  //       }
  //     }
  //   }
  // }
}
