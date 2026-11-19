// Menyediakan kolom input estimasi berat cucian (FT-02) dan notifikasi otomatis minimum charge 3 kg.
'use client';

import type { RefObject } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { STORE_INFO } from '@/src/config';
import { formatBerat } from '@/src/lib/format';

interface WeightInputProps {
  value: string;
  onChange: (nextValue: string) => void;
  billedWeightKg: number | null;
  isMinChargeApplied: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function WeightInput({
  value,
  onChange,
  billedWeightKg,
  isMinChargeApplied,
  error,
  inputRef,
}: WeightInputProps) {
  const minChargeText = formatBerat(STORE_INFO.minimum_charge_kg);

  return (
    <section aria-labelledby="weight-heading" className="bg-white rounded-2xl p-4 sm:p-6">
      <h2 id="weight-heading" className="text-lg font-semibold text-neutral-900">
        Estimasi Berat Cucian
      </h2>

      <div className="mt-4">
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-neutral-900"
        >
          Berat cucian (kg)
        </label>

        <div className="mt-2 relative flex items-center">
          <input
            ref={inputRef}
            id="weight-input"
            name="weight"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Contoh: 2,5"
            aria-invalid={Boolean(error)}
            aria-describedby="weight-helper weight-status"
            className={`w-full min-h-[44px] rounded-xl border bg-white px-4 pr-12 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              error ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 text-sm font-medium text-neutral-600"
          >
            kg
          </span>
        </div>

        <p id="weight-helper" className="mt-2 text-sm text-neutral-600">
          Minimal 0,1 kg, maksimal satu angka desimal (contoh 2,5).
        </p>

        <div id="weight-status" aria-live="polite" className="mt-3">
          {error ? (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : isMinChargeApplied ? (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Ketentuan minimum charge {minChargeText} kg diberlakukan (berat ditagih:{' '}
                {minChargeText} kg).
              </span>
            </div>
          ) : billedWeightKg !== null ? (
            <p className="text-sm text-neutral-600 tabular-nums">
              Berat ditagih sesuai estimasi: {formatBerat(billedWeightKg)} kg.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
