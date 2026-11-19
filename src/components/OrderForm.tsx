// Menampilkan formulir data pemesan (FT-05): Nama Pemesan, Alamat Jemput kondisional, dan Catatan Khusus.
'use client';

import type { RefObject } from 'react';
import { AlertCircle } from 'lucide-react';
import { STORE_INFO } from '@/src/config';
import type { OrderValidationErrors } from '@/src/lib/whatsapp';

interface OrderFormProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  useDelivery: boolean;
  onCustomerNameChange: (value: string) => void;
  onPickupAddressChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  errors: OrderValidationErrors;
  customerNameRef: RefObject<HTMLInputElement | null>;
  pickupAddressRef: RefObject<HTMLTextAreaElement | null>;
}

export default function OrderForm({
  customerName,
  pickupAddress,
  notes,
  useDelivery,
  onCustomerNameChange,
  onPickupAddressChange,
  onNotesChange,
  errors,
  customerNameRef,
  pickupAddressRef,
}: OrderFormProps) {
  return (
    <section aria-labelledby="order-form-heading" className="bg-white rounded-2xl p-4 sm:p-6">
      <h2 id="order-form-heading" className="text-lg font-semibold text-neutral-900">
        Data Pemesan
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="customer-name-input"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan
          </label>
          <input
            ref={customerNameRef}
            id="customer-name-input"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'customer-name-error' : undefined}
            className={`mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          {errors.customerName ? (
            <div
              id="customer-name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errors.customerName}</span>
            </div>
          ) : null}
        </div>

        {useDelivery ? (
          <div className="transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none">
            <label
              htmlFor="pickup-address-input"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Jemput
            </label>
            <textarea
              ref={pickupAddressRef}
              id="pickup-address-input"
              name="pickupAddress"
              rows={2}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(event) => onPickupAddressChange(event.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, RT 02"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress
                  ? 'pickup-address-helper pickup-address-error'
                  : 'pickup-address-helper'
              }
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress ? 'border-red-600' : 'border-neutral-200'
              }`}
            />
            <p id="pickup-address-helper" className="mt-1.5 text-sm text-neutral-600">
              Radius penjemputan maksimal {STORE_INFO.pickup_radius_max_km} km dari toko.
            </p>
            {errors.pickupAddress ? (
              <div
                id="pickup-address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errors.pickupAddress}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          <label
            htmlFor="notes-input"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus (opsional)
          </label>
          <textarea
            id="notes-input"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="Contoh: pisahkan pakaian putih dan bahan sutra"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>
    </section>
  );
}
