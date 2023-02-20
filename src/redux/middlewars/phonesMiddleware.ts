import { type Middleware } from 'redux'
import { io, type Socket } from 'socket.io-client'
import { append, connectionEstablished, fetchNumsFailed, startConnecting, submitPhone } from '../slicers/phoneSlicer'
import PhonesEvent from '../../PhonesEvent'

const phonesMiddleware: Middleware = (store) => {
  let socket: Socket

  return (next) => (action) => {
    const isConnectionEstablished = socket !== null
    const url: string = import.meta.env.VITE_REACT_APP_API_URL
    if (startConnecting.match(action)) {
      socket = io(url)

      socket.on('connect', () => {
        store.dispatch(connectionEstablished())
      })

      socket.on(PhonesEvent.RECEIVE_NEW_PHONE, (data) => {
        store.dispatch(append(data))
      })
      socket.on(PhonesEvent.ERROR, (data) => {
        store.dispatch(fetchNumsFailed(data))
      })
    }

    if (submitPhone.match(action) && isConnectionEstablished) {
      socket.emit(PhonesEvent.APPEND_NUMBER, action.payload)
    }

    next(action)
  }
}

export default phonesMiddleware
