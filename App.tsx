import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BusinessAssistant } from './components/BusinessAssistant';
import { Toast, ToastType } from './components/Toast';
import { RegisterModal } from './components/RegisterModal';
import { Product, PlaceResult, GeminiStatus } from './types';
import { MapPin, Phone, Instagram, Facebook, Search, Map, Loader2, ArrowUpRight, AlertCircle, PlusCircle, ChevronDown, WifiOff, Navigation, Layers } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { searchPlacesInSolok } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

// Mock Data ID (Tetap sama, bisa ditambah hingga ratusan item)
const PRODUCTS_ID: Product[] = [
  {
    id: '1',
    name: 'Kopi Arabika Solok Selatan',
    category: 'Kuliner',
    price: 85000,
    description: 'Kopi Arabika premium yang dipetik dari dataran tinggi Solok Selatan. Memiliki cita rasa fruity dengan aroma rempah yang khas.',
    image: 'https://picsum.photos/400/300?random=1',
    owner: 'Koperasi Tani Maju',
    contactNumber: '6288267051392'
  },
  {
    id: '2',
    name: 'Kain Songket Pandai Sikek',
    category: 'Fashion',
    price: 1250000,
    description: 'Songket tenunan tangan asli dengan benang emas berkualitas tinggi. Motif klasik yang melambangkan kemewahan adat Minangkabau.',
    image: 'https://picsum.photos/400/300?random=2',
    owner: 'Butik Bunda Minang',
    contactNumber: '6288267051392'
  },
  {
    id: '3',
    name: 'Rendang Sapi Kemasan',
    category: 'Kuliner',
    price: 65000,
    description: 'Rendang sapi asli yang dimasak dengan kayu bakar selama 8 jam. Tahan lama dan praktis untuk dibawa sebagai oleh-oleh.',
    image: 'https://picsum.photos/400/300?random=3',
    owner: 'Dapur Uni Emi',
    contactNumber: '6288267051392'
  },
  {
    id: '4',
    name: 'Keripik Sanjai Balado',
    category: 'Camilan',
    price: 25000,
    description: 'Keripik singkong renyah dengan balutan bumbu balado pedas manis yang menggugah selera.',
    image: 'https://picsum.photos/400/300?random=4',
    owner: 'Snack Minang Raya',
    contactNumber: '6288267051392'
  },
  {
    id: '5',
    name: 'Souvenir Rumah Gadang',
    category: 'Kerajinan',
    price: 150000,
    description: 'Miniatur Rumah Gadang dari kayu berkualitas. Sangat cocok untuk hiasan meja atau kado spesial.',
    image: 'https://picsum.photos/400/300?random=5',
    owner: 'Art Solsel',
    contactNumber: '6288267051392'
  },
  {
    id: '6',
    name: 'Teh Kayu Aro Premium',
    category: 'Minuman',
    price: 45000,
    description: 'Teh hitam kualitas ekspor dari perkebunan teh tertua di Sumatera. Rasa pekat dan menenangkan.',
    image: 'https://picsum.photos/400/300?random=6',
    owner: 'Teh Nusantara',
    contactNumber: '6288267051392'
  },
   {
    id: '7',
    name: 'Galamai Solok',
    category: 'Kuliner',
    price: 35000,
    description: 'Dodol khas Minangkabau dengan tekstur kenyal dan rasa manis gula aren asli.',
    image: 'https://picsum.photos/400/300?random=7',
    owner: 'Dapur Nenek',
    contactNumber: '6288267051392'
  },
   {
    id: '8',
    name: 'Tas Anyaman Pandan',
    category: 'Kerajinan',
    price: 75000,
    description: 'Tas ramah lingkungan dari daun pandan yang dianyam rapi oleh ibu-ibu PKK.',
    image: 'https://picsum.photos/400/300?random=8',
    owner: 'Kreatif Mandiri',
    contactNumber: '6288267051392'
  },
];

