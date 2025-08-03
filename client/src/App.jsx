import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FeedbackSection from './components/Feedback';
import Footer from './components/Footer';

// Page imports
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './auth/Login'; // Make sure this exists

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <HowItWorks />
              <Testimonials />
              <FeedbackSection />
              <Footer />
            </>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
