import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiSlice } from "./api/apiSlice"
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/favorites/favoriteSlice'
import cartReducer from './features/cart/cartSlice'
import { getFavoritesFromLocalStorage } from "../utils/localStorage"

const intialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartReducer
    },

    preloadedState: {
        favorites: intialFavorites
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store