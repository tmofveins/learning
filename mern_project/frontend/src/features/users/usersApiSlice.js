import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                // maps the _id field to id instead so it aligns with mongo model
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user
                });
                // updates entities field in adapter state
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({type: "User", id }))
                    ];
                } else {
                    return [{ type: "User", id: "LIST" }];
                }
            },
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns result of the getusers query (part of the global state)
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// selector functions take a specific piece of state from the global state object
// and return a value (which is memoised)
// i.e. a particular state is cached, and will always return the same value
// this prevents expensive operations
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data,
)

// getSelectos automatically creates the functions on the left,
// we rename it to the aliases on the right using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // using the selectUsersData selector created earlier, extract the user data
    // from the global state. return initialstate if null
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);