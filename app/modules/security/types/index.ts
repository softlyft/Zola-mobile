export interface SecuritySettings {
  id: string
  userId: string
  twoFactorEnabled: boolean
  biometricsEnabled: boolean
  lastSecurityCheck: Date
  passwordLastChanged: Date
  securityQuestions: SecurityQuestion[]
}

export interface SecurityQuestion {
  id: string
  question: string
  answer: string
  createdAt: Date
}

export interface SecurityState {
  settings?: SecuritySettings
  isLoading: boolean
  error?: string
}
