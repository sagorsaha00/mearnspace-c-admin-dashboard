import { CreateProductImage } from "../../types";

const postData = (data: CreateProductImage) => {
  const fromdata = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "image" && typeof value === "object" && "file" in value) {
      fromdata.append(key, value.file);
    } else if (key === "priceConfiguration") {
      fromdata.append(key, JSON.stringify(value));
    } else if (key === "attributes") {
      fromdata.append(key, JSON.stringify(value));
    } else fromdata.append(key, value as string);
  });
};
