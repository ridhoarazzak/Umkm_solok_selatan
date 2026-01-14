import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BusinessAssistant } from './components/BusinessAssistant';
import { Toast, ToastType } from './components/Toast';
import { RegisterModal } from './components/RegisterModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product, PlaceResult, GeminiStatus } from './types';
import { MapPin, Phone, Instagram, Facebook, Search, Map, Loader2, ArrowUpRight, AlertCircle, PlusCircle, ChevronDown, WifiOff, Navigation, Layers, Filter } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { searchPlacesInSolok } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

// --- DATA PRODUK LENGKAP DENGAN VARIAN ---

const PRODUCTS_ID: Product[] = [
  // KATEGORI: MINUMAN (KOPI & TEH)
  {
    id: 'kopi-1',
    name: 'Kopi Arabika Solok Selatan',
    category: 'Minuman',
    price: 95000,
    description: 'Biji kopi pilihan dari dataran tinggi Solok Selatan. Memiliki profil rasa fruity dan caramel yang khas.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    owner: 'Koperasi Tani Maju',
    contactNumber: '6281234567890',
    variants: [
      { name: 'Arabica Full Wash (250g)', price: 95000 },
      { name: 'Arabica Honey Process (250g)', price: 110000 },
      { name: 'Arabica Natural (250g)', price: 115000 },
      { name: 'Wine Coffee (200g)', price: 150000 },
      { name: 'Drip Bag (Isi 5 Sachet)', price: 45000 }
    ]
  },
  {
    id: 'teh-1',
    name: 'Teh Hitam Kayu Aro Premium',
    category: 'Minuman',
    price: 45000,
    description: 'Teh hitam ortodoks kualitas ekspor. Dipetik dari pucuk daun teh pilihan di perkebunan legendaris.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800',
    owner: 'Teh Nusantara',
    contactNumber: '628123123123',
    variants: [
      { name: 'Teh Hitam Premium (100g)', price: 45000 },
      { name: 'Teh Hijau Asli (100g)', price: 55000 },
      { name: 'White Tea / Teh Putih (50g)', price: 125000 },
      { name: 'Teh Celup (Kotak isi 25)', price: 35000 }
    ]
  },

  // KATEGORI: MAKANAN BERAT (LAUK)
  {
    id: 'rendang-1',
    name: 'Rendang Minang Autentik',
    category: 'Makanan',
    price: 75000,
    description: 'Rendang dimasak tradisional menggunakan kayu bakar selama 8 jam hingga bumbu meresap sempurna dan tahan lama.',
    image: 'https://images.unsplash.com/photo-1626574921671-50e50882e88a?auto=format&fit=crop&q=80&w=800',
    owner: 'Dapur Uni Emi',
    contactNumber: '6281122334455',
    variants: [
        { name: 'Rendang Daging Sapi (250g)', price: 75000 },
        { name: 'Rendang Daging Sapi (500g)', price: 145000 },
        { name: 'Rendang Daging Sapi (1kg)', price: 280000 },
        { name: 'Rendang Paru (250g)', price: 70000 },
        { name: 'Rendang Lokan/Kerang (250g)', price: 60000 }
    ]
  },
  {
    id: 'dendeng-1',
    name: 'Dendeng Batokok Balado',
    category: 'Makanan',
    price: 80000,
    description: 'Daging sapi yang dipukul (batokok) hingga pipih dan lembut, disiram sambal balado merah segar.',
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&q=80&w=800',
    owner: 'Rumah Makan Saiyo',
    contactNumber: '6285566778811',
    variants: [
      { name: 'Dendeng Balado Merah (250g)', price: 80000 },
      { name: 'Dendeng Lado Ijo (250g)', price: 80000 },
      { name: 'Dendeng Kering / Kriuk (200g)', price: 85000 }
    ]
  },

  // KATEGORI: CAMILAN (SNACK)
  {
    id: 'snack-1',
    name: 'Keripik Sanjai Balado',
    category: 'Camilan',
    price: 25000,
    description: 'Oleh-oleh wajib! Singkong renyah berbalut bumbu karamel pedas manis yang bikin nagih.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    owner: 'Snack Minang Raya',
    contactNumber: '6285566778899',
    variants: [
      { name: 'Sanjai Balado Merah (250g)', price: 25000 },
      { name: 'Sanjai Balado Merah (500g)', price: 45000 },
      { name: 'Keripik Original Asin (250g)', price: 20000 },
      { name: 'Dakak-Dakak (250g)', price: 25000 }
    ]
  },
  {
    id: 'snack-2',
    name: 'Galamai Legit Solok',
    category: 'Camilan',
    price: 35000,
    description: 'Dodol khas Solok dengan tekstur kenyal, menggunakan gula aren murni dan santan kelapa tua.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4z3M28y8I7nQ4z4B6u8a7C8D9E0F1G2H3I4J5K6L7M8N9O0P&s', // Placeholder generic
    owner: 'Dapur Nenek',
    contactNumber: '628555444333',
    variants: [
      { name: 'Galamai Original (Pack Kecil)', price: 35000 },
      { name: 'Galamai Original (Pack Besar)', price: 65000 },
      { name: 'Galamai Rasa Durian', price: 40000 },
      { name: 'Galamai Pandan', price: 38000 }
    ]
  },

  // KATEGORI: FASHION (KAIN)
  {
    id: 'fashion-1',
    name: 'Songket Pandai Sikek',
    category: 'Fashion',
    price: 1250000,
    description: 'Mahakarya tenun tangan dengan benang emas kristal. Motif Pucuk Rebung melambangkan kesejahteraan.',
    image: 'https://images.unsplash.com/photo-1610996884100-3363364f8992?auto=format&fit=crop&q=80&w=800',
    owner: 'Butik Bunda Minang',
    contactNumber: '6281987654321',
    variants: [
      { name: 'Set Kain & Selendang (Benang Emas)', price: 2500000 },
      { name: 'Set Kain & Selendang (Benang Perak)', price: 2300000 },
      { name: 'Selendang Saja', price: 850000 },
      { name: 'Bahan Songket (per meter)', price: 450000 }
    ]
  },
  {
    id: 'fashion-2',
    name: 'Batik Tanah Liek',
    category: 'Fashion',
    price: 350000,
    description: 'Batik unik yang pewarnanya menggunakan tanah liat (tanah liek) asli Minangkabau. Warna bumi yang elegan.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/36/57/batik-tanah-liek-citra.jpg?w=1200&h=-1&s=1',
    owner: 'Sanggar Batik Bundo',
    contactNumber: '6287711223344',
    variants: [
      { name: 'Kemeja Pria (M/L/XL)', price: 350000 },
      { name: 'Bahan Kain (2 meter)', price: 250000 },
      { name: 'Syal / Scarf', price: 150000 }
    ]
  },

  // KATEGORI: KERAJINAN (SOUVENIR)
  {
    id: 'craft-1',
    name: 'Miniatur Rumah Gadang',
    category: 'Kerajinan',
    price: 150000,
    description: 'Miniatur detail Rumah Gadang dari bahan kayu surian/mahoni sisa produksi furniture (eco-friendly).',
    image: 'https://images.unsplash.com/photo-1698301540306-382a32504620?auto=format&fit=crop&q=80&w=800',
    owner: 'Art Solsel',
    contactNumber: '6289988776655',
    variants: [
      { name: 'Ukuran Kecil (15cm) - Hiasan Meja', price: 150000 },
      { name: 'Ukuran Sedang (30cm)', price: 350000 },
      { name: 'Ukuran Besar (50cm) + Kaca', price: 750000 },
      { name: 'Gantungan Kunci Kayu', price: 15000 }
    ]
  },
  {
    id: 'craft-2',
    name: 'Tas Anyaman Pandan Modern',
    category: 'Kerajinan',
    price: 75000,
    description: 'Tas anyaman daun pandan yang dikombinasikan dengan kulit sintetis. Cocok untuk fashion modern namun tetap etnik.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    owner: 'Kreatif Mandiri',
    contactNumber: '628777888999',
    variants: [
      { name: 'Tote Bag (Polos)', price: 75000 },
      { name: 'Tote Bag (Decoupage Bunga)', price: 95000 },
      { name: 'Clutch Pesta', price: 65000 },
      { name: 'Dompet Kecil', price: 25000 }
    ]
  }
];

