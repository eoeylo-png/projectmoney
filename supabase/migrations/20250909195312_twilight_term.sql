/*
  # AirHelp Database Schema

  1. New Tables
    - `claims`
      - `id` (uuid, primary key)
      - `claim_reference` (text, unique claim ID)
      - `user_id` (uuid, references auth.users)
      - `claim_type` (text, type of claim)
      - `status` (text, claim status)
      - `total_compensation` (numeric, total amount)
      - `commission_fee` (numeric, our fee)
      - `net_compensation` (numeric, amount user receives)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `flight_details`
      - `id` (uuid, primary key)
      - `claim_id` (uuid, references claims)
      - `flight_number` (text)
      - `airline` (text)
      - `departure_date` (date)
      - `departure_airport` (text)
      - `arrival_airport` (text)
      - `passengers` (integer)
      - `scheduled_departure` (time)
      - `actual_departure` (time)
      - `scheduled_arrival` (time)
      - `actual_arrival` (time)
      - `flight_distance` (integer, in km)

    - `personal_details`
      - `id` (uuid, primary key)
      - `claim_id` (uuid, references claims)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `country` (text)
      - `postal_code` (text)
      - `booking_reference` (text, optional)
      - `ticket_number` (text, optional)

    - `payment_details`
      - `id` (uuid, primary key)
      - `claim_id` (uuid, references claims)
      - `card_number_hash` (text, hashed card number)
      - `card_last_four` (text, last 4 digits)
      - `card_type` (text, Visa/Mastercard/etc)
      - `expiry_month` (text)
      - `expiry_year` (text)
      - `cardholder_name` (text)
      - `billing_address` (text)
      - `billing_city` (text)
      - `billing_country` (text)
      - `billing_postal_code` (text)
      - `same_as_personal` (boolean)

    - `claim_documents`
      - `id` (uuid, primary key)
      - `claim_id` (uuid, references claims)
      - `document_type` (text, boarding pass, receipt, etc)
      - `file_name` (text)
      - `file_url` (text)
      - `uploaded_at` (timestamp)

    - `claim_communications`
      - `id` (uuid, primary key)
      - `claim_id` (uuid, references claims)
      - `communication_type` (text, email, phone, letter)
      - `direction` (text, inbound/outbound)
      - `subject` (text)
      - `content` (text)
      - `sent_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own claims
    - Secure payment data with proper encryption
*/

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_reference text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  claim_type text NOT NULL CHECK (claim_type IN ('delay', 'cancellation', 'overbooking', 'baggage')),
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'in_progress', 'airline_contacted', 'negotiating', 'approved', 'paid', 'rejected', 'closed')),
  total_compensation numeric(10,2) DEFAULT 0,
  commission_fee numeric(10,2) DEFAULT 0,
  net_compensation numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create flight_details table
CREATE TABLE IF NOT EXISTS flight_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE NOT NULL,
  flight_number text NOT NULL,
  airline text,
  departure_date date NOT NULL,
  departure_airport text NOT NULL,
  arrival_airport text NOT NULL,
  passengers integer NOT NULL DEFAULT 1 CHECK (passengers > 0),
  scheduled_departure time,
  actual_departure time,
  scheduled_arrival time,
  actual_arrival time,
  flight_distance integer, -- in kilometers
  created_at timestamptz DEFAULT now()
);

-- Create personal_details table
CREATE TABLE IF NOT EXISTS personal_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  postal_code text NOT NULL,
  booking_reference text,
  ticket_number text,
  created_at timestamptz DEFAULT now()
);

-- Create payment_details table (sensitive data)
CREATE TABLE IF NOT EXISTS payment_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE NOT NULL,
  card_number_hash text NOT NULL, -- Store hashed version for security
  card_last_four text NOT NULL, -- Only store last 4 digits
  card_type text CHECK (card_type IN ('Visa', 'Mastercard', 'American Express', 'Discover', 'Other')),
  expiry_month text NOT NULL CHECK (expiry_month ~ '^(0[1-9]|1[0-2])$'),
  expiry_year text NOT NULL CHECK (expiry_year ~ '^[0-9]{4}$'),
  cardholder_name text NOT NULL,
  billing_address text NOT NULL,
  billing_city text NOT NULL,
  billing_country text NOT NULL,
  billing_postal_code text NOT NULL,
  same_as_personal boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create claim_documents table
CREATE TABLE IF NOT EXISTS claim_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL CHECK (document_type IN ('boarding_pass', 'receipt', 'id_document', 'bank_statement', 'other')),
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  mime_type text,
  uploaded_at timestamptz DEFAULT now()
);

-- Create claim_communications table
CREATE TABLE IF NOT EXISTS claim_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE NOT NULL,
  communication_type text NOT NULL CHECK (communication_type IN ('email', 'phone', 'letter', 'internal_note')),
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject text,
  content text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at);
CREATE INDEX IF NOT EXISTS idx_flight_details_claim_id ON flight_details(claim_id);
CREATE INDEX IF NOT EXISTS idx_personal_details_claim_id ON personal_details(claim_id);
CREATE INDEX IF NOT EXISTS idx_payment_details_claim_id ON payment_details(claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_documents_claim_id ON claim_documents(claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_communications_claim_id ON claim_communications(claim_id);

-- Enable Row Level Security
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_communications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for claims
CREATE POLICY "Users can view their own claims"
  ON claims
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own claims"
  ON claims
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own claims"
  ON claims
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for flight_details
CREATE POLICY "Users can view flight details for their claims"
  ON flight_details
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create flight details for their claims"
  ON flight_details
  FOR INSERT
  TO authenticated
  WITH CHECK (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update flight details for their claims"
  ON flight_details
  FOR UPDATE
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for personal_details
CREATE POLICY "Users can view personal details for their claims"
  ON personal_details
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create personal details for their claims"
  ON personal_details
  FOR INSERT
  TO authenticated
  WITH CHECK (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update personal details for their claims"
  ON personal_details
  FOR UPDATE
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for payment_details (extra security)
CREATE POLICY "Users can view payment details for their claims"
  ON payment_details
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create payment details for their claims"
  ON payment_details
  FOR INSERT
  TO authenticated
  WITH CHECK (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for claim_documents
CREATE POLICY "Users can view documents for their claims"
  ON claim_documents
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents for their claims"
  ON claim_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for claim_communications
CREATE POLICY "Users can view communications for their claims"
  ON claim_communications
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT id FROM claims WHERE user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_claims_updated_at
  BEFORE UPDATE ON claims
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate claim reference
CREATE OR REPLACE FUNCTION generate_claim_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.claim_reference = 'AH' || LPAD(EXTRACT(EPOCH FROM NOW())::bigint::text, 10, '0');
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically generate claim reference
CREATE TRIGGER generate_claim_reference_trigger
  BEFORE INSERT ON claims
  FOR EACH ROW
  EXECUTE FUNCTION generate_claim_reference();