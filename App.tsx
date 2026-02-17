import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Valores from './sections/Valores';
import Servicios from './sections/Servicios';
import Galeria from './sections/Galeria';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import AdminPanel from './components/AdminPanel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main Website Component
const MainWebsite = () => {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Valores Diferenciales */}
        <Valores />

        {/* Servicios */}
        <Servicios />

        {/* Galería */}
        <Galeria />

        {/* Contacto / CTA / Formulario */}
        <Contacto />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    // Update document title and meta tags for SEO
    if (typeof document !== 'undefined') {
      document.title = 'Super Clean Institucional | Productos de Limpieza Biodegradables';

      const metaTags = [
        {
          name: 'description',
          content:
            'Productos premium biodegradables de limpieza y desinfección para hogares e instituciones. Cuidamos tu salud y el medio ambiente.',
        },
        {
          name: 'keywords',
          content:
            'limpieza biodegradable, productos de limpieza, desinfección, hogar, empresa, instituciones, ecológico, super clean',
        },
        { name: 'author', content: 'Super Clean Institucional' },
        { property: 'og:title', content: 'Super Clean Institucional' },
        {
          property: 'og:description',
          content:
            'Regresa a lo básico y natural. Productos de limpieza biodegradables para hogares e instituciones.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://superclean.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#2E7D32' },
      ];

      metaTags.forEach(({ name, property, content }) => {
        const selector = name
          ? `meta[name="${name}"]`
          : `meta[property="${property}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          if (name) meta.setAttribute('name', name);
          if (property) meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });

      // Add favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/jpeg';
        link.href = '/images/logo.jpeg';
        document.head.appendChild(link);
      }
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/leads" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
