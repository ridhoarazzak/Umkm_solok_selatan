import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BusinessAssistant } from './components/BusinessAssistant';
import { Toast, ToastType } from './components/Toast';
import { RegisterModal } from './components/RegisterModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product, PlaceResult, GeminiStatus } from './types';
import { MapPin, Phone, Instagram, Facebook, Search, Map, Loader2, ArrowUpRight, AlertCircle, PlusCircle, ChevronDown, WifiOff, Navigation, Layers, Filter, TrendingUp, Trees } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { searchPlacesInSolok } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

// --- DATA 10 UMKM SOLOK SELATAN (FOCUSED ON COFFEE & EUDR) ---

const PRODUCTS_ID: Product[] = [
  // 1. KOPI PREMIUM (Highlight)
  {
    id: 'umkm-1',
    name: 'Arabika "Golden Solsel" (EUDR Verified)',
    category: 'Kopi',
    price: 110000,
    description: 'Biji kopi Arabika Full Wash Grade 1. Terverifikasi bebas deforestasi (EUDR) dengan data poligon lengkap. Notes: Caramel, Chocolate, Spices.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    owner: 'Koperasi Solok Radjo',
    contactNumber: '6281234567890',
    instagram: 'solokradjo',
    variants: [
      { name: 'Roasted Bean (250g)', price: 110000 },
      { name: 'Green Bean Export (1kg)', price: 165000 }
    ],
    isMbizReady: true,
    legalitas: ['NIB', 'EUDR Compliant', 'Halal', 'SCA Score 84+'],
    harvestDate: 'Okt 2023',
    eudrVerified: true,
    farmCoordinates: '-1.5654, 101.2588',
    elevation: '1.400 - 1.600 MDPL'
  },
  // 2. KOPI ROBUSTA
  {
    id: 'umkm-6',
    name: 'Robusta Fine "Liki" (EUDR Verified)',
    category: 'Kopi',
    price: 45000,
    description: 'Robusta petik merah dari perkebunan Liki. Body tebal, rasa coklat hitam yang kuat. Cocok untuk kopi susu kekinian. Legalitas lahan aman.',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d6c5af?auto=format&fit=crop&q=80&w=800',
    owner: 'Mitra Teh Liki',
    contactNumber: '628123123123',
    instagram: 'kopiliki_official',
    variants: [
      { name: 'Bubuk Halus (250g)', price: 45000 },
      { name: 'Green Bean (1kg)', price: 75000 }
    ],
    isMbizReady: true,
    legalitas: ['NIB', 'EUDR Compliant'],
    harvestDate: 'Daily',
    eudrVerified: true,
    farmCoordinates: '-1.5812, 101.3021',
    elevation: '900 - 1.100 MDPL'
  },
  // 3. KOPI NATURAL
  {
    id: 'umkm-11',
    name: 'Arabika Natural Process (Micro Lot)',
    category: 'Kopi',
    price: 135000,
    description: 'Kopi proses Natural fermentasi 72 jam. Rasa buah tropis (Jackfruit, Banana) yang intens. Stok terbatas.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800',
    owner: 'Poktan Tani Maju',
    contactNumber: '628111222333',
    variants: [
      { name: 'Roasted Bean (200g)', price: 135000 }
    ],
    isMbizReady: false,
    legalitas: ['P-IRT'],
    eudrVerified: false,
    farmCoordinates: '-1.5500, 101.2400',
    elevation: '1.500 MDPL'
  },
  // 4. RENDANG
  {
    id: 'umkm-2',
    name: 'Rendang Paru Kering "Uni Emi"',
    category: 'Makanan',
    price: 75000,
    description: 'Rendang paru sapi yang dimasak kering (krispi). Teman minum kopi yang pas.',
    image: 'https://images.unsplash.com/photo-1603083569762-b9e76100914c?auto=format&fit=crop&q=80&w=800',
    owner: 'Dapur Minang Asli',
    contactNumber: '6281122334455',
    instagram: 'dapurminang.uniemi',
    variants: [
        { name: 'Paru Kering (250g)', price: 75000 }
    ],
    isMbizReady: true,
    legalitas: ['NIB', 'P-IRT', 'Halal']
  },
  // 5. TEH
  {
    id: 'umkm-12',
    name: 'Teh Putih Silver Needle (Premium)',
    category: 'Minuman',
    price: 150000,
    description: 'Pucuk teh putih pilihan dari perkebunan teh Liki (terbesar di dunia dalam satu hamparan). Kaya antioksidan.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231844f74?auto=format&fit=crop&q=80&w=800',
    owner: 'Mitra Teh Liki',
    contactNumber: '628123123123',
    variants: [
      { name: 'Tin Can (50g)', price: 150000 }
    ],
    isMbizReady: true
  },
  // 6. SONGKET
  {
    id: 'umkm-3',
    name: 'Songket ATBM Pucuk Rebung',
    category: 'Fashion',
    price: 2500000,
    description: 'Kain tenun eksklusif motif Pucuk Rebung.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d3f661eb10?auto=format&fit=crop&q=80&w=800',
    owner: 'Galeri Tenun Bundo',
    contactNumber: '6281987654321',
    variants: [
      { name: 'Full Set', price: 2500000 }
    ],
    isMbizReady: true
  },
   // 7. CAMILAN
   {
    id: 'umkm-4',
    name: 'Keripik Sanjai Balado',
    category: 'Camilan',
    price: 30000,
    description: 'Keripik singkong irisan tipis dengan bumbu balado karamel.',
    image: 'https://images.unsplash.com/photo-1566453837860-637cc97c9ee3?auto=format&fit=crop&q=80&w=800',
    owner: 'Snack Rumah Gadang',
    contactNumber: '6285566778899',
    instagram: 'snack_rumahgadang',
    variants: [
      { name: 'Balado Merah (250g)', price: 30000 }
    ],
    isMbizReady: false
  },
];

