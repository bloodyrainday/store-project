import Paper from "@mui/material/Paper";
import styles from "./ProductCard.module.css";
import type { ProductType } from "../../../App";

type ProductCardType = {
  product: ProductType;
  callback: React.Dispatch<React.SetStateAction<ProductType | null>>;
};

export const ProductCard = ({ product, callback }: ProductCardType) => {
  return (
    <Paper
      elevation={3}
      className={styles.procuctCard}
      onClick={() => callback(product)}
    >
      <img src={product.image} alt={product.title} className={styles.image} />
      <h4>{product.title}</h4>
      <p>
        <strong>price:</strong> {product.price} $
      </p>
    </Paper>
  );
};
