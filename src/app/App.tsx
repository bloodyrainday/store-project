import { useEffect, useState } from "react";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { fetchProducts, updateProduct } from "../products/state/products-slice";
import { ProductDetail } from "../common/components/ProductDetail/ProductDetail";
import { SearchInput } from "../common/components/SearchInput/SearchInput";
import AddNewProductForm from "../common/components/AddNewProductForm/AddNewProductForm";
import { Products } from "../products/ui/Products/Products";
import styles from "./App.module.css";

export type ProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const handleSaveProduct = (id: number, updatedProduct: any) => {
    console.log("updatedProduct", updatedProduct);
    dispatch(updateProduct({ id, domainModel: updatedProduct }));
    setSelectedProduct(updatedProduct);
  };

  return (
    <div className={styles.wrapper}>
      <h1>STORE</h1>

      <SearchInput />

      <div className={styles.form}>
        <h3 className={styles.formTitle}>form for adding new products</h3>
        <AddNewProductForm />
      </div>

      <Products setSelectedProduct={setSelectedProduct} />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default App;
