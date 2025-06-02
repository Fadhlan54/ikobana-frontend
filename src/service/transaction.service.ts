import { CreateTransactionRequest } from "@/interface/createTransaction";
import axios from "axios";
import apiClient from "./interceptor.service";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

export async function getAllTransactions() {
  const response = await apiClient.get(`/transactions`);
  return response.data;
}

export async function calculateShippingCost({
  destinationPostalCode,
  totalWeight,
  totalProductPrice,
}: {
  destinationPostalCode: number;
  totalWeight: number;
  totalProductPrice: number;
}) {
  const response = await axios.post(`${API_URL}/shipping-cost`, {
    weight: totalWeight,
    destination_postal_code: destinationPostalCode,
    total_product_price: totalProductPrice,
  });

  return response.data;
}

export async function createTransaction(data: CreateTransactionRequest) {
  const response = await apiClient.post(`${API_URL}`, data);

  return response.data;
}

export async function getAllUserTransaction() {
  const response = await apiClient.get(`${API_URL}/user`);

  return response.data;
}

export async function cancelTransaction(transactionID: string) {
  const response = await apiClient.patch(`${API_URL}/cancel/${transactionID}`);

  return response.data;
}

export async function processTransaction(transactionID: string) {
  const response = await apiClient.patch(`${API_URL}/process/${transactionID}`);

  return response.data;
}

export async function deliverTransaction(
  transactionID: string,
  trackingCode?: string
) {
  const response = await apiClient.patch(
    `${API_URL}/deliver-order/${transactionID}`,
    {
      tracking_code: trackingCode || "",
    }
  );

  return response.data;
}

export async function completeTransaction(transactionID: string) {
  const response = await apiClient.patch(
    `${API_URL}/complete/${transactionID}`
  );

  return response.data;
}
