import { type FormEvent, type FormEventHandler, useCallback, useEffect } from 'react'
import style from './App.module.sass'
import { fetchNums, startConnecting, submitPhone } from './redux/slicers/phoneSlicer'
import { useAppDispatch, useAppSelector } from './hooks'
import PhonesList from './components/PhonesList/PhonesList'
import SpinLoader from './components/SpinLoader/SpinLoader'
import NumberInput from './components/Form/Form'
import selections from './shared/selections'

function App () {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((store) => store.phone.isLoading)
  useEffect(() => {
    dispatch(fetchNums())
    dispatch(startConnecting())
  }, [])
  const onSubmitHandler: FormEventHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target: HTMLFormElement = event.target as HTMLFormElement
    const [select, input] = target

    const inputTypeElement: HTMLInputElement = input as HTMLInputElement

    if (inputTypeElement.value.length > 10 || inputTypeElement.value.length < 3) {
      inputTypeElement.setCustomValidity('Number must be from 3 to 10 digits')
      return
    }

    const selectionValue: string = (select as HTMLSelectElement).value

    dispatch(submitPhone({
      phoneNumber: inputTypeElement.value,
      countryCode: selectionValue
    }))

    inputTypeElement.value = ''
  }, [])

  const onInputHandler: FormEventHandler = useCallback((e: FormEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    target.setCustomValidity('')
  }, [])

  return (
    <div className={style.app}>
      {isLoading ? <SpinLoader /> : <PhonesList />}
      <div className={style.staticBox}>
        <NumberInput
          onSubmitForm={onSubmitHandler}
          onInput={onInputHandler}
          selections={selections.data}
        />
      </div>
    </div>
  )
}

export default App
