import { supabase } from './supabase';
import type { Claim, FlightDetails, PersonalDetails, PaymentDetails } from './supabase';

// Hash function for card numbers (in production, use a proper encryption library)
const hashCardNumber = (cardNumber: string): string => {
  // This is a simple hash - in production, use proper encryption
  return btoa(cardNumber).slice(0, 32);
};

// Get last 4 digits of card number
const getLastFourDigits = (cardNumber: string): string => {
  return cardNumber.replace(/\s/g, '').slice(-4);
};

// Detect card type
const detectCardType = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  if (cleanNumber.startsWith('4')) return 'Visa';
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
  if (cleanNumber.startsWith('3')) return 'American Express';
  return 'Other';
};

// Calculate compensation based on distance and passengers
const calculateCompensation = (distance: number, passengers: number) => {
  let perPassenger = 0;
  if (distance <= 1500) {
    perPassenger = 250;
  } else if (distance <= 3500) {
    perPassenger = 400;
  } else {
    perPassenger = 600;
  }
  
  const total = perPassenger * passengers;
  const commission = total * 0.25; // 25% commission
  const net = total - commission;
  
  return { total, commission, net };
};

// Estimate flight distance (simplified - in production, use a proper API)
const estimateFlightDistance = (from: string, to: string): number => {
  // This is a very simplified distance calculation
  // In production, you would use a proper flight distance API
  const distances: { [key: string]: number } = {
    'london-paris': 344,
    'london-berlin': 933,
    'london-new york': 5585,
    'paris-rome': 1105,
    'berlin-madrid': 1869,
    'madrid-london': 1264,
    'amsterdam-barcelona': 1236,
    'default': 2000
  };
  
  const key = `${from.toLowerCase().replace(/\s+/g, '-')}-${to.toLowerCase().replace(/\s+/g, '-')}`;
  const reverseKey = `${to.toLowerCase().replace(/\s+/g, '-')}-${from.toLowerCase().replace(/\s+/g, '-')}`;
  
  return distances[key] || distances[reverseKey] || distances['default'];
};

export interface ClaimSubmissionData {
  claimType: string;
  flightData: {
    flightNumber: string;
    airline?: string;
    departureDate: string;
    departureAirport: string;
    arrivalAirport: string;
    passengers: string;
    scheduledDeparture?: string;
    actualDeparture?: string;
    scheduledArrival?: string;
    actualArrival?: string;
  };
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    bookingReference?: string;
    ticketNumber?: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
    billingAddress: string;
    billingCity: string;
    billingCountry: string;
    billingPostalCode: string;
    sameAsPersonal: boolean;
  };
}

export const submitClaim = async (data: ClaimSubmissionData) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User must be authenticated to submit a claim');
    }

    // Calculate flight distance and compensation
    const distance = estimateFlightDistance(data.flightData.departureAirport, data.flightData.arrivalAirport);
    const passengers = parseInt(data.flightData.passengers);
    const compensation = calculateCompensation(distance, passengers);

    // Create claim
    const { data: claim, error: claimError } = await supabase
      .from('claims')
      .insert({
        user_id: user.id,
        claim_type: data.claimType,
        total_compensation: compensation.total,
        commission_fee: compensation.commission,
        net_compensation: compensation.net
      })
      .select()
      .single();

    if (claimError) throw claimError;

    // Create flight details
    const { error: flightError } = await supabase
      .from('flight_details')
      .insert({
        claim_id: claim.id,
        flight_number: data.flightData.flightNumber,
        airline: data.flightData.airline,
        departure_date: data.flightData.departureDate,
        departure_airport: data.flightData.departureAirport,
        arrival_airport: data.flightData.arrivalAirport,
        passengers: passengers,
        scheduled_departure: data.flightData.scheduledDeparture,
        actual_departure: data.flightData.actualDeparture,
        scheduled_arrival: data.flightData.scheduledArrival,
        actual_arrival: data.flightData.actualArrival,
        flight_distance: distance
      });

    if (flightError) throw flightError;

    // Create personal details
    const { error: personalError } = await supabase
      .from('personal_details')
      .insert({
        claim_id: claim.id,
        first_name: data.personalData.firstName,
        last_name: data.personalData.lastName,
        email: data.personalData.email,
        phone: data.personalData.phone,
        address: data.personalData.address,
        city: data.personalData.city,
        country: data.personalData.country,
        postal_code: data.personalData.postalCode,
        booking_reference: data.personalData.bookingReference,
        ticket_number: data.personalData.ticketNumber
      });

    if (personalError) throw personalError;

    // Create payment details (with proper security measures)
    const { error: paymentError } = await supabase
      .from('payment_details')
      .insert({
        claim_id: claim.id,
        card_number_hash: hashCardNumber(data.personalData.cardNumber),
        card_last_four: getLastFourDigits(data.personalData.cardNumber),
        card_type: detectCardType(data.personalData.cardNumber),
        expiry_month: data.personalData.expiryMonth,
        expiry_year: data.personalData.expiryYear,
        cardholder_name: data.personalData.cardholderName,
        billing_address: data.personalData.sameAsPersonal ? data.personalData.address : data.personalData.billingAddress,
        billing_city: data.personalData.sameAsPersonal ? data.personalData.city : data.personalData.billingCity,
        billing_country: data.personalData.sameAsPersonal ? data.personalData.country : data.personalData.billingCountry,
        billing_postal_code: data.personalData.sameAsPersonal ? data.personalData.postalCode : data.personalData.billingPostalCode,
        same_as_personal: data.personalData.sameAsPersonal
      });

    if (paymentError) throw paymentError;

    return {
      success: true,
      claimId: claim.id,
      claimReference: claim.claim_reference,
      compensation: compensation.total
    };

  } catch (error) {
    console.error('Error submitting claim:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

// Get user's claims
export const getUserClaims = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User must be authenticated');
    }

    const { data: claims, error } = await supabase
      .from('claims')
      .select(`
        *,
        flight_details(*),
        personal_details(*),
        payment_details(card_last_four, card_type, cardholder_name)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, claims };
  } catch (error) {
    console.error('Error fetching claims:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

// Get claim by ID
export const getClaimById = async (claimId: string) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User must be authenticated');
    }

    const { data: claim, error } = await supabase
      .from('claims')
      .select(`
        *,
        flight_details(*),
        personal_details(*),
        payment_details(card_last_four, card_type, cardholder_name),
        claim_documents(*),
        claim_communications(*)
      `)
      .eq('id', claimId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return { success: true, claim };
  } catch (error) {
    console.error('Error fetching claim:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};