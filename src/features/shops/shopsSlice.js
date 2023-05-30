import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const shopsAdapter = createEntityAdapter();

const initialState = shopsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => "/shops",
      transformResponse: (responseData) => {
        const loadedShops = responseData.map((shop) => {
          return shop;
        });
        // console.log(loadedShops);
        return shopsAdapter.setAll(initialState, loadedShops);
      },
      // providesTags => determines which cached data will be either refetchen or removed from the chache.
      providesTags: (result, error, arg) => [
        { type: "Shop", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Shop", id })),
      ],
    }),
    getShopById: builder.query({
      query: (id) => {
        return `/shops?id=${id}`;
      },
      transformResponse: (responseData) => {
        const loadedShop = responseData.map((shop) => {
          return shop;
        });
        console.log("LoadedShop: " + loadedShop);
        return shopsAdapter.setAll(initialState, loadedShop);
      },
    }),
    getShopsByUserId: builder.query({
      query: (id) => {
        return `/shops?userId=${id}`;
      },
      transformResponse: (responseData) => {
        const loadedShops = responseData.map((shop) => {
          // console.log(shop);
          return shop;
        });
        return shopsAdapter.setAll(initialState, loadedShops);
      },
      // providesTags => determines which cached data will be either refetchen or removed from the chache.
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Shop", id })),
      ],
    }),

    addNewShop: builder.mutation({
      query: (initialShop) => ({
        url: "/shops", // url = baseUrl: "http://localhost:3500" + /shops
        method: "POST", // what would we do with the data in url (PUT, POST, DELETE)
        body: {
          // what would we add,update or delete from url
          ...initialShop,
          userId: Number(initialShop.userId),
        },
      }),
      // invalidatesTags => determines which cached data will be either refetchen or removed from the chache.
      invalidatesTags: [{ type: "Shop", id: "LIST" }],
    }),
    updateShop: builder.mutation({
      query: (initialShop) => ({
        url: `/shops/${initialShop.id}`, // url = baseUrl: "http://localhost:3500" + /shops/id
        method: "PUT", // what would we do with the data in url (PUT, POST, DELETE)
        body: {
          // what would we add,update or delete from url
          ...initialShop,
        },
      }),
      // invalidatesTags => determines which cached data will be either refetchen or removed from the chache.
      invalidatesTags: (result, error, arg) => [{ type: "Shop", id: arg.id }],
    }),
    deleteShop: builder.mutation({
      query: ({ id }) => ({
        url: `/shops/${id}`, // url = baseUrl: "http://localhost:3500" + /shops/id
        method: "DELETE", // what would we do with the data in url (PUT, POST, DELETE)
        body: { id }, // what would we add,update or delete from url
      }),
      // invalidatesTags => determines which cached data will be either refetchen or removed from the chache.
      invalidatesTags: (result, error, arg) => [{ type: "Shop", id: arg.id }],
    }),
  }),
});
export const {
  useGetShopsQuery,
  useGetShopByIdQuery,
  useGetShopsByUserIdQuery,
  useGetShopsByCategoryQuery,
  useAddNewShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = extendedApiSlice;

//returns the query result Object
export const selectShopsResult = extendedApiSlice.endpoints.getShops.select();

// //returns the query result Object
// export const selectShopsResult = extendedApiSlice.endpoints.getShops.select();

//creates memoizen selector
const selectShopsData = createSelector(
  selectShopsResult,
  (shopsResult) => shopsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllShops,
  selectById: selectShopById,
  selectByCat: selectShopByCategory,
  selectIds: selectShopIds,
  // Pass in a selector that returns the shops slice of state
} = shopsAdapter.getSelectors(
  (state) => selectShopsData(state) ?? initialState
);
