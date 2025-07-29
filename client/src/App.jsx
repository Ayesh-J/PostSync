import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'



//components imports
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FeedbackSection from './components/Feedback'
import Footer from './components/Footer'


//page imports
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <Navbar />

      <LandingPage />
      <HowItWorks />
      <Testimonials/>
      <FeedbackSection/>
      <Footer/>

    </>
  )
}

export default App
