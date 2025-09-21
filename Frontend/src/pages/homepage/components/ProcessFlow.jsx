import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 'upload',
      title: 'Upload Document',
      description: 'Drag & drop or select files from your device. Supports PDF, JPG, PNG, TIFF formats.',
      icon: 'Upload',
      color: 'primary',
      details: [
        'Multiple file formats supported',
        'Batch upload capability',
        'Secure encrypted transfer',
        'Real-time validation'
      ]
    },
    {
      id: 'process',
      title: 'AI Processing',
      description: 'Advanced OCR algorithms analyze and extract text with 99.2% accuracy.',
      icon: 'Brain',
      color: 'brand-purple',
      details: [
        'Machine learning optimization',
        'Multi-language recognition',
        'Context-aware extraction',
        'Error correction algorithms'
      ]
    },
    {
      id: 'extract',
      title: 'Text Extraction',
      description: 'Structured data output with formatting preservation and confidence scores.',
      icon: 'FileText',
      color: 'accent',
      details: [
        'Structured JSON output',
        'Formatting preservation',
        'Confidence scoring',
        'Metadata extraction'
      ]
    },
    {
      id: 'deliver',
      title: 'Instant Delivery',
      description: 'Get results via API, webhook, or download. Ready for integration.',
      icon: 'Zap',
      color: 'primary',
      details: [
        'Multiple delivery methods',
        'Real-time webhooks',
        'API integration ready',
        'Export in various formats'
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % steps?.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps?.length]);

  const getColorClasses = (color, isActive) => {
    const colorMap = {
      primary: {
        bg: isActive ? 'bg-primary' : 'bg-primary/10',
        text: isActive ? 'text-white' : 'text-primary',
        border: 'border-primary/20',
        accent: 'bg-primary/10'
      },
      'brand-purple': {
        bg: isActive ? 'bg-brand-purple' : 'bg-brand-purple/10',
        text: isActive ? 'text-white' : 'text-brand-purple',
        border: 'border-brand-purple/20',
        accent: 'bg-brand-purple/10'
      },
      accent: {
        bg: isActive ? 'bg-accent' : 'bg-accent/10',
        text: isActive ? 'text-white' : 'text-accent',
        border: 'border-accent/20',
        accent: 'bg-accent/10'
      }
    };
    return colorMap?.[color];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full border border-gray-200 mb-6">
            <Icon name="Workflow" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">How It Works</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            From Document to{' '}
            <span className="gradient-text">Data</span>{' '}
            in Seconds
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our streamlined process transforms any document into structured, searchable data 
            with enterprise-grade accuracy and lightning-fast speed.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-16">
              {steps?.map((step, index) => {
                const isActive = index === activeStep;
                const colors = getColorClasses(step?.color, isActive);
                
                return (
                  <div key={step?.id} className="flex-1 relative">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 cursor-pointer ${colors?.bg} ${colors?.border} ${
                          isActive ? 'scale-110 shadow-lg' : 'hover:scale-105'
                        } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
                        onClick={() => setActiveStep(index)}
                      >
                        <Icon 
                          name={step?.icon} 
                          size={32} 
                          className={`transition-colors duration-300 ${colors?.text}`} 
                        />
                      </div>
                      
                      {/* Step Info */}
                      <div className="text-center mt-4 max-w-xs">
                        <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                          isActive ? 'text-foreground' : 'text-text-secondary'
                        }`}>
                          {step?.title}
                        </h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          isActive ? 'text-text-secondary' : 'text-gray-400'
                        }`}>
                          {step?.description}
                        </p>
                      </div>
                    </div>
                    {/* Connecting Line */}
                    {index < steps?.length - 1 && (
                      <div className="absolute top-10 left-1/2 w-full h-1 flex items-center">
                        <div className="flex-1 h-0.5 bg-gray-200 ml-10">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              index < activeStep ? 'bg-primary w-full' : 'bg-gray-200 w-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8 mb-16">
            {steps?.map((step, index) => {
              const isActive = index === activeStep;
              const colors = getColorClasses(step?.color, isActive);
              
              return (
                <div key={step?.id} className="flex items-start space-x-4">
                  <div
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${colors?.bg} ${colors?.border} ${
                      isActive ? 'scale-110' : ''
                    }`}
                  >
                    <Icon 
                      name={step?.icon} 
                      size={24} 
                      className={colors?.text} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isActive ? 'text-foreground' : 'text-text-secondary'
                    }`}>
                      {step?.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? 'text-text-secondary' : 'text-gray-400'
                    }`}>
                      {step?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Details */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Details */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    getColorClasses(steps?.[activeStep]?.color, true)?.bg
                  }`}>
                    <Icon 
                      name={steps?.[activeStep]?.icon} 
                      size={24} 
                      className="text-white" 
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {steps?.[activeStep]?.title}
                    </h3>
                    <p className="text-text-secondary">
                      Step {activeStep + 1} of {steps?.length}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-text-secondary mb-6">
                  {steps?.[activeStep]?.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {steps?.[activeStep]?.details?.map((detail, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Icon 
                          name="Check" 
                          size={16} 
                          className={getColorClasses(steps?.[activeStep]?.color, false)?.text} 
                        />
                        <span className="text-sm text-text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 mx-auto ${
                      getColorClasses(steps?.[activeStep]?.color, false)?.accent
                    }`}>
                      <Icon 
                        name={steps?.[activeStep]?.icon} 
                        size={48} 
                        className={getColorClasses(steps?.[activeStep]?.color, false)?.text} 
                      />
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {steps?.[activeStep]?.title}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Processing...
                    </div>
                  </div>
                </div>

                {/* Animated Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {steps?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeStep
                      ? 'bg-primary scale-125' :'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;