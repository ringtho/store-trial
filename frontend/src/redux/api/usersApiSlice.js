import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // if providing data use .mutation.
        // if not providing data use .query
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        })
    })
})


export const { useLoginMutation } = userApiSlice