import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'id' | 'en';

interface Translations {
  navbar: {
    home: string;
    products: string;
    about: string;
    contact: string;
    partner: string;
    partner_desc: string;
    explore: string;
  };
  market: {
    title: string;
    update: string;
  };
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    cta_buy: string;
    cta_learn: string;
  };
  products: {
    title: string;
    subtitle: string;
    view_all: string;
    filter_all: string;
    sold_by: string;
    buy_wa: string;
    buy_b2b: string;
    ai_marketing: string;
    ai_button_title: string;
    visit_profile: string;
    share_product: string;
    share_success: string;
    mbiz_badge: string;
    min_order: string;
  };
  explore: {
    title: string;
    subtitle: string;
    cat_culinary: string;
    cat_tourism: string;
    cat_craft: string;
    cat_hotel: string;
    search_placeholder: string;
    search_btn: string;
    result_title: string;
    source_map: string;
  };
  features: {
    f1_title: string;
    f1_desc: string;
    f2_title: string;
    f2_desc: string;
    f3_title: string;
    f3_desc: string;
  };
  social: {
    title: string;
    subtitle: string;
    follow_btn: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
  };
  footer: {
    desc: string;
    links: string;
    categories: string;
    contact: string;
    rights: string;
  };
  assistant: {
    btn_label: string;
    greeting: string;
    placeholder: string;
    thinking: string;
    header_title: string;
  };
}

