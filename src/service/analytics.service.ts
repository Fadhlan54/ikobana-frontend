import apiClient from "./interceptor.service";

export async function GetAnalyticsSummary() {
  const response = await apiClient.get("/analytics/summary");

  return response.data;
}

export async function GetRevenueTrend() {
  const response = await apiClient.get("/analytics/revenue-trend");

  return response.data;
}

export async function GetCustomerStats() {
  const response = await apiClient.get("/analytics/customer-stats");

  return response.data;
}
