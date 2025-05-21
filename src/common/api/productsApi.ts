import type { ProductType } from "../../App";
import { instance } from "../instance/instance";
import type { DeleteProductResponse } from "./productsApi.types";

export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>("products");
  },
  deleteProduct(id: number) {
    return instance.delete<DeleteProductResponse>(`products/${id}`);
  },
};
