import React from 'react';
import { Clock, MapPin, Euro } from 'lucide-react';

const compensationRules = [
  {
    distance: 'Up to 1,500 km',
    delay: '3+ hours',
    amount: '€250',
    examples: 'London → Paris, Berlin → Rome'
  },
  {
    distance: '1,500 - 3,500 km',
    delay: '3+ hours',
    amount: '€400',
    examples: 'London → Istanbul, Paris → Moscow'
  },
  {
    distance: 'Over 3,500 km',
    delay: '4+ hours',
    amount: '€600',
    examples: 'London → New York, Paris → Dubai'
  }
];

const CompensationRules = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Compensation amounts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your compensation depends on the flight distance and delay duration. Here's what you could be entitled to:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {compensationRules.map((rule, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Euro className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{rule.amount}</div>
                <div className="text-sm text-gray-500">per passenger</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">{rule.distance}</div>
                    <div className="text-sm text-gray-600">{rule.examples}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Delayed {rule.delay}</div>
                    <div className="text-sm text-gray-600">or cancelled</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Not sure about your compensation?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Use our free flight checker to find out exactly how much you're entitled to
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Check My Flight Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompensationRules;