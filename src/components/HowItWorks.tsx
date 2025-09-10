import React from 'react';
import { FileText, Scale, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Submit Your Claim',
    description: 'Tell us about your flight disruption. It takes just 3 minutes to submit your claim.',
    step: '01'
  },
  {
    icon: Scale,
    title: 'We Handle Everything',
    description: 'Our legal experts handle all the paperwork and negotiations with the airline.',
    step: '02'
  },
  {
    icon: CreditCard,
    title: 'Get Your Money',
    description: 'Receive your compensation directly to your bank account. No win, no fee.',
    step: '03'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your flight compensation is simple. We handle everything so you don't have to deal with airlines directly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.step}
                </div>
                
                {/* Card */}
                <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:bg-blue-50 h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
            Start Your Claim Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;