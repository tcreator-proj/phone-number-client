import { configureStore } from '@reduxjs/toolkit'
import phonesSlicer from './slicers/phoneSlicer'

const store = configureStore({
  reducer: {
    phone: phonesSlicer.reducer
  },
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
