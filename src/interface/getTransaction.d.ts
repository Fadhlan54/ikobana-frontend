export interface GetTransactionResponse {
  message: string;
  result: Result;
  status: string;
}

export interface Result {
  meta: Meta;
  transactions: GetTransactionData[];
}

export interface Meta {
  limit: number;
  page: number;
  total: number;
  total_page: number;
}

export interface GetTransactionData {
  id: string;
  status: string;
  status_message: string;
  payment_method: string;
  total_product_price: number;
  total_weight: number;
  total_price: number;
  shipping_provider: ShippingProvider;
  payment_url: string;
  destination: Destination;
  user: User;
  items: TransactionItem[];
  created_at: string;
  updated_at: string;
}

export interface ShippingProvider {
  code: string;
  courier: string;
  service_type: string;
  tracking_code: string;
  shipping_cost: number;
}

export interface TransactionItem {
  product_id: number;
  product_name: string;
  quantity: number;
  product_price: number;
}

export interface Destination {
  street: string;
  sub_district: string;
  district: string;
  city: string;
  postal_code: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}
