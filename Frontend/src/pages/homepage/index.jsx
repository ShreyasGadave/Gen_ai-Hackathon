import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ClientLogoBar from './components/ClientLogoBar';
import ValueProposition from './components/ValueProposition';
import ProcessFlow from './components/ProcessFlow';
import TestimonialCarousel from './components/TestimonialCarousel';
import ProcessingStats from './components/ProcessingStats';
import PricingPreview from './components/PricingPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Homepage = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        <ClientLogoBar />
        <ValueProposition />
        <ProcessFlow />
        <TestimonialCarousel />
        <ProcessingStats />
        <PricingPreview />
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-brand-purple text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join thousands of businesses already using OCR Pro to streamline their document workflows. 
              Start your free trial today - no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="secondary" 
                size="lg" 
                iconName="Zap" 
                iconPosition="left"
                className="bg-white text-primary hover:bg-gray-50 font-semibold"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Play" 
                iconPosition="left"
                className="border-white text-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Icon name="Shield" size={24} className="text-white/80" />
                <span className="text-sm opacity-90">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Icon name="Clock" size={24} className="text-white/80" />
                <span className="text-sm opacity-90">30-Day Free Trial</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Icon name="Headphones" size={24} className="text-white/80" />
                <span className="text-sm opacity-90">24/7 Support</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-brand-purple rounded-lg flex items-center justify-center">
                  <Icon name="ScanText" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xl font-heading font-bold">OCR Pro</div>
                  <div className="text-xs text-gray-400">Intelligent Precision</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Transform documents into data with enterprise-grade OCR technology. 
                Trusted by thousands of businesses worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                  <Icon name="Linkedin" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                  <Icon name="Github" size={16} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Partners</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Status Page</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">System Status</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {currentYear} OCR Pro. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;