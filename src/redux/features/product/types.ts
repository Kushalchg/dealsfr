export interface ProductItem {
  id: number;
  main_category: number;
  sub_category: number;
  image: string;
  name: string;
  description: string;
  fixed_price_drop: string | number;
  price: string | number;
  discounted_price: string | number;
  store_admin: number;
}

export interface GetProductResponse {
  count: number;
  next: string;
  previous: string;
  results: ProductItem[]
}

//for response of filter Product Response
export interface MainCategory {
  id: number;
  name: string;
}

export interface SearchedProduct {
  id: number;
  name: string;
  price: number;
  main_category: MainCategory;
}

export interface FilterProductResponse {
  message: string;
  data: SearchedProduct[];
}
