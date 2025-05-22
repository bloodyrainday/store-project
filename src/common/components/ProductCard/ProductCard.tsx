// Компонент карточки товара

type ProductCardType = {};

export const ProductCard = ({ product, onClick }: any) => {
  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        cursor: "pointer",
        width: "200px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>price: {product.price} $</p>
    </div>
  );
};
