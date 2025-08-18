//types used in request

export interface CreateDiscountPayload {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  discount_type: "main" | "secondary" | "special";
  discount_percent: string;
  banner: string;
  layout: string;
}

export interface UpdateDiscountPayload {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  discount_type: "main" | "secondary" | "special";
  discount_percent: string;
  banner: string;
  layout: string;
}

// types that are used in response
export interface Tag {
  id: number;
  name: string;
}
export interface DiscountItem {
  id: number;
  // store: Store;
  tags: Tag[];
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  terms_conditions: string;
  status: "pending" | "active" | "expired";
  is_active: boolean;
  created_at: string;
  updated_at: string;
  discount_type: string;
  discount_percent: string | number;
  main_category: number;
  sub_category: number;
  banner: number;
  layout: number;
  product: number[];
}

export interface GetDiscountResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DiscountItem[];
}
