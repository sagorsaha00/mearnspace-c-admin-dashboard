export type Credentials = {
  email: string;
  password: string;
};

export type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  tanent: Tanent;
};

export type CreatUserData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  tanentId: number;
};
export type CreateResutantData = {
  perPage: number;
  currentPage: number;
  name: string;
  address: string;
};

export type Tanent = {
  id: number;
  name: string;
  address: string;
};
export type FormDataValue = {
  name: string[];
  value?: string;
};

export type ResturantFormDataValue = {
  name: string[];
  value?: string;
};

export type ResturantType = {
  _id: string;
  name: string;
};

export interface priceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}
export interface Attributes {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface Category {
  id: string;
  name: string;
  priceConfiguration: priceConfiguration;
  attributes: Attributes[];
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  categories: Category;
  isPublish: boolean;
  createdAt: string;
};

export type CreateProductImage = {
  image: { file: File }
  _id: string;
  name: string;
 
  description: string;
  categories: Category;
  isPublish: boolean;
  createdAt: string;
}
