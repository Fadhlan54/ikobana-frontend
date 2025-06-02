export interface GetAllProductResponse {
  message: string;
  result: Result;
  status: string;
}

export interface Result {
  meta: Meta;
  products: ProductInterface[];
}

export interface Meta {
  limit: number;
  page: number;
  total: number;
  total_page: number;
}

export interface ProductInterface {
  ID: number;
  CreatedAt: string;
  name: string;
  description: string;
  category_id: number;
  stock: number;
  image_url: string;
  weight_per_unit: number;
  price: number;
  category: Category;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  weight: number;
  category: Category;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  category_id: number;
  stock: number;
  weight_per_unit: number;
  price: number;
  image: FileList;
}

export interface CreateProductResponse {
  message: string;
  result: ProductInterface;
  status: string;
}

export interface Category {
  ID: number;
  name: string;
}
