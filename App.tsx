import React, { useState, useEffect } from 'react';
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

// --- DATA 10 UMKM SOLOK SELATAN (CURATED MOCKUP) - INDONESIA ---

const PRODUCTS_ID: Product[] = [
  // 1. KOPI (Padang Aro)
  {
    id: 'umkm-1',
    name: 'Kopi Arabika "Golden Solsel"',
    category: 'Minuman',
    price: 95000,
    description: 'Biji kopi Arabika single origin dari dataran tinggi Padang Aro (1.400 mdpl). Dipetik merah sempurna, menghasilkan notes rasa Caramel dan Chocolate yang kuat.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    owner: 'Kopi Alam Surambi',
    contactNumber: '6281234567890',
    variants: [
      { name: 'Roasted Bean (250g)', price: 95000 },
      { name: 'Ground / Bubuk Halus (250g)', price: 95000 },
      { name: 'Drip Bag (Box isi 10)', price: 85000 },
      { name: 'Green Bean (1kg)', price: 150000 }
    ]
  },
  // 2. RENDANG (Muara Labuh)
  {
    id: 'umkm-2',
    name: 'Rendang Paru Kering "Uni Emi"',
    category: 'Makanan',
    price: 75000,
    description: 'Rendang paru sapi yang dimasak kering (krispi). Tahan hingga 3 bulan tanpa pengawet. Dimasak menggunakan kayu manis asli Solok Selatan.',
    image: 'https://images.unsplash.com/photo-1603083569762-b9e76100914c?auto=format&fit=crop&q=80&w=800',
    owner: 'Dapur Minang Asli',
    contactNumber: '6281122334455',
    variants: [
        { name: 'Paru Kering (250g)', price: 75000 },
        { name: 'Rendang Daging Basah (500g)', price: 160000 },
        { name: 'Rendang Belut (250g)', price: 85000 }
    ]
  },
  // 3. SONGKET (Fashion Premium)
  {
    id: 'umkm-3',
    name: 'Songket Alat Tenun Bukan Mesin (ATBM)',
    category: 'Fashion',
    price: 2500000,
    description: 'Kain tenun eksklusif motif Pucuk Rebung dengan benang emas kristal import. Dikerjakan manual selama 1 bulan oleh pengrajin senior.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d3f661eb10?auto=format&fit=crop&q=80&w=800',
    owner: 'Galeri Tenun Bundo',
    contactNumber: '6281987654321',
    variants: [
      { name: 'Full Set (Kain + Selendang)', price: 2500000 },
      { name: 'Kain Sarung Saja', price: 1800000 },
      { name: 'Selendang Saja', price: 850000 }
    ]
  },
  // 4. CAMILAN (Oleh-oleh)
  {
    id: 'umkm-4',
    name: 'Keripik Sanjai Balado Sultan',
    category: 'Camilan',
    price: 30000,
    description: 'Keripik singkong irisan tipis dengan bumbu balado karamel yang melimpah (medok). Pedas manisnya pas, tidak bikin batuk.',
    image: 'https://images.unsplash.com/photo-1566453837860-637cc97c9ee3?auto=format&fit=crop&q=80&w=800',
    owner: 'Snack Rumah Gadang',
    contactNumber: '6285566778899',
    variants: [
      { name: 'Balado Merah (250g)', price: 30000 },
      { name: 'Balado Merah (500g)', price: 55000 },
      { name: 'Original Asin (250g)', price: 25000 }
    ]
  },
  // 5. KERAJINAN (Souvenir)
  {
    id: 'umkm-5',
    name: 'Miniatur Rumah Gadang Kayu Surian',
    category: 'Kerajinan',
    price: 450000,
    description: 'Hiasan meja otentik berbentuk Rumah Gadang. Dibuat dari limbah kayu Surian berkualitas tinggi dengan detail ukiran tangan.',
    image: 'https://images.unsplash.com/photo-1505374830113-5853234d748f?auto=format&fit=crop&q=80&w=800',
    owner: 'Solsel Craft Center',
    contactNumber: '6289988776655',
    variants: [
      { name: 'Size S (15x10cm)', price: 450000 },
      { name: 'Size M (30x20cm)', price: 850000 },
      { name: 'Size L (Custom + Kaca)', price: 1500000 }
    ]
  },
  // 6. TEH (Perkebunan)
  {
    id: 'umkm-6',
    name: 'Teh Hitam Premium Grade A',
    category: 'Minuman',
    price: 50000,
    description: 'Teh hitam orthodox yang diproses dari pucuk pecco pilihan. Memiliki warna seduhan merah tembaga yang jernih dan rasa yang sepat mantap.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231844f74?auto=format&fit=crop&q=80&w=800',
    owner: 'Mitra Teh Liki',
    contactNumber: '628123123123',
    variants: [
      { name: 'Pouch (100g)', price: 50000 },
      { name: 'Tin Can / Kaleng (100g)', price: 85000 },
      { name: 'Tea Bags (25 pcs)', price: 40000 }
    ]
  },
  // 7. BATIK (Fashion Etnik)
  {
    id: 'umkm-7',
    name: 'Batik Tanah Liek (Clay Batik)',
    category: 'Fashion',
    price: 375000,
    description: 'Batik tulis khas Minangkabau yang pewarnaan dasarnya menggunakan tanah liat (tanah liek). Warna earth tone yang sangat elegan.',
    image: 'https://images.unsplash.com/photo-1526417502920-5c68f44d1544?auto=format&fit=crop&q=80&w=800',
    owner: 'Sanggar Batik Nagari',
    contactNumber: '6287711223344',
    variants: [
      { name: 'Bahan Kain Katun (2m)', price: 375000 },
      { name: 'Bahan Kain Sutra (2m)', price: 1200000 },
      { name: 'Syal / Scarf', price: 150000 }
    ]
  },
  // 8. KULINER TRADISIONAL
  {
    id: 'umkm-8',
    name: 'Dendeng Batokok Lado Ijo',
    category: 'Makanan',
    price: 90000,
    description: 'Daging sapi pilihan yang dibakar lalu dipukul (batokok) hingga seratnya pecah, disiram sambal cabai hijau dan minyak kelapa murni.',
    image: 'https://images.unsplash.com/photo-1574484284008-86d47dc648d3?auto=format&fit=crop&q=80&w=800',
    owner: 'RM Salero Kampuang',
    contactNumber: '6285566778811',
    variants: [
      { name: 'Frozen Pack (250g)', price: 90000 },
      { name: 'Frozen Pack (500g)', price: 175000 },
      { name: 'Siap Makan (Box)', price: 95000 }
    ]
  },
  // 9. MAKANAN MANIS
  {
    id: 'umkm-9',
    name: 'Galamai Legit Gula Aren',
    category: 'Camilan',
    price: 40000,
    description: 'Dodol tradisional (Galamai) yang dimasak 6 jam di kuali besi. Tekstur kenyal, tidak lengket di gigi, manis legit gula aren asli.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800',
    owner: 'Galamai Uni Des',
    contactNumber: '628555444333',
    variants: [
      { name: 'Original (Pack 500g)', price: 40000 },
      { name: 'Wijen (Pack 500g)', price: 45000 },
      { name: 'Durian (Pack 500g)', price: 60000 }
    ]
  },
  // 10. CRAFT (Tas)
  {
    id: 'umkm-10',
    name: 'Tas Anyaman Pandan Etnik',
    category: 'Kerajinan',
    price: 125000,
    description: 'Tas anyaman daun pandan kombinasi kulit sintetis. Desain modern cocok untuk kondangan atau jalan-jalan santai.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    owner: 'Kreatif Mandiri Solsel',
    contactNumber: '628777888999',
    variants: [
      { name: 'Tote Bag Medium', price: 125000 },
      { name: 'Sling Bag / Tas Selempang', price: 95000 },
      { name: 'Clutch Pesta', price: 85000 }
    ]
  }
];