const translations: Record<Language, Translations> = {
  id: {
    navbar: {
      home: 'Beranda',
      products: 'Produk',
      about: 'Tentang',
      contact: 'Kontak',
      partner: 'Mitra UMKM',
      partner_desc: 'Daftar Mitra UMKM',
      explore: 'Jelajah'
    },
    market: {
      title: 'Harga Komoditas Solsel Hari Ini:',
      update: 'Diperbarui: Pagi Ini'
    },
    hero: {
      tag: 'Karya Anak Nagari',
      title: 'Keindahan Solok Selatan Dalam Genggaman',
      subtitle: 'Platform UMKM digital yang mendukung Pengadaan Pemerintah (B2G) dan pemberdayaan Petani lokal.',
      cta_buy: 'Belanja Sekarang',
      cta_learn: 'Info Harga Pasar'
    },
    products: {
      title: 'Produk Unggulan',
      subtitle: 'Temukan produk lokal berkualitas. Filter khusus untuk vendor yang siap Mbizmarket/e-Katalog bagi kebutuhan Dinas.',
      view_all: 'Lihat Semua Produk',
      filter_all: 'Semua',
      sold_by: 'Dijual oleh',
      buy_wa: 'Beli via WA',
      buy_b2b: 'Minta Penawaran (Dinas)',
      ai_marketing: 'Copy Marketing AI',
      ai_button_title: 'Buat deskripsi menarik dengan AI',
      visit_profile: 'Kunjungi Profil',
      share_product: 'Bagikan',
      share_success: 'Link produk disalin!',
      mbiz_badge: 'Siap Mbizmarket',
      min_order: 'Min. Order'
    },
    explore: {
      title: 'Jelajah Solok Selatan',
      subtitle: 'Cari rekomendasi tempat kuliner, wisata, dan UMKM langsung dari Google Maps.',
      cat_culinary: 'Kuliner',
      cat_tourism: 'Wisata',
      cat_craft: 'Kerajinan',
      cat_hotel: 'Penginapan',
      search_placeholder: 'Cari "Sate Kambing enak"...',
      search_btn: 'Cari Lokasi',
      result_title: 'Rekomendasi AI & Google Maps:',
      source_map: 'Buka di Maps'
    },
    features: {
      f1_title: 'Siap e-Katalog',
      f1_desc: 'Vendor terverifikasi dengan NIB & NPWP untuk pengadaan pemerintah.',
      f2_title: 'Langsung Petani',
      f2_desc: 'Memangkas rantai pasok, harga terbaik langsung dari petani.',
      f3_title: 'Dukung Ekonomi',
      f3_desc: 'Setiap pembelian membantu perekonomian warga lokal.'
    },
    social: {
      title: 'Cerita UMKM Kita',
      subtitle: 'Intip keseruan dan aktivitas terbaru para pelaku UMKM Solok Selatan di media sosial.',
      follow_btn: 'Ikuti di Instagram'
    },
    about: {
      title: 'Tentang UMKM Solok Selatan',
      p1: 'Platform ini didedikasikan untuk mengangkat potensi luar biasa dari Solok Selatan. Kami memfasilitasi UMKM untuk masuk ke ekosistem digital, termasuk kesiapan masuk ke pasar Pemerintah (Mbizmarket).',
      p2: 'Dengan fitur informasi harga pasar, kami juga membantu petani mendapatkan transparansi harga yang adil.'
    },
    footer: {
      desc: 'Pusat oleh-oleh dan kerajinan terbaik dari Solok Selatan. Terpercaya, Amanah, dan Berkualitas.',
      links: 'Tautan',
      categories: 'Kategori',
      contact: 'Kontak Kami',
      rights: 'All rights reserved.'
    },
    assistant: {
      btn_label: 'Tanya Asisten Bisnis',
      greeting: 'Halo! Saya asisten digital UMKM Solok Selatan. Ada yang bisa saya bantu terkait syarat Mbizmarket atau strategi harga?',
      placeholder: 'Tanya syarat NIB, cara masuk e-katalog...',
      thinking: 'Sedang berpikir...',
      header_title: 'Asisten UMKM Digital'
    }
  },
  en: {
    navbar: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      partner: 'Join as Partner',
      partner_desc: 'Register as Partner',
      explore: 'Explore'
    },
    market: {
      title: 'Solsel Commodity Prices Today:',
      update: 'Updated: This Morning'
    },
    hero: {
      tag: 'Creation of Local Artisans',
      title: 'The Beauty of South Solok in Your Hands',
      subtitle: 'Digital MSME platform supporting Government Procurement (B2G) and local Farmer empowerment.',
      cta_buy: 'Shop Now',
      cta_learn: 'Market Price Info'
    },
    products: {
      title: 'Featured Products',
      subtitle: 'Discover high-quality local products. Special filter for vendors ready for Mbizmarket/e-Catalog for Govt needs.',
      view_all: 'View All Products',
      filter_all: 'All',
      sold_by: 'Sold by',
      buy_wa: 'Buy via WA',
      buy_b2b: 'Request Quote (B2B)',
      ai_marketing: 'AI Marketing Copy',
      ai_button_title: 'Generate description with AI',
      visit_profile: 'Visit Profile',
      share_product: 'Share',
      share_success: 'Link copied!',
      mbiz_badge: 'Mbizmarket Ready',
      min_order: 'Min. Order'
    },
    explore: {
      title: 'Explore South Solok',
      subtitle: 'Find recommendations for culinary, tourism, and MSMEs directly from Google Maps.',
      cat_culinary: 'Culinary',
      cat_tourism: 'Tourism',
      cat_craft: 'Crafts',
      cat_hotel: 'Hotels',
      search_placeholder: 'Search "Best Satay"...',
      search_btn: 'Search Location',
      result_title: 'AI & Google Maps Recommendations:',
      source_map: 'Open in Maps'
    },
    features: {
      f1_title: 'e-Catalog Ready',
      f1_desc: 'Verified vendors with NIB & Tax ID for government procurement.',
      f2_title: 'Direct from Farmers',
      f2_desc: 'Cutting the supply chain, best prices directly from farmers.',
      f3_title: 'Support Economy',
      f3_desc: 'Every purchase helps the local economy.'
    },
    social: {
      title: 'Our MSME Stories',
      subtitle: 'Peek into the excitement and latest activities of South Solok MSMEs on social media.',
      follow_btn: 'Follow on Instagram'
    },
    about: {
      title: 'About South Solok MSMEs',
      p1: 'This platform is dedicated to uplifting the extraordinary potential of South Solok. We facilitate MSMEs to enter the digital ecosystem, including readiness for the Government market (Mbizmarket).',
      p2: 'With market price information features, we also help farmers get fair price transparency.'
    },
    footer: {
      desc: 'The center for the best souvenirs and crafts from South Solok. Trusted, Reliable, and Quality.',
      links: 'Quick Links',
      categories: 'Categories',
      contact: 'Contact Us',
      rights: 'All rights reserved.'
    },
    assistant: {
      btn_label: 'Ask Business Assistant',
      greeting: 'Hello! I am the South Solok MSME digital assistant. Can I help with Mbizmarket requirements or pricing strategy?',
      placeholder: 'Ask about NIB requirements, e-catalog...',
      thinking: 'Thinking...',
      header_title: 'Digital MSME Assistant'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};