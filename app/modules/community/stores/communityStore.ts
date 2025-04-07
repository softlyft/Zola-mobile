import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CommunityStoreModel = types
  .model("CommunityStore")
  .props({
    communities: types.array(types.frozen()),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .views((store) => ({
    get hasCommunities() {
      return store.communities.length > 0
    },
  }))
  .actions((store) => ({
    setCommunities(communities: any[]) {
      store.communities.replace(communities)
    },
    setIsLoading(value: boolean) {
      store.isLoading = value
    },
    setError(value?: string) {
      store.error = value
    },
  }))

export interface CommunityStore extends Instance<typeof CommunityStoreModel> {}
export interface CommunityStoreSnapshot extends SnapshotOut<typeof CommunityStoreModel> {}
