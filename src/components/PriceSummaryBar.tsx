// Menampilkan ringkasan estimasi biaya secara live (FT-04) dan tombol kirim WhatsApp (FT-06).
'use client';

import { Send } from 'lucide-react';
import { ESTIMATION_CLAUSE } from '@/src/config';
import type { PriceBreakdown } from '@/src/lib/calculator';
import { formatBerat, formatRupiah } from '@/src/lib/format';

interface PriceSummaryBarProps {
  breakdown: PriceBreakdown;
  useDelivery: boolean;
  useFragrance: boolean;
  formId: string;
}

export default function PriceSummaryBar({
  breakdown,
  useDelivery,
  useFragrance,
  formId,
}: PriceSummaryBarProps) {
  const billedWeightLabel =
    breakdown.billedWeightKg !== null ? `${formatBerat(breakdown.billedWeightKg)} kg` : '-';

  return (
    <>
      {/* Panel ringkasan sticky untuk layar desktop */}
      <aside
        aria-label="Ringkasan Estimasi Biaya"
        className="hidden lg:block sticky top-6 rounded-2xl bg-white p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900">Ringkasan Biaya</h2>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-2 text-neutral-600">
            <span>Layanan terpilih</span>
            <span className="font-medium text-neutral-900 text-right">
              {breakdown.service.name}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2 text-neutral-600">
            <span>Berat ditagih</span>
            <span className="font-medium text-neutral-900 tabular-nums">
              {billedWeightLabel}
            </span>
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-neutral-600">Biaya Layanan Utama</span>
              <span className="font-medium text-neutral-900 tabular-nums">
                {formatRupiah(breakdown.mainCost)}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-neutral-600">Biaya Tambahan</span>
              <span className="font-medium text-neutral-900 tabular-nums">
                {formatRupiah(breakdown.addOnCost)}
              </span>
            </div>

            {useDelivery ? (
              <div className="flex items-baseline justify-between gap-2 pl-3 text-neutral-600">
                <span>Antar-Jemput</span>
                <span className="tabular-nums">{formatRupiah(breakdown.deliveryCost)}</span>
              </div>
            ) : null}

            {useFragrance ? (
              <div className="flex items-baseline justify-between gap-2 pl-3 text-neutral-600">
                <span>Pewangi Premium</span>
                <span className="tabular-nums">{formatRupiah(breakdown.fragranceCost)}</span>
              </div>
            ) : null}
          </div>

          <div className="border-t border-neutral-200 pt-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-base font-medium text-neutral-900">
                Total Estimasi Biaya
              </span>
              <span className="text-3xl font-semibold text-neutral-900 tabular-nums">
                {formatRupiah(breakdown.totalEstimate)}
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">{ESTIMATION_CLAUSE}</p>
          </div>
        </div>

        <button
          type="submit"
          form={formId}
          className="mt-6 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-blue-800 active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Send className="h-4 w-4 shrink-0" />
          <span>Kirim Pesanan ke WhatsApp</span>
        </button>
      </aside>

      {/* Bilah ringkas menempel di bawah layar untuk mobile (<= 15% tinggi layar) */}
      <div
        aria-label="Ringkasan Estimasi Biaya"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-neutral-200 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-2 text-sm text-neutral-600 tabular-nums">
            <span className="truncate">
              Utama {formatRupiah(breakdown.mainCost)} · Tambahan{' '}
              {formatRupiah(breakdown.addOnCost)}
            </span>
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-xl font-semibold text-neutral-900 tabular-nums">
                {formatRupiah(breakdown.totalEstimate)}
              </span>
            </div>

            <button
              type="submit"
              form={formId}
              className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-[background-color,transform] duration-150 ease-out hover:bg-blue-800 active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <Send className="h-4 w-4 shrink-0" />
              <span>Kirim ke WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
