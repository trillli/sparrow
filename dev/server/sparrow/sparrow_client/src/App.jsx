import './App.css'
import TrillliApp from 'trillli_client/src/TrillliApp'
import config from './config.json'

function App() {

  return (
    <TrillliApp {...config} />
  )
}

export default App
