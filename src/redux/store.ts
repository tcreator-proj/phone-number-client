import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import phonesSlicer from './slicers/phoneSlicer'
import phonesMiddleware from './middlewars/phonesMiddleware'

const store = configureStore({
  reducer: {
    phone: phonesSlicer.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { serializableCheck: false }
  ).concat([phonesMiddleware]),
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
