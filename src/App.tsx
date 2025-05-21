import { useEffect, useState } from "react";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import {
  deleteProduct,
  fetchProducts,
  selectProducts,
} from "./model/products-slice";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { ProductDetail } from "./common/components/ProductDetail/ProductDetail";

export type ProductType = {
  id: number;
  category: "men's clothing" | "women's clothing" | "electronics" | "jewelery";
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

const App = () => {
  // Локальные данные о товарах
  // const products = useSelector<RootState, ProductType[]>(
  //   (state) => state.products
  // );
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  //const [products, setProducts] = useState<ProductType[] | null>(null);
  useEffect(() => {
    // instance.get<ProductType[]>("products").then((res) => {
    //   setProducts(res.data);
    // });
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
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
    dispatch(deleteProduct({ id }));
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
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Цена"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: +e.target.value })
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
          {/* <input
            type="text"
            placeholder="Продавец"
            value={newProduct.seller}
            onChange={(e) =>
              setNewProduct({ ...newProduct, seller: e.target.value })
            }
          /> */}
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
