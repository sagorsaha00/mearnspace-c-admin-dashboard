import { CreateProductImage } from "../../types";

export const formDataToJson = (data: CreateProductImage) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "image" && value instanceof File) {
      formData.append(key, value);
    } else if (key === "priceConfiguration" || key === "attributes") {
      formData.append(key, JSON.stringify(value));
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      formData.append(key, String(value));
    }
  });

  return formData;
};
