import type { ProductType } from "../App";
import { productsApi } from "../common/api/productsApi";
import { createAppSlice } from "../common/utils/createAppSlice";

export const productsSlice = createAppSlice({
  name: "products",
  initialState: [] as ProductType[],
  reducers: (create) => ({
    //async actions
    fetchProducts: create.asyncThunk(
      async (_arg, { rejectWithValue, dispatch }) => {
        try {
          const res = await productsApi.getProducts();

          return { todolists: res.data };
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (_state, action) => {
          // action.payload?.todolists.forEach((tl) => {
          //   state.push({ ...tl, filter: "all", entityStatus: "idle" })
          // })

          return action.payload?.todolists.map((tl) => {
            return { ...tl, filter: "all", entityStatus: "idle" };
          });
        },
      }
    ),
  }),
  // extraReducers: (builder) => {
  //   builder.addCase(clearDataAC, (_state, _action) => {
  //     return [];
  //   });
  // },

  selectors: {
    selectProducts: (state) => state,
  },
});

export const productsReducer = productsSlice.reducer;
export const { fetchProducts } = productsSlice.actions;
export const { selectProducts } = productsSlice.selectors;

// import { createAction } from "@reduxjs/toolkit";
// import type { ProductType } from "../App";

// const initialState: ProductType[] = [];

// export const deleteProductAC = createAction<{ id: number }>(
//   "products/delete_product"
// );

// export const createProductAC = createAction<ProductType>(
//   "products/create_product"
// );

// export type DeleteProductAction = ReturnType<typeof deleteProductAC>;
// export type CreateProductAction = ReturnType<typeof createProductAC>;

// type Actions = DeleteProductAction | CreateProductAction;

// export const productsReducer = (
//   state: ProductType[] = initialState,
//   action: Actions
// ): ProductType[] => {
//   switch (action.type) {
//     case "products/create_product": {
//       return state.filter((product) => product.id !== action.payload.id);
//     }
//     case "products/delete_product": {
//       return state.filter((product) => product.id !== action.payload.id);
//     }
//     default:
//       return state;
//   }
// };
