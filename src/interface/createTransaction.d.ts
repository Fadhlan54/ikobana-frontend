export interface CreateTransactionRequest {
  products: ProductItemData[];
  destination: AddressData;
  shipping: ShippingData;
}

interface AddressData {
  city: string;
  district: string;
  sub_district: string;
  street: string;
  postal_code: number;
}

interface ProductItemData {
  product_id: number;
  quantity: number;
}

interface ShippingData {
  courier: string;
  service_type: string;
}

export interface CreateTransactionResponse {
  message: string;
  result: Result;
  status: string;
}

export interface Result {
  id: string;
  status: string;
  payment_method: string;
  total_product_price: number;
  shipping_cost: number;
  total_weight: number;
  total_price: number;
  payment: Payment;
  destination: Destination;
  items: Item[];
}

export interface Payment {
  url: string;
  token: string;
}

export interface Destination {
  street: string;
  sub_district: string;
  district: string;
  city: string;
  postal_code: number;
}

export interface Item {
  product_id: number;
  product_name: string;
  quantity: number;
  product_price: number;
}
