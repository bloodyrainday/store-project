import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createProduct } from "../../../model/products-slice";

type Props = {};

export const AddNewProductForm = (props: Props) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "men's clothing",
  });

  const dispatch = useAppDispatch();

  const handleAddProduct = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Добавление товара:", newProduct);
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
        <label htmlFor="">title</label>
        <input
          required
          type="text"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <label htmlFor="">price</label>
        <input
          required
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: +e.target.value })
          }
        />
        <label htmlFor="">description</label>
        <input
          required
          type="text"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <label htmlFor="">image link</label>
        <input
          required
          type="text"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
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
          onSubmit={handleAddProduct}
          style={{ marginTop: "15px" }}
        >
          add new product
        </button>
      </form>
    </div>
  );
};

export default AddNewProductForm;
