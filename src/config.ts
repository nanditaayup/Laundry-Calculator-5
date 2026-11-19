// Menyimpan seluruh data bisnis resmi dari PRD dan token konfigurasi LaundryCalc.

export interface StoreInfo {
  name: string;
  whatsapp_number: string;
  opening_hours: string;
  pickup_hours: string;
  pickup_radius_max_km: number;
  minimum_charge_kg: number;
}

export type ServiceCode = 'L01' | 'L02' | 'L03';

export interface MainService {
  code: ServiceCode;
  name: string;
  price_per_kg: number;
  duration_days: number;
  description: string;
}

export type AddOnCode = 'T01' | 'T02';
export type AddOnCalculationType = 'flat' | 'per_billed_kg';

export interface AddOnService {
  code: AddOnCode;
  name: string;
  label: string;
  price: number;
  calculation_type: AddOnCalculationType;
  notes: string;
}

export const STORE_INFO: StoreInfo = {
  name: 'Laundry Shimmering',
  whatsapp_number: '628xxxxxxxxxx',
  opening_hours: '08:00 - 20:00 WIB',
  pickup_hours: '09:00 - 17:00 WIB',
  pickup_radius_max_km: 5,
  minimum_charge_kg: 3.0,
};

export const MAIN_SERVICES: MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    price_per_kg: 6000,
    duration_days: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    price_per_kg: 8000,
    duration_days: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    price_per_kg: 15000,
    duration_days: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
];

export const ADD_ONS: AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    label: 'Antar-Jemput (+Rp 10.000)',
    price: 10000,
    calculation_type: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    label: 'Pewangi Premium Downy (+Rp 2.000/kg ditagih)',
    price: 2000,
    calculation_type: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
];

export const WEIGHT_RULES = {
  minKg: 0.1,
  stepKg: 0.1,
  maxDecimalPlaces: 1,
} as const;

export const ESTIMATION_CLAUSE =
  'Total di atas adalah estimasi awal sebelum penimbangan fisik oleh kasir atau kurir laundry.';

export const WHATSAPP_NO_DELIVERY_TEXT = 'Antar Sendiri ke Toko';
export const WHATSAPP_EMPTY_NOTES_TEXT = '-';
