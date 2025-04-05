import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { authService } from "@/services/auth/authService"
import { Provider } from "@supabase/supabase-js"

export const UserModel = types.model("User").props({
  id: types.identifier,
  email: types.maybe(types.string),
  firstName: types.maybe(types.string),
  lastName: types.maybe(types.string),
  avatar: types.maybe(types.string),
  phone: types.maybe(types.string),
})

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: types.optional(types.string, ""),
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    user: types.maybe(UserModel),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
    get passwordValidationError() {
      if (store.authPassword.length === 0) return "can't be blank"
      if (store.authPassword.length < 6) return "must be at least 6 characters"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value
    },
    setFirstName(value: string) {
      store.firstName = value
    },
    setLastName(value: string) {
      store.lastName = value
    },
    setPhone(value: string) {
      store.phone = value
    },
    setUser(user: any) {
      if (user) {
        store.user = {
          id: user.id,
          email: user.email,
          firstName: user.user_metadata?.first_name,
          lastName: user.user_metadata?.last_name,
          avatar: user.user_metadata?.avatar_url,
          phone: user.user_metadata?.phone,
        }
      } else {
        store.user = undefined
      }
    },
    setError(message: string | undefined) {
      store.error = message
    },
    setIsLoading(value: boolean) {
      store.isLoading = value
    },
    reset() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      store.firstName = ""
      store.lastName = ""
      store.phone = ""
      store.user = undefined
      store.error = undefined
      store.isLoading = false
    },
  }))
  .actions((store) => ({
    loginWithEmail: flow(function* () {
      try {
        store.setIsLoading(true)
        store.setError(undefined)

        const { user, error } = yield authService.signInWithEmail(store.authEmail, store.authPassword)

        if (error) {
          store.setError(error.message)
          return false
        }

        if (user) {
          store.setUser(user)
          store.setAuthToken(user.id)
          return true
        }

        return false
      } catch (error) {
        store.setError(String(error))
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),

    signUpWithEmail: flow(function* () {
      try {
        store.setIsLoading(true)
        store.setError(undefined)

        const userData = {
          firstName: store.firstName,
          lastName: store.lastName,
          phone: store.phone,
        }

        const { user, error } = yield authService.signUpWithEmail(
          store.authEmail,
          store.authPassword,
          userData
        )

        if (error) {
          store.setError(error.message)
          return false
        }

        if (user) {
          store.setUser(user)
          store.setAuthToken(user.id)
          return true
        }

        return false
      } catch (error) {
        store.setError(String(error))
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),

    loginWithSocial: flow(function* (provider: Provider) {
      try {
        store.setIsLoading(true)
        store.setError(undefined)

        const { error } = yield authService.signInWithSocial(provider)

        if (error) {
          store.setError(error.message)
          return false
        }

        return true
      } catch (error) {
        store.setError(String(error))
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),

    resetPassword: flow(function* (email: string) {
      try {
        store.setIsLoading(true)
        store.setError(undefined)

        const { error } = yield authService.resetPassword(email)

        if (error) {
          store.setError(error.message)
          return false
        }

        return true
      } catch (error) {
        store.setError(String(error))
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),

    logout: flow(function* () {
      try {
        store.setIsLoading(true)

        const { error } = yield authService.signOut()

        if (error) {
          store.setError(error.message)
          return false
        }

        store.reset()
        return true
      } catch (error) {
        store.setError(String(error))
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),

    checkAuth: flow(function* () {
      try {
        store.setIsLoading(true)

        const { user, error } = yield authService.getCurrentUser()

        if (error || !user) {
          store.reset()
          return false
        }

        store.setUser(user)
        store.setAuthToken(user.id)
        return true
      } catch (error) {
        store.reset()
        return false
      } finally {
        store.setIsLoading(false)
      }
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
