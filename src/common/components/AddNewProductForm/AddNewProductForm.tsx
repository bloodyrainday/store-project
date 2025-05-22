import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createProduct } from "../../../model/products-slice";
import type { ProductType } from "../../../App";
import { InputField } from "../InputField/InputField";
import { SelectField } from "../SelectField/SelectField";

type Props = {};

export const AddNewProductForm = (props: Props) => {
  const [newProduct, setNewProduct] = useState<
    Omit<ProductType, "rating" | "id">
  >({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "men's clothing",
  });

  const dispatch = useAppDispatch();

  const handleAddProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(newProduct);
    dispatch(createProduct(newProduct));
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "men's clothing",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "50%",
        }}
      >
        <InputField
          title="title"
          type="text"
          name="title"
          value={newProduct.title}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          title="price"
          type="number"
          name="price"
          value={newProduct.price}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          title="description"
          type="text"
          name="description"
          value={newProduct.description}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          title="image url"
          type="text"
          name="image"
          value={newProduct.image}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />

        <SelectField newProduct={newProduct} setNewProduct={setNewProduct} />
        <button
          type="submit"
          onClick={handleAddProduct}
          style={{ marginTop: "15px" }}
        >
          add new product
        </button>
      </form>
    </div>
  );
};

export default AddNewProductForm;
