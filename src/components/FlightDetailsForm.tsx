import React, { useState } from 'react';
import { Calendar, MapPin, Plane, Users, ArrowLeft, ArrowRight } from 'lucide-react';

interface FlightDetailsFormProps {
  claimType: string;
  onBack: () => void;
  onNext: (data: any) => void;
}

const FlightDetailsForm: React.FC<FlightDetailsFormProps> = ({ claimType, onBack, onNext }) => {
  const [formData, setFormData] = useState({
    flightNumber: '',
    airline: '',
    departureDate: '',
    departureAirport: '',
    arrivalAirport: '',
    passengers: '1',
    scheduledDeparture: '',
    actualDeparture: '',
    scheduledArrival: '',
    actualArrival: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTitle = () => {
    switch (claimType) {
      case 'delay': return 'Flight Delay Details';
      case 'cancellation': return 'Flight Cancellation Details';
      case 'overbooking': return 'Denied Boarding Details';
      case 'baggage': return 'Baggage Issue Details';
      default: return 'Flight Details';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to claim types
        </button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getTitle()}
        </h1>
        <p className="text-xl text-gray-600">
          Please provide your flight information to calculate your compensation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Flight Number *
            </label>
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="e.g. BA123, LH456"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Airline
            </label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              placeholder="e.g. British Airways"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Flight Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Passengers *
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From (Departure Airport) *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="departureAirport"
                value={formData.departureAirport}
                onChange={handleChange}
                placeholder="e.g. London Heathrow (LHR)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To (Arrival Airport) *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={handleChange}
                placeholder="e.g. Paris Charles de Gaulle (CDG)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {(claimType === 'delay' || claimType === 'cancellation') && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Flight Times
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scheduled Departure Time
                </label>
                <input
                  type="time"
                  name="scheduledDeparture"
                  value={formData.scheduledDeparture}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Actual Departure Time
                </label>
                <input
                  type="time"
                  name="actualDeparture"
                  value={formData.actualDeparture}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scheduled Arrival Time
                </label>
                <input
                  type="time"
                  name="scheduledArrival"
                  value={formData.scheduledArrival}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Actual Arrival Time
                </label>
                <input
                  type="time"
                  name="actualArrival"
                  value={formData.actualArrival}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-semibold"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightDetailsForm;