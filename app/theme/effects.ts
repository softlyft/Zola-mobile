import { Platform, ViewStyle } from "react-native"
import { colors } from "./colors"

type PlatformShadow = {
  ios: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
  }
  android: {
    elevation: number
  }
}

export const shadows = {
  light: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }) as ViewStyle,
  medium: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  }) as ViewStyle,
  dark: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
  }) as ViewStyle,
} as const

export const gradients = {
  primary: {
    colors: colors.palette.gradient.primary,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  secondary: {
    colors: colors.palette.gradient.secondary,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
} as const

export const applyStyle = {
  shadow: (level: keyof typeof shadows): ViewStyle => shadows[level],
}
