import { useState } from "react";
import type { ProductType } from "../../../App";

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedProduct((prev: any) => ({
      ...prev,
      [name]: value,
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
          width: "400px",
        }}
      >
        {isEditing ? (
          <>
            <h2>
              <input
                type="text"
                name="name"
                value={editedProduct.title}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </h2>
            <img
              src={editedProduct.image}
              alt={editedProduct.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <p>
              <strong>Цена:</strong>
              <input
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </p>
            <p>
              <strong>Категория:</strong>
              <select
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                <option value="men's clothing">Мужская одежда</option>
                <option value="women's clothing">Женская одежда</option>
                <option value="electronics">Электроника</option>
                <option value="jewelery">Украшения</option>
              </select>
            </p>
            <p>
              <strong>Описание:</strong>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </p>
            {/* <p>
              <strong>Продавец:</strong>
              <input
                type="text"
                name="seller"
                value={editedProduct.seller}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </p> */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={handleSave}>Сохранить</button>
              <button onClick={() => setIsEditing(false)}>Отменить</button>
            </div>
          </>
        ) : (
          <>
            <h2>{product.title}</h2>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <p>
              <strong>Цена:</strong> {product.price} ₽
            </p>
            <p>
              <strong>Категория:</strong> {product.category}
            </p>
            <p>
              <strong>Описание:</strong> {product.description}
            </p>
            {/* <p>
              <strong>Продавец:</strong> {product.seller}
            </p> */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => setIsEditing(true)}>Редактировать</button>
              <button onClick={onClose}>Закрыть</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
