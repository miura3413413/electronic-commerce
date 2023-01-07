import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface Clicked {
  _id?: string,
  clicked?: number
}

interface CartState {
  items: Item[],
  clicked: Clicked[],
  isModal: boolean
}

const initialState: CartState = {
  items: [],
  clicked: [],
  isModal: true
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
    clickedItem: (state: CartState, action: PayloadAction<Clicked>) => {
      const index = state.clicked.findIndex(
        (clicked: Clicked) => clicked._id === action.payload._id
      )
      if (index === -1) {
        state.clicked.push(action.payload)
      } else {
        state.clicked![index].clicked! += 1
      }
    },
    switchIsMpdal: (state: CartState) => {
      state.isModal = !state.isModal
    }
  },
})

export const { addToCart, removeItemFromCart, clickedItem, switchIsMpdal } = cartSlice.actions

export default cartSlice.reducer