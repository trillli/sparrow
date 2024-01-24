import AppRoutes from './components/full/routes/AppRoutes'
import React from 'react'
import AppConfig from './AppConfig'

function App() {
  return (
    <AppRoutes app_config={new AppConfig}/>
  )
}

export default App
