// Menampilkan halaman utama LaundryCalc dengan ServiceCatalog di atas kalkulator estimasi.
import { STORE_INFO } from '@/src/config';
import LaundryCalculator from '@/src/components/LaundryCalculator';
import { OrderProvider } from '@/src/components/OrderContext';
import ServiceCatalog from '@/src/components/ServiceCatalog';

export default function HomePage() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-neutral-50 pb-28 lg:pb-12">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-4 py-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-neutral-900">LaundryCalc</h1>
            <span className="text-sm text-neutral-600">{STORE_INFO.name}</span>
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 lg:py-8">
          <ServiceCatalog />
          <LaundryCalculator />
        </main>
      </div>
    </OrderProvider>
  );
}
