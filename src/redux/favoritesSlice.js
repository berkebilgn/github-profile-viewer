import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const repo = action.payload;
      const index = state.findIndex((r) => r.id === repo.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(repo);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;