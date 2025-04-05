import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

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
  })
  .actions((store) => ({
    setCurrentUser(user: typeof MOCK_USER) {
      store.currentUser = user
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
  }))
  .actions((store) => ({
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
