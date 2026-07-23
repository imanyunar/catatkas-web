import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Zap, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Smartphone, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function App() {
  const [demoInput, setDemoInput] = useState('pembelian 3 gram telur 200rb');

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const parseDemo = (text) => {
    if (!text.trim()) return null;
    const lower = text.toLowerCase();

    const isExpense = ['pembelian', 'beli', 'bayar', 'kulakan', 'belanja', 'biaya'].some(kw => lower.includes(kw));
    const isIncome = ['penjualan', 'jual', 'terima', 'omset', 'laba'].some(kw => lower.includes(kw));

    const type = isExpense ? 'PENGELUARAN (-)' : isIncome ? 'PEMASUKAN (+)' : 'PEMASUKAN (+)';
    return {
      type,
      isExpense: isExpense && !isIncome,
      text: text.trim()
    };
  };

  const parsedDemo = parseDemo(demoInput);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <a href="#" className="brand-logo">
            <img src="./logo_unnes.png" alt="UNNES" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.15)', margin: '0 4px' }}></div>
            <img src="./logo_semarang.png" alt="Kabupaten Semarang" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <span className="brand-name" style={{ marginLeft: '6px' }}>CatatKas UMKM</span>
          </a>
          <span className="badge-tag">✓ 100% Gratis & Direct Download</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <img src="./logo_unnes.png" alt="Logo UNNES" style={{ height: '64px', width: 'auto' }} />
            <img src="./logo_semarang.png" alt="Logo Kab Semarang" style={{ height: '64px', width: 'auto' }} />
          </div>

          <div className="hero-pill">
            <Sparkles size={16} /> Pembukuan Keuangan Digital Desa Manggihan
          </div>
          
          <h1 className="hero-title">
            Catat Kas Usaha Jadi <br />
            <span>Mudah, Cepat & Otomatis</span>
          </h1>

          <p className="hero-subtitle">
            Aplikasi pencatatan keuangan praktis untuk UMKM. Tanpa perlu email, tanpa login, tanpa backend database server, dan 100% langsung dapat diunduh!
          </p>

          <div className="cta-box">
            <a 
              href="./CatatKas_UMKM.apk" 
              className="btn-download" 
              download="CatatKas_UMKM.apk"
              onClick={triggerConfetti}
            >
              <Download size={22} />
              <span>UNDUH APLIKASI (APK)</span>
            </a>
            <span className="download-meta">Ukuran File: ~52.2 MB • Android 6.0+ • Versi Resmi 1.0.0</span>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Demo */}
      <section className="container">
        <div className="demo-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Zap size={20} color="#7A0016" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#7A0016' }}>Coba Fitur "Ketik Cepat" Langsung Di Sini:</h3>
          </div>
          
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
            Ketik bebas transaksi Anda, aplikasi akan otomatis memisahkan Pemasukan & Pengeluaran:
          </p>

          <input 
            type="text" 
            className="demo-input"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            placeholder="Contoh: pembelian 3 gram telur 200rb atau penjualan 100 ons bawang 250rb"
          />

          {parsedDemo && (
            <div className={`demo-preview ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
              {parsedDemo.isExpense ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>Terdeteksi: {parsedDemo.type}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>"{parsedDemo.text}"</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Keunggulan CatatKas UMKM</h2>
          <p className="section-desc">Dirancang khusus untuk kemudahan dan kenyamanan semua kalangan pelaku usaha</p>

          <div className="grid-2x2">
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Zap size={26} /></div>
              <h3>Ketik Cepat Otomatis</h3>
              <p>Cukup ketik satu kalimat (misal: "pembelian telur 200rb"), transaksi otomatis tergolong sebagai Pemasukan atau Pengeluaran.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper"><Wallet size={26} /></div>
              <h3>Total Saldo Akumulatif</h3>
              <p>Pantau posisi kas bersih usaha Anda secara real-time dari gabungan seluruh transaksi tanpa perhitungan manual.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper"><FileText size={26} /></div>
              <h3>Cetak PDF Tanpa Lag</h3>
              <p>Laporan keuangan bulanan dapat diunduh dan dibagikan dalam format PDF rapi dalam hitungan detik tanpa membuat HP hang.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper"><ShieldCheck size={26} /></div>
              <h3>100% Offline & Aman</h3>
              <p>Data keuangan sepenuhnya tersimpan aman di dalam HP Anda. Tanpa koneksi internet, tanpa login, dan bebas bocor data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step Installation */}
      <section className="container">
        <div className="steps-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Smartphone size={24} color="#7A0016" />
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#7A0016' }}>Panduan Memasang Aplikasi (APK)</h2>
          </div>

          <div className="step-item">
            <div className="step-num">1</div>
            <div>
              <strong style={{ fontSize: '15px' }}>Unduh File APK</strong>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>Klik tombol "UNDUH APLIKASI (APK)" di bagian atas web ini.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-num">2</div>
            <div>
              <strong style={{ fontSize: '15px' }}>Buka File Download</strong>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>Buka pemberitahuan unduhan di HP Anda, lalu ketuk file <code style={{ background: '#ECECEC', padding: '2px 6px', borderRadius: '4px' }}>CatatKas_UMKM.apk</code>.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-num">3</div>
            <div>
              <strong style={{ fontSize: '15px' }}>Izinkan & Pasang</strong>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>Jika ada peringatan keamanan browser, pilih "Izinkan dari Sumber Ini" lalu tekan **Install**. Aplikasi siap digunakan!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <p>© 2026 CatatKas UMKM • Desa Manggihan & Universitas Negeri Semarang (UNNES)</p>
      </footer>
    </div>
  );
}
