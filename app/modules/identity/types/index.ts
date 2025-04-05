export interface Profile {
  id: string
  userId: string
  displayName: string
  bio?: string
  avatar?: string
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  notifications: boolean
  language: string
}

export interface IdentityState {
  profile?: Profile
  isLoading: boolean
  error?: string
}
