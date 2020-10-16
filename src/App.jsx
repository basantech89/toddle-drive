import React from 'react'
import Home from './pages/Home'
import './App.css'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  )
}

export default App
