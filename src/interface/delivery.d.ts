export interface CheckShippingCostResponse {
  message: string;
  result: DeliveryOptionsData;
  status: string;
}

export interface Result {
  meta: Meta;
  data: DeliveryOptionsData;
}

export interface Meta {
  message: string;
  code: number;
  status: string;
}

export interface DeliveryOptionsData {
  calculate_reguler: DeliveryDetails[] | null;
  calculate_cargo: DeliveryDetails[] | null;
  calculate_instant: DeliveryDetails[] | null;
}

export interface DeliveryDetails {
  shipping_name: string;
  service_name: string;
  weight: number;
  is_cod: boolean;
  shipping_cost: number;
  shipping_cashback: number;
  shipping_cost_net: number;
  grandtotal: number;
  service_fee: number;
  net_income: number;
  etd: string;
}

export interface DeliveryData {
  courier: string;
  service: string;
  cost: number;
}
