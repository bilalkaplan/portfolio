# Bilal Kocakaplan — Kişisel Portfolyo Web Sitesi

**BLG331 - Web Teknolojileri Dönem Projesi** kapsamında React JS (Vite), React Router, Context API, CSS Değişkenleri (Custom Properties) ve Local Storage kullanılarak geliştirilen kişisel portfolyo web uygulaması.

## Özellikler

- **Ana Sayfa (Hero Section):** Profil fotoğrafı, ad-soyad ve unvan, tanıtım yazısı, sosyal medya bağlantıları, PDF formatında **CV İndir** butonu, özet metrikler ve öne çıkan projeler.
- **Hakkımda (`/hakkimda`):** Detaylı biyografi, eğitim bilgileri, Microsoft Türkiye Yapay Zeka staj deneyimi, topluluk liderliği ve gönüllülük, Erasmus+ uluslararası deneyimleri, akademik bildiri, sertifikalar ve hobiler.
- **Yetenekler (`/yetenekler`):** 4 kategori altında 16 teknik beceri, teknoloji ikonları, seviye göstergeli `SkillBar` bileşenleri, kategori filtreleme, dil becerileri ve kişisel yetkinlikler.
- **Projeler (`/projeler`):** 7 gerçek proje, grid düzeni, kategoriye ve teknolojiye göre (örn. `React`, `Python`, `PyTorch`, `SQL`) çift yönlü filtreleme, GitHub / canlı demo bağlantıları ve detaylı **Modal** inceleme penceresi.
- **İletişim (`/iletisim`):** Kontrollü bileşenlerle (controlled components) hazırlanmış, alan bazlı validasyona ve gönderim simülasyonuna sahip iletişim formu, doğrudan iletişim kanalları ve sosyal medya bağlantıları.
- **Dark / Light Tema (`ThemeContext`):** Navbar üzerindeki `ThemeToggle` ile anlık tema değişimi, CSS değişkenleri ve geçiş animasyonları, `localStorage` (`theme` anahtarı) ile kalıcılık.
- **Çoklu Dil Desteği TR / EN (`LanguageContext`):** `tr.json` ve `en.json` sözlükleri, `t()` / `translate()` çeviri fonksiyonu, `localStorage` (`language` anahtarı) ile kalıcılık.
- **Responsive Tasarım:** Masaüstü, tablet ve mobil ekranlara tam uyumlu düzen ve mobil görünümde hamburger menü.

## Kullanılan Teknolojiler

- **React 19** (Vite)
- **React Router DOM** (v7 / v6 API uyumlu)
- **Context API** (`ThemeContext`, `LanguageContext`)
- **Saf CSS + CSS Custom Properties** (`variables.css`, `global.css`, `components.css`)
- **React Icons** (`react-icons`)
- **Local Storage API**

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18+ önerilir)
- npm

### Adımlar

```bash
# 1. Proje klasörüne girin
cd portfolyo

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılacaktır.

### Production Derlemesi

```bash
npm run build
npm run preview
```

### İletişim Formu (Web3Forms) Aktivasyonu

Form, `.env` dosyası tanımlı değilken çevrimdışı gönderim simülasyonu ile çalışır. Mesajların doğrudan e-posta adresine ulaşması için (ücretsiz, ayda 250 gönderim):

1. [web3forms.com](https://web3forms.com/#start) adresine gidip e-posta adresinle ücretsiz **Access Key** oluştur.
2. Proje kökünde `.env.example` dosyasını `.env` olarak kopyala ve anahtarını ekle:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=buraya-access-key-gelir
   ```
3. Geliştirme sunucusunu (`npm run dev`) yeniden başlat.

## Proje Klasör Yapısı

```text
portfolyo/
├── public/
│   ├── Bilal_Kocakaplan_CV.pdf        # İndirilebilir gerçek PDF CV
│   ├── favicon.svg
│   └── images/
│       ├── profile.jpg                # Profil fotoğrafı
│       └── projects/                  # Proje önizleme görselleri (SVG)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx             # Logo, menü, tema/dil butonları, hamburger menü
│   │   │   ├── Footer.jsx             # Telif hakkı, hızlı erişim, sosyal medya
│   │   │   └── Layout.jsx             # Genel sayfa düzeni sarmalayıcısı
│   │   ├── sections/
│   │   │   ├── Hero.jsx               # Ana sayfa hero & öne çıkan projeler
│   │   │   ├── About.jsx              # Biyografi, eğitim, deneyim, sertifikalar, hobiler
│   │   │   ├── Skills.jsx             # Kategorili teknik yetenekler & dil/soft skills
│   │   │   ├── Projects.jsx           # Filtrelenebilir proje listesi & detay modalı
│   │   │   └── Contact.jsx            # İletişim bilgileri ve form bölümü
│   │   └── ui/
│   │       ├── ProjectCard.jsx        # Proje önizleme kartı
│   │       ├── SkillBar.jsx           # İkonlu ve yüzdeli seviye çubuğu
│   │       ├── SocialLinks.jsx        # Sosyal medya bağlantıları
│   │       ├── ContactForm.jsx        # Validasyonlu iletişim formu
│   │       ├── ThemeToggle.jsx        # Dark / Light tema butonu
│   │       ├── LanguageSwitcher.jsx   # TR / EN dil değiştirme butonu
│   │       └── Modal.jsx              # Proje detay modal penceresi
│   ├── context/
│   │   ├── ThemeContext.jsx           # Tema yönetimi + localStorage('theme')
│   │   └── LanguageContext.jsx        # Dil yönetimi + t() + localStorage('language')
│   ├── data/
│   │   ├── profile.json               # Kişisel, eğitim, deneyim ve iletişim verileri
│   │   ├── skills.json                # Kategorilere ayrılmış yetenek verileri
│   │   ├── projects.json              # Proje verileri
│   │   └── locales/
│   │       ├── tr.json                # Türkçe dil dosyası
│   │       └── en.json                # İngilizce dil dosyası
│   ├── pages/
│   │   ├── HomePage.jsx               # /
│   │   ├── AboutPage.jsx              # /hakkimda
│   │   ├── SkillsPage.jsx             # /yetenekler
│   │   ├── ProjectsPage.jsx           # /projeler
│   │   ├── ContactPage.jsx            # /iletisim
│   │   └── NotFoundPage.jsx           # 404 fallback sayfası
│   ├── styles/
│   │   ├── variables.css              # Light / Dark CSS değişkenleri
│   │   ├── global.css                 # Reset, tipografi, butonlar ve genel sınıflar
│   │   └── components.css             # Tüm bileşen ve responsive stiller
│   ├── App.jsx                        # Provider ve Route tanımlamaları
│   └── main.jsx                       # Uygulama giriş noktası
├── index.html
├── package.json
└── vite.config.js
```
