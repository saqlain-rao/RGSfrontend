import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-xl border-b border-border py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden bg-white p-1 rounded-sm flex items-center justify-center w-14 h-14">
              <img 
                src="/logo.png" 
                alt="RGS Constructor" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-black text-xl tracking-widest uppercase leading-none">RGS</span>
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Constructor</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-300 relative group
                  ${location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left
                  ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}></span>
              </Link>
            ))}
            
            <Link 
              to="/contact" 
              className="ml-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              Get a Quote
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2.5 rounded-full border border-border hover:bg-muted text-foreground transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-muted flex flex-col"
          >
            <div className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-border">
              <span className="text-foreground font-black text-xl tracking-widest uppercase">RGS Constructor</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-lg font-black uppercase tracking-tight text-foreground hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
