import { createClient } from "@supabase/supabase-js"
import { load } from "@/config/env"

const env = load()
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

import type { GeneralApiProblem } from './apiProblem'

/**
 * Manages all requests to the Supabase backend.
 */
export class SupabaseApi {
  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor() {
    // Any initialization if needed
  }

  /**
   * Example method to fetch user profile
   */
  async getUserProfile(userId: string): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      return { kind: "ok", data }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return { kind: "bad-data" }
    }
  }

  /**
   * Example method to update user profile
   */
  async updateUserProfile(userId: string, updates: any): Promise<{ kind: "ok" } | GeneralApiProblem> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)

      if (error) throw error

      return { kind: "ok" }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return { kind: "bad-data" }
    }
  }

  // Add more Supabase-specific API methods here
}

// Singleton instance of the Supabase API for convenience
export const supabaseApi = new SupabaseApi()
