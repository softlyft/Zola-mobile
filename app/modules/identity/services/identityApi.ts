import { supabase } from "@/services/supabase/supabase"

export const identityApi = {
  async getProfile(userId: string): Promise<{ profile: any; error?: string }> {
    try {
      // Get the profile from the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return { profile: null, error: error.message }
      }

      return { profile: data }
    } catch (error) {
      console.error('Error in getProfile:', error)
      return { profile: null, error: String(error) }
    }
  },

  async updateProfile(userId: string, profileData: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    department?: string
    role?: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      // First, update the user metadata in auth.users
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
        }
      })

      if (authError) {
        console.error('Error updating user metadata:', authError)
        return { success: false, error: authError.message }
      }

      // First, check if the profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the error code for "not found"
        console.error('Error fetching profile:', fetchError)
        return { success: false, error: fetchError.message }
      }

      // Prepare the update data based on the existing schema
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      // Only include fields that exist in the schema
      if ('first_name' in (existingProfile || {})) updateData.first_name = profileData.firstName
      if ('last_name' in (existingProfile || {})) updateData.last_name = profileData.lastName
      if ('email' in (existingProfile || {})) updateData.email = profileData.email

      // Store phone in user_metadata if the phone column doesn't exist
      // For department and role, we'll check if they exist in the schema
      if ('department' in (existingProfile || {})) updateData.department = profileData.department
      if ('role' in (existingProfile || {})) updateData.role = profileData.role

      // If the profile doesn't exist, create it
      if (!existingProfile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: userId,
            ...updateData
          })

        if (insertError) {
          console.error('Error creating profile:', insertError)
          return { success: false, error: insertError.message }
        }
      } else {
        // Update the existing profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('user_id', userId)

        if (profileError) {
          console.error('Error updating profile:', profileError)
          return { success: false, error: profileError.message }
        }
      }

      // Error handling is done in the respective if blocks above

      return { success: true }
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return { success: false, error: String(error) }
    }
  },

  async updatePreferences(userId: string, preferences: {
    theme?: string
    notifications?: boolean
    language?: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      // Update the preferences in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)

      if (error) {
        console.error('Error updating preferences:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Error in updatePreferences:', error)
      return { success: false, error: String(error) }
    }
  },

  async searchProfileByPhone(phoneNumber: string): Promise<any | null> {
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
      }
    } catch (error) {
      console.error('Error in searchProfileByPhone:', error)
      return null
    }
  },
}
