import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BusinessAssistant } from './components/BusinessAssistant';
import { Product, PlaceResult, GeminiStatus } from './types';
import { MapPin, Phone, Instagram, Facebook, Search, Map, Loader2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { searchPlacesInSolok } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

// Mock Data ID
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
];

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const displayedProducts = language === 'id' ? PRODUCTS_ID : PRODUCTS_EN;

  // Search Logic
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const [searchResult, setSearchResult] = useState<PlaceResult | null>(null);

  const handleSearch = async (query: string) => {
    setSearchStatus(GeminiStatus.LOADING);
    setSearchResult(null);
    try {
      const result = await searchPlacesInSolok(query);
      setSearchResult(result);
      setSearchStatus(GeminiStatus.SUCCESS);
    } catch (e) {
      setSearchStatus(GeminiStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      
      {/* Product Section */}
      <section id="produk" className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {t.products.title}
          </h2>
          <div className="w-24 h-1 bg-solok-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
            {t.products.view_all}
          </button>
        </div>
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

                {/* Grounding Source Links */}
                {searchResult.sourceLinks.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {searchResult.sourceLinks.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg transition-all group"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <MapPin size={16} className="text-solok-red flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{link.title}</span>
                        </div>
                        <ArrowUpRight size={14} className="text-gray-400 group-hover:text-blue-500" />
                      </a>
                    ))}
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