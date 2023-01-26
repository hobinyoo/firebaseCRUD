import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface CountState {
  userId: string
}

const initialState: CountState = {
  userId: '',
}

export const countSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { userId } = countSlice.actions
export default countSlice.reducer
