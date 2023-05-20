import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();
const currUserAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();
const initialCurrUserState = currUserAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
    getUserByUserNameAndPassword: builder.query({
      query: ({ username, pwd }) => {
        return `/users?username=${username}&&password=${pwd}`;
        // return `/users?username=M&&password=M`;
      },
      transformResponse: (responseData) => {
        const user = responseData;
        return currUserAdapter.setAll(initialCurrUserState, user);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByUserNameAndPasswordQuery } =
  usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
// console.log(selectAllUsers);
