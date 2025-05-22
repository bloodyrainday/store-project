import { useState, type ChangeEvent } from "react";
import type { ProductType } from "../../../App";
import Button from "@mui/material/Button";

type ProductDetailType = {
  product: ProductType;
  onClose: (value: any) => void;
  onSave: (updatedProduct: any) => void;
};

export const ProductDetail = ({
  product,
  onClose,
  onSave,
}: ProductDetailType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev: ProductType) => ({
      ...prev,
      [name]: name === "price" ? +value : value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    setIsEditing(false);
  };

  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "50%",
          height: "80vh",
        }}
      >
        <>
          <h2>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            ) : (
              product.title
            )}
          </h2>
          <img
            src={editedProduct.image}
            alt={editedProduct.title}
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
          />
          <p>
            <strong>price: </strong>
            {isEditing ? (
              <input
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            ) : (
              product.price + "$"
            )}
          </p>
          <p>
            <strong>category: </strong>
            {isEditing ? (
              <select
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
              </select>
            ) : (
              product.category
            )}
          </p>
          <p>
            <strong>description: </strong>
            {isEditing ? (
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            ) : (
              product.description
            )}
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {isEditing ? (
              <Button variant="contained" color="success" onClick={handleSave}>
                save
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                edit
              </Button>
            )}

            {isEditing ? (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsEditing(false)}
              >
                cancel
              </Button>
            ) : (
              <Button variant="outlined" onClick={onClose}>
                close
              </Button>
            )}
          </div>
        </>
      </div>
    </div>
  );
};
