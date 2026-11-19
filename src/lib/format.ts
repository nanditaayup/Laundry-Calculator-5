// Menyediakan satu fungsi pemformatan angka Rupiah, nominal ribuan, dan berat desimal untuk seluruh aplikasi.

export function formatNominal(amount: number): string {
  const safeInt = Math.round(Number.isFinite(amount) ? amount : 0);
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(safeInt);
}

export function formatRupiah(amount: number): string {
  return `Rp ${formatNominal(amount)}`;
}

export function formatBerat(weightKg: number): string {
  if (!Number.isFinite(weightKg)) {
    return '0';
  }
  const roundedTenths = Math.round(weightKg * 10) / 10;
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(roundedTenths);
}
