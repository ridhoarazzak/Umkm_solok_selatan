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
    ai_marketing: string;
    ai_button_title: string;
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
    hero: {
      tag: 'Karya Anak Nagari',
      title: 'Keindahan Solok Selatan Dalam Genggaman',
      subtitle: 'Jelajahi ragam produk UMKM terbaik dari Bumi Saribu Rumah Gadang. Dari kuliner autentik hingga kerajinan tangan bernilai seni tinggi.',
      cta_buy: 'Belanja Sekarang',
      cta_learn: 'Pelajari Budaya Kami'
    },
    products: {
      title: 'Produk Unggulan',
      subtitle: 'Temukan produk-produk lokal berkualitas tinggi yang dibuat dengan cinta dan dedikasi oleh para pelaku UMKM Solok Selatan.',
      view_all: 'Lihat Semua Produk',
      filter_all: 'Semua',
      sold_by: 'Dijual oleh',
      buy_wa: 'Beli via WA',
      ai_marketing: 'Copy Marketing AI',
      ai_button_title: 'Buat deskripsi menarik dengan AI'
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
      f1_title: 'Asli Lokal',
      f1_desc: '100% Produk asli buatan masyarakat Solok Selatan.',
      f2_title: 'Kualitas Premium',
      f2_desc: 'Dikurasi secara ketat untuk menjamin kepuasan pelanggan.',
      f3_title: 'Dukung Ekonomi',
      f3_desc: 'Setiap pembelian membantu perekonomian warga lokal.'
    },
    about: {
      title: 'Tentang UMKM Solok Selatan',
      p1: 'Platform ini didedikasikan untuk mengangkat potensi luar biasa dari Solok Selatan, "Nagari Saribu Rumah Gadang". Kami menghubungkan pengrajin, petani, dan kreator lokal langsung ke pasar global melalui teknologi.',
      p2: 'Dengan sentuhan teknologi AI modern, kami membantu para pelaku usaha untuk meningkatkan branding dan menjangkau lebih banyak pelanggan tanpa meninggalkan identitas budaya mereka.'
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
      greeting: 'Halo! Saya asisten digital UMKM Solok Selatan. Ada yang bisa saya bantu untuk mengembangkan usaha Anda hari ini?',
      placeholder: 'Tanya strategi pemasaran, ide produk...',
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
    hero: {
      tag: 'Creation of Local Artisans',
      title: 'The Beauty of South Solok in Your Hands',
      subtitle: 'Explore the best MSME products from the Land of a Thousand Gadang Houses. From authentic culinary delights to high-value handicrafts.',
      cta_buy: 'Shop Now',
      cta_learn: 'Learn Our Culture'
    },
    products: {
      title: 'Featured Products',
      subtitle: 'Discover high-quality local products made with love and dedication by South Solok MSME players.',
      view_all: 'View All Products',
      filter_all: 'All',
      sold_by: 'Sold by',
      buy_wa: 'Buy via WA',
      ai_marketing: 'AI Marketing Copy',
      ai_button_title: 'Generate description with AI'
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
      f1_title: 'Authentic Local',
      f1_desc: '100% Original products made by the people of South Solok.',
      f2_title: 'Premium Quality',
      f2_desc: 'Strictly curated to ensure customer satisfaction.',
      f3_title: 'Support Economy',
      f3_desc: 'Every purchase helps the local economy.'
    },
    about: {
      title: 'About South Solok MSMEs',
      p1: 'This platform is dedicated to uplifting the extraordinary potential of South Solok, "Nagari Saribu Rumah Gadang". We connect local artisans, farmers, and creators directly to the global market through technology.',
      p2: 'With a touch of modern AI technology, we help business owners improve branding and reach more customers without leaving their cultural identity behind.'
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
      greeting: 'Hello! I am the South Solok MSME digital assistant. How can I help develop your business today?',
      placeholder: 'Ask about marketing strategy, product ideas...',
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