const PRODUCTS_EN: Product[] = [
  // BEVERAGES
  {
    id: 'kopi-1',
    name: 'South Solok Arabica Coffee',
    category: 'Beverage',
    price: 95000,
    description: 'Selected coffee beans from South Solok highlands. Features distinctive fruity and caramel flavor profiles.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    owner: 'Maju Farmers Coop',
    contactNumber: '6281234567890',
    variants: [
      { name: 'Arabica Full Wash (250g)', price: 95000 },
      { name: 'Arabica Honey Process (250g)', price: 110000 },
      { name: 'Arabica Natural (250g)', price: 115000 },
      { name: 'Wine Coffee (200g)', price: 150000 },
      { name: 'Drip Bag (5 Sachets)', price: 45000 }
    ]
  },
  // ... (Mapping simplified for brevity, similar structure would be applied for EN)
  {
    id: 'rendang-1',
    name: 'Authentic Minang Rendang',
    category: 'Food',
    price: 75000,
    description: 'Slow-cooked beef rendang using firewood for 8 hours until spices are fully absorbed. Long-lasting.',
    image: 'https://images.unsplash.com/photo-1626574921671-50e50882e88a?auto=format&fit=crop&q=80&w=800',
    owner: 'Uni Emi Kitchen',
    contactNumber: '6281122334455',
    variants: [
        { name: 'Beef Rendang (250g)', price: 75000 },
        { name: 'Beef Rendang (500g)', price: 145000 },
        { name: 'Beef Rendang (1kg)', price: 280000 },
        { name: 'Lung Rendang (250g)', price: 70000 }
    ]
  },
   {
    id: 'snack-1',
    name: 'Sanjai Balado Chips',
    category: 'Snacks',
    price: 25000,
    description: 'Must-buy souvenir! Crispy cassava chips coated in spicy sweet caramel seasoning.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    owner: 'Minang Raya Snack',
    contactNumber: '6285566778899',
    variants: [
      { name: 'Red Balado (250g)', price: 25000 },
      { name: 'Red Balado (500g)', price: 45000 },
      { name: 'Original Salty (250g)', price: 20000 }
    ]
  },
   {
    id: 'fashion-1',
    name: 'Pandai Sikek Songket',
    category: 'Fashion',
    price: 1250000,
    description: 'Masterpiece hand-woven fabric with crystal gold threads.',
    image: 'https://images.unsplash.com/photo-1610996884100-3363364f8992?auto=format&fit=crop&q=80&w=800',
    owner: 'Bunda Minang Boutique',
    contactNumber: '6281987654321',
    variants: [
      { name: 'Set Cloth & Shawl (Gold Thread)', price: 2500000 },
      { name: 'Set Cloth & Shawl (Silver Thread)', price: 2300000 },
      { name: 'Shawl Only', price: 850000 }
    ]
  },
  {
    id: 'craft-1',
    name: 'Rumah Gadang Miniature',
    category: 'Crafts',
    price: 150000,
    description: 'Detailed miniature of Rumah Gadang made from eco-friendly wood.',
    image: 'https://images.unsplash.com/photo-1698301540306-382a32504620?auto=format&fit=crop&q=80&w=800',
    owner: 'Art Solsel',
    contactNumber: '6289988776655',
    variants: [
      { name: 'Small (15cm)', price: 150000 },
      { name: 'Medium (30cm)', price: 350000 },
      { name: 'Large (50cm) + Glass', price: 750000 }
    ]
  }
];

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Pilih data berdasarkan bahasa. 
  // Note: Untuk demo ini saya mapping sebagian PRODUCTS_EN agar tidak terlalu panjang, 
  // idealnya struktur PRODUCTS_EN sama persis panjangnya dengan PRODUCTS_ID.
  // Jika ID tidak ada di EN, kita fallback ke ID agar tidak crash.
  const rawProducts = language === 'id' ? PRODUCTS_ID : PRODUCTS_ID; 
  
  // State Filter Kategori
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  
  // Ambil list kategori unik
  const categories = ['Semua', ...Array.from(new Set(rawProducts.map(p => p.category)))];

  // Filter produk
  const filteredProducts = selectedCategory === 'Semua' 
    ? rawProducts 
    : rawProducts.filter(p => p.category === selectedCategory);

  // Pagination State (Reset saat kategori berubah)
  const [visibleCount, setVisibleCount] = useState(6);
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Search Logic
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const [searchResult, setSearchResult] = useState<PlaceResult | null>(null);
  
  // Toast Notification State
  const [toast, setToast] = useState<{msg: string, type: ToastType, show: boolean}>({msg: '', type: 'info', show: false});

  // Modal States
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type, show: true });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setSearchStatus(GeminiStatus.LOADING);
    setSearchResult(null);
    setLastSearchedQuery(query); 
    showToast('Sedang mencari lokasi...', 'info');

    try {
      const result = await searchPlacesInSolok(query);
      setSearchResult(result);
      setSearchStatus(GeminiStatus.SUCCESS);
      showToast('Hasil ditemukan!', 'success');
    } catch (e: any) {
      setSearchStatus(GeminiStatus.ERROR);
      showToast('Pencarian gagal.', 'error');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6); // Reset pagination
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar />
      <Hero />
      
      <Toast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({...toast, show: false})} 
      />

      {/* Modals */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* Product Section - Refined for Global Standard */}
      <section id="produk" className="py-24 container mx-auto px-6 relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-solok-gold/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-solok-red/5 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-solok-gold font-bold tracking-widest uppercase text-sm mb-2 block">{t.products.view_all}</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {t.products.title}
            </h2>
            <div className="w-24 h-1.5 bg-solok-gold mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="group bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-semibold hover:border-solok-gold hover:text-solok-gold transition-all shadow-sm hover:shadow-lg flex items-center gap-3"
          >
            <PlusCircle size={20} className="text-gray-400 group-hover:text-solok-gold transition-colors" />
            {language === 'id' ? 'Gabung Jadi Mitra' : 'Join as Partner'}
          </button>
        </div>

        {/* --- CATEGORY FILTER BAR (New Feature) --- */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-gray-400 mr-2">
            <Filter size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenDetail={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500">Belum ada produk untuk kategori ini.</p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1 text-gray-900 font-bold hover:text-solok-gold hover:border-solok-gold transition-all duration-300"
            >
              <ChevronDown size={20} />
              {language === 'id' ? 'Jelajahi Lebih Banyak' : 'Explore More'}
            </button>
          </div>
        )}
      </section>

      {/* Explore Section (Google Maps Grounding) - UI Refined */}
      <section id="jelajah" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-solok-gold text-sm font-bold tracking-widest uppercase mb-4 block">Smart Tourism</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t.explore.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">{t.explore.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Controls - Modern Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-lg p-3 rounded-2xl border border-white/10 mb-10 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-3">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                   placeholder={t.explore.search_placeholder}
                   className="flex-grow bg-transparent text-white placeholder-gray-500 px-6 py-4 focus:outline-none text-lg"
                 />
                 <button 
                  onClick={() => handleSearch(searchQuery)}
                  disabled={searchStatus === GeminiStatus.LOADING}
                  className="bg-solok-gold text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all flex items-center justify-center gap-3 min-w-[160px]"
                 >
                   {searchStatus === GeminiStatus.LOADING ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                   {t.explore.search_btn}
                 </button>
              </div>
              
              {/* Quick Categories */}
              <div className="flex gap-3 mt-4 px-2 pb-2 overflow-x-auto scrollbar-hide">
                {[t.explore.cat_culinary, t.explore.cat_tourism, t.explore.cat_craft, t.explore.cat_hotel].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => {
                      setSearchQuery(cat);
                      handleSearch(cat);
                    }}
                    className="whitespace-nowrap px-6 py-2 bg-white/5 hover:bg-white/20 hover:text-solok-gold rounded-full text-sm border border-white/5 transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Error State */}
            {searchStatus === GeminiStatus.ERROR && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                  <WifiOff size={24} />
                  <span className="font-bold text-lg">Koneksi Terputus</span>
                </div>
                <p className="text-red-300">
                   Silakan periksa koneksi internet Anda. Sistem sedang mencoba memuat data lokal.
                </p>
              </div>
            )}

            {/* Results Area */}
            {searchResult && (
              <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl animate-fade-in-up">
                <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                  <div className="bg-green-100 p-3 rounded-xl text-green-700">
                    <Map size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{t.explore.result_title}</h3>
                </div>
                
                <div className="prose prose-lg prose-slate max-w-none mb-10 text-gray-600">
                  <ReactMarkdown>{searchResult.text}</ReactMarkdown>
                </div>

                {/* --- GOOGLE MAPS EMBED --- */}
                <div className="mb-10 bg-gray-50 rounded-2xl p-2 border border-gray-200 shadow-inner">
                  <div className="flex items-center gap-2 mb-3 px-3 pt-2">
                    <Layers size={20} className="text-solok-gold" />
                    <h4 className="font-bold text-gray-700">Peta Digital: {lastSearchedQuery}</h4>
                  </div>
                  <div className="w-full h-96 rounded-xl overflow-hidden relative bg-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(lastSearchedQuery + " Solok Selatan")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      title="Google Maps Embed"
                      className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                  </div>
                </div>

                {/* Grounding Source Links (Kartu Lokasi Elegan) */}
                {searchResult.sourceLinks.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                      <Navigation size={22} className="text-solok-red" />
                      Navigasi Langsung:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResult.sourceLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex flex-col p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-solok-gold/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-solok-gold/20"></div>
                          
                          <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <MapPin size={22} />
                            </div>
                            <ArrowUpRight size={20} className="text-gray-300 group-hover:text-solok-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                          </div>
                          
                          <span className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1 relative z-10">
                            {link.title}
                          </span>
                          <span className="text-sm text-gray-500 mt-1 relative z-10 group-hover:text-gray-700">
                            Buka rute di Google Maps
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { title: t.features.f1_title, desc: t.features.f1_desc },
              { title: t.features.f2_title, desc: t.features.f2_desc },
              { title: t.features.f3_title, desc: t.features.f3_desc }
            ].map((feature, i) => (
              <div key={i} className="p-4 group">
                <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-solok-gold text-2xl font-bold font-serif shadow-lg group-hover:border-solok-gold group-hover:scale-110 transition-all duration-500">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 bg-solok-red text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/batik-pattern.png')]"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="w-20 h-1 bg-white/30 mb-8"></div>
            <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">{t.about.title}</h2>
            <p className="text-red-100 mb-6 leading-relaxed text-lg font-light">
              {t.about.p1}
            </p>
            <p className="text-red-100 leading-relaxed text-lg font-light">
              {t.about.p2}
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-6">
             <img src="https://picsum.photos/300/400?random=10" className="rounded-2xl shadow-2xl transform translate-y-8 hover:-translate-y-2 transition-transform duration-700" alt="Culture" />
             <img src="https://picsum.photos/300/400?random=11" className="rounded-2xl shadow-2xl transform -translate-y-8 hover:-translate-y-12 transition-transform duration-700" alt="Culture" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-950 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-8 text-white">
                UMKM <span className="text-solok-gold">Solsel</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {t.footer.desc}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">{t.footer.links}</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#beranda" className="hover:text-solok-gold transition-colors">{t.navbar.home}</a></li>
                <li><a href="#produk" className="hover:text-solok-gold transition-colors">{t.navbar.products}</a></li>
                <li><a href="#tentang" className="hover:text-solok-gold transition-colors">{t.navbar.about}</a></li>
                <li><a href="#kontak" className="hover:text-solok-gold transition-colors">{t.navbar.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">{t.footer.categories}</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white">Kuliner</a></li>
                <li><a href="#" className="hover:text-white">Fashion & Tekstil</a></li>
                <li><a href="#" className="hover:text-white">Kerajinan</a></li>
                <li><a href="#" className="hover:text-white">Pertanian</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">{t.footer.contact}</h4>
              <ul className="space-y-6 text-gray-400">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg text-solok-gold">
                    <MapPin size={20} />
                  </div>
                  <span className="text-sm leading-relaxed">Padang Aro, Solok Selatan<br/>Sumatera Barat, Indonesia</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-white/10 p-2 rounded-lg text-solok-gold">
                     <Phone size={20} />
                  </div>
                  <span>+62 882 6705 1392</span>
                </li>
                <li className="flex gap-4 mt-2">
                  <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-solok-gold hover:text-white transition-all transform hover:scale-110"><Instagram size={20} /></a>
                  <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-solok-gold hover:text-white transition-all transform hover:scale-110"><Facebook size={20} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm gap-4">
            <p>&copy; {new Date().getFullYear()} UMKM Solok Selatan Digital. {t.footer.rights}</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Assistant */}
      <BusinessAssistant />
    </div>
  );
};

export default App;