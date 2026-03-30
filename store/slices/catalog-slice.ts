import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CatalogState = {
  query: string;
  category: string;
};

const initialState: CatalogState = {
  query: "",
  category: "all",
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setQuery, setCategory } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
