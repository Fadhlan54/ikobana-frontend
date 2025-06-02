export interface Address {
  id: number;
  label: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: number;
}

export interface CreateAddressResponse {
  message: string;
  result: AddressResponse;
  status: string;
}

export interface AddressResponse {
  id: number;
  label: string;
  city: string;
  district: string;
  sub_district: string;
  street: string;
  postal_code: number;
}
