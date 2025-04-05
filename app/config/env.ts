import { Platform } from 'react-native'

/**
 * Environment variables for the app.
 * These should be set in your environment or in a .env file.
 */
export interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  API_URL: string
  // Add other environment variables here
}

/**
 * Default environment variables for development.
 * These values will be used if no environment variables are set.
 */
const DEFAULT_ENV: Env = {
  SUPABASE_URL: 'http://localhost:54321',  // Default Supabase local development URL
  SUPABASE_ANON_KEY: 'your-anon-key',      // Will be overridden by .env
  API_URL: Platform.select({
    ios: 'http://localhost:3000',
    android: 'http://10.0.2.2:3000',
  }) || 'http://localhost:3000', // Provide a default value
}

/**
 * Load environment variables.
 * This will combine the default environment variables with any that are set in the environment.
 */
export function load(): Env {
  // In a real app, you would use a library like react-native-dotenv to load these values
  // For this implementation, we'll hardcode the values from .env
  return {
    ...DEFAULT_ENV,
    SUPABASE_URL: 'https://piwbsqwrcotflpmpafrz.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpd2JzcXdyY290ZmxwbXBhZnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODYyNTYsImV4cCI6MjA1OTQ2MjI1Nn0.bnv1MvgFMW7wQhuuahzHSgtF-8NtWFzFA8IRD0nBiNw',
  }
}
