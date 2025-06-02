import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../utils/cookies";
import { refreshTokenService } from "./auth.service";
import verifyExpireToken from "@/utils/verifyExpireToken";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
  subscribers.push(callback);
};

apiClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const refreshToken = await getCookie("rt");

    if (!refreshToken) {
      //   window.location.href = "/login";
      return config;
    }

    let accessToken = await getCookie("at");

    if (!accessToken || !verifyExpireToken(accessToken)) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResult = await refreshTokenService(refreshToken);

          if (refreshResult.result?.access_token) {
            accessToken = refreshResult.result.access_token as string;
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
            onRefreshed(accessToken);
          } else {
            window.location.href = "/";
            return Promise.reject(new Error("Failed to refresh access token"));
          }
        } catch (error) {
          console.error("Error during token refresh:", error);
          //   window.location.href = "/login";
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise<InternalAxiosRequestConfig>((resolve) => {
          addSubscriber((newToken: string) => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
    } else {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
