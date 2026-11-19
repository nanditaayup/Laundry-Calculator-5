// Mendefinisikan tata letak akar aplikasi LaundryCalc beserta metadata HTML.
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laundry Shimmering — Katalog & Kalkulator Estimasi Laundry',
  description:
    'Katalog layanan resmi dan kalkulator estimasi biaya laundry dengan kirim pesanan ke WhatsApp.',
  openGraph: {
    title: 'Laundry Shimmering — Katalog & Kalkulator Estimasi Laundry',
    description:
      'Katalog layanan resmi dan kalkulator estimasi biaya laundry dengan kirim pesanan ke WhatsApp.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laundry Shimmering — Katalog & Kalkulator Estimasi Laundry',
    description:
      'Katalog layanan resmi dan kalkulator estimasi biaya laundry dengan kirim pesanan ke WhatsApp.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
