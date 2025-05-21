import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../model/products-slice";

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  products: productsReducer,
});

// создание store
export const store = configureStore({
  reducer: rootReducer,
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
