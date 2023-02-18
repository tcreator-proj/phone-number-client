import './App.sass'
import { useEffect } from 'react'
import { fetchNums } from './redux/slicers/phoneSlicer'
import { useAppDispatch, useAppSelector } from './hooks'
import type Phone from './models/Phone'

function App () {
  const phones = useAppSelector((state) => state.phone.numList)
  const isLoading = useAppSelector((state: any) => state.phone.isLoading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchNums())
  }, [])

  return (
    <div className="App">
      {isLoading === true ? 'Загрузка' : phones.map((data: Phone) => <p key={data.id}>{data.phoneNumber}</p>) }
    </div>
  )
}

export default App
