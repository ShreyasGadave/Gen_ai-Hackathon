import React, { useState } from "react";
import Icon from "../AppIcon";
import Button from "./Button";
import { useEffect} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin , handleSubmit } from '../../config';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginForm, setshowLoginForm] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    useEffect(() => { 
      setTimeout(() => {
        setFormVisible(true);
      }, 100)
    }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: "Features", href: "/features" },
    { name: "API Docs", href: "/api-docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo", href: "/demo" },
  ];

  const moreMenuItems = [
    { name: "Help Center", href: "/help" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Status", href: "/status" },
  ];

  return (
    <header  className="fixed top-0 left-0 right-0 z-50 bg-white/95  border-b border-gray-200">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-brand-purple rounded-lg flex items-center justify-center">
                  <Icon
                    name="ScanText"
                    size={18}
                    color="white"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground">
                  OCR Pro
                </span>
                <span className="text-xs text-text-secondary font-medium -mt-1">
                  Intelligent Precision
                </span>
              </div>
            </div>
          </div>
       

          {/* Desktop Navigation */}
          <nav className="hidden -z-1 lg:flex items-center space-x-8">
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
            <Button
              onClick={() => setshowLoginForm(true) }
              variant="ghost"
              className="text-sm font-medium"
            >
              Sign In
            </Button>

            <Button variant="default" className="text-sm font-semibold">
              Try Free Demo
            </Button>
          </div>
   {showLoginForm ? (
            <div onClick={()=>setshowLoginForm(false)}   className="fixed z-99 inset-0 backdrop-blur-lg flex justify-center items-center w-full h-screen">
                 <div  className='flex w-full items-center backdrop-blur-lg justify-center min-h-screen px-4'>
      <div  onClick={(e) => e.stopPropagation()} className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full
       border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
       ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transform transition-all duration-500
        ease-out`}>
        <h2 className='text-3xl font-bold text-center mb-4'>Welcome Back</h2>
        <p className='text-gray-400 text-center mb-6'>Login to your Account</p>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={(e) => handleSubmit(e, setError)} className=' space-y-6'>
          <div>
            <label htmlFor="email" className=' block text-gray-300 font-medium mb-1'>Email Address</label>
            <input required type="email" name='email' id='email' placeholder='Enter Your Email' className='w-full border-b
             border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none' />
          </div>

          <div className=' relative'>
            <label htmlFor="password" className='block text-gray-300 font-medium mb-1' >Password</label>
            <input type={passwordVisible ? 'text' : 'password'} id='password' name='password' placeholder='Enter your Password' className='w-full border-b
             border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none'/>
            <button type='button' onClick={() => setPasswordVisible(!passwordVisible)} className=' absolute right-2 top-8 text-gray-400 hover:text-cyan-400 focus:outline-none'>
              {passwordVisible ? (
                <AiOutlineEyeInvisible className='h-5 w-5' />
              ) : (<AiOutlineEye className='w-5 h-5' />)}
            </button>
          </div>
          <button type='submit' className=' w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l
           hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 focus:ring focus:ring-cyan-300
            focus:outline-none shadow-md hover:shadow-lg'>
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className=' mt-8 flex items-center justify-between'>
          <span className=' border-b w-1/4 border-gray-600'></span>
          <span className=' text-gray-400 text-sm'>OR</span>
          <span className=' border-b w-1/4 border-gray-600'></span>
        </div>

        {/* GOOGLE BUTTON */}
        <button onClick={() => handleGoogleLogin(setError)} className=' mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2
         rounded-lg shadow-md hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring focus:ring-cyan-300
          focus:outline-none'>
          <FcGoogle className='h-6 w-6 mr-3' />
          Continue with Google
        </button>

        <p className='text-center text-gray-400 text-sm mt-6'>
          Don't have an account? <a href="#" className='text-cyan-400 hover:underline'>Sign up</a>
        </p>
      </div>
    </div>
            
            </div>
          ) : (
            ""
          )}
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
                <Button
                  variant="default"
                  fullWidth
                  className="justify-center font-semibold"
                >
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
