export interface Post {
  id: string
  content: string
  author: User
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: Date
}

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface CommunityState {
  posts: Post[]
  isLoading: boolean
  error?: string
}
