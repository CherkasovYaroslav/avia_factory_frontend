export type Product = {
  // name: string;
  // category_name: string;
  // price: number;
  id?: number;
  unique_code: string;
  production_date: string; 
  status: string;
  plane_id: number | null;
  order_id: number | null;
  plane_name?: string;
  plane_type?: string;
  plane_price?: number;
  // order_status?: string;
  order_total_price?: number;
};
