import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => "/notes",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: responseData => {
                // maps the _id field to id instead so it aligns with mongo model
                const loadedNotes = responseData.map(note => {
                    note.id = note._id;
                    return note
                });
                // updates entities field in adapter state
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "LIST" },
                        ...result.ids.map(id => ({type: "Note", id }))
                    ];
                } else {
                    return [{ type: "Note", id: "LIST" }];
                }
            },
        }),
        addNewNote: builder.mutation({
            query: initialNoteData => ({
                url: "/notes",
                method: "POST",
                body: {
                    ...initialNoteData,
                }
            }),
            // force the cache to update, we invalidate the user list
            invalidatesTags: [
                { type: "Note", id: "LIST" }
            ],
        }),
        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: "/notes",
                method: "PATCH",
                body: {
                    ...initialNoteData,
                }
            }),
            // only invalidate a specific user
            invalidatesTags: (result, error, arg) => [
                { type: "Note", id: arg.id }
            ],
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/notes`,
                method: "DELETE",
                body: { id } 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Note", id: arg.id }
            ],
        }),
    }),
});

export const { 
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice;

// returns result of the getnotes query (part of the global state)
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// selector functions take a specific piece of state from the global state object
// and return a value (which is memoised)
// i.e. a particular state is cached, and will always return the same value
// this prevents expensive operations
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data,
)

// getSelectos automatically creates the functions on the left,
// we rename it to the aliases on the right using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
    // using the selectNotesData selector created earlier, extract the note data
    // from the global state. return initialstate if null
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);