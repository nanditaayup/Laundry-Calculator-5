// Menampilkan katalog paket layanan laundry (FT-01) lengkap dengan deskripsi, durasi, dan tarif dasar di atas kalkulator.
'use client';

import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '@/src/config';
import { formatRupiah } from '@/src/lib/format';
import { useOrderService } from '@/src/components/OrderContext';

interface ServiceCatalogProps {
  selectedCode?: ServiceCode;
  onSelect?: (code: ServiceCode) => void;
}

export default function ServiceCatalog({
  selectedCode,
  onSelect,
}: ServiceCatalogProps) {
  const orderCtx = useOrderService();
  const activeCode = selectedCode ?? orderCtx.serviceCode;
  const handleSelect = onSelect ?? orderCtx.setServiceCode;

  return (
    <section aria-labelledby="catalog-heading">
      <h2 id="catalog-heading" className="text-lg font-semibold text-neutral-900">
        Katalog Layanan
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="catalog-heading"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === activeCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(service.code)}
              className={`flex min-h-[44px] w-full flex-col justify-between rounded-2xl border p-5 text-left transition-[border-color,background-color] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-base font-semibold text-neutral-900">
                    {service.name}
                  </span>
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

                <p className="mt-2 text-xl font-semibold text-blue-700 tabular-nums">
                  {formatRupiah(service.price_per_kg)}/kg
                </p>

                <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
              </div>

              <p className="mt-4 border-t border-neutral-200 pt-3 text-sm font-medium text-neutral-600 tabular-nums">
                Estimasi selesai {service.duration_days} hari
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
