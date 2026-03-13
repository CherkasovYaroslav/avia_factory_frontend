export type Product = {
  name: ReactNode;
  category_name: string;
  price: ReactNode;
  stock_quantity: ReactNode;
  id?: number;
  unique_code: string;
  production_date: string; // формат YYYY-MM-DD
  status: string;
  plane_id: number | null;
  order_id: number | null;
  plane_name?: string;
  order_status?: string;
  order_total_price?: number;
};
