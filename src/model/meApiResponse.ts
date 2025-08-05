import { GetUserData } from "./userData"
import { GetStoreData } from "./store"

export interface MeApiResponse extends GetUserData {
  store?: GetStoreData
}
