import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'



//components imports
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'


//page imports
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <Navbar />

      <LandingPage />
      <HowItWorks />
      <Footer/>

    </>
  )
}

export default App
