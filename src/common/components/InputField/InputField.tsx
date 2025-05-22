import type { ProductType } from "../../../App";

type InputFieldProps = {
  title: string;
  type: string;
  value: string | number;
  newProduct: Omit<ProductType, "rating" | "id">;
  setNewProduct: React.Dispatch<
    React.SetStateAction<Omit<ProductType, "rating" | "id">>
  >;
  name: string;
};

export const InputField = ({
  title,
  newProduct,
  setNewProduct,
  type,
  value,
  name,
}: InputFieldProps) => {
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
