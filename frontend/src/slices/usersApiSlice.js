import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; // dealing with async request

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    //This is for the server
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
