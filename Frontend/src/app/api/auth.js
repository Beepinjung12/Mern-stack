import config from "../config";
import axios from "axios";

export async function login({ email, password }) {
  return await axios.post(`${config.apiUrl}/api/auth/login`, {
    email,
    password,
  });
}

export async function registerUser({
  name,
  email,
  password,
  confirmPassword,
}) {
  return await axios.post(`${config.apiUrl}/api/auth/register`, {
    name,
    email,
    password,
    confirmPassword,
  });
}

export default {
  login,
  registerUser,
};