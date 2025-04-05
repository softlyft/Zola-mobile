import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { PhoneProfile } from "../types"
import { identityApi } from "../services/identityApi"

export interface PhoneSearch {
  id: string
  countryCode: string
  phoneNumber: string
  timestamp: Date
}

export const UserModel = types.model("User").props({
  id: types.identifier,
  fullName: types.string,
  role: types.string,
  department: types.string,
  email: types.string,
  avatar: types.maybeNull(types.string),
  joinDate: types.Date,
  employeeId: types.string,
})

export const PhoneProfileModel = types.model("PhoneProfile").props({
  id: types.identifier,
  userId: types.string,
  displayName: types.string,
  phoneNumber: types.string,
  countryCode: types.maybe(types.string),
  formattedNumber: types.maybe(types.string),
  department: types.maybe(types.string),
  role: types.maybe(types.string),
  avatar: types.maybe(types.string),
  email: types.maybe(types.string),
  createdAt: types.Date,
  updatedAt: types.Date,
})

const MOCK_USER = {
  id: "1",
  fullName: "John Doe",
  role: "Senior Software Engineer",
  department: "Engineering",
  email: "john.doe@softlyft.com",
  avatar: "https://i.pravatar.cc/150?u=john",
  joinDate: new Date("2024-01-15"),
  employeeId: "EMP-2024-001",
}

const PhoneSearchModel = types.model("PhoneSearch").props({
  id: types.identifier,
  countryCode: types.string,
  phoneNumber: types.string,
  timestamp: types.Date,
})

export const IdentityStoreModel = types
  .model("IdentityStore")
  .props({
    currentUser: types.maybeNull(UserModel),
    recentPhoneSearches: types.array(PhoneSearchModel),
    lastCallerProfile: types.maybeNull(PhoneProfileModel),
    isSearchingProfile: types.optional(types.boolean, false),
  })
  .actions((store) => ({
    setCurrentUser(user: typeof MOCK_USER) {
      store.currentUser = user
    },
    setLastCallerProfile(profile: PhoneProfile | null) {
      if (profile) {
        store.lastCallerProfile = PhoneProfileModel.create({
          ...profile,
          // Ensure dates are Date objects
          createdAt: profile.createdAt instanceof Date ? profile.createdAt : new Date(profile.createdAt),
          updatedAt: profile.updatedAt instanceof Date ? profile.updatedAt : new Date(profile.updatedAt),
        })
      } else {
        store.lastCallerProfile = null
      }
    },
    setIsSearchingProfile(isSearching: boolean) {
      store.isSearchingProfile = isSearching
    },
    addPhoneSearch(countryCode: string, phoneNumber: string) {
      const newSearch = PhoneSearchModel.create({
        id: String(Date.now()),
        countryCode,
        phoneNumber,
        timestamp: new Date(),
      })

      // Remove duplicates if they exist
      const filtered = store.recentPhoneSearches.filter(
        search => !(search.countryCode === countryCode && search.phoneNumber === phoneNumber)
      )

      // Add new search at the beginning, limit to 5 recent searches
      store.recentPhoneSearches.replace([newSearch, ...filtered.slice(0, 4)])
    }
  }))
  .views((store) => ({
    get hasUser() {
      return !!store.currentUser
    },
    get hasLastCallerProfile() {
      return !!store.lastCallerProfile
    },
  }))
  .actions((store) => ({
    async searchProfileByPhone(phoneNumber: string) {
      try {
        store.setIsSearchingProfile(true)

        // Extract country code and clean the number if needed
        // This is a simple implementation - in a real app, you'd use a library like libphonenumber-js
        let countryCode = ""
        let cleanNumber = phoneNumber

        // Check if the number starts with a + and has a country code
        if (phoneNumber.startsWith('+')) {
          const match = phoneNumber.match(/^\+(\d+)(.*)$/)
          if (match) {
            countryCode = "+" + match[1]
            cleanNumber = match[2]
          }
        }

        // Add the search to recent searches
        store.addPhoneSearch(countryCode || "+1", cleanNumber) // Default to +1 if no country code

        // Search for the profile in Supabase
        const profile = await identityApi.searchProfileByPhone(phoneNumber)
        store.setLastCallerProfile(profile)

        return profile
      } catch (error) {
        console.error('Error searching for profile:', error)
        return null
      } finally {
        store.setIsSearchingProfile(false)
      }
    },
    handleIncomingCall(phoneNumber: string) {
      // This method will be called when a call is detected
      return store.searchProfileByPhone(phoneNumber)
    },
    loadInitialData() {
      store.setCurrentUser(MOCK_USER)

      // Add some mock phone searches
      store.recentPhoneSearches.replace([
        PhoneSearchModel.create({
          id: "1",
          countryCode: "+234",
          phoneNumber: "8012345678",
          timestamp: new Date("2025-04-04T15:30:00"),
        }),
        PhoneSearchModel.create({
          id: "2",
          countryCode: "+1",
          phoneNumber: "2125551234",
          timestamp: new Date("2025-04-04T14:20:00"),
        }),
        PhoneSearchModel.create({
          id: "3",
          countryCode: "+44",
          phoneNumber: "7911123456",
          timestamp: new Date("2025-04-04T12:45:00"),
        }),
      ])
    },
  }))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}

export interface IdentityStore extends Instance<typeof IdentityStoreModel> {}
export interface IdentityStoreSnapshotOut extends SnapshotOut<typeof IdentityStoreModel> {}
export interface IdentityStoreSnapshotIn extends SnapshotIn<typeof IdentityStoreModel> {}