const PRODUCTS_EN = PRODUCTS_ID.map(p => ({
    ...p,
    name: p.name.replace('Kopi', 'Coffee').replace('Arabika', 'Arabica'),
    description: p.description + " (Authentic South Solok)."
}));

// --- MARKET PRICE TICKER (FOCUSED ON EUDR PRICE GAP) ---
const MARKET_PRICES = [
  { name: 'Arabika Green Bean (EUDR)', price: 'Rp 125.000/kg', trend: 'up' },
  { name: 'Arabika Asalan (Non-EUDR)', price: 'Rp 85.000/kg', trend: 'down' },
  { name: 'Robusta Fine (EUDR)', price: 'Rp 65.000/kg', trend: 'up' },
  { name: 'Robusta Asalan', price: 'Rp 40.000/kg', trend: 'stable' },
  { name: 'Kulit Manis/Cassia', price: 'Rp 65.000/kg', trend: 'down' }
];

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const rawProducts = language === 'id' ? PRODUCTS_ID : PRODUCTS_EN; 
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(t.products.filter_all);
  }, [language, t.products.filter_all]);
  
  const EUDR_FILTER_KEY = t.products.eudr_badge; 
  const categories = [t.products.filter_all, EUDR_FILTER_KEY, 'Kopi', ...Array.from(new Set(rawProducts.map(p => p.category))).filter(c => c !== 'Kopi')];

  const filteredProducts = selectedCategory === t.products.filter_all
    ? rawProducts 
    : selectedCategory === EUDR_FILTER_KEY
        ? rawProducts.filter(p => p.eudrVerified) 
        : rawProducts.filter(p => p.category === selectedCategory);

  const [visibleCount, setVisibleCount] = useState(6);
  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const [searchResult, setSearchResult] = useState<PlaceResult | null>(null);
  const [toast, setToast] = useState<{msg: string, type: ToastType, show: boolean}>({msg: '', type: 'info', show: false});
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
    setVisibleCount(6); 
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar />
      
      {/* MARKET PRICE TICKER (Highlighting EUDR Premium) */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 overflow-hidden border-b border-gray-800 pt-20">
        <div className="container mx-auto px-6 flex items-center gap-4">
           <span className="font-bold text-solok-gold whitespace-nowrap hidden md:inline">{t.market.title}</span>
           <div className="flex gap-8 animate-marquee whitespace-nowrap">
             {MARKET_PRICES.map((mp, i) => (
               <div key={i} className="flex items-center gap-2">
                 <span className="font-medium text-white">{mp.name}</span>
                 <span className="text-gray-400">{mp.price}</span>
                 {mp.trend === 'up' && <span className="text-green-500 font-bold">▲ (Naik)</span>}
                 {mp.trend === 'down' && <span className="text-red-500">▼ (Turun)</span>}
                 {mp.trend === 'stable' && <span className="text-yellow-500">-</span>}
               </div>
             ))}
           </div>
           <span className="text-gray-500 text-[10px] whitespace-nowrap hidden md:inline ml-auto">{t.market.update}</span>
        </div>
      </div>

      <Hero />
      
      <Toast message={toast.msg} type={toast.type} isVisible={toast.show} onClose={() => setToast({...toast, show: false})} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <ProductDetailModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Product Section */}
      <section id="produk" className="py-24 container mx-auto px-6 relative">
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

        {/* --- CATEGORY FILTER BAR --- */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-gray-400 mr-2">
            <Filter size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                selectedCategory === cat 
                  ? (cat === EUDR_FILTER_KEY ? 'bg-green-700 text-white shadow-lg' : 'bg-gray-900 text-white shadow-lg transform scale-105')
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat === EUDR_FILTER_KEY && <Trees size={16} />} 
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

      {/* Social Media Hub */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
           <div className="flex justify-center mb-4">
             <div className="p-3 bg-pink-100 text-pink-600 rounded-full">
               <Instagram size={32} />
             </div>
           </div>
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{t.social.title}</h2>
           <p className="text-gray-500 max-w-2xl mx-auto mb-12">{t.social.subtitle}</p>

           {/* Instagram Mock Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
             {[
               "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
               "https://images.unsplash.com/photo-1610996884100-3363364f8992?auto=format&fit=crop&q=80&w=400",
               "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400",
               "https://images.unsplash.com/photo-1626574921671-50e50882e88a?auto=format&fit=crop&q=80&w=400"
             ].map((img, i) => (
               <div key={i} className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer">
                 <img src={img} alt="Instagram Feed" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <Instagram size={32} />
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-10">
             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-all shadow-sm">
               {t.social.follow_btn} <ArrowUpRight size={18} />
             </a>
           </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="jelajah" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-solok-gold text-sm font-bold tracking-widest uppercase mb-4 block">Smart Tourism</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t.explore.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">{t.explore.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Controls */}
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