import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Lock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

interface PersonalDetailsFormProps {
  onBack: () => void;
  onNext: (data: any) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    bookingReference: '',
    ticketNumber: '',
    // Card details
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingCountry: '',
    billingPostalCode: '',
    sameAsPersonal: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
      
      // Auto-fill billing address if same as personal
      if (name === 'sameAsPersonal' && checked) {
        setFormData(prev => ({
          ...prev,
          sameAsPersonal: true,
          billingAddress: prev.address,
          billingCity: prev.city,
          billingCountry: prev.country,
          billingPostalCode: prev.postalCode
        }));
      }
    } else {
      // Format card number with spaces
      let formattedValue = value;
      if (name === 'cardNumber') {
        formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
      }
      
      // Format CVV (max 4 digits)
      if (name === 'cvv') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
      }
      
    setFormData({
      ...formData,
        [name]: formattedValue
    });
    }
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    return '';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to flight details
        </button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Personal Details
        </h1>
        <p className="text-xl text-gray-600">
          We need your information and payment details to process your compensation claim
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 123 456 7890"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select country</option>
              <option value="UK">United Kingdom</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="AT">Austria</option>
              <option value="CH">Switzerland</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Card Details Section */}
        <div className="border-t pt-6">
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
              <p className="text-sm text-gray-600">Secure payment processing - we only charge if we win your case</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {getCardType(formData.cardNumber) && (
                  <div className="absolute right-3 top-3 text-sm font-semibold text-gray-600">
                    {getCardType(formData.cardNumber)}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Month *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Year *
              </label>
              <select
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVV/CVC *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">3-4 digits on the back of your card</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="Name as it appears on card"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address Section */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsPersonal"
                checked={formData.sameAsPersonal}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
              />
              <span className="text-sm text-gray-700">Same as personal address</span>
            </label>
          </div>

          {!formData.sameAsPersonal && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Billing Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!formData.sameAsPersonal}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="billingCity"
                  value={formData.billingCity}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!formData.sameAsPersonal}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!formData.sameAsPersonal}
                >
                  <option value="">Select country</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="billingPostalCode"
                  value={formData.billingPostalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!formData.sameAsPersonal}
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Information (Optional)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Booking Reference
              </label>
              <input
                type="text"
                name="bookingReference"
                value={formData.bookingReference}
                onChange={handleChange}
                placeholder="e.g. ABC123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ticket Number
              </label>
              <input
                type="text"
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleChange}
                placeholder="e.g. 1234567890123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-t pt-6">
          <p className="text-sm text-blue-800">
            <strong>Security & Privacy:</strong> Your payment and personal information is encrypted and secure. We comply with PCI DSS standards and GDPR. We only charge our 25% + VAT fee if we successfully win your case.
          </p>
        </div>

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

export default PersonalDetailsForm;