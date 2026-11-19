# DESIGN.md — Keputusan Desain LaundryCalc

Dokumen ini mencatat seluruh keputusan tampilan, tipografi, warna, dan tata letak aplikasi LaundryCalc.

## Keputusan Pengguna (Tahap 1 & 2)

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Kesan visual | Ramah dan hangat (`Plus Jakarta Sans`) |
| Warna aksen | Biru (`blue-700`, hover `blue-800`, pilihan aktif `blue-50`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir (`mobile`: satu kolom; `desktop`: dua kolom) |
| Posisi aksi utama | Bar ringkas menempel di bawah layar (`mobile`) dan panel ringkasan di kanan (`desktop`) |
| Gambar | Tanpa gambar ilustrasi; menggunakan ikon `lucide-react` seperlunya untuk penanda fungsi |
| Bentuk pilihan layanan (`FT-01`) | Kartu pilihan interaktif (`radiogroup`) |
| Format input berat (`FT-02`) | Kolom angka dengan tombol cepat kurang/tambah `0,5 kg` opsional atau masukan langsung maksimal 1 desimal |
| Format tampilan Rupiah | `Rp 18.000` (pemisah ribuan titik, tanpa desimal, spasi setelah `Rp` sesuai Acceptance Criteria & Template WhatsApp PRD) |

## Token Visual Tetap

- **Latar halaman**: `bg-neutral-50`
- **Permukaan kartu / panel**: `bg-white`
- **Garis tepi input, tabel, dan pemisah**: `border-neutral-200`
- **Teks utama / pendukung / placeholder**: `text-neutral-900` / `text-neutral-600` / `text-neutral-500`
- **Aksen utama**: `bg-blue-700`, `hover:bg-blue-800`, teks putih; elemen terpilih `border-blue-700 bg-blue-50`; cincin fokus `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`
- **Status informasi (Minimum Charge)**: `bg-amber-50 text-amber-800 border-amber-200` dengan ikon dan teks penjelas
- **Status error validasi**: `bg-red-50 text-red-800 border-red-200` dengan ikon dan teks cara memperbaiki beserta contoh
- **Tipografi**: `Plus Jakarta Sans` bobot `400`, `500`, `600` lewat `@fontsource/plus-jakarta-sans`, angka menggunakan `tabular-nums`, ukuran teks minimal `14 px` dan input minimal `16 px`
- **Sudut & bayangan**: Kartu `rounded-2xl`, input & tombol `rounded-xl`, bayangan hanya untuk bilah melayang `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`
