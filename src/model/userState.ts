import { GetUserData } from "./userData"
import { GetStoreData } from "./store"

export interface UserState {
  user: GetUserData | null
  stores: GetStoreData[]
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}