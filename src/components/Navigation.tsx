import { useState, useEffect } from 'react';
import { Menu, X, Award, Settings, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/admin/login');
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-lg border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}
      style={isScrolled ? { background: 'linear-gradient(135deg, hsl(270 61% 28% / 0.85), hsl(355 56% 64% / 0.85))' } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`font-bold text-xl ${isScrolled ? 'text-white' : 'glow-text'}`}>
            Darius<span className={isScrolled ? 'text-white/80' : 'text-primary'}>Mukoya</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`animated-underline transition-colors duration-300 ${
                  isScrolled ? 'text-white/90 hover:text-white' : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link 
              to="/certificates" 
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Award className="h-4 w-4" />
              Certificates
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-300"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}
            <ThemeToggle />
            
            {/* Auth Button */}
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoginClick}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left animated-underline text-foreground hover:text-primary transition-colors duration-300 py-2"
                >
                  {item.name}
                </button>
              ))}
              <Link 
                to="/certificates" 
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Award className="h-4 w-4" />
                Certificates
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Admin
                </Link>
              )}
              
              {/* Mobile Auth Button */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleLoginClick}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;