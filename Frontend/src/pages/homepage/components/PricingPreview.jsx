import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingPreview = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      description: 'Perfect for testing and small projects',
      price: { monthly: 0, yearly: 0 },
      features: [
        '100 documents/month',
        'Basic OCR accuracy',
        'Standard processing speed',
        'Email support',
        'API access'
      ],
      limitations: [
        'No batch processing',
        'Standard accuracy only'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses and teams',
      price: { monthly: 49, yearly: 39 },
      features: [
        '5,000 documents/month',
        'Premium OCR accuracy (99.2%)',
        'Fast processing speed',
        'Priority support',
        'Advanced API features',
        'Batch processing',
        'Custom integrations'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      color: 'primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: { monthly: 'Custom', yearly: 'Custom' },
      features: [
        'Unlimited documents',
        'Highest accuracy (99.8%)',
        'Instant processing',
        'Dedicated support',
        'Custom model training',
        'On-premise deployment',
        'SLA guarantees',
        'Advanced security'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'brand-purple'
    }
  ];

  const getColorClasses = (color, isHovered, isPopular) => {
    const colorMap = {
      gray: {
        bg: isHovered ? 'bg-gray-50' : 'bg-white',
        border: isPopular ? 'border-primary' : (isHovered ? 'border-gray-300' : 'border-gray-200'),
        accent: 'bg-gray-100',
        text: 'text-gray-600'
      },
      primary: {
        bg: isHovered ? 'bg-primary/5' : 'bg-white',
        border: isPopular ? 'border-primary' : (isHovered ? 'border-primary/50' : 'border-gray-200'),
        accent: 'bg-primary',
        text: 'text-primary'
      },
      'brand-purple': {
        bg: isHovered ? 'bg-brand-purple/5' : 'bg-white',
        border: isPopular ? 'border-brand-purple' : (isHovered ? 'border-brand-purple/50' : 'border-gray-200'),
        accent: 'bg-brand-purple',
        text: 'text-brand-purple'
      }
    };
    return colorMap?.[color];
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return `$${price}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
            <Icon name="CreditCard" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">Simple, Transparent Pricing</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Choose Your{' '}
            <span className="gradient-text">Perfect Plan</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises. 
            Cancel anytime with full data export.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans?.map((plan) => {
            const isHovered = hoveredPlan === plan?.id;
            const colors = getColorClasses(plan?.color, isHovered, plan?.popular);
            
            return (
              <div
                key={plan?.id}
                className={`relative transition-all duration-300 ${
                  isHovered ? 'transform -translate-y-2' : ''
                } ${plan?.popular ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan?.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan?.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className={`relative bg-white rounded-2xl border-2 p-8 h-full transition-all duration-300 ${colors?.bg} ${colors?.border} ${
                  plan?.popular ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      {plan?.name}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {plan?.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-4xl font-bold text-foreground">
                          {formatPrice(plan?.price?.[billingCycle])}
                        </span>
                        {typeof plan?.price?.[billingCycle] === 'number' && plan?.price?.[billingCycle] > 0 && (
                          <span className="text-text-secondary">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && typeof plan?.price?.yearly === 'number' && plan?.price?.yearly > 0 && (
                        <div className="text-sm text-accent font-medium mt-1">
                          Save ${(plan?.price?.monthly * 12 - plan?.price?.yearly * 12)?.toFixed(0)}/year
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={plan?.popular ? 'default' : 'outline'}
                      fullWidth
                      className="mb-6"
                    >
                      {plan?.cta}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                      What's Included:
                    </h4>
                    <ul className="space-y-3">
                      {plan?.features?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations */}
                    {plan?.limitations?.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                          Limitations:
                        </h4>
                        <ul className="space-y-2">
                          {plan?.limitations?.map((limitation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon name="X" size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-gray-400">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center justify-center space-x-3">
                <Icon name="Shield" size={24} className="text-accent" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">30-Day Free Trial</div>
                  <div className="text-sm text-text-secondary">No credit card required</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Icon name="RefreshCw" size={24} className="text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">Cancel Anytime</div>
                  <div className="text-sm text-text-secondary">Full data export included</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Icon name="Headphones" size={24} className="text-brand-purple" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">24/7 Support</div>
                  <div className="text-sm text-text-secondary">Always here to help</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-text-secondary mb-6">
            Need a custom solution? Our enterprise team can create a plan tailored to your specific requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" iconName="Calculator">
              Pricing Calculator
            </Button>
            <Button variant="ghost" iconName="MessageCircle">
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;