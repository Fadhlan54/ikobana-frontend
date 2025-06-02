import { CreateProductRequest } from "@/interface/product";
import axios from "axios";
import apiClient from "./interceptor.service";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const PRODUCT_URL = "/products";

export async function getAllProducts({
  page = 1,
  limit = 10,
  search,
  categoryIDs,
  minPrice,
  maxPrice,
  sort,
  productIDs,
}: {
  page?: number;
  limit?: number;
  search?: string;
  categoryIDs?: number[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  productIDs?: number[];
}) {
  const params = {
    page,
    limit,
    ...(search && { search }),
    ...(categoryIDs && categoryIDs.length && { category_ids: categoryIDs }),
    ...(minPrice && { min_price: minPrice }),
    ...(maxPrice && { max_price: maxPrice }),
    ...(sort && { sort }),
    ...(productIDs && productIDs.length && { product_ids: productIDs }),
  };
  const response = await axios.get(API_URL, { params });
  return response.data;
}

export async function getProductByID(id: number) {
  const response = await apiClient.get(`${PRODUCT_URL}/${id}`);
  return response.data;
}

export async function createProduct(data: CreateProductRequest) {
  const formData = new FormData();
  console.log("create product");
  console.log(data);
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("category_id", data.category_id.toString());
  formData.append("stock", data.stock.toString());
  formData.append("weight_per_unit", data.weight_per_unit.toString());
  formData.append("price", data.price.toString());
  formData.append("image", data.image[0]);
  const response = await apiClient.post(PRODUCT_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateProduct(id: number, data: CreateProductRequest) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("category_id", data.category_id.toString());
  formData.append("stock", data.stock.toString());
  formData.append("weight_per_unit", data.weight_per_unit.toString());
  formData.append("price", data.price.toString());
  console.log(data.image);
  if (data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
  const response = await apiClient.put(`${PRODUCT_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteProduct(id: number) {
  const response = await apiClient.delete(`${PRODUCT_URL}/${id}`);
  return response.data;
}
