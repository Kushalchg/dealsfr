import { GetUserData } from "./userData"
import { GetStoreData } from "./storeData"

export interface UserState {
  user: GetUserData | null
  store: GetStoreData | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}