// Mock Data EN
const PRODUCTS_EN: Product[] = [
  {
    id: '1',
    name: 'South Solok Arabica Coffee',
    category: 'Culinary',
    price: 85000,
    description: 'Premium Arabica coffee harvested from the highlands of South Solok. Features a fruity taste with a distinctive spice aroma.',
    image: 'https://picsum.photos/400/300?random=1',
    owner: 'Maju Farmers Coop',
    contactNumber: '6288267051392'
  },
  {
    id: '2',
    name: 'Pandai Sikek Songket Fabric',
    category: 'Fashion',
    price: 1250000,
    description: 'Authentic hand-woven Songket with high-quality gold threads. Classic motifs symbolizing the luxury of Minangkabau customs.',
    image: 'https://picsum.photos/400/300?random=2',
    owner: 'Bunda Minang Boutique',
    contactNumber: '6288267051392'
  },
  {
    id: '3',
    name: 'Packaged Beef Rendang',
    category: 'Culinary',
    price: 65000,
    description: 'Authentic beef rendang cooked with firewood for 8 hours. Durable and practical to bring as a souvenir.',
    image: 'https://picsum.photos/400/300?random=3',
    owner: 'Uni Emi Kitchen',
    contactNumber: '6288267051392'
  },
  {
    id: '4',
    name: 'Sanjai Balado Chips',
    category: 'Snacks',
    price: 25000,
    description: 'Crispy cassava chips coated with a spicy-sweet Balado seasoning that arouses the appetite.',
    image: 'https://picsum.photos/400/300?random=4',
    owner: 'Minang Raya Snack',
    contactNumber: '6288267051392'
  },
  {
    id: '5',
    name: 'Rumah Gadang Souvenir',
    category: 'Crafts',
    price: 150000,
    description: 'Miniature Rumah Gadang made of high-quality wood. Perfect for table decoration or a special gift.',
    image: 'https://picsum.photos/400/300?random=5',
    owner: 'Art Solsel',
    contactNumber: '6288267051392'
  },
  {
    id: '6',
    name: 'Kayu Aro Premium Tea',
    category: 'Beverage',
    price: 45000,
    description: 'Export quality black tea from the oldest tea plantation in Sumatra. Strong taste and calming.',
    image: 'https://picsum.photos/400/300?random=6',
    owner: 'Nusantara Tea',
    contactNumber: '6288267051392'
  },
   {
    id: '7',
    name: 'Galamai Solok',
    category: 'Culinary',
    price: 35000,
    description: 'Typical Minangkabau dodol with a chewy texture and sweet taste of real palm sugar.',
    image: 'https://picsum.photos/400/300?random=7',
    owner: 'Grandma Kitchen',
    contactNumber: '6288267051392'
  },
   {
    id: '8',
    name: 'Pandan Woven Bag',
    category: 'Crafts',
    price: 75000,
    description: 'Eco-friendly bag made from pandan leaves neatly woven by PKK mothers.',
    image: 'https://picsum.photos/400/300?random=8',
    owner: 'Creative Independent',
    contactNumber: '6288267051392'
  },
];

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const allProducts = language === 'id' ? PRODUCTS_ID : PRODUCTS_EN;
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(6);
  const displayedProducts = allProducts.slice(0, visibleCount);

  // Search Logic
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const [searchResult, setSearchResult] = useState<PlaceResult | null>(null);
  
  // Toast Notification State
  const [toast, setToast] = useState<{msg: string, type: ToastType, show: boolean}>({msg: '', type: 'info', show: false});

  // Register Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type, show: true });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setSearchStatus(GeminiStatus.LOADING);
    setSearchResult(null);
    setLastSearchedQuery(query); // Save the query for the map embed
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      
      <Toast 
        message={toast.msg} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({...toast, show: false})} 
      />

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      {/* Product Section */}
      <section id="produk" className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
              {t.products.title}
            </h2>
            <div className="w-24 h-1 bg-solok-gold mb-4"></div>
            <p className="text-gray-600 max-w-xl">
              {t.products.subtitle}
            </p>
          </div>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-all flex items-center gap-2 shadow-lg"
          >
            <PlusCircle size={20} />
            {language === 'id' ? 'Daftarkan Usaha Anda' : 'Register Your Business'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button - Only show if there are more products */}
        {visibleCount < allProducts.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <ChevronDown size={20} />
              {language === 'id' ? 'Lihat Lebih Banyak' : 'Load More Products'}
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Menampilkan {displayedProducts.length} dari {allProducts.length} produk
            </p>
          </div>
        )}
      </section>

      {/* Explore Section (Google Maps Grounding) */}
      <section id="jelajah" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-solok-gold text-sm font-bold tracking-widest uppercase mb-2 block">Google Maps Integration</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.explore.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.explore.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Controls */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row gap-2">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                   placeholder={t.explore.search_placeholder}
                   className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none"
                 />
                 <button 
                  onClick={() => handleSearch(searchQuery)}
                  disabled={searchStatus === GeminiStatus.LOADING}
                  className="bg-solok-gold text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                 >
                   {searchStatus === GeminiStatus.LOADING ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                   {t.explore.search_btn}
                 </button>
              </div>
              
              {/* Quick Categories */}
              <div className="flex gap-2 mt-4 px-2 pb-2 overflow-x-auto">
                {[t.explore.cat_culinary, t.explore.cat_tourism, t.explore.cat_craft, t.explore.cat_hotel].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => {
                      setSearchQuery(cat);
                      handleSearch(cat);
                    }}
                    className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/20 rounded-full text-sm border border-white/10 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Error State - Simplified */}
            {searchStatus === GeminiStatus.ERROR && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 text-red-400 mb-1">
                  <WifiOff size={20} />
                  <span className="font-bold">Koneksi Bermasalah</span>
                </div>
                <p className="text-sm text-red-300">
                   Silakan periksa koneksi internet Anda dan coba lagi.
                </p>
              </div>
            )}

            {/* Results Area */}
            {searchResult && (
              <div className="bg-white rounded-2xl p-6 md:p-8 text-gray-900 shadow-2xl animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="bg-green-100 p-2 rounded-lg text-green-700">
                    <Map size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{t.explore.result_title}</h3>
                </div>
                
                <div className="prose prose-slate max-w-none mb-8">
                  <ReactMarkdown>{searchResult.text}</ReactMarkdown>
                </div>

                {/* --- GOOGLE MAPS EMBED --- */}
                {/* Visual map iframe based on search query */}
                <div className="mb-8 bg-gray-50 rounded-xl p-2 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3 px-2 pt-2">
                    <Layers size={18} className="text-solok-gold" />
                    <h4 className="font-bold text-gray-700">Peta Digital: {lastSearchedQuery}</h4>
                  </div>
                  <div className="w-full h-80 rounded-lg overflow-hidden relative bg-gray-200 shadow-inner">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(lastSearchedQuery + " Solok Selatan")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      title="Google Maps Embed"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
                {/* ------------------------- */}

                {/* Grounding Source Links (Kartu Lokasi Elegan) */}
                {searchResult.sourceLinks.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <Navigation size={18} className="text-solok-red" />
                      Detail Lokasi:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResult.sourceLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-solok-gold transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-16 h-16 bg-solok-gold/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-solok-gold/20"></div>
                          
                          <div className="flex items-start justify-between mb-2 relative z-10">
                            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                              <MapPin size={20} />
                            </div>
                            <ArrowUpRight size={18} className="text-gray-400 group-hover:text-solok-gold group-hover:translate-x-1 transition-all" />
                          </div>
                          
                          <span className="font-bold text-gray-900 group-hover:text-solok-gold transition-colors line-clamp-1 relative z-10">
                            {link.title}
                          </span>
                          <span className="text-xs text-gray-500 mt-1 relative z-10">
                            Klik untuk navigasi
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

      {/* Feature Section (Value Proposition) */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: t.features.f1_title, desc: t.features.f1_desc },
              { title: t.features.f2_title, desc: t.features.f2_desc },
              { title: t.features.f3_title, desc: t.features.f3_desc }
            ].map((feature, i) => (
              <div key={i} className="p-6">
                <div className="w-16 h-16 bg-solok-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-solok-gold text-2xl font-bold font-serif">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 bg-solok-red text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/batik-pattern.png')]"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif font-bold mb-6">{t.about.title}</h2>
            <p className="text-red-100 mb-6 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-red-100 leading-relaxed">
              {t.about.p2}
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
             <img src="https://picsum.photos/300/400?random=10" className="rounded-lg shadow-2xl transform translate-y-4" alt="Culture" />
             <img src="https://picsum.photos/300/400?random=11" className="rounded-lg shadow-2xl transform -translate-y-4" alt="Culture" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-solok-gold">UMKM Solsel</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.links}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#beranda" className="hover:text-white">{t.navbar.home}</a></li>
                <li><a href="#produk" className="hover:text-white">{t.navbar.products}</a></li>
                <li><a href="#tentang" className="hover:text-white">{t.navbar.about}</a></li>
                <li><a href="#kontak" className="hover:text-white">{t.navbar.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.categories}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Kuliner</a></li>
                <li><a href="#" className="hover:text-white">Fashion & Tekstil</a></li>
                <li><a href="#" className="hover:text-white">Kerajinan</a></li>
                <li><a href="#" className="hover:text-white">Pertanian</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-solok-gold" />
                  <span>Padang Aro, Solok Selatan<br/>Sumatera Barat, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-solok-gold" />
                  <span>+62 882 6705 1392</span>
                </li>
                <li className="flex gap-4 mt-2">
                  <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-solok-gold transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-solok-gold transition-colors"><Facebook size={18} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} UMKM Solok Selatan Digital. {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* Floating Assistant */}
      <BusinessAssistant />
    </div>
  );
};

export default App;