import axios from "axios";
import { useAuthStore } from "../store";
import { auth_service } from "./api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}${auth_service}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orginalerror = error.config;

    if (error.response.status === 401 && !orginalerror._isRetry) {
      try {
        orginalerror._isRetry = true
        const headers = { ...orginalerror.headers };
        await refreshToken();
        return api.request({ ...orginalerror, headers });
      } catch (error) {
        
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
