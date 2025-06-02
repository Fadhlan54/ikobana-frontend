import apiClient from "./interceptor.service";

export async function getUserProfile() {
  const response = await apiClient.get("/user/profile");

  return response.data;
}

export async function updateUserProfile({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) {
  const response = await apiClient.patch("/user/profile", {
    fullname: name,
    phone_number: phone,
  });

  return response.data;
}

export async function updateUserPassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  const response = await apiClient.patch("/user/profile/password", {
    old_password: oldPassword,
    new_password: newPassword,
  });

  return response.data;
}

export async function getUserAddress() {
  const response = await apiClient.get("/user/profile/addresses");

  return response.data;
}

export async function createUserAddress({
  label,
  city,
  district,
  subDistrict,
  street,
  postalCode,
}: {
  label: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: number;
}) {
  const response = await apiClient.post("/user/profile/addresses", {
    label,
    city,
    district,
    sub_district: subDistrict,
    street,
    postal_code: Number(postalCode),
  });
  return response.data;
}

export async function editUserAddress({
  id,
  label,
  city,
  district,
  subDistrict,
  street,
  postalCode,
}: {
  id: number;
  label: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: number;
}) {
  const response = await apiClient.put(`/user/profile/addresses/${id}`, {
    label,
    city,
    district,
    sub_district: subDistrict,
    street,
    postal_code: Number(postalCode),
  });
  return response.data;
}

export async function deleteUserAddress(id: number) {
  const response = await apiClient.delete(`/user/profile/addresses/${id}`);
  return response.data;
}
