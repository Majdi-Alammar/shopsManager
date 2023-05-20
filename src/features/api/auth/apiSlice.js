import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredententials,
  logOut,
  setCredentials,
} from "../../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include", // to send and get secure cookie from http
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions); // send an query to the api to know the situation of the access token
  console.log(
    "The result of: 'await baseQuery(args, api, extraOptions)'" + result
  );
  if (result?.error?.originalStatus === 403) {
    // 403 means that the access token is expired
    // 401 unauthorized
    console.log("sending refresh token");
    //send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(
      "The result of Refreshing: 'await baseQuery('/refresh', api, extraOptions)'" +
        result
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSliceAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
