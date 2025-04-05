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

export interface PhoneProfile {
  id: string
  userId: string
  displayName: string
  phoneNumber: string
  countryCode?: string
  formattedNumber?: string
  department?: string
  role?: string
  avatar?: string
  email?: string
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
