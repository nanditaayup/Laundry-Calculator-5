// Menyimpan status pilihan layanan utama bersama antara katalog dan kalkulator di halaman utama.
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { MAIN_SERVICES, type ServiceCode } from '@/src/config';

interface OrderContextValue {
  serviceCode: ServiceCode;
  setServiceCode: (code: ServiceCode) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [serviceCode, setServiceCode] = useState<ServiceCode>(MAIN_SERVICES[0].code);

  return (
    <OrderContext.Provider value={{ serviceCode, setServiceCode }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderService(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrderService harus dipakai di dalam OrderProvider.');
  }
  return ctx;
}
