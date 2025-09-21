import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      quote: `OCR Pro reduced our invoice processing time from 4 hours to 15 minutes. The accuracy is phenomenal - we've seen a 95% reduction in manual corrections. It's transformed our entire accounts payable workflow.`,
      author: "Sarah Chen",
      title: "CFO",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      industry: "Technology",
      metrics: {
        timeSaved: "94%",
        label: "Time Reduction"
      }
    },
    {
      id: 2,
      quote: `The API integration was seamless. Our development team had it up and running in less than a day. The documentation is excellent, and the webhook support makes real-time processing a breeze.`,
      author: "Marcus Rodriguez",
      title: "Lead Developer",
      company: "FinanceHub Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      industry: "Financial Services",
      metrics: {
        timeSaved: "< 1 Day",
        label: "Integration Time"
      }
    },
    {
      id: 3,
      quote: `Patient record digitization used to be our biggest bottleneck. OCR Pro handles medical forms, prescriptions, and insurance documents with incredible precision. HIPAA compliance gives us complete peace of mind.`,
      author: "Dr. Emily Watson",
      title: "Director of Operations",
      company: "MedCare Regional",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face",
      industry: "Healthcare",
      metrics: {
        timeSaved: "87%",
        label: "Processing Speed"
      }
    },
    {
      id: 4,
      quote: `Contract analysis that used to take our legal team days now happens in minutes. The multi-language support is exceptional - we process documents in 12 different languages with consistent accuracy.`,
      author: "James Mitchell",
      title: "Senior Partner",
      company: "Mitchell & Associates",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      industry: "Legal",
      metrics: {
        timeSaved: "12",
        label: "Languages Supported"
      }
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
            <Icon name="MessageSquare" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">Customer Success Stories</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Trusted by{' '}
            <span className="gradient-text">Thousands</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how organizations across industries are transforming their document workflows with OCR Pro.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <Icon name="Quote" size={256} className="text-primary" />
            </div>

            <div className="relative grid lg:grid-cols-3 gap-8 items-center">
              {/* Quote */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <Icon name="Quote" size={32} className="text-primary/20 mb-4" />
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                    "{currentTestimonial?.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={currentTestimonial?.avatar}
                      alt={currentTestimonial?.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {currentTestimonial?.author}
                    </div>
                    <div className="text-text-secondary">
                      {currentTestimonial?.title}
                    </div>
                    <div className="text-primary font-medium">
                      {currentTestimonial?.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics & Industry */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary/5 to-brand-purple/5 rounded-2xl p-6 border border-primary/10">
                  <div className="text-center mb-4">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {currentTestimonial?.metrics?.timeSaved}
                    </div>
                    <div className="text-sm text-text-secondary font-medium">
                      {currentTestimonial?.metrics?.label}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Building" size={16} />
                    <span>{currentTestimonial?.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <Icon name="ChevronLeft" size={20} className="text-foreground" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <Icon name="ChevronRight" size={20} className="text-foreground" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125' :'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-accent animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-text-secondary">
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </span>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-text-secondary">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-text-secondary">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">99.8%</div>
            <div className="text-sm text-text-secondary">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-text-secondary">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;