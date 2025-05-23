import { useState } from "react";
import type { ProductType } from "../../../App";
import Button from "@mui/material/Button";
import styles from "./ProductDetail.module.css";
import { InputField } from "../InputField/InputField";
import { SelectField } from "../SelectField/SelectField";

type ProductDetailType = {
  product: ProductType;
  onClose: (value: any) => void;
  onSave: (
    id: number,
    updatedProduct: Omit<ProductType, "rating" | "id">
  ) => void;
};

export const ProductDetail = ({
  product,
  onClose,
  onSave,
}: ProductDetailType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<
    Omit<ProductType, "rating" | "id">
  >({
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
  });

  const handleSave = () => {
    onSave(product.id, editedProduct);
    setIsEditing(false);
  };

  if (!product) return null;

  return (
    <div className={styles.backGround}>
      <div className={styles.modal}>
        <div>
          {isEditing ? (
            <InputField
              type="text"
              name="title"
              value={editedProduct.title}
              newProduct={editedProduct}
              setNewProduct={setEditedProduct}
            />
          ) : (
            <strong style={{ fontSize: "25px" }}>{product.title}</strong>
          )}
        </div>
        <img
          src={editedProduct.image}
          alt={editedProduct.title}
          className={styles.image}
          style={{ marginTop: "15px" }}
        />
        <div className={styles.inputField}>
          {isEditing ? (
            <InputField
              type="number"
              name="price"
              value={editedProduct.price}
              newProduct={editedProduct}
              setNewProduct={setEditedProduct}
            />
          ) : (
            <>
              <strong>price: </strong>
              {product.price + "$"}{" "}
            </>
          )}
        </div>
        <div className={styles.inputField}>
          {isEditing ? (
            <SelectField
              newProduct={editedProduct}
              setNewProduct={setEditedProduct}
            />
          ) : (
            <>
              <strong>category:</strong> {product.category}
            </>
          )}
        </div>
        <div className={styles.inputField}>
          {isEditing ? (
            <InputField
              type="text"
              name="description"
              value={editedProduct.description}
              newProduct={editedProduct}
              setNewProduct={setEditedProduct}
            />
          ) : (
            <>
              <strong>description: </strong>
              {product.description}
            </>
          )}
        </div>

        <div className={styles.buttonsBox}>
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
      </div>
    </div>
  );
};
