import type { ProductType } from "../../App";
import { instance } from "../instance/instance";

export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>("products");
  },
};
