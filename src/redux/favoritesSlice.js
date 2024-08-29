import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const repoId = action.payload;
      if (state.includes(repoId)) {
        return state.filter((id) => id !== repoId);
      } else {
        state.push(repoId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
