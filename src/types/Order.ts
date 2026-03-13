import type { Client } from "./Client";

export type Order = {
  id?: number;
  total_price: number;
  date: string;       // формат YYYY-MM-DD
  status: string;
  client_id: number | null;

  // Для удобного отображения связанных данных
  client_name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
};
