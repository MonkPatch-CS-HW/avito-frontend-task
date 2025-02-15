import { configureStore, createSlice } from '@reduxjs/toolkit'

export const emptySlice = createSlice({
  initialState: {},
  name: 'empty',
  reducers: {},
})

export const store = configureStore({ reducer: emptySlice.reducer })
