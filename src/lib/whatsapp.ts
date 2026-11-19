// Menyimpan fungsi validasi form pemesan dan penyusunan teks serta tautan deep-link WhatsApp sesuai PRD.

import {
  STORE_INFO,
  WHATSAPP_EMPTY_NOTES_TEXT,
  WHATSAPP_NO_DELIVERY_TEXT,
} from '@/src/config';
import { parseBeratInput, type PriceBreakdown } from '@/src/lib/calculator';
import { formatBerat, formatNominal } from '@/src/lib/format';

export interface OrderValidationErrors {
  weight?: string;
  customerName?: string;
  pickupAddress?: string;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: OrderValidationErrors;
  firstErrorField: keyof OrderValidationErrors | null;
}

export function validateOrderForm(params: {
  weightInput: string;
  customerName: string;
  pickupAddress: string;
  useDelivery: boolean;
}): OrderValidationResult {
  const errors: OrderValidationErrors = {};
  const weightParsed = parseBeratInput(params.weightInput);

  if (!weightParsed.valid) {
    errors.weight = weightParsed.error;
  }

  if (params.customerName.trim().length === 0) {
    errors.customerName = 'Isi nama lengkap atau panggilan Anda, contoh Budi Santoso.';
  }

  if (params.useDelivery && params.pickupAddress.trim().length === 0) {
    errors.pickupAddress =
      'Isi alamat lengkap penjemputan (maks 5 km), contoh Jl. Melati No. 12.';
  }

  const firstErrorField: keyof OrderValidationErrors | null = errors.weight
    ? 'weight'
    : errors.customerName
      ? 'customerName'
      : errors.pickupAddress
        ? 'pickupAddress'
        : null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}

export function buildWhatsAppMessage(params: {
  customerName: string;
  pickupAddress: string;
  notes: string;
  useDelivery: boolean;
  useFragrance: boolean;
  breakdown: PriceBreakdown;
}): string {
  const { breakdown } = params;
  const cleanName = params.customerName.trim();
  const cleanAddress = params.pickupAddress.trim();
  const cleanNotes = params.notes.trim();

  const actualWeightText = formatBerat(breakdown.actualWeightKg ?? 0);
  const billedWeightText = formatBerat(breakdown.billedWeightKg ?? 0);

  const deliveryLine = params.useDelivery
    ? `Ya (+Rp ${formatNominal(breakdown.deliveryCost)})`
    : 'Tidak';
  const fragranceLine = params.useFragrance
    ? `Ya (+Rp ${formatNominal(breakdown.fragranceCost)})`
    : 'Tidak';
  const addressText = params.useDelivery ? cleanAddress : WHATSAPP_NO_DELIVERY_TEXT;
  const notesText = cleanNotes.length > 0 ? cleanNotes : WHATSAPP_EMPTY_NOTES_TEXT;
  const totalText = formatNominal(breakdown.totalEstimate);

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Layanan Utama:* ${breakdown.service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${addressText}`,
    `*Catatan Khusus:* ${notesText}`,
    '',
    `*Estimasi Total Biaya:* *Rp ${totalText}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STORE_INFO.whatsapp_number}?text=${encodeURIComponent(message)}`;
}
