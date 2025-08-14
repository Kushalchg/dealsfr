export interface DiscountItem {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  terms_conditions: string;
  // status: 'pending' | string;
  discount_type: 'main' | string;
  discount_percent: string;
  main_category: number;
  sub_category: number;
  // banner: number;
  // layout: number;
  // product: number[];
}
