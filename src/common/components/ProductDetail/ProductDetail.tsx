import type { ProductType } from "../../../App";

type ProductDetailType = {
  product: ProductType;
  onClose: (value: React.SetStateAction<null>) => void;
};

export const ProductDetail = ({ product, onClose }: ProductDetailType) => {
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
          <strong>Описание:</strong> {product.description}
        </p>
        {/* <p>
          <strong>Продавец:</strong> {product.seller}
        </p> */}
        <button onClick={() => onClose(null)}>Закрыть</button>
      </div>
    </div>
  );
};