// --- DATA 10 SOUTH SOLOK MSME (TRANSLATED MOCKUP) - ENGLISH ---

const PRODUCTS_EN: Product[] = [
  // 1. COFFEE
  {
    id: 'umkm-1',
    name: '"Golden Solsel" Arabica Coffee',
    category: 'Beverages',
    price: 95000,
    description: 'Single origin Arabica coffee beans from Padang Aro highlands (1,400 masl). Perfectly red-picked, producing strong Caramel and Chocolate flavor notes.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    owner: 'Kopi Alam Surambi',
    contactNumber: '6281234567890',
    variants: [
      { name: 'Roasted Bean (250g)', price: 95000 },
      { name: 'Ground Coffee (250g)', price: 95000 },
      { name: 'Drip Bag (Box of 10)', price: 85000 },
      { name: 'Green Bean (1kg)', price: 150000 }
    ]
  },
  // 2. RENDANG
  {
    id: 'umkm-2',
    name: '"Uni Emi" Crispy Beef Lung Rendang',
    category: 'Food',
    price: 75000,
    description: 'Beef lung rendang cooked dry (crispy). Lasts up to 3 months without preservatives. Cooked using authentic South Solok cinnamon.',
    image: 'https://images.unsplash.com/photo-1603083569762-b9e76100914c?auto=format&fit=crop&q=80&w=800',
    owner: 'Dapur Minang Asli',
    contactNumber: '6281122334455',
    variants: [
        { name: 'Crispy Lung (250g)', price: 75000 },
        { name: 'Wet Beef Rendang (500g)', price: 160000 },
        { name: 'Eel Rendang (250g)', price: 85000 }
    ]
  },
  // 3. SONGKET
  {
    id: 'umkm-3',
    name: 'Hand-loomed Songket (ATBM)',
    category: 'Fashion',
    price: 2500000,
    description: 'Exclusive hand-woven fabric with Bamboo Shoot motif using imported crystal gold threads. Manually crafted for 1 month by senior artisans.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d3f661eb10?auto=format&fit=crop&q=80&w=800',
    owner: 'Galeri Tenun Bundo',
    contactNumber: '6281987654321',
    variants: [
      { name: 'Full Set (Cloth + Shawl)', price: 2500000 },
      { name: 'Sarong Only', price: 1800000 },
      { name: 'Shawl Only', price: 850000 }
    ]
  },
  // 4. SNACKS
  {
    id: 'umkm-4',
    name: 'Sultan\'s Sanjai Balado Chips',
    category: 'Snacks',
    price: 30000,
    description: 'Thinly sliced cassava chips with abundant spicy caramel seasoning. The perfect balance of spicy and sweet, simply addictive.',
    image: 'https://images.unsplash.com/photo-1566453837860-637cc97c9ee3?auto=format&fit=crop&q=80&w=800',
    owner: 'Snack Rumah Gadang',
    contactNumber: '6285566778899',
    variants: [
      { name: 'Red Balado (250g)', price: 30000 },
      { name: 'Red Balado (500g)', price: 55000 },
      { name: 'Original Salty (250g)', price: 25000 }
    ]
  },
  // 5. CRAFTS
  {
    id: 'umkm-5',
    name: 'Surian Wood Rumah Gadang Miniature',
    category: 'Crafts',
    price: 450000,
    description: 'Authentic desk decoration shaped like a Gadang House. Made from high-quality Surian wood waste with hand-carved details.',
    image: 'https://images.unsplash.com/photo-1505374830113-5853234d748f?auto=format&fit=crop&q=80&w=800',
    owner: 'Solsel Craft Center',
    contactNumber: '6289988776655',
    variants: [
      { name: 'Size S (15x10cm)', price: 450000 },
      { name: 'Size M (30x20cm)', price: 850000 },
      { name: 'Size L (Custom + Glass)', price: 1500000 }
    ]
  },
  // 6. TEA
  {
    id: 'umkm-6',
    name: 'Premium Grade A Black Tea',
    category: 'Beverages',
    price: 50000,
    description: 'Orthodox black tea processed from selected pecco shoots. Has a clear copper-red brew color and a robust astringent taste.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231844f74?auto=format&fit=crop&q=80&w=800',
    owner: 'Mitra Teh Liki',
    contactNumber: '628123123123',
    variants: [
      { name: 'Pouch (100g)', price: 50000 },
      { name: 'Tin Can (100g)', price: 85000 },
      { name: 'Tea Bags (25 pcs)', price: 40000 }
    ]
  },
  // 7. BATIK
  {
    id: 'umkm-7',
    name: 'Clay Batik (Batik Tanah Liek)',
    category: 'Fashion',
    price: 375000,
    description: 'Typical Minangkabau hand-drawn batik where the base coloring uses clay (tanah liek). Very elegant earth tone colors.',
    image: 'https://images.unsplash.com/photo-1526417502920-5c68f44d1544?auto=format&fit=crop&q=80&w=800',
    owner: 'Sanggar Batik Nagari',
    contactNumber: '6287711223344',
    variants: [
      { name: 'Cotton Fabric (2m)', price: 375000 },
      { name: 'Silk Fabric (2m)', price: 1200000 },
      { name: 'Scarf', price: 150000 }
    ]
  },
  // 8. TRADITIONAL FOOD
  {
    id: 'umkm-8',
    name: 'Green Chili Smashed Beef (Dendeng)',
    category: 'Food',
    price: 90000,
    description: 'Selected beef grilled and smashed until fibers break, doused with fresh green chili sambal and pure coconut oil.',
    image: 'https://images.unsplash.com/photo-1574484284008-86d47dc648d3?auto=format&fit=crop&q=80&w=800',
    owner: 'RM Salero Kampuang',
    contactNumber: '6285566778811',
    variants: [
      { name: 'Frozen Pack (250g)', price: 90000 },
      { name: 'Frozen Pack (500g)', price: 175000 },
      { name: 'Ready to Eat (Box)', price: 95000 }
    ]
  },
  // 9. SWEETS
  {
    id: 'umkm-9',
    name: 'Authentic Palm Sugar Galamai',
    category: 'Snacks',
    price: 40000,
    description: 'Traditional dodol (Galamai) cooked for 6 hours in an iron wok. Chewy texture, non-sticky, with authentic sweet palm sugar.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800',
    owner: 'Galamai Uni Des',
    contactNumber: '628555444333',
    variants: [
      { name: 'Original (Pack 500g)', price: 40000 },
      { name: 'Sesame (Pack 500g)', price: 45000 },
      { name: 'Durian (Pack 500g)', price: 60000 }
    ]
  },
  // 10. CRAFTS
  {
    id: 'umkm-10',
    name: 'Ethnic Pandan Woven Bag',
    category: 'Crafts',
    price: 125000,
    description: 'Woven pandan leaf bag combined with synthetic leather. Modern design suitable for parties or casual outings.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    owner: 'Kreatif Mandiri Solsel',
    contactNumber: '628777888999',
    variants: [
      { name: 'Tote Bag Medium', price: 125000 },
      { name: 'Sling Bag', price: 95000 },
      { name: 'Party Clutch', price: 85000 }
    ]
  }
];


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Pilih data berdasarkan bahasa. 
  const rawProducts = language === 'id' ? PRODUCTS_ID : PRODUCTS_EN; 
  
  // State Filter Kategori
  // Initialize with translated "All" to avoid mismatch on load/change
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Reset/Update filter when language changes
  useEffect(() => {
    setSelectedCategory(t.products.filter_all);
  }, [language, t.products.filter_all]);
  
  // Ambil list kategori unik
  // Use translated "All" as the first option
  const categories = [t.products.filter_all, ...Array.from(new Set(rawProducts.map(p => p.category)))];

  // Filter produk
  const filteredProducts = selectedCategory === t.products.filter_all
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