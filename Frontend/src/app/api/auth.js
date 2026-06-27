import config from "../config";
import axios from "axios";

export async function login({ phone, password }) {
  return await axios.post(
    `${config.apiUrl}/api/auth/login`,
    { phone, password },
    { withCredentials: true },
  );
}

export async function signup(data) {
  return await axios.post(`${config.apiUrl}/api/auth/register`, data, {
    withCredentials: true,
  });
}

export async function getUserProfile() {
  return await axios.get(`${config.apiUrl}/api/auth/profile`, {
    withCredentials: true,
  });
}

export async function updateUserProfile(data) {
  return await axios.put(`${config.apiUrl}/api/auth/profile/update`, data, {
    withCredentials: true,
  });
}

export async function logout() {
  return await axios.post(
    `${config.apiUrl}/api/auth/logout`,
    {},
    { withCredentials: true },
  );
}
