import React from 'react';
import { CheckCircle, Euro, Clock, MapPin, Users, ArrowLeft, ArrowRight } from 'lucide-react';

interface CompensationCalculatorProps {
  flightData: any;
  personalData: any;
  onBack: () => void;
  onNext: () => void;
}

const CompensationCalculator: React.FC<CompensationCalculatorProps> = ({ 
  flightData, 
  personalData, 
  onBack, 
  onNext 
}) => {
  // Calculate compensation based on flight distance and delay
  const calculateCompensation = () => {
    // This is a simplified calculation - in reality, you'd use actual distance calculation
    const distance = getFlightDistance(flightData.departureAirport, flightData.arrivalAirport);
    const passengers = parseInt(flightData.passengers);
    
    let perPassenger = 0;
    if (distance <= 1500) {
      perPassenger = 250;
    } else if (distance <= 3500) {
      perPassenger = 400;
    } else {
      perPassenger = 600;
    }
    
    return {
      perPassenger,
      total: perPassenger * passengers,
      distance,
      passengers
    };
  };

  const getFlightDistance = (from: string, to: string) => {
    // Simplified distance calculation - in reality, you'd use a proper API
    const distances: { [key: string]: number } = {
      'london-paris': 344,
      'london-berlin': 933,
      'london-new york': 5585,
      'paris-rome': 1105,
      'berlin-madrid': 1869,
      'default': 2000
    };
    
    const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
    return distances[key] || distances['default'];
  };

  const compensation = calculateCompensation();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to personal details
        </button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Compensation Estimate
        </h1>
        <p className="text-xl text-gray-600">
          Based on your flight details, here's what you could be entitled to
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Compensation Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Euro className="h-10 w-10 text-white" />
            </div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              €{compensation.total.toLocaleString()}
            </div>
            <div className="text-gray-600">
              Total compensation for {compensation.passengers} passenger{compensation.passengers > 1 ? 's' : ''}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div className="flex items-center">
                <Euro className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-semibold">Per passenger</span>
              </div>
              <span className="text-xl font-bold text-blue-600">€{compensation.perPassenger}</span>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-semibold">Passengers</span>
              </div>
              <span className="text-xl font-bold">{compensation.passengers}</span>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-semibold">Flight distance</span>
              </div>
              <span className="text-xl font-bold">{compensation.distance.toLocaleString()} km</span>
            </div>
          </div>
        </div>

        {/* Flight Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Flight Summary</h3>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Flight</span>
                <span className="font-semibold">{flightData.flightNumber}</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-semibold">
                  {flightData.departureAirport} → {flightData.arrivalAirport}
                </span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">
                  {new Date(flightData.departureDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Passenger</span>
                <span className="font-semibold">
                  {personalData.firstName} {personalData.lastName}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Eligible for compensation</span>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Your flight qualifies for compensation under EU Regulation 261/2004
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold mb-2">Submit Your Claim</h4>
            <p className="text-sm text-gray-600">Complete your claim submission with all required documents</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">2</span>
            </div>
            <h4 className="font-semibold mb-2">We Handle Everything</h4>
            <p className="text-sm text-gray-600">Our legal team contacts the airline and handles all negotiations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Your Money</h4>
            <p className="text-sm text-gray-600">Receive your compensation directly to your bank account</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-600">
          <p><strong>No win, no fee</strong> - We only charge if we win your case</p>
          <p>Our fee: 25% + VAT (you keep €{Math.round(compensation.total * 0.75).toLocaleString()})</p>
        </div>
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-semibold text-lg"
        >
          <span>Submit My Claim</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CompensationCalculator;