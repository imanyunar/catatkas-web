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
  ChevronDown, 
  ChevronUp,
  WifiOff,
  Lock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function App() {
  const [phoneScreen, setPhoneScreen] = useState('home'); // 'home' | 'splash'
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
            <CheckCircle2 size={14} color="#059669" /> GIAT 16 UNNES × Desa Manggihan
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Column: Hero Copy */}
          <div className="hero-left">
            <div className="hero-badge">
              <Sparkles size={14} /> Aplikasi Kas Usaha Desa Manggihan
            </div>

            <h1 className="hero-title">
              Pencatatan Kas UMKM <br />
              <span className="highlight">Praktis, Cepat & 100% Offline</span>
            </h1>

            <p className="hero-subtitle">
              Aplikasi kas digital yang dirancang mudah untuk semua kalangan. Ketik transaksi otomatis seperti mengirim pesan, tanpa koneksi internet, tanpa daftarkan email, dan 100% gratis.
            </p>

            <div className="cta-group">
              <a 
                href="./CatatKas_UMKM.apk" 
                className="btn-download-main" 
                download="CatatKas_UMKM.apk"
                onClick={triggerConfetti}
              >
                <Download size={20} /> Unduh Aplikasi (APK)
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

          {/* Right Column: Exact Flutter UI Smartphone Mockup */}
          <div className="phone-mockup-wrapper">
            <div className="phone-screen-tabs">
              <button 
                className={`phone-tab-btn ${phoneScreen === 'home' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('home')}
              >
                🏠 Beranda Kas
              </button>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'splash' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('splash')}
              >
                🌟 Splash Screen
              </button>
            </div>

            <div className="phone-frame">
              <div className="phone-screen">
                {phoneScreen === 'splash' ? (
                  /* Flutter Splash Screen (1:1 with splash_screen.dart) */
                  <div className="flutter-splash-screen">
                    <div className="splash-ambient-glow"></div>

                    <div style={{ marginTop: '16px' }}></div>

                    <div className="splash-logos-card">
                      <img src="./logo_unnes.png" alt="UNNES" className="splash-logo-img" />
                      <div className="splash-logo-divider"></div>
                      <img src="./logo_semarang.png" alt="Kabupaten Semarang" className="splash-logo-img" />
                    </div>

                    <div>
                      <div className="splash-title-brand">CATATKAS</div>
                      <div className="splash-pill-tag">GIAT 16 UNNES • DESA MANGGIHAN</div>
                    </div>

                    <div>
                      <div className="splash-spinner"></div>
                      <div style={{ fontSize: '0.725rem', opacity: 0.85, fontWeight: 600 }}>
                        Solusi Kas UMKM Modern
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Flutter HomeScreen UI */
                  <>
                    <div className="flutter-header">
                      <div className="flutter-profile">
                        <div className="flutter-avatar">KM</div>
                        <div>
                          <div className="flutter-title-sub">CatatKas UMKM</div>
                          <div className="flutter-title-main">Desa Manggihan</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>
                        100% Offline
                      </div>
                    </div>

                    <div className="flutter-balance-card">
                      <div className="flutter-card-label">TOTAL SALDO KAS SAAT INI</div>
                      <div className="flutter-card-amount">
                        {parsedDemo?.isExpense ? 'Rp 1.250.000' : 'Rp 1.700.000'}
                      </div>

                      <div className="flutter-subcards-grid">
                        <div className="flutter-subcard">
                          <div className="flutter-subcard-title">Pemasukan (+)</div>
                          <div className="flutter-subcard-val green">
                            <ArrowUpRight size={11} style={{ display: 'inline' }} /> Rp 2.500k
                          </div>
                        </div>
                        <div className="flutter-subcard">
                          <div className="flutter-subcard-title">Pengeluaran (-)</div>
                          <div className="flutter-subcard-val red">
                            <ArrowDownRight size={11} style={{ display: 'inline' }} /> Rp 1.050k
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flutter-quick-card">
                      <div className="flutter-quick-title">
                        <Zap size={13} /> Ketik Cepat Transaksi
                      </div>

                      <input 
                        type="text" 
                        className="flutter-input-box" 
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        placeholder="Contoh: penjualan telur 150rb..."
                      />

                      <div className="flutter-presets-grid">
                        <button 
                          className="flutter-preset-btn"
                          onClick={() => setDemoInput('pembelian 3 gram telur 200rb')}
                        >
                          Beli Telur 200rb
                        </button>
                        <button 
                          className="flutter-preset-btn"
                          onClick={() => setDemoInput('penjualan bawang goreng 100 ons 250rb')}
                        >
                          Jual Bawang 250rb
                        </button>
                        <button 
                          className="flutter-preset-btn"
                          onClick={() => setDemoInput('bayar plastik 50rb')}
                        >
                          Bayar Plastik 50rb
                        </button>
                        <button 
                          className="flutter-preset-btn"
                          onClick={() => setDemoInput('omset harian 500rb')}
                        >
                          Omset 500rb
                        </button>
                      </div>

                      {parsedDemo && (
                        <div className={`flutter-result-card ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
                          <div style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {parsedDemo.type}: {parsedDemo.nominal}
                          </div>
                          <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: '2px' }}>
                            "{parsedDemo.text}"
                          </div>
                        </div>
                      )}

                      <button className="flutter-save-btn">
                        + SIMPAN TRANSAKSI
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>/div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="fitur">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Fitur Utama</div>
            <h2 className="section-title">Semua Kemudahan Pencatatan Kas</h2>
            <p className="section-subtitle">
              Fungsi esensial pembukuan kas yang dirancang ringkas sesuai kebutuhan UMKM Desa Manggihan.
            </p>
          </div>

          <div className="features-grid">
            <div className="flutter-card-item">
              <div className="flutter-icon-box">
                <Zap size={22} />
              </div>
              <h3 className="flutter-card-h3">Ketik Cepat Otomatis</h3>
              <p className="flutter-card-p">
                Ketik kalimat alami seperti <i>"pembelian 3kg telur 200rb"</i>. Aplikasi secara cerdas memisahkan jenis transaksi, jumlah, dan nominal secara otomatis.
              </p>
            </div>

            <div className="flutter-card-item">
              <div className="flutter-icon-box">
                <WifiOff size={22} />
              </div>
              <h3 className="flutter-card-h3">100% Kerja Offline</h3>
              <p className="flutter-card-p">
                Aplikasi bekerja penuh di HP tanpa butuh internet maupun kuota. Seluruh catatan kas tersimpan aman secara lokal di perangkat Anda sendiri.
              </p>
            </div>

            <div className="flutter-card-item">
              <div className="flutter-icon-box">
                <FileText size={22} />
              </div>
              <h3 className="flutter-card-h3">Cetak Laporan PDF</h3>
              <p className="flutter-card-p">
                Buat laporan kas bulanan yang rapi dan profesional dalam hitungan detik. Siap dibagikan langsung ke WhatsApp atau dicetak untuk arsip usaha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="steps-section" id="panduan">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Panduan Pemasangan</div>
            <h2 className="section-title">3 Langkah Praktis Mulai Menggunakan</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h4 className="step-h4">Unduh File APK</h4>
              <p className="step-p">
                Klik tombol <b>"Unduh Aplikasi"</b> di atas untuk mendapatkan file installer Android (.apk).
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <h4 className="step-h4">Pasang di Smartphone</h4>
              <p className="step-p">
                Buka file APK yang telah terunduh, lalu pilih <i>"Pasang / Install"</i> pada HP Anda.
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <h4 className="step-h4">Langsung Digunakan</h4>
              <p className="step-p">
                Buka aplikasi <b>CatatKas</b> dan Anda siap mencatat kas tanpa perlu mendaftar akun/email.
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
                q: "Apakah data transaksi saya aman?",
                a: "Data disimpan secara permanen di database lokal HP Anda menggunakan SQLite. Data tidak dikirim ke server mana pun sehingga 100% privat."
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="./logo_unnes.png" alt="UNNES" style={{ height: '30px' }} />
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem' }}>CatatKas UMKM</span>
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
