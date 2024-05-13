import { createSlice } from "@reduxjs/toolkit";

const intitalValue = {
  user: {
    user: null,
    status: false,
  },
  loader: false,
};

export const appSlice = createSlice({
  name: "user",
  initialState: intitalValue,
  reducers: {
    login: (state, action) => {
      state.user = {
        user: action.payload,
        status: true,
      };
    },
    logout: (state) => {
      state.user = {
        user: null,
        status: false,
      };
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { login, logout, setLoader } = appSlice.actions;
export default appSlice.reducer;
