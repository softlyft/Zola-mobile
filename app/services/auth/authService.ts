import { supabase } from '@/services/supabase/supabase'
import { AuthError, Provider, User } from '@supabase/supabase-js'

/**
 * Authentication service for handling user authentication with Supabase
 */
export class AuthService {
  /**
   * Sign in with email and password
   * @param email User's email
   * @param password User's password
   * @returns User data or error
   */
  async signInWithEmail(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { user: data?.user || null, error }
  }

  /**
   * Sign up with email and password
   * @param email User's email
   * @param password User's password
   * @param userData Additional user data
   * @returns User data or error
   */
  async signUpWithEmail(
    email: string,
    password: string,
    userData?: { firstName?: string; lastName?: string; phone?: string }
  ): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData?.firstName,
            last_name: userData?.lastName,
            phone: userData?.phone,
          },
        },
      })

      if (error) {
        return { user: null, error }
      }

      const user = data?.user

      if (user) {
        // Create a profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            first_name: userData?.firstName || null,
            last_name: userData?.lastName || null,
            email: email,
            phone: userData?.phone || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

        if (profileError) {
          console.error('Error creating profile:', profileError)
          // We don't return this error since the user was created successfully
        }
      }

      return { user: user || null, error: null }
    } catch (err) {
      console.error('Error in signUpWithEmail:', err)
      return { user: null, error: err as AuthError }
    }
  }

  /**
   * Sign in with a social provider
   * @param provider Social provider (google, facebook, etc.)
   * @returns Void or error
   */
  async signInWithSocial(provider: Provider): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'zola://auth/callback',
      },
    })

    return { error }
  }

  /**
   * Reset password
   * @param email User's email
   * @returns Void or error
   */
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'zola://auth/reset-password',
    })

    return { error }
  }

  /**
   * Sign out the current user
   * @returns Void or error
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  /**
   * Get the current user
   * @returns Current user or null
   */
  async getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.getUser()
    return { user: data?.user || null, error }
  }

  /**
   * Get the current session
   * @returns Current session or null
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    return { session: data.session, error }
  }

  /**
   * Set up auth state change listener
   * @param callback Function to call when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    const { data } = supabase.auth.onAuthStateChange(callback)
    return data.subscription
  }
}

// Export a singleton instance
export const authService = new AuthService()
