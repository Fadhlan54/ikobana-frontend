import { setCookie } from "@/utils/cookies";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axios(`${API_URL}/login`, {
    method: "POST",
    data: {
      email,
      password,
    },
  });
  return response.data;
}

export async function register({
  email,
  name,
  password,
  phone,
}: {
  email: string;
  name: string;
  password: string;
  phone: string;
}) {
  const response = await axios(`${API_URL}/register`, {
    method: "POST",
    data: {
      email,
      fullname: name,
      password,
      phone_number: phone,
    },
  });
  return response.data;
}

export async function verifyEmail(token: string) {
  const response = await axios(`${API_URL}/verify-email`, {
    method: "POST",
    data: {
      token,
    },
  });
  return response.data;
}

export async function refreshTokenService(refresh_token: string) {
  const response = await axios.post(`${API_URL}/refresh-token`, {
    refresh_token,
  });

  if (response.status === 200) {
    const accessToken = response.data.result.access_token;
    const refreshToken = response.data.result.refresh_token;
    await setCookie({
      key: "access_token",
      value: accessToken,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    });
    await setCookie({
      key: "refresh_token",
      value: refreshToken,
    });
    return {
      success: true,
      statusCode: response.status,
      result: { access_token: accessToken },
    };
  } else {
    return {
      success: false,
      statusCode: response.status,
      message: response.data.message,
    };
  }
}

export async function requestResetPassword(email: string) {
  const response = await axios.post(`${API_URL}/request-reset-password`, {
    email,
  });
  return response.data;
}

export async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const response = await axios.post(`${API_URL}/reset-password`, {
    token,
    password,
  });
  return response.data;
}
