import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  count: 0,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    onLoading: (state) => {
      state.count++;
      state.isLoading = true;
    },
    offLoading: (state) => {
      state.count--;
      if (state.count === 0) {
        state.isLoading = false;
      }
    },
  },
});

export const { onLoading, offLoading } = spinnerSlice.actions;
export default spinnerSlice.reducer;
