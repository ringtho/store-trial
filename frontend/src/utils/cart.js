
export const updateCart = (state) => {
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    state.shippingPrice = state.itemsPrice > 100 ? 0 : 10000
    state.taxPrice = Number(0.15 * state.itemsPrice)
    state.totalProce = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
    localStorage.setItem('cart', JSON.stringify(state))
    return state
} 