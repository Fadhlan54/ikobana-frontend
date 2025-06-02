export interface GetTransactionUserResponse {
  message: string;
  result: UserTransactionsData[];
  status: string;
}

export interface UserTransactionData {
  id: string;
  user_id: number;
  status: string;
  status_message: string;
  payment_method: string;
  total_product_price: number;
  total_weight: number;
  total_price: number;
  payment_url: string;
  items: UserTransactionItems[];
  created_at: string;
  updated_at: string;
  shipping_data: ShippingData;
}

export interface ShippingData {
  courier: string;
  shipping_cost: number;
  service_name: string;
  tracking_code: string;
}

export interface UserTransactionItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  transaction_id: string;
  product_id: number;
  quantity: number;
  product_price: number;
  product: Product;
}

export interface Product {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  name: string;
  description: string;
  category_id: number;
  stock: number;
  image_url: string;
  weight_per_unit: number;
  price: number;
  category: Category;
}

export interface Category {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  name: string;
}
