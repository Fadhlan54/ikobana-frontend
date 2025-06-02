export interface AnalyticsSummaryResponse {
  data: OrdersData;
  message: string;
  status: string;
}

export interface OrdersData {
  total_sales: number;
  total_orders: number;
  avg_order_value: number;
  order_trend: OrderTrend;
}

export interface OrderTrend {
  not_paid: number;
  paid: number;
  processing: number;
  on_delivery: number;
  completed: number;
  canceled: number;
}

export interface RevenueTrendResponse {
  data: RevenueData[];
  message: string;
  status: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface UserStatsResponse {
  data: UserStatsData[];
  message: string;
  status: string;
}

export interface UserStatsData {
  user_id: number;
  user_name: string;
  email: string;
  total_orders: number;
  total_spent: number;
  last_order_at: string;
}
