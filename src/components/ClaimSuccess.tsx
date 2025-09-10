import React from 'react';
import { CheckCircle, Mail, Phone, FileText, Calendar } from 'lucide-react';

interface ClaimSuccessProps {
  claimId: string;
  compensation: number;
}

const ClaimSuccess: React.FC<ClaimSuccessProps> = ({ claimId, compensation }) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Claim Successfully Submitted!
        </h1>
        <p className="text-xl text-gray-600">
          Your compensation claim has been received and is being processed
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              €{compensation.toLocaleString()}
            </div>
            <div className="text-gray-600">Potential Compensation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {claimId}
            </div>
            <div className="text-gray-600">Your Claim Reference</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">What happens next?</h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Confirmation</h4>
              <p className="text-sm text-gray-600">
                You'll receive a confirmation email with your claim details and reference number within the next few minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Document Review</h4>
              <p className="text-sm text-gray-600">
                Our legal experts will review your case and may request additional documents if needed.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Airline Contact</h4>
              <p className="text-sm text-gray-600">
                We'll contact the airline on your behalf and handle all negotiations and legal proceedings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Regular Updates</h4>
              <p className="text-sm text-gray-600">
                We'll keep you informed throughout the process with regular status updates via email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
        <div className="text-left space-y-3 text-sm text-gray-600">
          <p>
            <strong>Processing Time:</strong> Most claims are resolved within 2-8 weeks, though complex cases may take longer.
          </p>
          <p>
            <strong>No Win, No Fee:</strong> You only pay our 25% + VAT commission if we successfully recover your compensation.
          </p>
          <p>
            <strong>Success Rate:</strong> We have a 98% success rate for eligible claims and will only pursue cases we believe we can win.
          </p>
          <p>
            <strong>Communication:</strong> All correspondence with the airline will be handled by our legal team. Please don't contact the airline directly about this claim.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Track My Claim
        </button>
        <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
          Submit Another Claim
        </button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Questions? Contact our support team at <a href="mailto:support@airhelp.com" className="text-blue-600 hover:underline">support@airhelp.com</a> or call +44 20 3808 2595</p>
      </div>
    </div>
  );
};

export default ClaimSuccess;