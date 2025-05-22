import { useEffect, useState } from "react";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import {
  deleteProduct,
  fetchProducts,
  selectProducts,
  updateProduct,
} from "./model/products-slice";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { ProductDetail } from "./common/components/ProductDetail/ProductDetail";
import { SearchInput } from "./common/components/SearchInput/SearchInput";
import AddNewProductForm from "./common/components/AddNewProductForm/AddNewProductForm";

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
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Фильтрация товаров по поисковому запросу
  // const filteredProducts = products?.filter(
  //   (product) =>
  //     product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleDeleteProduct = (id: any) => {
    console.log("Удаление товара с ID:", id);
    dispatch(deleteProduct({ id }));
  };

  const handleSaveProduct = (updatedProduct: any) => {
    console.log("editedProduct", updatedProduct);
    dispatch(
      updateProduct({ id: updatedProduct.id, domainModel: updatedProduct })
    );
    setSelectedProduct(updatedProduct);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>CATALOG</h1>

      <SearchInput />

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>form for adding new products</h3>
        <AddNewProductForm />
      </div>

      {/* Список товаров */}
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

      {/* Модальное окно с деталями товара */}
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
