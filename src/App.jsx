import React from 'react'
import { AppProvider } from './context/AppContext'
import { BrowserRouter } from 'react-router-dom'
import AppContainer from './container/AppContainer'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContainer />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
