import { createAction } from "@reduxjs/toolkit";
import type { ProductType } from "../App";

const initialState: ProductType[] = [];

export const deleteProductAC = createAction<{ id: number }>(
  "products/delete_product"
);

export type DeleteProductAction = ReturnType<typeof deleteProductAC>;

type Actions = DeleteProductAction;

export const productsReducer = (
  state: ProductType[] = initialState,
  action: Actions
): ProductType[] => {
  switch (action.type) {
    case "products/delete_product": {
      return state.filter((product) => product.id !== action.payload.id);
    }
    default:
      return state;
  }
};
