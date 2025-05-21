import type { ProductType } from "../../App";

export type DeleteProductResponse = {
  id: number;
  userId: number;
  products: ProductType[];
};
