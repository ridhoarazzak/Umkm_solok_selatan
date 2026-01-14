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

// DATA DUMMY: Perhatikan 'contactNumber' sekarang berbeda-beda untuk setiap penjual.
const PRODUCTS_ID: Product[] = [
  {
    id: '1',
    name: 'Kopi Arabika Solok Selatan',
    category: 'Kuliner',
    price: 85000,
    description: 'Kopi Arabika premium yang dipetik dari dataran tinggi Solok Selatan. Memiliki cita rasa fruity dengan aroma rempah yang khas.',
    image: 'https://picsum.photos/400/300?random=1',
    owner: 'Koperasi Tani Maju',
    contactNumber: '6281234567890' // Nomor Pemilik Koperasi
  },
  {
    id: '2',
    name: 'Kain Songket Pandai Sikek',
    category: 'Fashion',
    price: 1250000,
    description: 'Songket tenunan tangan asli dengan benang emas berkualitas tinggi. Motif klasik yang melambangkan kemewahan adat Minangkabau.',
    image: 'https://picsum.photos/400/300?random=2',
    owner: 'Butik Bunda Minang',
    contactNumber: '6281987654321' // Nomor Butik Bunda
  },
  {
    id: '3',
    name: 'Rendang Sapi Kemasan',
    category: 'Kuliner',
    price: 65000,
    description: 'Rendang sapi asli yang dimasak dengan kayu bakar selama 8 jam. Tahan lama dan praktis untuk dibawa sebagai oleh-oleh.',
    image: 'https://picsum.photos/400/300?random=3',
    owner: 'Dapur Uni Emi',
    contactNumber: '6281122334455' // Nomor Uni Emi
  },
  {
    id: '4',
    name: 'Keripik Sanjai Balado',
    category: 'Camilan',
    price: 25000,
    description: 'Keripik singkong renyah dengan balutan bumbu balado pedas manis yang menggugah selera.',
    image: 'https://picsum.photos/400/300?random=4',
    owner: 'Snack Minang Raya',
    contactNumber: '6285566778899' // Nomor Snack Minang
  },
  {
    id: '5',
    name: 'Souvenir Rumah Gadang',
    category: 'Kerajinan',
    price: 150000,
    description: 'Miniatur Rumah Gadang dari kayu berkualitas. Sangat cocok untuk hiasan meja atau kado spesial.',
    image: 'https://picsum.photos/400/300?random=5',
    owner: 'Art Solsel',
    contactNumber: '6289988776655'
  },
  {
    id: '6',
    name: 'Teh Kayu Aro Premium',
    category: 'Minuman',
    price: 45000,
    description: 'Teh hitam kualitas ekspor dari perkebunan teh tertua di Sumatera. Rasa pekat dan menenangkan.',
    image: 'https://picsum.photos/400/300?random=6',
    owner: 'Teh Nusantara',
    contactNumber: '628123123123'
  },
   {
    id: '7',
    name: 'Galamai Solok',
    category: 'Kuliner',
    price: 35000,
    description: 'Dodol khas Minangkabau dengan tekstur kenyal dan rasa manis gula aren asli.',
    image: 'https://picsum.photos/400/300?random=7',
    owner: 'Dapur Nenek',
    contactNumber: '628555444333'
  },
   {
    id: '8',
    name: 'Tas Anyaman Pandan',
    category: 'Kerajinan',
    price: 75000,
    description: 'Tas ramah lingkungan dari daun pandan yang dianyam rapi oleh ibu-ibu PKK.',
    image: 'https://picsum.photos/400/300?random=8',
    owner: 'Kreatif Mandiri',
    contactNumber: '628777888999'
  },
];

// Mock Data EN (Nomor sama dengan ID)
const PRODUCTS_EN: Product[] = [
  {
    id: '1',
    name: 'South Solok Arabica Coffee',
    category: 'Culinary',
    price: 85000,
    description: 'Premium Arabica coffee harvested from the highlands of South Solok. Features a fruity taste with a distinctive spice aroma.',
    image: 'https://picsum.photos/400/300?random=1',
    owner: 'Maju Farmers Coop',
    contactNumber: '6281234567890'
  },
  {
    id: '2',
    name: 'Pandai Sikek Songket Fabric',
    category: 'Fashion',
    price: 1250000,
    description: 'Authentic hand-woven Songket with high-quality gold threads. Classic motifs symbolizing the luxury of Minangkabau customs.',
    image: 'https://picsum.photos/400/300?random=2',
    owner: 'Bunda Minang Boutique',
    contactNumber: '6281987654321'
  },
  {
    id: '3',
    name: 'Packaged Beef Rendang',
    category: 'Culinary',
    price: 65000,
    description: 'Authentic beef rendang cooked with firewood for 8 hours. Durable and practical to bring as a souvenir.',
    image: 'https://picsum.photos/400/300?random=3',
    owner: 'Uni Emi Kitchen',
    contactNumber: '6281122334455'
  },
  {
    id: '4',
    name: 'Sanjai Balado Chips',
    category: 'Snacks',
    price: 25000,
    description: 'Crispy cassava chips coated with a spicy-sweet Balado seasoning that arouses the appetite.',
    image: 'https://picsum.photos/400/300?random=4',
    owner: 'Minang Raya Snack',
    contactNumber: '6285566778899'
  },
  {
    id: '5',
    name: 'Rumah Gadang Souvenir',
    category: 'Crafts',
    price: 150000,
    description: 'Miniature Rumah Gadang made of high-quality wood. Perfect for table decoration or a special gift.',
    image: 'https://picsum.photos/400/300?random=5',
    owner: 'Art Solsel',
    contactNumber: '6289988776655'
  },
  {
    id: '6',
    name: 'Kayu Aro Premium Tea',
    category: 'Beverage',
    price: 45000,
    description: 'Export quality black tea from the oldest tea plantation in Sumatra. Strong taste and calming.',
    image: 'https://picsum.photos/400/300?random=6',
    owner: 'Nusantara Tea',
    contactNumber: '628123123123'
  },
   {
    id: '7',
    name: 'Galamai Solok',
    category: 'Culinary',
    price: 35000,
    description: 'Typical Minangkabau dodol with a chewy texture and sweet taste of real palm sugar.',
    image: 'https://picsum.photos/400/300?random=7',
    owner: 'Grandma Kitchen',
    contactNumber: '628555444333'
  },
   {
    id: '8',
    name: 'Pandan Woven Bag',
    category: 'Crafts',
    price: 75000,
    description: 'Eco-friendly bag made from pandan leaves neatly woven by PKK mothers.',
    image: 'https://picsum.photos/400/300?random=8',
    owner: 'Creative Independent',
    contactNumber: '628777888999'
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

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      {/* Product Section - Refined for Global Standard */}
      <section id="produk" className="py-24 container mx-auto px-6 relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-solok-gold/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-solok-red/5 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < allProducts.length && (
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