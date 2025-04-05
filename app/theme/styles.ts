import { ViewStyle, TextStyle, Platform } from "react-native"
import { colors } from "./colors"
import { spacing } from "./spacing"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  // Layout styles
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,
  center: { alignItems: "center", justifyContent: "center" } as ViewStyle,

  // Container styles
  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  } as ViewStyle,

  // Card styles
  card: {
    backgroundColor: colors.card.background,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  } as ViewStyle,

  // Button styles
  button: {
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  } as ViewStyle,

  buttonPrimary: {
    backgroundColor: colors.button.primary,
  } as ViewStyle,

  buttonSecondary: {
    backgroundColor: colors.button.secondary,
  } as ViewStyle,

  // Input styles
  input: {
    backgroundColor: colors.input.background,
    borderWidth: 1,
    borderColor: colors.input.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  } as ViewStyle,

  // Text styles
  textCenter: {
    textAlign: "center",
  } as TextStyle,

  // Toggle styles
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  // Separator styles
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: spacing.sm,
  } as ViewStyle,

  // Gradient container
  gradientContainer: {
    borderRadius: 12,
    overflow: "hidden",
  } as ViewStyle,
}
