/**
 * DATA STORAGE - MESRILAWATI FINOWAA
 * File ini menyimpan data statis untuk stok bahan ajar dan informasi pelacakan.
 */

// 1. Data Stok Bahan Ajar (Variable: dataBahanAjar)
const dataBahanAjar = [
    { kode: "BA001", nama: "Matematika", stok: 50 },
    { kode: "BA002", nama: "Bahasa Inggris", stok: 35 },
    { kode: "BA003", nama: "Manajemen", stok: 20 },
    { kode: "BA004", nama: "Akuntansi", stok: 15 }
];

// 2. Data Tracking Pelacakan DO (Variable: dummyTracking)
const dummyTracking = {
    "DO-2026-001": { 
        nama: "Andi Saputra", 
        status: "Sampai", 
        progress: 100, 
        ekspedisi: "JNE Express", 
        tgl: "10 April 2026", 
        paket: "Modul Smt 1", 
        bayar: "Rp 450.000" 
    },
    "DO-2026-002": { 
        nama: "Siti Rahma", 
        status: "Dikirim", 
        progress: 65, 
        ekspedisi: "SiCepat", 
        tgl: "12 April 2026", 
        paket: "Modul Smt 3", 
        bayar: "Rp 320.000" 
    },
    "DO-2026-003": { 
        nama: "Budi Utomo", 
        status: "Diproses", 
        progress: 20, 
        ekspedisi: "Pos Indonesia", 
        tgl: "14 April 2026", 
        paket: "Modul Smt 5", 
        bayar: "Rp 510.000" 
    }
};
