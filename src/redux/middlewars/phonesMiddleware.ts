import { type Middleware } from 'redux'
import { io, type Socket } from 'socket.io-client'
import { connectionEstablished, startConnecting } from '../slicers/phoneSlicer'
import PhonesEvent from '../../PhonesEvent'

const phonesMiddleware: Middleware = (store) => {
  let socket: Socket

  return (next) => (action) => {
    // const isConnectionEstablished = socket && store.getState().phone.length

    if (startConnecting.match(action)) {
      socket = io('localhost:8000')

      socket.on('connect', () => {
        store.dispatch(connectionEstablished())
        socket.emit(PhonesEvent.REQUEST_ALL_PHONES)
      })
      socket.on('hello', (data) => {
        console.log(data)
      })
    }

    // if (submitPhone.match(action) && isConnectionEstablished) {
    //   socket.emit(PhonesEvent.APPEND_NUMBER)
    // }
    next(action)
  }
}

export default phonesMiddleware
