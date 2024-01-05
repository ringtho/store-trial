import { apiSlice } from './apiSlice'
import { PRODUCTS_URL, UPLOAD_URL } from '../constants'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCTS_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product']
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId }
      ]
    }),
    allProducts: builder.query({
        query: () => `$${PRODUCTS_URL}/allproducts`,
    }),
    getProductDetails: builder.query({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`
        }),
        keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
        query: (productData) => ({
            url: `${PRODUCTS_URL}`,
            method: 'POST',
            body: productData
        }),
        invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
        query: ({ productId, formData }) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'PUT',
            body: formData
        })
    }),

    deleteProduct: builder.mutation({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'DELETE'
        }),
        providesTags: ['Product']
    }),
    createReview: builder.mutation({
        query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}/reviews`,
            method: 'POST',
            body: data
        })
    }),

    getTopProducts: builder.query({
        query: () => `${PRODUCTS_URL}/top`,
        keepUnusedDataFor: 5
    }),

    getNewProducts: builder.query({
        query: () => `${PRODUCTS_URL}/new`,
        keepUnusedDataFor: 5
    }),
    uploadProductImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data
        })
    })

  }),
})

export const {
    useAllProductsQuery,
    useCreateProductMutation,
    useCreateReviewMutation,
    useDeleteProductMutation,
    useGetNewProductsQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useGetProductsQuery,
    useGetTopProductsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} = productApiSlice
