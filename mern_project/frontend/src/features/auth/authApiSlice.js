import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
            })
        }),
        sendLogout: builder.mutation({ 
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut()); // perform this action
                    dispatch(apiSlice.util.resetApiState); // clears out the cache and everything to do with apiSlice
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLoginMutation, 
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice;