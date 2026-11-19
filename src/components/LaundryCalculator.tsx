// Mengorkestrasi kalkulator berat, add-on, form pemesan, ringkasan biaya, dan kirim ke WhatsApp.
'use client';

import { useMemo, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { ESTIMATION_CLAUSE } from '@/src/config';
import { hitungEstimasiBiaya, parseBeratInput } from '@/src/lib/calculator';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateOrderForm,
  type OrderValidationErrors,
} from '@/src/lib/whatsapp';
import AddOnOptions from '@/src/components/AddOnOptions';
import { useOrderService } from '@/src/components/OrderContext';
import OrderForm from '@/src/components/OrderForm';
import PriceSummaryBar from '@/src/components/PriceSummaryBar';
import WeightInput from '@/src/components/WeightInput';

const ORDER_FORM_ID = 'laundry-order-form';

export default function LaundryCalculator() {
  const { serviceCode } = useOrderService();
  const [weightInput, setWeightInput] = useState<string>('3');
  const [useDelivery, setUseDelivery] = useState<boolean>(false);
  const [useFragrance, setUseFragrance] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [lastWaUrl, setLastWaUrl] = useState<string | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const customerNameRef = useRef<HTMLInputElement | null>(null);
  const pickupAddressRef = useRef<HTMLTextAreaElement | null>(null);

  const parsedWeight = useMemo(() => parseBeratInput(weightInput), [weightInput]);

  const breakdown = useMemo(
    () =>
      hitungEstimasiBiaya({
        serviceCode,
        actualWeightKg: parsedWeight.value,
        useDelivery,
        useFragrance,
      }),
    [serviceCode, parsedWeight.value, useDelivery, useFragrance]
  );

  const weightError =
    errors.weight ??
    (weightInput.trim().length > 0 && !parsedWeight.valid ? parsedWeight.error : undefined);

  const handleWeightChange = (nextValue: string) => {
    setWeightInput(nextValue);
    setLastWaUrl(null);
    if (hasSubmitted) {
      const check = parseBeratInput(nextValue);
      setErrors((prev) => ({
        ...prev,
        weight: check.valid ? undefined : check.error,
      }));
    }
  };

  const handleCustomerNameChange = (nextValue: string) => {
    setCustomerName(nextValue);
    setLastWaUrl(null);
    if (errors.customerName && nextValue.trim().length > 0) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handlePickupAddressChange = (nextValue: string) => {
    setPickupAddress(nextValue);
    setLastWaUrl(null);
    if (errors.pickupAddress && nextValue.trim().length > 0) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setUseDelivery(checked);
    setLastWaUrl(null);
    if (!checked && errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const validation = validateOrderForm({
      weightInput,
      customerName,
      pickupAddress,
      useDelivery,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLastWaUrl(null);

      if (validation.firstErrorField === 'weight' && weightInputRef.current) {
        weightInputRef.current.focus();
        weightInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (
        validation.firstErrorField === 'customerName' &&
        customerNameRef.current
      ) {
        customerNameRef.current.focus();
        customerNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (
        validation.firstErrorField === 'pickupAddress' &&
        pickupAddressRef.current
      ) {
        pickupAddressRef.current.focus();
        pickupAddressRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrors({});
    const message = buildWhatsAppMessage({
      customerName,
      pickupAddress,
      notes,
      useDelivery,
      useFragrance,
      breakdown,
    });
    const waUrl = buildWhatsAppUrl(message);
    setLastWaUrl(waUrl);

    const anchor = document.createElement('a');
    anchor.href = waUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <form
      id={ORDER_FORM_ID}
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start"
    >
      <div className="space-y-6 lg:col-span-7">
        <WeightInput
          value={weightInput}
          onChange={handleWeightChange}
          billedWeightKg={breakdown.billedWeightKg}
          isMinChargeApplied={breakdown.isMinChargeApplied}
          error={weightError}
          inputRef={weightInputRef}
        />

        <AddOnOptions
          useDelivery={useDelivery}
          useFragrance={useFragrance}
          onToggleDelivery={handleToggleDelivery}
          onToggleFragrance={(checked) => {
            setUseFragrance(checked);
            setLastWaUrl(null);
          }}
          deliveryCost={breakdown.deliveryCost}
          fragranceCost={breakdown.fragranceCost}
          hasValidWeight={breakdown.hasValidWeight}
        />

        <OrderForm
          customerName={customerName}
          pickupAddress={pickupAddress}
          notes={notes}
          useDelivery={useDelivery}
          onCustomerNameChange={handleCustomerNameChange}
          onPickupAddressChange={handlePickupAddressChange}
          onNotesChange={(value) => {
            setNotes(value);
            setLastWaUrl(null);
          }}
          errors={errors}
          customerNameRef={customerNameRef}
          pickupAddressRef={pickupAddressRef}
        />

        <p className="lg:hidden px-1 text-sm text-neutral-600">{ESTIMATION_CLAUSE}</p>

        {lastWaUrl ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="space-y-1">
              <p className="font-medium">Pesan pesanan siap dikirim melalui WhatsApp.</p>
              <a
                href={lastWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Buka WhatsApp jika belum terbuka</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-5">
        <PriceSummaryBar
          breakdown={breakdown}
          useDelivery={useDelivery}
          useFragrance={useFragrance}
          formId={ORDER_FORM_ID}
        />
      </div>
    </form>
  );
}
