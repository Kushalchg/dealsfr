export interface StoreItem {
  id: number;
  name: string;
  description: string;
  store_type: "DEPT" | string;
  logo: string;
  cover_image: string;
  city: string;
  email: string;
  phone: string;
  website: string;
  welcome_message: string;
  slogan: string;
  owner: number;
}

export interface GetStoreResponse {
  count: number;
  next: string;
  previous: string;
  results: StoreItem[]
}

