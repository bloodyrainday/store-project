import type { ProductType } from "../../../App";

type FormInputProps = {
  title: string;
  type: string;
  value: string | number;
  newProduct: Omit<ProductType, "rating" | "id">;
  setNewProduct: React.Dispatch<
    React.SetStateAction<Omit<ProductType, "rating" | "id">>
  >;
  name: string;
};

export const FormInput = ({
  title,
  newProduct,
  setNewProduct,
  type,
  value,
  name,
}: FormInputProps) => {
  return (
    <>
      <label htmlFor="">{title}</label>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={(e) =>
          setNewProduct({ ...newProduct, [name]: e.target.value })
        }
      />
    </>
  );
};
