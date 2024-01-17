import AppRouter from './components/full/routes/AppRouter'
import React from 'react'
import config from './config.json'

function App() {
  return (
    <AppRouter config={config}/>
  )
}

export default App