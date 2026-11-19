// Menampilkan pilihan checkbox layanan tambahan terintegrasi (FT-03): Antar-Jemput dan Pewangi Premium.
'use client';

import { Check } from 'lucide-react';
import { ADD_ONS } from '@/src/config';
import { formatRupiah } from '@/src/lib/format';

interface AddOnOptionsProps {
  useDelivery: boolean;
  useFragrance: boolean;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
  deliveryCost: number;
  fragranceCost: number;
  hasValidWeight: boolean;
}

export default function AddOnOptions({
  useDelivery,
  useFragrance,
  onToggleDelivery,
  onToggleFragrance,
  deliveryCost,
  fragranceCost,
  hasValidWeight,
}: AddOnOptionsProps) {
  return (
    <section aria-labelledby="addons-heading" className="bg-white rounded-2xl p-4 sm:p-6">
      <h2 id="addons-heading" className="text-lg font-semibold text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="mt-4 space-y-3">
        {ADD_ONS.map((addon) => {
          const isDelivery = addon.code === 'T01';
          const checked = isDelivery ? useDelivery : useFragrance;
          const onToggle = isDelivery ? onToggleDelivery : onToggleFragrance;
          const computedPrice = isDelivery ? deliveryCost : fragranceCost;

          return (
            <label
              key={addon.code}
              className={`flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl border p-4 transition-[border-color,background-color] duration-150 ease-out motion-reduce:transition-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-700 ${
                checked
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onToggle(event.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                  checked
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {checked ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                  <span className="text-base font-medium text-neutral-900">
                    {addon.label}
                  </span>
                  {checked && (isDelivery || hasValidWeight) ? (
                    <span className="text-sm font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                      +{formatRupiah(computedPrice)}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-neutral-600">{addon.notes}</p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
