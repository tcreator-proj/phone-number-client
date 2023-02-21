import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Phone from '../../models/Phone'

export interface NumberListState {
  numList: Phone[]
  isLoading: boolean
  isWsConnected: boolean
  isEstablishingConnection: boolean
  error: any
}

interface SubmitPhoneType {
  phoneNumber: string
  countryCode: string
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
    append: (state: NumberListState, action: PayloadAction<Phone>) => {
      const { id, phoneNumber, countryCode, createdAt } = action.payload

      state.numList.push(new Phone(id, countryCode, phoneNumber, createdAt))
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
      state.error = action.payload
    },
    startConnecting: (state: NumberListState) => {
      state.isEstablishingConnection = true
    },
    connectionEstablished: (state: NumberListState) => {
      state.isWsConnected = true
      state.isEstablishingConnection = true
    },
    submitPhone: (state: NumberListState, action: PayloadAction<SubmitPhoneType>) => {}
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
    const url: string = import.meta.env.VITE_REACT_APP_API_URL
    console.log(url)
    const response = await fetch(`${url}/phones`, {
      method: 'GET'
    })

    const data = await response.json()
    dispatch(fetchNumsSuccess(data))
  } catch (error: any) {
    dispatch(fetchNumsFailed(error.message))
  }
}

export default phonesSlicer
