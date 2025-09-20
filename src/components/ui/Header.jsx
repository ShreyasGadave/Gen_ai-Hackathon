import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: 'Features', href: '/features' },
    { name: 'API Docs', href: '/api-docs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Demo', href: '/demo' }
  ];

  const moreMenuItems = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Status', href: '/status' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-brand-purple rounded-lg flex items-center justify-center">
                  <Icon name="ScanText" size={18} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground">OCR Pro</span>
                <span className="text-xs text-text-secondary font-medium -mt-1">Intelligent Precision</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <a
                key={item?.name}
                href={item?.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item?.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                <span>More</span>
                <Icon name="ChevronDown" size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-soft border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <a
                      key={item?.name}
                      href={item?.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-surface hover:text-primary transition-colors duration-150"
                    >
                      {item?.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium">
              Sign In
            </Button>
            <Button variant="default" className="text-sm font-semibold">
              Try Free Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navigationItems?.map((item) => (
                  <a
                    key={item?.name}
                    href={item?.href}
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item?.name}
                  </a>
                ))}
              </nav>

              {/* Mobile More Menu */}
              <div className="pt-3 border-t border-gray-200">
                <div className="space-y-3">
                  {moreMenuItems?.map((item) => (
                    <a
                      key={item?.name}
                      href={item?.href}
                      className="block text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item?.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button variant="ghost" fullWidth className="justify-center">
                  Sign In
                </Button>
                <Button variant="default" fullWidth className="justify-center font-semibold">
                  Try Free Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;