import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: [],
    products: [],
    checked: [],
    radio: [],
    brandCheckboxes: {},
    selectedBrands: []
}
export const shopSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setChecked: (state, action) => {
      state.checked = action.payload
    },
    setRadio: (state, action) => {
      state.radio = action.payload
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrands = action.payload
    },
  },
})

export const {
    setCategories,
    setProducts,
    setChecked,
    setRadio,
    setSelectedBrand
} = shopSlice.actions

export default shopSlice.reducer