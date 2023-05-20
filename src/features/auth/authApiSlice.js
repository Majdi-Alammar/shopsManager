import { apiSliceAuth } from "../api/auth/apiSlice";
export const authApiSlice = apiSliceAuth.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useLoginMutation } = authApiSlice;
