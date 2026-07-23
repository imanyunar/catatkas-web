import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Zap, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  WifiOff,
  Lock,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [demoInput, setDemoInput] = useState('pembelian 3 gram telur 200rb');
  const [openFaq, setOpenFaq] = useState(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const parseDemo = (text) => {
    if (!text.trim()) return null;
    const lower = text.toLowerCase();

    const isExpense = ['pembelian', 'beli', 'bayar', 'kulakan', 'belanja', 'biaya', 'ongkir', 'gaji', 'sewa', 'listrik'].some(kw => lower.includes(kw));
    const isIncome = ['penjualan', 'jual', 'terima', 'omset', 'laba', 'dapat', 'pendapatan'].some(kw => lower.includes(kw));

    // Extract nominal from text (e.g. 200rb -> 200000)
    let nominal = '200.000';
    if (lower.includes('250rb') || lower.includes('250000')) nominal = '250.000';
    if (lower.includes('50rb') || lower.includes('50000')) nominal = '50.000';
    if (lower.includes('500rb') || lower.includes('500000')) nominal = '500.000';

    const isExpenseType = isExpense && !isIncome;

    return {
      type: isExpenseType ? 'PENGELUARAN (-)' : 'PEMASUKAN (+)',
      isExpense: isExpenseType,
      nominal: `Rp ${nominal}`,
      text: text.trim()
    };
  };

  const parsedDemo = parseDemo(demoInput);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="brand-wrapper">
            <div className="brand-logos">
              <img src="./logo_unnes.png" alt="UNNES" className="brand-logo-img" />
              <div className="brand-divider"></div>
              <img src="./logo_semarang.png" alt="Kabupaten Semarang" className="brand-logo-img" />
            </div>
            <span className="brand-title">CatatKas UMKM</span>
          </a>

          <div className="nav-tag">
            <CheckCircle2 size={14} color="#16A34A" /> GIAT 16 UNNES × Desa Manggihan
          </div>

          <a 
            href="./CatatKas_UMKM.apk" 
            className="nav-btn" 
            download="CatatKas_UMKM.apk"
            onClick={triggerConfetti}
          >
            <Download size={16} /> Unduh APK
          </a>
        </div>
      </nav>

      {/* Hero Section - App Showcase Focus */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Column: Hero Text */}
          <div className="hero-left">
            <div className="hero-badge">
              <Sparkles size={14} /> Aplikasi Kas Usaha Desa Manggihan
            </div>

            <h1 className="hero-title">
              Pembukuan Kas UMKM <br />
              <span className="highlight">Praktis, Cepat & 100% Offline</span>
            </h1>

            <p className="hero-subtitle">
              Catat keuangan usaha harian Anda tanpa ribet. Ketik transaksi otomatis seperti mengirim pesan, tanpa koneksi internet, tanpa daftarkan email, dan 100% gratis.
            </p>

            <div className="cta-group">
              <a 
                href="./CatatKas_UMKM.apk" 
                className="btn-download-main" 
                download="CatatKas_UMKM.apk"
                onClick={triggerConfetti}
              >
                <Download size={22} /> Unduh Aplikasi (APK)
              </a>

              <div className="download-meta">
                <span className="download-meta-item">
                  <Smartphone size={14} /> Android 6.0+
                </span>
                <span>•</span>
                <span className="download-meta-item">
                  Versi 1.0.0 (52 MB)
                </span>
                <span>•</span>
                <span className="download-meta-item">
                  Gratis Selamanya
                </span>
              </div>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <WifiOff size={18} className="trust-icon" />
                <span>100% Offline</span>
              </div>
              <div className="trust-item">
                <Lock size={18} className="trust-icon" />
                <span>Tanpa Login</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <span>Bebas Iklan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Phone Frame Interactive Showcase */}
          <div className="phone-mockup-wrapper">
            <div className="phone-live-tag">
              <span className="live-dot"></span> SIMULASI TERHUBUNG
            </div>

            <div className="phone-frame">
              <div className="phone-notch"></div>
              
              <div className="phone-screen">
                {/* Phone Top Status */}
                <div className="phone-status-bar">
                  <span>09:41</span>
                  <span>CatatKas Mobile</span>
                  <span>100%</span>
                </div>

                {/* Simulated App Header */}
                <div className="phone-app-header">
                  <div className="phone-app-title">TOTAL SALDO KAS SAAT INI</div>
                  <div className="phone-app-balance">
                    {parsedDemo?.isExpense ? 'Rp 1.250.000' : 'Rp 1.700.000'}
                  </div>
                </div>

                {/* Simulated App Body */}
                <div className="phone-app-body">
                  <div className="phone-input-card">
                    <div className="phone-input-label">
                      <Zap size={14} /> Mode Ketik Cepat
                    </div>
                    <input 
                      type="text" 
                      className="phone-input-field" 
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder="Contoh: penjualan telur 150rb..."
                    />
                  </div>

                  <div className="phone-presets-wrapper">
                    <div className="phone-presets-label">Coba Contoh Transaksi:</div>
                    <div className="phone-presets-grid">
                      <button 
                        className="phone-preset-chip"
                        onClick={() => setDemoInput('pembelian 3 gram telur 200rb')}
                      >
                        Beli Telur 200rb
                      </button>
                      <button 
                        className="phone-preset-chip"
                        onClick={() => setDemoInput('penjualan bawang goreng 100 ons 250rb')}
                      >
                        Jual Bawang 250rb
                      </button>
                      <button 
                        className="phone-preset-chip"
                        onClick={() => setDemoInput('bayar plastik 50rb')}
                      >
                        Bayar Plastik 50rb
                      </button>
                      <button 
                        className="phone-preset-chip"
                        onClick={() => setDemoInput('omset penjualan harian 500rb')}
                      >
                        Omset Harian 500rb
                      </button>
                    </div>
                  </div>

                  {/* Real-time Parsed Preview */}
                  {parsedDemo && (
                    <div className={`phone-result-card ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
                      <div className="phone-result-header">
                        <span className={`phone-result-type ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
                          {parsedDemo.type}
                        </span>
                        <span className="phone-result-text">{parsedDemo.nominal}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                        "{parsedDemo.text}"
                      </div>
                    </div>
                  )}

                  <button className="phone-save-btn">
                    + SIMPAN TRANSAKSI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="fitur">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Fitur Unggulan</div>
            <h2 className="section-title">Dirancang Khusus untuk Kemudahan UMKM</h2>
            <p className="section-subtitle">
              Semua fungsi esensial pembukuan kas hadir secara ringkas tanpa kerumitan aplikasi akuntansi rumit.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <Zap size={24} />
              </div>
              <h3 className="feature-card-title">Ketik Cepat Otomatis</h3>
              <p className="feature-card-desc">
                Cukup ketik kalimat alami seperti <i>"pembelian 3kg telur 200rb"</i>. Sistem secara cerdas memisahkan jenis transaksi, jumlah, dan nominal secara otomatis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <WifiOff size={24} />
              </div>
              <h3 className="feature-card-title">100% Kerja Offline</h3>
              <p className="feature-card-desc">
                Aplikasi bekerja penuh di HP Anda tanpa butuh internet maupun kuota. Seluruh catatan kas tersimpan aman secara lokal di perangkat Anda sendiri.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <FileText size={24} />
              </div>
              <h3 className="feature-card-title">Laporan PDF Ready</h3>
              <p className="feature-card-desc">
                Cetak laporan kas bulanan yang rapi dan profesional dalam hitungan detik. Siap dibagikan langsung ke WhatsApp atau dicetak untuk arsip usaha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Installation */}
      <section className="steps-section" id="panduan">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Panduan Pemasangan</div>
            <h2 className="section-title">3 Langkah Mudah Mulai Menggunakan</h2>
            <p className="section-subtitle">
              Tidak perlu pendaftaran akun. Langsung unduh dan gunakan dalam waktu kurang dari 1 menit.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Unduh File APK</h3>
              <p className="step-desc">
                Klik tombol <b>"Unduh Aplikasi"</b> di atas. File installer Android (.apk) akan langsung terunduh ke HP Anda.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Pasang di Smartphone</h3>
              <p className="step-desc">
                Buka file yang diunduh. Jika muncul konfirmasi keamanan, pilih <i>"Izinkan Pemasangan dari Sumber Ini"</i>.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Langsung Gunakan</h3>
              <p className="step-desc">
                Buka aplikasi <b>CatatKas</b> dan Anda bisa langsung mencatat transaksi pertama tanpa perlu login atau email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Tanya Jawab</div>
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="faq-list">
            {[
              {
                q: "Apakah aplikasi CatatKas ini benar-benar gratis?",
                a: "Ya, 100% gratis selamanya. Aplikasi ini dikembangkan sebagai bagian dari program pengabdian masyarakat UNNES GIAT 16 di Desa Manggihan, Kabupaten Semarang."
              },
              {
                q: "Apakah perlu koneksi internet untuk mencatat kas?",
                a: "Sama sekali tidak. Aplikasi bekerja 100% secara offline. Seluruh data kas tersimpan di dalam memori HP Anda sendiri sehingga aman dan tidak membutuhkan kuota."
              },
              {
                q: "Apakah data transaksi saya bisa hilang jika aplikasi ditutup?",
                a: "Tidak. Data disimpan secara permanen di database lokal HP Anda menggunakan SQLite. Data tetap tersimpan rapi walau HP dimatikan."
              },
              {
                q: "Bagaimana cara melakukan pembaruan jika ada versi baru?",
                a: "Aplikasi dilengkapi pengecek update otomatis di background. Saat HP Anda terhubung ke internet, notifikasi pembaruan akan muncul secara otomatis di aplikasi."
              }
            ].map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openFaq === i && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="./logo_unnes.png" alt="UNNES" style={{ height: '30px' }} />
              <div className="footer-brand-title">CatatKas UMKM</div>
            </div>

            <div style={{ fontSize: '0.85rem' }}>
              Program Pengabdian Masyarakat UNNES GIAT 16 × Desa Manggihan, Kab. Semarang
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} CatatKas UMKM. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>
    </div>
  );
}
