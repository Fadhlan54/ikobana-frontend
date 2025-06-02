export interface GetCategoryResponse {
  message: string;
  result: CategoryType[];
  status: string;
}

export interface CreateCategoryResponse {
  message: string;
  result: CategoryType;
  status: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
