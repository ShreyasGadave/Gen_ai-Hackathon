import React from 'react';
import Image from '../../../components/AppImage';

const ClientLogoBar = () => {
  const clients = [
    {
      name: "Microsoft",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=60&fit=crop&crop=center",
      industry: "Technology"
    },
    {
      name: "Goldman Sachs",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center",
      industry: "Finance"
    },
    {
      name: "Mayo Clinic",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=60&fit=crop&crop=center",
      industry: "Healthcare"
    },
    {
      name: "Baker McKenzie",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=60&fit=crop&crop=center",
      industry: "Legal"
    },
    {
      name: "Deloitte",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center",
      industry: "Consulting"
    },
    {
      name: "JPMorgan Chase",
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=120&h=60&fit=crop&crop=center",
      industry: "Banking"
    }
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            Trusted by industry leaders
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center space-x-12 lg:space-x-16">
            {clients?.map((client, index) => (
              <div
                key={client?.name}
                className="flex-shrink-0 group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative">
                  <div className="w-24 h-12 lg:w-32 lg:h-16 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-100 group-hover:scale-105">
                    <Image
                      src={client?.logo}
                      alt={`${client?.name} logo`}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{client?.name}</div>
                      <div className="text-gray-300">{client?.industry}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-text-secondary">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">15+</div>
            <div className="text-sm text-text-secondary">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">99.8%</div>
            <div className="text-sm text-text-secondary">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-text-secondary">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoBar;