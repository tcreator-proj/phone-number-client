import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type Phone from '../../models/Phone'

export interface NumberListState {
  numList: Phone[]
  isLoading: boolean
  isWsConnected: boolean
  isEstablishingConnection: boolean
  error: any
}

const initialState: NumberListState = {
  numList: [],
  isLoading: true,
  isWsConnected: false,
  isEstablishingConnection: false,
  error: null
}
const phonesSlicer = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    append: (state: NumberListState, action: PayloadAction) => {
      console.log(action)
    },
    fetchNumsStarted: (state: NumberListState) => {
      state.isLoading = true
      state.error = null
    },
    fetchNumsSuccess: (state: NumberListState, { payload }) => {
      state.isLoading = false
      state.numList = payload.body
    },
    fetchNumsFailed: (state: NumberListState, action: PayloadAction) => {
      state.isLoading = false
      state.error = action.payload
    },
    startConnecting: (state: NumberListState) => {
      state.isEstablishingConnection = true
    },
    connectionEstablished: (state: NumberListState) => {
      state.isWsConnected = true
      state.isEstablishingConnection = true
    },
    receiveAllPhones: (state, action: PayloadAction<{
      numList: Phone[]
    }>) => {
      state.numList = action.payload.numList
    },
    submitPhone: () => {}
  }
})

export const {
  fetchNumsStarted,
  fetchNumsSuccess,
  fetchNumsFailed,
  append,
  startConnecting,
  submitPhone,
  connectionEstablished
} =
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
