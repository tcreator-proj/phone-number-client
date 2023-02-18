import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type Phone from '../../models/Phone'

export interface NumberListState {
  numList: Phone[]
  isLoading: boolean
  error: any
}

const initialState: NumberListState = {
  numList: [],
  isLoading: true,
  error: null
}
const phonesSlicer = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    fetchNumsStarted (state) {
      state.isLoading = true
      state.error = null
    },
    fetchNumsSuccess (state, { payload }) {
      state.isLoading = false
      console.log(payload.body)
      state.numList = payload.body
    },
    fetchNumsFailed (state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    append: (store: NumberListState, action: PayloadAction) => {

    }
  }
})

export const { fetchNumsStarted, fetchNumsSuccess, fetchNumsFailed } =
    phonesSlicer.actions

export const fetchNums = () => async (dispatch: any) => {
  dispatch(fetchNumsStarted())
  try {
    const response = await fetch('http://localhost:8000/phones')
    const data = await response.json()
    dispatch(fetchNumsSuccess(data))
  } catch (error: any) {
    dispatch(fetchNumsFailed(error.message))
  }
}
export default phonesSlicer
