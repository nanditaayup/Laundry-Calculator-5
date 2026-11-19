// Menampilkan daftar paket layanan utama (FT-01) lengkap dengan tarif per kg, durasi, dan deskripsi.
'use client';

import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '@/src/config';
import { formatRupiah } from '@/src/lib/format';

interface ServiceCatalogProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export default function ServiceCatalog({
  selectedCode,
  onSelect,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="catalog-heading" className="bg-white rounded-2xl p-4 sm:p-6">
      <h2 id="catalog-heading" className="text-lg font-semibold text-neutral-900">
        Pilih Layanan Utama
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="catalog-heading"
        className="mt-4 grid grid-cols-1 gap-3"
      >
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(service.code)}
              className={`w-full min-h-[44px] text-left rounded-xl border p-4 transition-[border-color,background-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {service.name}
                    </span>
                    <span className="text-base font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                      {formatRupiah(service.price_per_kg)}/kg
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 tabular-nums">
                    Estimasi selesai {service.duration_days} hari
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{service.description}</p>
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isSelected ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
