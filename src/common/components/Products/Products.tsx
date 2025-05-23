import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { deleteProduct, selectProducts } from "../../../model/products-slice";
import { ProductCard } from "../ProductCard/ProductCard";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import styles from "./Products.module.css";
import type { ProductType } from "../../../App";

type ProductsProps = {
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
};

export const Products = ({ setSelectedProduct }: ProductsProps) => {
  const products = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct({ id }));
  };

  return (
    <>
      <h2>CATALOG</h2>
      <div className={styles.wrapper}>
        {products.length === 1 && typeof products[0] === "string" ? (
          <h2>SORRY THERE IS NO PRODUCT WITH SUCH ID!!! :(</h2>
        ) : (
          products?.map((product) => (
            <div key={product.id} className={styles.productCardWrapper}>
              <ProductCard product={product} callback={setSelectedProduct} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product.id);
                }}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};
