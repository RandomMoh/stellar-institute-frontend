import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import StellarAdmin from './pages/StellarAdmin';
import CursorTrail from './components/CursorTrail';
import AnnouncementPopup from './components/AnnouncementPopup';
import PageTransition from './components/PageTransition';
import { WebsiteImagesProvider } from './components/WebsiteImagesProvider';
import LoadingScreen from './components/LoadingScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
      <div>
        <h1 style={{ fontSize: '72px', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>404</h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px' }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/skilled-institute" element={<SkilledInstitute />} />
            <Route path="/school" element={<School />} />
            <Route path="/college" element={<College />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

function App() {
  // Loading screen logic - locks scroll while loading
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <WebsiteImagesProvider>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      <Router>
        <CursorTrail />
        <ScrollToTop />
        <AnnouncementPopup />
        <PageTransition>
          <Routes>
            <Route path="/stellar-admin" element={<StellarAdmin />} />
            <Route path="*" element={<AppLayout />} />
          </Routes>
        </PageTransition>
      </Router>
    </WebsiteImagesProvider>
  );
}

export default App;
