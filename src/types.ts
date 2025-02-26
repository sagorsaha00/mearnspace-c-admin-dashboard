 
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
  tanent:Tanent
};

export type CreatUserData = {
  id:string;
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
}

export type Tanent = {
  id: number;
  name: string;
  address: string;
};
export type FormDataValue = {
  name:string[],
  value?:string
}

export type ResturantFormDataValue = {
  name:string[],
  value?:string
}