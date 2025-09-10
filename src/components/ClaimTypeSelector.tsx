import React from 'react';
import { Clock, XCircle, Users, Luggage, ArrowRight } from 'lucide-react';

interface ClaimType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  compensation: string;
  examples: string[];
}

const claimTypes: ClaimType[] = [
  {
    id: 'delay',
    title: 'Flight Delay',
    description: 'Your flight was delayed by 3+ hours',
    icon: Clock,
    compensation: 'Up to €600',
    examples: ['Delayed departure', 'Long layovers', 'Technical issues']
  },
  {
    id: 'cancellation',
    title: 'Flight Cancellation',
    description: 'Your flight was cancelled by the airline',
    icon: XCircle,
    compensation: 'Up to €600',
    examples: ['Last-minute cancellation', 'Schedule changes', 'Crew issues']
  },
  {
    id: 'overbooking',
    title: 'Denied Boarding',
    description: 'You were denied boarding due to overbooking',
    icon: Users,
    compensation: 'Up to €600',
    examples: ['Overbooked flight', 'No available seats', 'Involuntary bumping']
  },
  {
    id: 'baggage',
    title: 'Baggage Issues',
    description: 'Lost, delayed, or damaged baggage',
    icon: Luggage,
    compensation: 'Up to €1,400',
    examples: ['Lost luggage', 'Delayed baggage', 'Damaged items']
  }
];

interface ClaimTypeSelectorProps {
  onSelectType: (type: string) => void;
}

const ClaimTypeSelector: React.FC<ClaimTypeSelectorProps> = ({ onSelectType }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          What happened to your flight?
        </h1>
        <p className="text-xl text-gray-600">
          Select the issue you experienced to start your compensation claim
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {claimTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{type.compensation}</div>
                  <div className="text-sm text-gray-500">compensation</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {type.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {type.description}
              </p>

              <div className="space-y-2 mb-6">
                {type.examples.map((example, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                    {example}
                  </div>
                ))}
              </div>

              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                <span>Start claim</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimTypeSelector;