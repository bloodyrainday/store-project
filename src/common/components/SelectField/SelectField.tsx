import React from "react";
import type { ProductType } from "../../../App";

type SelectFieldProps = {
  newProduct: Omit<ProductType, "rating" | "id">;
  setNewProduct: React.Dispatch<
    React.SetStateAction<Omit<ProductType, "rating" | "id">>
  >;
};

export const SelectField = ({
  newProduct,
  setNewProduct,
}: SelectFieldProps) => {
  return (
    <>
      <label htmlFor="">category</label>
      <select
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            category: e.target.value as
              | "men's clothing"
              | "women's clothing"
              | "electronics"
              | "jewelery",
          })
        }
      >
        <option value="men's clothing">men's clothing</option>
        <option value="women's clothing">women's clothing</option>
        <option value="electronics">electronics</option>
        <option value="jewelery">jewelery</option>
      </select>
    </>
  );
};
