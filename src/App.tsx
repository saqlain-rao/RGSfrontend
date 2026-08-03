import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Process from './pages/Process';
import WhyUs from './pages/WhyUs';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProjectsCMS from './pages/admin/ProjectsCMS';
import ServicesCMS from './pages/admin/ServicesCMS';
import BlogsCMS from './pages/admin/BlogsCMS';
import GalleryCMS from './pages/admin/GalleryCMS';
import TestimonialsCMS from './pages/admin/TestimonialsCMS';
import CareersCMS from './pages/admin/CareersCMS';
import TeamCMS from './pages/admin/TeamCMS';
import FaqsCMS from './pages/admin/FaqsCMS';
import MessagesCMS from './pages/admin/MessagesCMS';
import HomeCMS from './pages/admin/HomeCMS';
import SeoCMS from './pages/admin/SeoCMS';
import MediaCMS from './pages/admin/MediaCMS';
import SettingsCMS from './pages/admin/SettingsCMS';
import UsersCMS from './pages/admin/UsersCMS';
import RolesCMS from './pages/admin/RolesCMS';
import AnalyticsCMS from './pages/admin/AnalyticsCMS';
import Login from './pages/admin/Login';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Global Axios Interceptor for Auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url?.startsWith(API_URL)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function App() {
  // Track visitors
  useEffect(() => {
    // Only track if not in admin panel and haven't tracked in this session
    if (!window.location.pathname.startsWith('/admin') && !sessionStorage.getItem('visitor_tracked')) {
      axios.post(`${API_URL}/visitors/track`).catch(e => console.error(e));
      sessionStorage.setItem('visitor_tracked', 'true');
    }
  }, []);

  // Setup Lenis Smooth Scroll globally
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="process" element={<Process />} />
          <Route path="why-us" element={<WhyUs />} />
          <Route path="team" element={<Team />} />
          <Route path="careers" element={<Careers />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsCMS />} />
          <Route path="services" element={<ServicesCMS />} />
          <Route path="blogs" element={<BlogsCMS />} />
          <Route path="gallery" element={<GalleryCMS />} />
          <Route path="testimonials" element={<TestimonialsCMS />} />
          <Route path="careers" element={<CareersCMS />} />
          <Route path="team" element={<TeamCMS />} />
          <Route path="faqs" element={<FaqsCMS />} />
          <Route path="messages" element={<MessagesCMS />} />
          <Route path="home" element={<HomeCMS />} />
          <Route path="seo" element={<SeoCMS />} />
          <Route path="media" element={<MediaCMS />} />
          <Route path="settings" element={<SettingsCMS />} />
          <Route path="users" element={<UsersCMS />} />
          <Route path="roles" element={<RolesCMS />} />
          <Route path="analytics" element={<AnalyticsCMS />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
