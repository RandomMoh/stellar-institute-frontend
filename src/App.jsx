import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academy from './pages/Academy';
import SkilledInstitute from './pages/SkilledInstitute';
import School from './pages/School';
import College from './pages/College';
import About from './pages/About';
import Contact from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import CursorTrail from './components/CursorTrail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <CursorTrail />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/skilled-institute" element={<SkilledInstitute />} />
          <Route path="/school" element={<School />} />
          <Route path="/college" element={<College />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </Router>
  );
}

export default App;
