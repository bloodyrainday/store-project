import React from "react";
import type { ProductType } from "../../../App";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newProduct.category}
          label="Age"
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
          <MenuItem value={"men's clothing"}>men's clothing</MenuItem>
          <MenuItem value={"women's clothing"}>women's clothing</MenuItem>
          <MenuItem value={"electronics"}>electronics</MenuItem>
          <MenuItem value={"jewelery"}>jewelery</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
