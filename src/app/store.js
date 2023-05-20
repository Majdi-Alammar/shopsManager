import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { apiSliceAuth } from "../features/api/auth/apiSlice";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // [apiSlice.reducerPath] = api it coms from apiSlice.js
    [apiSliceAuth.reducerPath]: apiSliceAuth.reducer,
    auth: authReducer,
  },
  // this middleware mangages cache lifetimes and Expirtion
  // it's requiered when we are using rtk query and api slice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apiSliceAuth.middleware),
  devTools: true,
});
