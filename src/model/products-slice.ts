import type { ProductType } from "../App";
import type { RootState } from "../app/store";
import { productsApi } from "../common/api/productsApi";
import { createAppSlice } from "../common/utils/createAppSlice";

export const productsSlice = createAppSlice({
  name: "products",
  initialState: [] as ProductType[],
  reducers: (create) => ({
    //async actions
    fetchProducts: create.asyncThunk(
      async (_arg, { rejectWithValue }) => {
        try {
          const res = await productsApi.getProducts();
          console.log("reeees", res.data);
          return { products: res.data };
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (_state, action) => {
          // action.payload?.todolists.forEach((tl) => {
          //   state.push({ ...tl, filter: "all", entityStatus: "idle" })
          // })

          return action.payload?.products;
        },
      }
    ),
    deleteProduct: create.asyncThunk(
      async (arg: { id: number }, { rejectWithValue }) => {
        try {
          const res = await productsApi.deleteProduct(arg.id);
          console.log("delete", res.data);
          return { id: arg.id };
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((s) => s.id === action.payload.id);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      }
    ),
    createProduct: create.asyncThunk(
      async (
        newProduct: Omit<ProductType, "rating" | "id">,

        { rejectWithValue }
      ) => {
        try {
          const res = await productsApi.createProduct(newProduct);
          console.log("create", res.data);
          return { product: res.data };
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({
            ...action.payload.product,
            rating: { rate: 0, count: 1 },
          });
        },
      }
    ),

    updateProduct: create.asyncThunk(
      async (
        args: { id: number; domainModel: Partial<ProductType> },

        { rejectWithValue, getState }
      ) => {
        try {
          const state = getState() as RootState;
          const product = state.products.find((p) => p.id === args.id);

          if (product) {
            const model: Omit<ProductType, "rating"> = {
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image,
            };

            const res = await productsApi.updateProduct(args.id, {
              ...model,
              ...args.domainModel,
            });
            console.log("update", res.data);
            return { product: res.data };
          }
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          let index = state.findIndex(
            (s) => s.id === action.payload?.product.id
          );

          if (index !== -1) {
            state[index] = { ...state[index], ...action.payload?.product };
          }
        },
      }
    ),
    getSingleProduct: create.asyncThunk(
      async (id: number, { rejectWithValue }) => {
        try {
          const res = await productsApi.getSingleProduct(id);
          console.log("get single product", res.data);
          return { product: res.data };
        } catch (err: any) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (_state, action) => {
          return [action.payload.product];
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
export const {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getSingleProduct,
} = productsSlice.actions;
export const { selectProducts } = productsSlice.selectors;
