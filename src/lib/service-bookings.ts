import fs from "fs";
import path from "path";
import crypto from "crypto";

export type BookingPaymentStatus =
  | "PAYMENT_VERIFICATION_PENDING"
  | "PAYMENT_VERIFIED"
  | "PAYMENT_REJECTED"
  | "CANCELLED";

export interface ServiceBookingRecord {
  id: string;
  booking_reference: string;
  customer_name: string;
  business_name: string;
  phone: string;
  email: string | null;
  location: string | null;
  service_slug: string;
  service_name: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: BookingPaymentStatus;
  upi_id: string;
  utr: string | null;
  customer_note: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceBookingInput {
  customer_name: string;
  business_name: string;
  phone: string;
  email?: string;
  location?: string;
  service_slug: string;
  service_name: string;
  utr?: string;
  customer_note?: string;
  ip_address?: string;
  user_agent?: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const BOOKINGS_FILE = path.join(DATA_DIR, "service_bookings.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readBookings(): ServiceBookingRecord[] {
  ensureDataDir();
  if (!fs.existsSync(BOOKINGS_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("[Service Bookings Storage]: Error reading file:", err);
    return [];
  }
}

function writeBookings(bookings: ServiceBookingRecord[]) {
  ensureDataDir();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export function generateBookingReference(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `VNX-${yyyy}${mm}${dd}-${randomSuffix}`;
}

export async function saveServiceBooking(
  input: CreateServiceBookingInput
): Promise<ServiceBookingRecord> {
  const now = new Date().toISOString();
  const reference = generateBookingReference();

  const record: ServiceBookingRecord = {
    id: crypto.randomUUID(),
    booking_reference: reference,
    customer_name: input.customer_name.trim(),
    business_name: input.business_name.trim(),
    phone: input.phone.trim(),
    email: input.email ? input.email.trim() : null,
    location: input.location ? input.location.trim() : null,
    service_slug: input.service_slug,
    service_name: input.service_name,
    amount: 999, // Server-enforced fixed ₹999
    currency: "INR",
    payment_method: "UPI_QR",
    payment_status: "PAYMENT_VERIFICATION_PENDING",
    upi_id: "9457727770@ybl",
    utr: input.utr ? input.utr.trim() : null,
    customer_note: input.customer_note ? input.customer_note.trim() : null,
    ip_address: input.ip_address || null,
    user_agent: input.user_agent || null,
    created_at: now,
    updated_at: now,
  };

  const existing = readBookings();
  existing.unshift(record);
  writeBookings(existing);

  return record;
}

export function getServiceBookingByReference(
  reference: string
): ServiceBookingRecord | undefined {
  const all = readBookings();
  return all.find((b) => b.booking_reference === reference);
}
