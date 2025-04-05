import { supabase } from "@/services/supabase"
import type { Profile, UserPreferences, PhoneProfile } from "../types"

export const identityApi = {
  async getProfile(): Promise<Profile> {
    // Implement profile fetching logic
    return {} as Profile
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    // Implement profile update logic
    return {} as Profile
  },

  async updatePreferences(preferences: UserPreferences): Promise<void> {
    // Implement preferences update logic
  },

  async searchProfileByPhone(phoneNumber: string): Promise<PhoneProfile | null> {
    try {
      // Remove any non-digit characters from the phone number
      const cleanedNumber = phoneNumber.replace(/\D/g, '')

      // Search for profiles with this phone number
      const { data, error } = await supabase
        .from('phone_profiles')
        .select('*')
        .eq('phoneNumber', cleanedNumber)
        .single()

      if (error) {
        console.error('Error searching for profile by phone:', error)
        return null
      }

      if (!data) return null

      // Convert the dates from strings to Date objects
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      } as PhoneProfile
    } catch (error) {
      console.error('Error in searchProfileByPhone:', error)
      return null
    }
  },
}
