import { data } from "react-router";
import { CreatUserData, Credentials } from "../types";
import { api } from "./client";
export const auth_service = "/api/auth";
export const catalog_service = "/api/catalog";

export const login = (credentials: Credentials) =>
  api.post(`${auth_service}/auth/login`, credentials);
export const self = () => api.get(`${auth_service}/auth/self`);
export const logout = () => api.post(`${auth_service}/auth/logout`);
export const getUserdata = (quryString: string) =>
  api.get(`${auth_service}/users?${quryString}`);
export const getAlltanentsdata = (resturantstring: string) =>
  api.get(`${auth_service}/tenents/alltanents?${resturantstring}`);
export const CreateUser = async (user: CreatUserData) => {
  return api.post(`${auth_service}/users`, user);
};
export const updateUser = async (user: CreatUserData, id: number) => {
  return api.patch(`${auth_service}/users/${id}`, user);
};

//catalog-service-getapi

export const GetAllCatagories = () => api.get(`${catalog_service}/categories`);
export const GetAllProducts = (quryParams: string) =>
  api.get(`${catalog_service}/products?${quryParams}`);
export const GetAllProductstest = () => api.get(`${catalog_service}/products`);
export const PostProductData = (product: FormData) =>
  api.post(`${catalog_service}/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
