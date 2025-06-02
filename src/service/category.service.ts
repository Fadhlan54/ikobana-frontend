import axios from "axios";
import apiClient from "./interceptor.service";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
const CATEGORIES_URL = "/categories";

export async function getAllCategories() {
  const response = await axios.get(`${API_URL}`);
  return response.data;
}

export async function createCategory(name: string) {
  const response = await apiClient.post(`${CATEGORIES_URL}`, { name });
  return response.data;
}

export async function updateCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const response = await apiClient.put(`${CATEGORIES_URL}/${id}`, { name });
  return response.data;
}

export async function deleteCategory(id: number) {
  const response = await apiClient.delete(`${CATEGORIES_URL}/${id}`);
  return response.data;
}
