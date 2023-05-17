import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// since we'll have many endpoints, initialise an empty api service that
// can be injected to from other files as needed
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes: ["Note", "User"],
    endpoints: builder => ({})
});