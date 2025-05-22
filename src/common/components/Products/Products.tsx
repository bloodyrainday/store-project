import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { deleteProduct, selectProducts } from "../../../model/products-slice";
import { ProductCard } from "../ProductCard/ProductCard";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type ProductsProps = {
  setSelectedProduct: React.Dispatch<React.SetStateAction<null>>;
};

export const Products = ({ setSelectedProduct }: ProductsProps) => {
  const products = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();

  const handleDeleteProduct = (id: any) => {
    console.log("Удаление товара с ID:", id);
    dispatch(deleteProduct({ id }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {products.length === 1 && typeof products[0] === "string" ? (
        <h2>SORRY THERE IS NO PRODUCT WITH SUCH ID!!! :(</h2>
      ) : (
        products?.map((product) => (
          <div key={product.id} style={{ position: "relative" }}>
            <ProductCard product={product} onClick={setSelectedProduct} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProduct(product.id);
              }}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
};
