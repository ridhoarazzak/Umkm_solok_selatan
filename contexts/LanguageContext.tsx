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
    eudr_badge: string;
    traceability: string;
    coords: string;
    elevation: string;
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
      products: 'Katalog',
      about: 'Tentang',
      contact: 'Kontak',
      partner: 'Mitra Tani',
      partner_desc: 'Daftar Petani Kopi',
      explore: 'Peta Kebun'
    },
    market: {
      title: 'Harga Kopi & Komoditas (EUDR vs Lokal):',
      update: 'Update: Pagi Ini'
    },
    hero: {
      tag: 'Kopi Solok Selatan Mendunia',
      title: 'Kopi Spesialti Berstandar EUDR Eropa',
      subtitle: 'Platform digital pertama di Sumbar yang menghubungkan Petani Kopi Solok Selatan dengan pasar Global melalui sistem Traceability & Kepatuhan EUDR.',
      cta_buy: 'Beli Green Bean',
      cta_learn: 'Cek Data EUDR'
    },
    products: {
      title: 'Katalog Kopi & UMKM',
      subtitle: 'Koleksi Kopi Arabika & Robusta terbaik yang terverifikasi Bebas Deforestasi (EUDR Ready), serta produk unggulan lainnya.',
      view_all: 'Lihat Semua',
      filter_all: 'Semua',
      sold_by: 'Petani/Prosesor',
      buy_wa: 'Beli Sample',
      buy_b2b: 'Kontrak Ekspor/Dinas',
      ai_marketing: 'Smart Copy',
      ai_button_title: 'Buat deskripsi',
      visit_profile: 'Profil Kebun',
      share_product: 'Bagikan',
      share_success: 'Link disalin!',
      mbiz_badge: 'Siap Mbizmarket',
      min_order: 'Min. Order',
      eudr_badge: 'EUDR Verified',
      traceability: 'Data Keterlacakan',
      coords: 'Koordinat Lahan',
      elevation: 'Ketinggian Tanam'
    },
    explore: {
      title: 'Peta Jelajah Kopi',
      subtitle: 'Temukan lokasi kebun kopi, kedai kopi, dan destinasi wisata di Solok Selatan.',
      cat_culinary: 'Kedai Kopi',
      cat_tourism: 'Kebun Kopi',
      cat_craft: 'Pengolahan',
      cat_hotel: 'Homestay',
      search_placeholder: 'Cari "Kebun Kopi Liki"...',
      search_btn: 'Cari Lokasi',
      result_title: 'Hasil Analisa Lokasi:',
      source_map: 'Buka Peta'
    },
    features: {
      f1_title: 'EUDR Compliant',
      f1_desc: 'Kopi terverifikasi bebas deforestasi dengan data koordinat poligon.',
      f2_title: 'Fair Trade',
      f2_desc: 'Harga transparan sesuai kualitas. Premium price untuk kopi lolos uji.',
      f3_title: 'Direct Trade',
      f3_desc: 'Transaksi langsung antara petani/koperasi dengan buyer/eksportir.'
    },
    social: {
      title: 'Jejak Petani Kopi',
      subtitle: 'Aktivitas panen dan pengolahan pasca panen petani Solok Selatan.',
      follow_btn: 'Ikuti Instagram'
    },
    about: {
      title: 'Revolusi Kopi Solsel',
      p1: 'Kami memfasilitasi petani kopi Solok Selatan untuk memenuhi standar ekspor Eropa (EUDR). Dengan mendata koordinat lahan, kami memastikan kopi yang Anda beli 100% legal dan ramah lingkungan.',
      p2: 'Selain kopi, kami juga memberdayakan UMKM pendukung ekosistem wisata dan ekonomi kreatif.'
    },
    footer: {
      desc: 'Platform Agroteknologi & UMKM Solok Selatan. Fokus pada Kopi Berkelanjutan.',
      links: 'Menu',
      categories: 'Kategori',
      contact: 'Hubungi Koperasi',
      rights: 'All rights reserved.'
    },
    assistant: {
      btn_label: 'Tanya Ahli Kopi',
      greeting: 'Halo! Saya asisten agronomi digital. Mau tanya soal syarat EUDR, harga kopi hari ini, atau teknik pasca panen?',
      placeholder: 'Tanya tentang EUDR, grading kopi...',
      thinking: 'Menganalisa data...',
      header_title: 'Asisten Agronomi AI'
    }
  },
  en: {
    navbar: {
      home: 'Home',
      products: 'Catalog',
      about: 'About',
      contact: 'Contact',
      partner: 'Farmer Partner',
      partner_desc: 'Register Farmer',
      explore: 'Farm Map'
    },
    market: {
      title: 'Coffee Market Prices (EUDR vs Local):',
      update: 'Updated: This Morning'
    },
    hero: {
      tag: 'World Class Solok Coffee',
      title: 'EUDR Compliant Specialty Coffee',
      subtitle: 'The first digital platform connecting South Solok Coffee Farmers to the Global market through Traceability systems & EUDR Compliance.',
      cta_buy: 'Buy Green Bean',
      cta_learn: 'Check EUDR Data'
    },
    products: {
      title: 'Coffee & MSME Catalog',
      subtitle: 'Collection of best Arabica & Robusta Coffee verified Deforestation-Free (EUDR Ready), and other premium products.',
      view_all: 'View All',
      filter_all: 'All',
      sold_by: 'Farmer/Processor',
      buy_wa: 'Buy Sample',
      buy_b2b: 'Export Contract',
      ai_marketing: 'Smart Copy',
      ai_button_title: 'Generate description',
      visit_profile: 'Farm Profile',
      share_product: 'Share',
      share_success: 'Link copied!',
      mbiz_badge: 'Mbizmarket Ready',
      min_order: 'Min. Order',
      eudr_badge: 'EUDR Verified',
      traceability: 'Traceability Data',
      coords: 'Farm Coordinates',
      elevation: 'Elevation'
    },
    explore: {
      title: 'Coffee Exploration Map',
      subtitle: 'Find coffee farms, coffee shops, and tourism destinations in South Solok.',
      cat_culinary: 'Coffee Shop',
      cat_tourism: 'Coffee Farm',
      cat_craft: 'Processing',
      cat_hotel: 'Homestay',
      search_placeholder: 'Search "Liki Coffee Farm"...',
      search_btn: 'Search Location',
      result_title: 'Location Analysis:',
      source_map: 'Open Map'
    },
    features: {
      f1_title: 'EUDR Compliant',
      f1_desc: 'Coffee verified deforestation-free with polygon coordinate data.',
      f2_title: 'Fair Trade',
      f2_desc: 'Transparent pricing. Premium price for verified coffee.',
      f3_title: 'Direct Trade',
      f3_desc: 'Direct transactions between farmers/coops and buyers/exporters.'
    },
    social: {
      title: 'Coffee Farmer Stories',
      subtitle: 'Harvest and post-harvest activities of South Solok farmers.',
      follow_btn: 'Follow Instagram'
    },
    about: {
      title: 'Solsel Coffee Revolution',
      p1: 'We facilitate South Solok coffee farmers to meet European export standards (EUDR). By mapping land coordinates, we ensure the coffee you buy is 100% legal and eco-friendly.',
      p2: 'Beyond coffee, we also empower MSMEs supporting the tourism and creative economy ecosystem.'
    },
    footer: {
      desc: 'South Solok Agrotech & MSME Platform. Focused on Sustainable Coffee.',
      links: 'Menu',
      categories: 'Categories',
      contact: 'Contact Coop',
      rights: 'All rights reserved.'
    },
    assistant: {
      btn_label: 'Ask Coffee Expert',
      greeting: 'Hello! I am your digital agronomy assistant. Ask me about EUDR requirements, today\'s coffee prices, or post-harvest tech?',
      placeholder: 'Ask about EUDR, coffee grading...',
      thinking: 'Analyzing data...',
      header_title: 'AI Agronomy Assistant'
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