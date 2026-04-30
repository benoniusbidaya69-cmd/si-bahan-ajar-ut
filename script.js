/**
 * MAIN LOGIC - MESRILAWATI FINOWAA
 * Menangani interaksi UI dan fungsi sistem informasi bahan ajar
 */

document.addEventListener('DOMContentLoaded', () => {
    // Jalankan jam digital setiap detik saat halaman dimuat
    setInterval(updateClock, 1000);
});

// ==========================================
// 1. LOGIKA AUTENTIKASI (LOGIN)
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        // Daftar akun yang diizinkan sesuai permintaan
        const users = [
            { email: "mesrilawati99@gmail.com", pass: "Mesri@123" },
            { email: "dosenut@gmail.com", pass: "Dosen@123" }
        ];

        const match = users.find(u => u.email === email && u.pass === pass);

        if (match) {
            // Jika login berhasil, pindah ke tampilan dashboard
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            showToast("Login Berhasil! Selamat bekerja.");
            updateGreeting();
            initTable(); // Muat data tabel stok
        } else {
            // Pesan error jika kredensial salah
            showSimpleModal("Akses Ditolak", "email/password yang anda masukkan salah");
        }
    });
}

// ==========================================
// 2. NAVIGASI HALAMAN (SPA)
// ==========================================
function switchPage(pageId) {
    // Sembunyikan semua section yang ada
    document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
    
    // Tampilkan section yang dipilih
    document.getElementById('page-' + pageId).classList.remove('hidden');
    
    // Perbarui Judul pada Header
    const titles = {
        'dashboard': 'Dashboard Utama',
        'stok': 'Manajemen Stok Bahan Ajar',
        'tracking': 'Tracking Service Pengiriman',
        'monitoring': 'Monitoring Progress DO',
        'histori': 'Histori Transaksi'
    };
    document.getElementById('page-title').innerText = titles[pageId] || "Sistem Informasi";
    
    // Perbarui status aktif pada link sidebar
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// ==========================================
// 3. MANAJEMEN STOK (INVENTARIS)
// ==========================================
function initTable() {
    const tbody = document.getElementById('table-stok-body');
    if (!tbody) return;
    tbody.innerHTML = "";
    
    // Ambil data dari data.js dan tampilkan ke tabel
    dataBahanAjar.forEach((item, i) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition";
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm">${i + 1}</td>
            <td class="px-6 py-4 text-sm font-bold text-blue-600">${item.kode}</td>
            <td class="px-6 py-4 text-sm">${item.nama}</td>
            <td class="px-6 py-4 text-sm">
                <span class="px-2 py-1 rounded text-xs font-bold ${item.stok < 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}">
                    ${item.stok} unit
                </span>
            </td>
            <td class="px-6 py-4 text-right">
                <button class="text-slate-400 hover:text-blue-600 mr-2"><i class="fas fa-edit"></i></button>
                <button class="text-slate-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addStokToTable() {
    const kode = document.getElementById('stok-kode').value;
    const nama = document.getElementById('stok-nama').value;
    const qty = document.getElementById('stok-jumlah').value;
    
    if (kode && nama && qty) {
        // Tambah data baru ke array dataBahanAjar
        dataBahanAjar.push({ kode, nama, stok: parseInt(qty) });
        initTable(); // Refresh tabel
        toggleModal('modal-stok');
        showToast("Data Stok Berhasil Ditambahkan!");
        
        // Bersihkan input
        document.getElementById('stok-kode').value = "";
        document.getElementById('stok-nama').value = "";
        document.getElementById('stok-jumlah').value = "";
    } else {
        showToast("Mohon lengkapi seluruh form!");
    }
}

// ==========================================
// 4. LAYANAN PELACAKAN (TRACKING)
// ==========================================
function trackDO() {
    const doNum = document.getElementById('input-do').value.trim();
    const res = dummyTracking[doNum];
    const box = document.getElementById('tracking-result');
    
    if (res) {
        box.classList.remove('hidden');
        box.innerHTML = `
            <div class="flex justify-between border-b pb-4 mb-4">
                <h4 class="font-bold text-lg">${res.nama}</h4>
                <div class="px-3 py-1 rounded-full text-xs font-bold uppercase ${res.status === 'Sampai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${res.status}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div><p class="text-slate-400">Ekspedisi</p><p class="font-bold">${res.ekspedisi}</p></div>
                <div><p class="text-slate-400">Tanggal Kirim</p><p class="font-bold">${res.tgl}</p></div>
                <div><p class="text-slate-400">Jenis Paket</p><p class="font-bold">${res.paket}</p></div>
                <div><p class="text-slate-400">Total Bayar</p><p class="font-bold">${res.bayar}</p></div>
            </div>
            <div class="mt-6">
                <p class="text-xs font-bold mb-1">Progres Pengiriman: ${res.progress}%</p>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-blue-600 h-full transition-all duration-1000" style="width: ${res.progress}%"></div>
                </div>
            </div>
        `;
        showToast("Data pengiriman ditemukan.");
    } else {
        box.classList.add('hidden');
        showSimpleModal("Tidak Ditemukan", "Nomor DO tersebut tidak terdaftar di sistem kami.");
    }
}

// ==========================================
// 5. FUNGSI UTILITAS UI
// ==========================================
function toggleModal(id) { document.getElementById(id).classList.toggle('hidden'); }

function showToast(message) { 
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

function showSimpleModal(title, body) {
    document.getElementById('simple-modal-title').innerText = title;
    document.getElementById('simple-modal-body').innerText = body;
    toggleModal('simple-modal');
}

function updateClock() {
    const clock = document.getElementById('digital-clock');
    if (clock) clock.innerText = new Date().toLocaleTimeString('id-ID');
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greet = "Malam";
    if (hour >= 4 && hour < 11) greet = "Pagi";
    else if (hour >= 11 && hour < 15) greet = "Siang";
    else if (hour >= 15 && hour < 19) greet = "Sore";
    
    const greetElem = document.getElementById('greeting');
    if (greetElem) greetElem.innerText = `Selamat ${greet}, Bapak/Ibu Dosen`;
}

function logout() { 
    if(confirm("Apakah anda yakin ingin keluar dari sistem?")) {
        location.reload(); 
    }
}

function toggleDarkMode() { 
    document.body.classList.toggle('dark-mode'); 
    const icon = document.querySelector('header button i');
    if(icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}
