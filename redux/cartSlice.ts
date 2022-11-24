import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartState {
  items: Item[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload]
    },
    removeItemFromCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex(
        (item: Item) => item._id === action.payload.id
      )
      let newcart = [...state.items]
      newcart.splice(index, 1)
      state.items = newcart;
    },
  },
})

export const { addToCart, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer