/**
 * MAIN SCRIPT - MESRILAWATI FINOWAA
 * File ini menangani semua logika operasional website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Jalankan jam digital
    startDigitalClock();
});

// 1. AUTHENTICATION LOGIC
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        // Kredensial Akses
        const validUsers = [
            { email: "mesrilawati99@gmail.com", pass: "Mesri@123" },
            { email: "dosenut@gmail.com", pass: "Dosen@123" }
        ];

        const userFound = validUsers.find(u => u.email === email && u.pass === pass);

        if (userFound) {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            showToast("Selamat Datang di Sistem Informasi Bahan Ajar!");
            updateGreeting();
            initTable(); // Load data stok awal
        } else {
            showSimpleModal("Login Gagal", "email/password yang anda masukkan salah");
        }
    });
}

// 2. NAVIGATION SYSTEM
function switchPage(pageId) {
    const titles = {
        'dashboard': 'Dashboard Utama',
        'stok': 'Stok Bahan Ajar',
        'tracking': 'Tracking Service',
        'monitoring': 'Monitoring Progress',
        'histori': 'Histori Transaksi'
    };
    
    document.getElementById('page-title').innerText = titles[pageId];

    // Sembunyikan semua section
    document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
    // Tampilkan section yang dipilih
    document.getElementById('page-' + pageId).classList.remove('hidden');

    // Update gaya navigasi (active state)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-blue-600', 'text-white');
        link.classList.add('hover:bg-slate-800');
    });
    
    // Highlight menu yang aktif
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('bg-blue-600', 'text-white');
        event.currentTarget.classList.remove('hover:bg-slate-800');
    }
}

// 3. INVENTORY MANAGEMENT (STOK)
function initTable() {
    const tbody = document.getElementById('table-stok-body');
    if (!tbody) return;
    
    tbody.innerHTML = "";
    dataBahanAjar.forEach((item, index) => {
        appendRow(item, index + 1);
    });
}

function appendRow(item, index) {
    const tbody = document.getElementById('table-stok-body');
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-50 transition";
    tr.innerHTML = `
        <td class="px-6 py-4 text-sm font-medium text-slate-700">${index}</td>
        <td class="px-6 py-4 text-sm font-bold text-blue-600">${item.kode}</td>
        <td class="px-6 py-4 text-sm text-slate-700">${item.nama}</td>
        <td class="px-6 py-4 text-sm">
            <span class="px-3 py-1 rounded-full font-bold ${item.stok < 20 ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'}">
                ${item.stok} unit
            </span>
        </td>
        <td class="px-6 py-4 text-right space-x-2">
            <button class="text-slate-400 hover:text-blue-600"><i class="fas fa-edit"></i></button>
            <button class="text-slate-400 hover:text-rose-600"><i class="fas fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

function addStokToTable() {
    const kode = document.getElementById('stok-kode').value;
    const nama = document.getElementById('stok-nama').value;
    const jumlah = document.getElementById('stok-jumlah').value;

    if (!kode || !nama || !jumlah) {
        showToast("Mohon lengkapi semua field!");
        return;
    }

    const newItem = { kode, nama, stok: parseInt(jumlah) };
    dataBahanAjar.push(newItem);
    appendRow(newItem, dataBahanAjar.length);
    
    // Reset Form
    document.getElementById('stok-kode').value = "";
    document.getElementById('stok-nama').value = "";
    document.getElementById('stok-jumlah').value = "";
    
    toggleModal('modal-stok');
    showToast("Data Bahan Ajar Berhasil Ditambahkan!");
}

// 4. TRACKING SYSTEM
function trackDO() {
    const doNum = document.getElementById('input-do').value.trim();
    const resultBox = document.getElementById('tracking-result');
    
    if (!doNum) {
        showToast("Masukkan nomor DO!");
        return;
    }

    const data = dummyTracking[doNum];
    
    if (data) {
        resultBox.classList.remove('hidden');
        document.getElementById('res-mhs').innerText = data.nama;
        document.getElementById('res-do').innerText = "Nomor DO: " + doNum;
        document.getElementById('res-ekspedisi').innerText = data.ekspedisi;
        document.getElementById('res-tanggal').innerText = data.tgl;
        document.getElementById('res-paket').innerText = data.paket;
        document.getElementById('res-bayar').innerText = data.bayar;
        document.getElementById('res-percent').innerText = data.progress + "%";
        
        const bar = document.getElementById('res-progress-bar');
        const statusBadge = document.getElementById('res-status');
        
        // Reset animasi bar
        bar.style.width = "0%";
        setTimeout(() => { bar.style.width = data.progress + "%"; }, 100);

        // Styling Badge Status
        statusBadge.className = "px-4 py-2 rounded-full font-bold text-sm uppercase ";
        if (data.status === "Sampai") statusBadge.classList.add('bg-emerald-100', 'text-emerald-700');
        else if (data.status === "Dikirim") statusBadge.classList.add('bg-blue-100', 'text-blue-700');
        else statusBadge.classList.add('bg-amber-100', 'text-amber-700');
        statusBadge.innerText = data.status;

    } else {
        resultBox.classList.add('hidden');
        showSimpleModal("Tidak Ditemukan", "Nomor DO " + doNum + " tidak terdaftar dalam sistem.");
    }
}

// 5. UI UTILITIES
function toggleModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.toggle('hidden');
}

function showSimpleModal(title, body) {
    document.getElementById('simple-modal-title').innerText = title;
    document.getElementById('simple-modal-body').innerText = body;
    toggleModal('simple-modal');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('header button i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greet = "Pagi";
    if (hour >= 11 && hour < 15) greet = "Siang";
    else if (hour >= 15 && hour < 19) greet = "Sore";
    else if (hour >= 19 || hour < 4) greet = "Malam";
    
    const greetElement = document.getElementById('greeting');
    if (greetElement) greetElement.innerText = `Selamat ${greet}, Bapak/Ibu Dosen`;
}

function startDigitalClock() {
    setInterval(() => {
        const now = new Date();
        const clockElement = document.getElementById('digital-clock');
        if (clockElement) clockElement.innerText = now.toLocaleTimeString('id-ID');
    }, 1000);
}

function logout() {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
        location.reload();
    }
}
