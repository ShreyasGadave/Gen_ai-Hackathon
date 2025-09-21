import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStats = () => {
  const [stats, setStats] = useState({
    documentsToday: 15847,
    avgProcessingTime: 2.3,
    activeUsers: 1249,
    successRate: 99.2
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        documentsToday: prev?.documentsToday + Math.floor(Math.random() * 5) + 1,
        avgProcessingTime: Math.max(1.8, Math.min(3.2, prev?.avgProcessingTime + (Math.random() - 0.5) * 0.1)),
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 3) - 1,
        successRate: Math.max(98.5, Math.min(99.9, prev?.successRate + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    // Intersection observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('processing-stats');
    if (element) {
      observer?.observe(element);
    }

    return () => {
      clearInterval(interval);
      if (element) {
        observer?.unobserve(element);
      }
    };
  }, []);

  const statItems = [
    {
      id: 'documents',
      icon: 'FileText',
      value: stats?.documentsToday?.toLocaleString(),
      label: 'Documents Processed Today',
      color: 'primary',
      trend: '+12.5%',
      description: 'Real-time processing volume'
    },
    {
      id: 'speed',
      icon: 'Zap',
      value: `${stats?.avgProcessingTime?.toFixed(1)}s`,
      label: 'Average Processing Time',
      color: 'accent',
      trend: '-0.3s',
      description: 'Faster than industry average'
    },
    {
      id: 'users',
      icon: 'Users',
      value: stats?.activeUsers?.toLocaleString(),
      label: 'Active Users Right Now',
      color: 'brand-purple',
      trend: '+8.2%',
      description: 'Currently using the platform'
    },
    {
      id: 'accuracy',
      icon: 'Target',
      value: `${stats?.successRate?.toFixed(1)}%`,
      label: 'Success Rate',
      color: 'primary',
      trend: '+0.1%',
      description: 'Accuracy across all document types'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        icon: 'text-primary',
        accent: 'bg-primary',
        border: 'border-primary/20'
      },
      accent: {
        bg: 'bg-accent/10',
        icon: 'text-accent',
        accent: 'bg-accent',
        border: 'border-accent/20'
      },
      'brand-purple': {
        bg: 'bg-brand-purple/10',
        icon: 'text-brand-purple',
        accent: 'bg-brand-purple',
        border: 'border-brand-purple/20'
      }
    };
    return colorMap?.[color];
  };

  return (
    <section id="processing-stats" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full border border-gray-200 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium text-foreground">Live Performance Metrics</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Real-Time{' '}
            <span className="gradient-text">Intelligence</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Watch OCR Pro in action. These metrics update in real-time, showing the power 
            and reliability of our platform across thousands of daily operations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statItems?.map((stat, index) => {
            const colors = getColorClasses(stat?.color);
            
            return (
              <div
                key={stat?.id}
                className={`relative bg-white rounded-2xl border-2 p-6 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${colors?.border} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${colors?.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={stat?.icon} size={24} className={colors?.icon} />
                </div>
                {/* Value */}
                <div className="mb-2">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    {stat?.label}
                  </div>
                </div>
                {/* Trend */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={stat?.trend?.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                      className={stat?.trend?.startsWith('+') ? 'text-accent' : 'text-orange-500'} 
                    />
                    <span className={`text-xs font-medium ${
                      stat?.trend?.startsWith('+') ? 'text-accent' : 'text-orange-500'
                    }`}>
                      {stat?.trend}
                    </span>
                  </div>
                  <div className={`w-2 h-2 ${colors?.accent} rounded-full animate-pulse`}></div>
                </div>
                {/* Description */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-text-secondary">
                    {stat?.description}
                  </p>
                </div>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Global Performance Indicators */}
        <div className="bg-gradient-to-r from-primary/5 via-brand-purple/5 to-accent/5 rounded-3xl p-8 border border-gray-200">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* System Status */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold text-foreground">System Status</span>
              </div>
              <p className="text-text-secondary mb-4">
                All systems operational. 99.98% uptime over the last 30 days.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Server" size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">API: Healthy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">DB: Optimal</span>
                </div>
              </div>
            </div>

            {/* Processing Queue */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {Math.floor(Math.random() * 50) + 10}
              </div>
              <div className="text-sm text-text-secondary mb-4">
                Documents in Queue
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-1000" 
                  style={{ width: `${Math.floor(Math.random() * 40) + 20}%` }}
                ></div>
              </div>
            </div>

            {/* Global Reach */}
            <div className="text-center lg:text-right">
              <div className="flex items-center justify-center lg:justify-end space-x-3 mb-4">
                <Icon name="Globe" size={20} className="text-brand-purple" />
                <span className="text-lg font-semibold text-foreground">Global Reach</span>
              </div>
              <p className="text-text-secondary mb-4">
                Serving customers across 45+ countries with edge processing.
              </p>
              <div className="flex items-center justify-center lg:justify-end space-x-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-brand-purple">12ms</div>
                  <div className="text-xs text-text-secondary">Avg Latency</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-brand-purple">45+</div>
                  <div className="text-xs text-text-secondary">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-xs text-text-secondary">
            Last updated: {new Date()?.toLocaleTimeString()} • Updates every 3 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessingStats;