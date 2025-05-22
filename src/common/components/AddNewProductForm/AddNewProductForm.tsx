import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createProduct } from "../../../model/products-slice";
import { FormInput } from "../FormInput/FormInput";
import type { ProductType } from "../../../App";

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
        <FormInput
          title="title"
          type="text"
          name="title"
          value={newProduct.title}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <FormInput
          title="price"
          type="number"
          name="price"
          value={newProduct.price}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <FormInput
          title="description"
          type="text"
          name="description"
          value={newProduct.description}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <FormInput
          title="image url"
          type="text"
          name="image"
          value={newProduct.image}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />

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
