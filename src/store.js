import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./redux/favoritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});
