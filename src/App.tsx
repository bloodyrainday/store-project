import React, { useEffect, useState } from "react";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import axios from "axios";
import { instance } from "./common/instance/instance";

// Компонент детального просмотра товара
const ProductDetail = ({ product, onClose }: any) => {
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
        <h2>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <p>
          <strong>Цена:</strong> {product.price} ₽
        </p>
        <p>
          <strong>Описание:</strong> {product.description}
        </p>
        <p>
          <strong>Продавец:</strong> {product.seller}
        </p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export type ProductType = {
  id: number;
  category: "men's clothing" | "women's clothing" | "electronics" | "jewelery";
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

// Главный компонент приложения
const App = () => {
  // Локальные данные о товарах
  // const products = useSelector<RootState, ProductType[]>(
  //   (state) => state.products
  // );

  const [products, setProducts] = useState<ProductType[] | null>(null);
  useEffect(() => {
    instance.get<ProductType[]>("products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  console.log(products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    seller: "",
  });

  // Фильтрация товаров по поисковому запросу
  const filteredProducts = products?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Заглушки для функций
  const handleAddProduct = () => {
    console.log("Добавление товара:", newProduct);
    // Здесь будет логика добавления
  };

  const handleDeleteProduct = (id: any) => {
    console.log("Удаление товара с ID:", id);
    // Здесь будет логика удаления
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Доска объявлений</h1>

      {/* Поисковая строка */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      {/* Форма добавления нового товара */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>Добавить новый товар</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Название"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Цена"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Описание"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ссылка на изображение"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Продавец"
            value={newProduct.seller}
            onChange={(e) =>
              setNewProduct({ ...newProduct, seller: e.target.value })
            }
          />
          <button onClick={handleAddProduct}>Добавить товар</button>
        </div>
      </div>

      {/* Список товаров */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {filteredProducts?.map((product) => (
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
        ))}
      </div>

      {/* Модальное окно с деталями товара */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default App;
