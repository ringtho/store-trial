import { apiSlice } from "./apiSlice"
import { CATEGORIES_URL } from "../constants"

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORIES_URL}`,
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'PUT',
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'DELETE'
      }),
    }),
    fetchAllCategories: builder.query({
        query: () => ({
            url: `${CATEGORIES_URL}`
        }),
        keepUnusedDataFor: 5,
        providesTags: ['Category']
    })
  }),
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useFetchAllCategoriesQuery
} = categoryApiSlice