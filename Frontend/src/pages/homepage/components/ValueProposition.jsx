import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ValueProposition = () => {
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const pillars = [
    {
      id: 'accuracy',
      title: 'Enterprise-Grade Accuracy',
      subtitle: '99.2% precision across all document types',
      icon: 'Target',
      color: 'primary',
      features: [
        'Advanced AI/ML algorithms trained on 50M+ documents',
        'Multi-language support with context awareness',
        'Automatic error correction and validation',
        'Industry-specific model optimization'
      ],
      stats: {
        value: '99.2%',
        label: 'Accuracy Rate'
      }
    },
    {
      id: 'developer',
      title: 'Developer-Friendly APIs',
      subtitle: 'RESTful APIs with comprehensive documentation',
      icon: 'Code2',
      color: 'brand-purple',
      features: [
        'RESTful API with OpenAPI 3.0 specification',
        'SDKs for Python, Node.js, Java, and .NET',
        'Webhook support for real-time notifications',
        'Interactive API playground and testing tools'
      ],
      stats: {
        value: '< 100ms',
        label: 'API Response'
      }
    },
    {
      id: 'privacy',
      title: 'Privacy-First Processing',
      subtitle: 'SOC 2 compliant with zero data retention',
      icon: 'Shield',
      color: 'accent',
      features: [
        'SOC 2 Type II and GDPR compliant infrastructure',
        'End-to-end encryption for all data transfers',
        'Zero data retention policy - documents deleted after processing',
        'On-premise deployment options available'
      ],
      stats: {
        value: '0 Days',
        label: 'Data Retention'
      }
    }
  ];

  const getColorClasses = (color, isHovered) => {
    const colorMap = {
      primary: {
        bg: isHovered ? 'bg-primary/10' : 'bg-primary/5',
        border: isHovered ? 'border-primary/30' : 'border-primary/10',
        icon: 'text-primary',
        accent: 'bg-primary'
      },
      'brand-purple': {
        bg: isHovered ? 'bg-brand-purple/10' : 'bg-brand-purple/5',
        border: isHovered ? 'border-brand-purple/30' : 'border-brand-purple/10',
        icon: 'text-brand-purple',
        accent: 'bg-brand-purple'
      },
      accent: {
        bg: isHovered ? 'bg-accent/10' : 'bg-accent/5',
        border: isHovered ? 'border-accent/30' : 'border-accent/10',
        icon: 'text-accent',
        accent: 'bg-accent'
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
            <Icon name="Sparkles" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">Why Choose OCR Pro</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Built for Modern{' '}
            <span className="gradient-text">Workflows</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Three core pillars that make OCR Pro the preferred choice for enterprises 
            and developers who demand reliability, performance, and security.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid lg:grid-cols-3 gap-8">
          {pillars?.map((pillar) => {
            const isHovered = hoveredPillar === pillar?.id;
            const colors = getColorClasses(pillar?.color, isHovered);
            
            return (
              <div
                key={pillar?.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isHovered ? 'transform -translate-y-2' : ''
                }`}
                onMouseEnter={() => setHoveredPillar(pillar?.id)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <div className={`relative bg-white rounded-2xl border-2 p-8 h-full transition-all duration-300 ${colors?.bg} ${colors?.border}`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors?.accent} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}>
                    <Icon name={pillar?.icon} size={32} color="white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {pillar?.title}
                      </h3>
                      <p className="text-text-secondary">
                        {pillar?.subtitle}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 py-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${colors?.icon}`}>
                          {pillar?.stats?.value}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {pillar?.stats?.label}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Features */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {pillar?.features?.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon 
                                name="Check" 
                                size={14} 
                                className={`${colors?.icon} mt-0.5 flex-shrink-0`} 
                              />
                              <span className="text-sm text-text-secondary">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className={`absolute top-4 right-4 transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                    <div className={`w-8 h-8 ${colors?.bg} rounded-full flex items-center justify-center border ${colors?.border}`}>
                      <Icon name="ArrowUpRight" size={16} className={colors?.icon} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            Ready to experience the difference? Start with our free tier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Icon name="Play" size={18} />
              <span>Watch Demo Video</span>
            </button>
            <button className="px-8 py-3 border border-gray-300 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Icon name="BookOpen" size={18} />
              <span>Read Case Studies</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;