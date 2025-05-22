import Paper from "@mui/material/Paper";

type ProductCardType = {};

export const ProductCard = ({ product, onClick }: any) => {
  return (
    <Paper
      elevation={3}
      className="product-card"
      onClick={() => onClick(product)}
      style={{
        padding: "16px",
        margin: "10px",
        cursor: "pointer",
        width: "250px",
        height: "300px",
        borderRadius: "8px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "120px", objectFit: "contain" }}
      />
      <h3>{product.name}</h3>
      <h4>{product.title}</h4>
      <p>{product.price} $</p>
    </Paper>
  );
};
