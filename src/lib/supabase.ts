import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Claim {
  id: string;
  claim_reference: string;
  user_id: string;
  claim_type: 'delay' | 'cancellation' | 'overbooking' | 'baggage';
  status: 'submitted' | 'under_review' | 'in_progress' | 'airline_contacted' | 'negotiating' | 'approved' | 'paid' | 'rejected' | 'closed';
  total_compensation: number;
  commission_fee: number;
  net_compensation: number;
  created_at: string;
  updated_at: string;
}

export interface FlightDetails {
  id: string;
  claim_id: string;
  flight_number: string;
  airline?: string;
  departure_date: string;
  departure_airport: string;
  arrival_airport: string;
  passengers: number;
  scheduled_departure?: string;
  actual_departure?: string;
  scheduled_arrival?: string;
  actual_arrival?: string;
  flight_distance?: number;
  created_at: string;
}

export interface PersonalDetails {
  id: string;
  claim_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  booking_reference?: string;
  ticket_number?: string;
  created_at: string;
}

export interface PaymentDetails {
  id: string;
  claim_id: string;
  card_number_hash: string;
  card_last_four: string;
  card_type?: 'Visa' | 'Mastercard' | 'American Express' | 'Discover' | 'Other';
  expiry_month: string;
  expiry_year: string;
  cardholder_name: string;
  billing_address: string;
  billing_city: string;
  billing_country: string;
  billing_postal_code: string;
  same_as_personal: boolean;
  created_at: string;
}

export interface ClaimDocument {
  id: string;
  claim_id: string;
  document_type: 'boarding_pass' | 'receipt' | 'id_document' | 'bank_statement' | 'other';
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  uploaded_at: string;
}

export interface ClaimCommunication {
  id: string;
  claim_id: string;
  communication_type: 'email' | 'phone' | 'letter' | 'internal_note';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  sent_at: string;
  created_by?: string;
}