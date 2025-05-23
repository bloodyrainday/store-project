import type { ProductType } from "../../../App";
import TextField from "@mui/material/TextField";

type InputFieldProps = {
  type: string;
  value: string | number;
  newProduct: Omit<ProductType, "rating" | "id">;
  setNewProduct: React.Dispatch<
    React.SetStateAction<Omit<ProductType, "rating" | "id">>
  >;
  name: string;
};

export const InputField = ({
  newProduct,
  setNewProduct,
  type,
  value,
  name,
}: InputFieldProps) => {
  return (
    <>
      <TextField
        variant="outlined"
        required
        type={type}
        label={name}
        value={value}
        onChange={(e) =>
          setNewProduct({ ...newProduct, [name]: e.target.value })
        }
        style={{ width: "100%" }}
      />
    </>
  );
};
