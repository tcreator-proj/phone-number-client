import './App.sass'
import io from 'socket.io-client'

function App () {
  const socket = io('http://localhost:8000')

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('message', (data) => {
    console.log('Received message from server:', data)
  })
  return (
    <div className="App">

      JS

    </div>
  )
}

export default App
