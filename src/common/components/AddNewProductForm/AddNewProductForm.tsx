import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createProduct } from "../../../model/products-slice";
import type { ProductType } from "../../../App";
import { InputField } from "../InputField/InputField";
import Button from "@mui/material/Button";
import { SelectField } from "../SelectField/SelectField";
import styles from "./AddNewProductForm.module.css";

export const AddNewProductForm = () => {
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
    <div className={styles.wrapper}>
      <form action="" className={styles.form}>
        <InputField
          type="text"
          name="title"
          value={newProduct.title}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          type="number"
          name="price"
          value={newProduct.price}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          type="text"
          name="description"
          value={newProduct.description}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <InputField
          type="text"
          name="image"
          value={newProduct.image}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />

        <SelectField newProduct={newProduct} setNewProduct={setNewProduct} />
        <Button
          variant="contained"
          type="submit"
          onClick={handleAddProduct}
          className={styles.button}
        >
          add new product
        </Button>
      </form>
    </div>
  );
};

export default AddNewProductForm;
