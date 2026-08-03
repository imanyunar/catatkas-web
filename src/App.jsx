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
  ArrowDownRight,
  MessageCircle
} from 'lucide-react';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialScreen = urlParams.get('screen') || 'home';
  const [phoneScreen, setPhoneScreen] = useState(initialScreen);
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

  const isFigmaMode = new URLSearchParams(window.location.search).get('figma') === 'true';

  const renderPhoneScreenContent = () => (
    <>
      {phoneScreen === 'splash' && (
        <div className="flutter-splash-screen" style={isFigmaMode ? { width: '390px', height: '844px' } : {}}>
          <div className="splash-ambient-glow"></div>
          <div style={{ marginTop: '10px' }}></div>
          <div className="splash-glass-container">
            <img src="./logo_semarang.png" alt="Semarang" className="splash-glass-img" />
            <div className="splash-glass-spacer"></div>
            <img src="./logo_unnes.png" alt="UNNES" className="splash-glass-img" />
          </div>
          <div>
            <div className="splash-title-brand">CATATKAS UMKM</div>
            <div className="splash-pill-tag">GIAT 16 UNNES • DESA MANGGIHAN</div>
          </div>
          <div>
            <div className="splash-spinner"></div>
            <div style={{ fontSize: '0.725rem', opacity: 0.85, fontWeight: 600 }}>
              Solusi Kas UMKM Modern
            </div>
          </div>
        </div>
      )}
      {phoneScreen === 'home' && (
        <div style={isFigmaMode ? { width: '390px', height: '844px', display: 'flex', flexDirection: 'column' } : { display: 'contents' }}>
          <div className="flutter-header">
            <div className="flutter-profile">
              <div className="flutter-avatar-box">
                <img src="./app_logo.png" alt="CatatKas" className="flutter-avatar-img" />
              </div>
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
          <div className="flutter-chat-area">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <div className="flutter-date-badge">Hari Ini</div>
            </div>
            {parsedDemo ? (
              <div className="flutter-chat-bubble out">
                <div className="flutter-chat-meta">
                  <span className={`flutter-type-badge ${parsedDemo.isExpense ? 'expense' : 'income'}`}>
                    {parsedDemo.type}
                  </span>
                </div>
                <div className="flutter-chat-nominal {parsedDemo.isExpense ? 'red' : 'green'}">
                  {parsedDemo.nominal}
                </div>
                <div className="flutter-chat-text">"{parsedDemo.text}"</div>
                <div className="flutter-chat-time">Baru saja ✓✓</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '20px' }}>
                Mulai ketik transaksi Anda...
              </div>
            )}
          </div>
          <div className="flutter-input-bar">
            <input 
              type="text" 
              className="flutter-input-field"
              placeholder="Contoh: jual telur 2kg 50rb"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
            />
            <button className="flutter-send-btn">
              <Zap size={18} />
            </button>
          </div>
        </div>
      )}
      {phoneScreen === 'manual' && (
        <div style={isFigmaMode ? { width: '390px', height: '844px', display: 'flex', flexDirection: 'column' } : { display: 'contents' }}>
          <div className="flutter-appbar">
            <div className="flutter-appbar-title">📝 Isi Manual</div>
          </div>
          <div style={{ padding: '20px', flex: 1, backgroundColor: '#FFFFFF' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Jenis Transaksi</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #7A0016', color: '#7A0016', fontWeight: 700, textAlign: 'center', backgroundColor: '#fff0f2' }}>PEMASUKAN</div>
                <div style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>PENGELUARAN</div>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Nama Barang/Transaksi</label>
              <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '0.9rem' }}>Contoh: Jual Telur Ayam</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Jumlah</label>
                <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '0.9rem' }}>0</div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Satuan</label>
                <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '0.9rem' }}>kg/pcs</div>
              </div>
            </div>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Total Harga (Rp)</label>
              <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '0.9rem' }}>Rp 0</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#7A0016', color: 'white', fontWeight: 700, textAlign: 'center', boxShadow: '0 4px 12px rgba(122,0,22,0.3)' }}>SIMPAN TRANSAKSI</div>
          </div>
        </div>
      )}
      {phoneScreen === 'history' && (
        <div style={isFigmaMode ? { width: '390px', height: '844px', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FA' } : { display: 'contents' }}>
          <div className="flutter-appbar">
            <div className="flutter-appbar-title">📊 Riwayat & Laporan</div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              <div style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: '#7A0016', color: 'white', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Bulan Ini</div>
              <div style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Minggu Ini</div>
              <div style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Hari Ini</div>
            </div>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Total Pemasukan</span>
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>+ Rp 2.500.000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Total Pengeluaran</span>
                <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 700 }}>- Rp 1.050.000</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '8px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 700 }}>Laba Bersih</span>
                <span style={{ fontSize: '0.9rem', color: '#7A0016', fontWeight: 800 }}>Rp 1.450.000</span>
              </div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#FFF4ED', color: '#C2410C', fontWeight: 700, textAlign: 'center', border: '1px solid #FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FileText size={16} /> CETAK PDF / EXCEL
            </div>
          </div>
        </div>
      )}
      {phoneScreen === 'settings' && (
        <div style={isFigmaMode ? { width: '390px', height: '844px', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FA' } : { display: 'contents' }}>
          <div className="flutter-appbar">
            <div className="flutter-appbar-title">⚙️ Pengaturan</div>
          </div>
          <div style={{ padding: '20px', flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data & Keamanan</div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '8px', color: '#0284c7' }}><ShieldCheck size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>Backup Data Lokal</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Simpan data ke memori HP</div>
                </div>
              </div>
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#16a34a' }}><Smartphone size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>Kirim Backup via WhatsApp</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Amankan file lewat chat WA</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tentang Aplikasi</div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
              <img src="./app_logo.png" alt="Logo" style={{ width: '60px', height: '60px', marginBottom: '12px' }} />
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>CatatKas UMKM</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '16px' }}>Versi 1.0.2</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Dibuat untuk Desa Manggihan<br/>oleh Tim GIAT 16 UNNES
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (isFigmaMode) {
    return (
      <div style={{ 
        width: '390px', 
        height: '844px', 
        backgroundColor: '#F8F9FA', 
        overflow: 'hidden', 
        fontFamily: "'Plus Jakarta Sans', sans-serif" 
      }}>
        {renderPhoneScreenContent()}
      </div>
    );
  }

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
                  Versi 1.0.5 (56 MB)
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
            <div className="phone-screen-tabs" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'splash' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('splash')}
              >
                🌟 Splash
              </button>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'home' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('home')}
              >
                🏠 Beranda
              </button>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'manual' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('manual')}
              >
                ✍️ Manual
              </button>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'history' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('history')}
              >
                📊 Riwayat
              </button>
              <button 
                className={`phone-tab-btn ${phoneScreen === 'settings' ? 'active' : ''}`}
                onClick={() => setPhoneScreen('settings')}
              >
                ⚙️ Pengaturan
              </button>
            </div>

            <div className="samsung-frame">
              {/* Samsung Infinity-V Teardrop Notch */}
              <div className="samsung-v-notch"></div>
              {/* Samsung Volume & Power Buttons */}
              <div className="samsung-btn-volume"></div>
              <div className="samsung-btn-power"></div>

              <div className="phone-screen">
                {phoneScreen === 'splash' ? (
                  /* Flutter Splash Screen (1:1 with splash_screen.dart) */
                  <div className="flutter-splash-screen">
                    <div className="splash-ambient-glow"></div>

                    <div style={{ marginTop: '10px' }}></div>

                    <div className="splash-glass-container">
                      <img src="./logo_semarang.png" alt="Semarang" className="splash-glass-img" />
                      <div className="splash-glass-spacer"></div>
                      <img src="./logo_unnes.png" alt="UNNES" className="splash-glass-img" />
                    </div>

                    <div>
                      <div className="splash-title-brand">CATATKAS UMKM</div>
                      <div className="splash-pill-tag">GIAT 16 UNNES • DESA MANGGIHAN</div>
                    </div>

                    <div>
                      <div className="splash-spinner"></div>
                      <div style={{ fontSize: '0.725rem', opacity: 0.85, fontWeight: 600 }}>
                        Solusi Kas UMKM Modern
                      </div>
                    </div>
                  </div>
                ) : phoneScreen === 'home' ? (
                  /* Flutter HomeScreen UI */
                  <>
                    <div className="flutter-header">
                      <div className="flutter-profile">
                        <div className="flutter-avatar-box">
                          <img src="./app_logo.png" alt="CatatKas" className="flutter-avatar-img" />
                        </div>
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
                    </div>
                  </>
                ) : phoneScreen === 'manual' ? (
                  <>
                    <div className="flutter-header" style={{ justifyContent: 'center', backgroundColor: '#7A0016', color: 'white' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Tambah Transaksi</div>
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '4px' }}>
                        <div style={{ flex: 1, textAlign: 'center', background: '#059669', color: 'white', padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.8rem' }}>Pemasukan</div>
                        <div style={{ flex: 1, textAlign: 'center', color: '#64748B', padding: '8px', fontWeight: 'bold', fontSize: '0.8rem' }}>Pengeluaran</div>
                      </div>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold', marginBottom: '4px' }}>Nama Barang/Transaksi</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Penjualan Telur Ayam</div>
                      </div>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold', marginBottom: '4px' }}>Total Harga (Rp)</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>150.000</div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1, background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold', marginBottom: '4px' }}>Jumlah</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>5</div>
                        </div>
                        <div style={{ flex: 1, background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold', marginBottom: '4px' }}>Satuan</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>kg</div>
                        </div>
                      </div>
                      <button style={{ background: '#7A0016', color: 'white', padding: '12px', borderRadius: '24px', fontWeight: 'bold', border: 'none', marginTop: '10px' }}>SIMPAN TRANSAKSI</button>
                    </div>
                  </>
                ) : phoneScreen === 'history' ? (
                  <>
                    <div className="flutter-header" style={{ justifyContent: 'space-between', backgroundColor: '#7A0016', color: 'white' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Riwayat Transaksi</div>
                      <FileText size={18} />
                    </div>
                    <div style={{ padding: '16px', background: '#F8FAFC', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Bulan Ini</div>
                        <div style={{ background: '#E2E8F0', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>Ubah Filter</div>
                      </div>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold' }}>TOTAL PEMASUKAN</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>Rp 2.500.000</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 'bold' }}>TOTAL PENGELUARAN</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#DC2626' }}>Rp 1.050.000</div>
                      </div>
                      <button style={{ width: '100%', background: '#059669', color: 'white', padding: '12px', borderRadius: '24px', fontWeight: 'bold', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <Download size={16} /> CETAK LAPORAN PDF
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flutter-header" style={{ justifyContent: 'center', backgroundColor: '#7A0016', color: 'white' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Pengaturan</div>
                    </div>
                    <div style={{ padding: '16px', flex: 1 }}>
                      <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ background: '#FEE2E2', padding: '10px', borderRadius: '12px', color: '#7A0016' }}>
                            <Download size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Penyimpanan Data Aman</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Backup catatan kas ke HP/WA</div>
                          </div>
                        </div>
                        <button style={{ width: '100%', background: '#7A0016', color: 'white', padding: '10px', borderRadius: '20px', fontWeight: 'bold', border: 'none', fontSize: '0.8rem' }}>BACKUP KE FOLDER DOWNLOAD</button>
                      </div>
                      <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '12px', color: '#0F172A' }}>
                            <ArrowUpRight size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Kembalikan Data</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Restore dari file CSV</div>
                          </div>
                        </div>
                        <button style={{ width: '100%', background: 'white', color: '#0F172A', padding: '10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>RESTORE DARI FILE CSV</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
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

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px 32px', borderRadius: '16px' }}>
              <MessageCircle size={32} color="#059669" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Ada Pertanyaan Lain?</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>
                Jika Anda memiliki pertanyaan terkait aplikasi, jangan ragu untuk menghubungi kami melalui WhatsApp.
              </p>
              <a 
                href="https://wa.me/6287873861108" 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#FFFFFF', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)' }}
              >
                Hubungi via WhatsApp (0878-7386-1108)
              </a>
            </div>
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
