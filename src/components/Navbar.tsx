
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Catégories', path: '/categories' },
    { name: 'Nouveautés', path: '/nouveaux' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-sm shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center font-medium space-x-2"
        >
          <ShoppingBag className="w-6 h-6 text-promotion-primary" />
          <span className="text-xl font-semibold">PromoSwap</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-promotion-primary ${
                location.pathname === link.path 
                  ? 'text-promotion-primary' 
                  : 'text-foreground/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-promotion-primary rounded-full"></span>
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <Link to="/login">
            <Button variant="outline" className="rounded-full">
              Connexion
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-full">
              Inscription
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-3 px-4 py-6 bg-white border-t animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-promotion-primary py-2 ${
                  location.pathname === link.path 
                    ? 'text-promotion-primary' 
                    : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-border my-2"></div>
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center">
                Connexion
              </Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button className="w-full justify-center">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
