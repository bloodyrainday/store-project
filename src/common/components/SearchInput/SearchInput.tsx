import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProducts, getSingleProduct } from "../../../model/products-slice";

type Props = {};

export const SearchInput = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="number"
        placeholder="look for a product by ID"
        onChange={(e) => {
          if (!e.target.value) {
            dispatch(fetchProducts());
          } else {
            dispatch(getSingleProduct(+e.target.value));
            console.log("eee", e.target.value);
          }
        }}
        style={{ padding: "8px", width: "300px" }}
      />
    </div>
  );
};
