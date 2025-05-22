import type { ProductType } from "../../App";
import { instance } from "../instance/instance";

export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>("products");
  },
  deleteProduct(id: number) {
    return instance.delete<ProductType>(`products/${id}`);
  },
  createProduct(body: Omit<ProductType, "rating" | "id">) {
    return instance.post<Omit<ProductType, "rating">>("products", body);
  },
  updateProduct(id: number, body: Omit<ProductType, "rating">) {
    return instance.put<Omit<ProductType, "rating">>(`products/${id}`, body);
  },
};
