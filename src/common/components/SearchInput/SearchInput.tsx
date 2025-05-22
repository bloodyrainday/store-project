import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProducts, getSingleProduct } from "../../../model/products-slice";
import TextField from "@mui/material/TextField";

type Props = {};

export const SearchInput = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div style={{ margin: "20px 0" }}>
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
            console.log("eee", e.target.value);
          }
        }}
        style={{ width: "300px" }}
      />
    </div>
  );
};
