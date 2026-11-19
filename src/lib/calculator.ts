// Menyimpan fungsi murni untuk validasi input berat, aturan minimum charge 3 kg, dan kalkulasi total biaya.

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  WEIGHT_RULES,
  type MainService,
  type ServiceCode,
} from '@/src/config';

export interface ParsedWeightResult {
  valid: boolean;
  value: number | null;
  error?: string;
}

export interface PriceBreakdown {
  hasValidWeight: boolean;
  actualWeightKg: number | null;
  billedWeightKg: number | null;
  isMinChargeApplied: boolean;
  service: MainService;
  mainCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnCost: number;
  totalEstimate: number;
}

const SINGLE_DECIMAL_PATTERN = /^\d+(\.\d)?$/;

export function parseBeratInput(rawInput: string): ParsedWeightResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      value: null,
      error: 'Masukkan berat cucian minimal 0,1 kg, contoh 2,5.',
    };
  }

  const normalized = trimmed.replace(',', '.');
  if (!SINGLE_DECIMAL_PATTERN.test(normalized)) {
    return {
      valid: false,
      value: null,
      error: 'Gunakan maksimal satu angka di belakang koma, contoh 2,5.',
    };
  }

  const numericValue = Number(normalized);
  if (!Number.isFinite(numericValue) || numericValue < WEIGHT_RULES.minKg) {
    return {
      valid: false,
      value: null,
      error: 'Masukkan berat cucian minimal 0,1 kg, contoh 2,5.',
    };
  }

  return {
    valid: true,
    value: Math.round(numericValue * 10) / 10,
  };
}

export function hitungBeratDitagih(actualWeightKg: number): number {
  const minCharge = STORE_INFO.minimum_charge_kg;
  return Math.max(minCharge, Math.round(actualWeightKg * 10) / 10);
}

export function hitungEstimasiBiaya(params: {
  serviceCode: ServiceCode;
  actualWeightKg: number | null;
  useDelivery: boolean;
  useFragrance: boolean;
}): PriceBreakdown {
  const service =
    MAIN_SERVICES.find((item) => item.code === params.serviceCode) ?? MAIN_SERVICES[0];
  const deliveryAddOn = ADD_ONS.find((item) => item.code === 'T01');
  const fragranceAddOn = ADD_ONS.find((item) => item.code === 'T02');

  if (params.actualWeightKg === null || params.actualWeightKg < WEIGHT_RULES.minKg) {
    return {
      hasValidWeight: false,
      actualWeightKg: null,
      billedWeightKg: null,
      isMinChargeApplied: false,
      service,
      mainCost: 0,
      deliveryCost: 0,
      fragranceCost: 0,
      addOnCost: 0,
      totalEstimate: 0,
    };
  }

  const actualTenths = Math.round(params.actualWeightKg * 10);
  const minTenths = Math.round(STORE_INFO.minimum_charge_kg * 10);
  const billedTenths = Math.max(minTenths, actualTenths);
  const billedWeightKg = billedTenths / 10;
  const isMinChargeApplied = actualTenths < minTenths;

  const mainCost = Math.round((billedTenths * service.price_per_kg) / 10);
  const deliveryCost = params.useDelivery && deliveryAddOn ? deliveryAddOn.price : 0;
  const fragranceCost =
    params.useFragrance && fragranceAddOn
      ? Math.round((billedTenths * fragranceAddOn.price) / 10)
      : 0;
  const addOnCost = deliveryCost + fragranceCost;
  const totalEstimate = mainCost + addOnCost;

  return {
    hasValidWeight: true,
    actualWeightKg: actualTenths / 10,
    billedWeightKg,
    isMinChargeApplied,
    service,
    mainCost,
    deliveryCost,
    fragranceCost,
    addOnCost,
    totalEstimate,
  };
}
