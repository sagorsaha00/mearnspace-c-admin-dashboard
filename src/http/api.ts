import { CreatUserData, Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUserdata = (quryString: string) =>
  api.get(`/users?${quryString}`);
export const getAlltanentsdata = () => api.get("/tenents/alltanents");
export const CreateUser = async (user: CreatUserData) => {

  return api.post("/users", user);
};
