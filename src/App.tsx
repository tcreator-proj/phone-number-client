import { type FormEvent, type FormEventHandler, useCallback, useEffect } from 'react'
import style from './App.module.sass'
import { fetchNums, startConnecting } from './redux/slicers/phoneSlicer'
import { useAppDispatch, useAppSelector } from './hooks'
import PhonesList from './components/PhonesList/PhonesList'
import SpinLoader from './components/SpinLoader/SpinLoader'
import NumberInput from './components/Form/Form'

function App () {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((store) => store.phone.isLoading)
  useEffect(() => {
    dispatch(fetchNums())
    dispatch(startConnecting())
  }, [])

  const onSubmitHandler: FormEventHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    // const target: HTMLFormElement = event.target as HTMLFormElement
    // const [input, select] = target
    //
    // const options: HTMLOptionElement[] = Array.from((select as HTMLSelectElement).options)
  }, [])

  return (
    <div className={style.app}>
      {isLoading ? <SpinLoader /> : <PhonesList />}
      <NumberInput onSubmitForm={onSubmitHandler} />
    </div>
  )
}

export default App
