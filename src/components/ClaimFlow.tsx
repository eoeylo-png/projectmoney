import React, { useState } from 'react';
import ClaimTypeSelector from './ClaimTypeSelector';
import FlightDetailsForm from './FlightDetailsForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import CompensationCalculator from './CompensationCalculator';
import ClaimSuccess from './ClaimSuccess';

const ClaimFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [claimType, setClaimType] = useState('');
  const [flightData, setFlightData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [claimId] = useState(`AH${Date.now().toString().slice(-6)}`);

  const steps = [
    'Select Issue',
    'Flight Details', 
    'Personal Details',
    'Compensation',
    'Success'
  ];

  const handleTypeSelect = (type: string) => {
    setClaimType(type);
    setCurrentStep(1);
  };

  const handleFlightDetails = (data: any) => {
    setFlightData(data);
    setCurrentStep(2);
  };

  const handlePersonalDetails = (data: any) => {
    setPersonalData(data);
    setCurrentStep(3);
  };

  const handleSubmitClaim = () => {
    setCurrentStep(4);
  };

  const calculateTotalCompensation = () => {
    const passengers = parseInt((flightData as any).passengers || '1');
    // Simplified calculation
    return 400 * passengers;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {steps.slice(0, -1).map((step, index) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center space-x-2 ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="hidden sm:block font-medium">{step}</span>
                  </div>
                  {index < steps.length - 2 && (
                    <div className={`w-12 h-0.5 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[600px]">
          {currentStep === 0 && (
            <ClaimTypeSelector onSelectType={handleTypeSelect} />
          )}
          
          {currentStep === 1 && (
            <FlightDetailsForm
              claimType={claimType}
              onBack={() => setCurrentStep(0)}
              onNext={handleFlightDetails}
            />
          )}
          
          {currentStep === 2 && (
            <PersonalDetailsForm
              onBack={() => setCurrentStep(1)}
              onNext={handlePersonalDetails}
            />
          )}
          
          {currentStep === 3 && (
            <CompensationCalculator
              flightData={flightData}
              personalData={personalData}
              onBack={() => setCurrentStep(2)}
              onNext={handleSubmitClaim}
            />
          )}
          
          {currentStep === 4 && (
            <ClaimSuccess
              claimId={claimId}
              compensation={calculateTotalCompensation()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimFlow;