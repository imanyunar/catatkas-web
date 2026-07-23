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
  ArrowDownRight,
  CheckCircle2,
  HelpCircle,
  Award
} from 'lucide-react';

export default function App() {
  const [demoInput, setDemoInput] = useState('pembelian 3 gram telur 200rb');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const setPreset = (text) => {
    setDemoInput(text);
  };

  const parseDemo = (text) => {
    if (!text.trim()) return null;
    const lower = text.toLowerCase();

    const isExpense = ['pembelian', 'beli', 'bayar', 'kulakan', 'belanja', 'biaya', 'ongkir', 'gaji', 'sewa', 'listrik'].some(kw => lower.includes(kw));
    const isIncome = ['penjualan', 'jual', 'terima', 'omset', 'laba', 'dapat', 'pendapatan'].some(kw => lower.includes(kw));

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
        <div className="container navbar-inner">
          <a href="#" className="brand-wrapper">
            <div className="brand-logos">
              <img src="./logo_unnes.png" alt="UNNES" className="logo-img" />
              <div className="logo-divider"></div>
              <img src="./logo_semarang.png" alt="Kabupaten Semarang" className="logo-img" />
            </div>
            <span className="brand-title">CatatKas UMKM</span>
          </a>
          <span className="badge-tag">
            <CheckCircle2 size={14} /> 100% Gratis • Direct Download
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-content">
          <div className="official-badge-header">
            <Award size={16} color="#7A0016" />
            <span className="official-badge-text">
              Program Pembukuan Digital Desa Manggihan & UNNES
            </span>
          </div>

          <br />

          <div className="hero-pill">
            <Sparkles size={14} /> Kas Digital Praktis Tanpa Ribet
          </div>
          
          <h1 className="hero-title">
            Catat Kas Usaha UMKM <br />
            <span className="highlight">Mudah, Cepat & Otomatis</span>
          </h1>

          <p className="hero-subtitle">
            Aplikasi pencatatan keuangan modern yang dirancang sederhana untuk semua kalangan. Tanpa syarat email, tanpa perlu login, 100% offline, dan dapat langsung diunduh secara gratis!
          </p>

          <div className="cta-wrapper">
            <a 
              href="./CatatKas_UMKM.apk" 
              className="btn-download-primary" 
              download="CatatKas_UMKM.apk"
              onClick={triggerConfetti}
            >
              <Download size={22} />
              <span>UNDUH APLIKASI (APK)</span>
            </a>
            
            <div className="download-info-row">
              <div className="download-info-item">
                <CheckCircle2 size={14} color="#059669" /> File APK Resmi (~52.2 MB)
              </div>
              <div>•</div>
              <div className="download-info-item">
                <CheckCircle2 size={14} color="#059669" /> Android 6.0+
              </div>
              <div>•</div>
              <div className="download-info-item">
                <CheckCircle2 size={14} color="#059669" /> Versi 1.0.0
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Simulator */}
      <section className="container">
        <div className="sandbox-card">
          <div className="sandbox-header">
            <div className="sandbox-title-box">
              <div className="sandbox-title-icon">
                <Zap size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#7A0016' }}>Simulator "Ketik Cepat"</h3>
                <p style={{ fontSize: '12px', color: '#64748B' }}>Uji coba bagaimana kalimat transaksi otomatis terdeteksi</p>
              </div>
            </div>
          </div>

          <div className="preset-pills">
            <button className="btn-preset" onClick={() => setPreset('pembelian 3 gram telur 200rb')}>
              🛒 "pembelian 3 gram telur 200rb"
            </button>
            <button className="btn-preset" onClick={() => setPreset('penjualan bawang goreng 100 ons 250rb')}>
              💰 "penjualan bawang goreng 100 ons 250rb"
            </button>
            <button className="btn-preset" onClick={() => setPreset('bayar listrik toko 150rb')}>
              ⚡ "bayar listrik toko 150rb"
            </button>
            <button className="btn-preset" onClick={() => setPreset('jual beras 1kg 15rb')}>
              🌾 "jual beras 1kg 15rb"
            </button>
          </div>

          <input 
            type="text" 
            className="sandbox-input"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            placeholder="Ketik kalimat transaksi di sini..."
          />

          {parsedDemo && (
            <div className={`result-badge-container ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
              <div className="result-icon-circle">
                {parsedDemo.isExpense ? <ArrowDownRight size={22} /> : <ArrowUpRight size={22} />}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>
                  Terdeteksi: {parsedDemo.type}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px', opacity: 0.9 }}>
                  "{parsedDemo.text}"
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid 4 Main Pillars */}
      <section className="container">
        <div className="section-header">
          <span className="section-tag">Fitur Unggulan</span>
          <h2 className="section-main-title">Kenapa Menggunakan CatatKas?</h2>
          <p className="section-main-desc">Dibuat khusus dengan desain bersih, jelas, dan sangat mudah dipahami oleh pemilik usaha</p>
        </div>

        <div className="features-grid">
          <div className="card-feature">
            <div className="feature-icon-box"><Zap size={24} /></div>
            <h3>Ketik Cepat Otomatis</h3>
            <p>Cukup ketik satu kalimat alami, jenis Pemasukan atau Pengeluaran langsung terdeteksi otomatis tanpa perlu pilih menu.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon-box"><Wallet size={24} /></div>
            <h3>Total Saldo Akumulatif</h3>
            <p>Pantau posisi kas bersih usaha Anda secara real-time dari gabungan seluruh catatan kas harian tanpa hitung manual.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon-box"><FileText size={24} /></div>
            <h3>Cetak PDF Tanpa Lag</h3>
            <p>Export laporan keuangan bulanan dalam format PDF rapi dalam hitungan detik tanpa membuat HP hang/stutter.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon-box"><ShieldCheck size={24} /></div>
            <h3>100% Offline & Aman</h3>
            <p>Semua data keuangan tersimpan aman di HP Anda sendiri. Tidak perlu koneksi internet, bebas bocor data, dan gratis selamanya.</p>
          </div>
        </div>
      </section>

      {/* Step Installation */}
      <section className="container">
        <div className="steps-card-container">
          <div className="section-header" style={{ marginBottom: '0', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Smartphone size={22} color="#7A0016" />
              <h2 className="section-main-title" style={{ fontSize: '20px' }}>Panduan Memasang Aplikasi (APK)</h2>
            </div>
            <p className="section-main-desc" style={{ margin: '0' }}>Sangat mudah! Ikuti 3 langkah praktis ini pada HP Android Anda:</p>
          </div>

          <div className="steps-list">
            <div className="step-card">
              <div className="step-badge-num">1</div>
              <h4>Unduh File APK</h4>
              <p>Klik tombol <strong>"UNDUH APLIKASI (APK)"</strong> di bagian atas halaman web ini.</p>
            </div>

            <div className="step-card">
              <div className="step-badge-num">2</div>
              <h4>Buka Hasil Unduhan</h4>
              <p>Buka pemberitahuan unduhan di HP Anda, lalu ketuk file <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', fontStyle: 'normal' }}>CatatKas_UMKM.apk</code>.</p>
            </div>

            <div className="step-card">
              <div className="step-badge-num">3</div>
              <h4>Izinkan & Pasang</h4>
              <p>Jika muncul opsi keamanan browser, pilih <strong>"Izinkan dari Sumber Ini"</strong> lalu tekan **Install**. Aplikasi langsung bisa digunakan!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container">
        <div className="section-header">
          <span className="section-tag">Tanya Jawab</span>
          <h2 className="section-main-title">Pertanyaan Sering Diajukan</h2>
        </div>

        <div className="faq-container">
          <div className="faq-item">
            <div className="faq-question">
              <HelpCircle size={16} /> Apakah aplikasi ini memerlukan jaringan internet?
            </div>
            <div className="faq-answer">
              Tidak sama sekali. CatatKas UMKM bekerja 100% secara offline di HP Anda sehingga dapat digunakan kapan saja walau tidak ada sinyal.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <HelpCircle size={16} /> Apakah perlu mendaftar atau memasukkan email?
            </div>
            <div className="faq-answer">
              Tidak perlu. Aplikasi ini dapat di-install dan langsung dipakai secara gratis tanpa daftar email atau akun.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <HelpCircle size={16} /> Dimana data keuangan saya disimpan?
            </div>
            <div className="faq-answer">
              Seluruh catatan keuangan Anda tersimpan secara lokal dan aman di dalam memori HP Anda sendiri, tidak dikirim ke server manapun.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 CatatKas UMKM • Desa Manggihan</p>
          <p className="footer-credits">Universitas Negeri Semarang (UNNES)</p>
        </div>
      </footer>
    </div>
  );
}
