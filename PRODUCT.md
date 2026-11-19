# PRODUCT.md — LaundryCalc (Katalog & Kalkulator Estimasi Laundry)

Dokumen ini merangkum daftar fitur, prioritas, ketergantungan, status pengerjaan, serta keputusan terhadap hal-hal dari PRD (v1.1).

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Logika Terkait | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have (v0.1) | - | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have (v0.1) | BL-01 | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have (v0.1) | BL-02 | FT-01, FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have (v0.1) | BL-01, BL-02 | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have (v0.1) | BL-03 | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have (v0.1) | BL-03 | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have (v0.1) | - | - | Ditunda |

## Keputusan Atas Hal Terbuka

1. **Ketelitian Desimal & Pembulatan Berat (`W_aktual`)**: Dibatasi maksimal satu angka di belakang koma (kelipatan `0,1 kg`, menerima koma atau titik), sesuai keputusan pengguna pada Tahap 1.
2. **Opsi Pewangi Premium (T02)**: Ditampilkan sebagai satu kotak centang (`Pewangi Premium Downy`) tanpa pilihan varian terpisah, sesuai keputusan pengguna pada Tahap 1 dan template WhatsApp PRD.
3. **Kesan Visual & Warna Aksen**: Memakai gaya ramah dan hangat (`Plus Jakarta Sans`) dengan warna aksen biru (`blue-700` / `blue-50`), tercatat lengkap di `DESIGN.md`.
4. **Nomor WhatsApp Toko & Format Rupiah**: Nomor tujuan memakai nilai `628xxxxxxxxxx` di `src/config.ts` dan penulisan Rupiah di antarmuka memakai format `Rp 18.000` (konsisten dengan Acceptance Criteria dan Template WhatsApp PRD).
