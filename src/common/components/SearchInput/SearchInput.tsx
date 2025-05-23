import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  fetchProducts,
  getSingleProduct,
} from "../../../products/state/products-slice";
import TextField from "@mui/material/TextField";
import styles from "./SearchInput.module.css";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <TextField
        id="outlined-basic"
        label="look for a product by ID"
        variant="outlined"
        type="number"
        onChange={(e) => {
          if (!e.target.value) {
            dispatch(fetchProducts());
          } else {
            dispatch(getSingleProduct(+e.target.value));
          }
        }}
        className={styles.textField}
      />
    </div>
  );
};
