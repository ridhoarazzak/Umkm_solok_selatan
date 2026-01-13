import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BusinessAssistant } from './components/BusinessAssistant';
import { Product } from './types';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

// Mock Data
const PRODUCTS: Product[] = [
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

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      
      {/* Product Section */}
      <section id="produk" className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Produk Unggulan
          </h2>
          <div className="w-24 h-1 bg-solok-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk-produk lokal berkualitas tinggi yang dibuat dengan cinta dan dedikasi oleh para pelaku UMKM Solok Selatan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
            Lihat Semua Produk
          </button>
        </div>
      </section>

      {/* Feature Section (Value Proposition) */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Asli Lokal", desc: "100% Produk asli buatan masyarakat Solok Selatan." },
              { title: "Kualitas Premium", desc: "Dikurasi secara ketat untuk menjamin kepuasan pelanggan." },
              { title: "Dukung Ekonomi", desc: "Setiap pembelian membantu perekonomian warga lokal." }
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
            <h2 className="text-4xl font-serif font-bold mb-6">Tentang UMKM Solok Selatan</h2>
            <p className="text-red-100 mb-6 leading-relaxed">
              Platform ini didedikasikan untuk mengangkat potensi luar biasa dari Solok Selatan, "Nagari Saribu Rumah Gadang". 
              Kami menghubungkan pengrajin, petani, dan kreator lokal langsung ke pasar global melalui teknologi.
            </p>
            <p className="text-red-100 leading-relaxed">
              Dengan sentuhan teknologi AI modern, kami membantu para pelaku usaha untuk meningkatkan branding 
              dan menjangkau lebih banyak pelanggan tanpa meninggalkan identitas budaya mereka.
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
                Pusat oleh-oleh dan kerajinan terbaik dari Solok Selatan. Terpercaya, Amanah, dan Berkualitas.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tautan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Beranda</a></li>
                <li><a href="#" className="hover:text-white">Produk</a></li>
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white">Cara Belanja</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kategori</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Kuliner</a></li>
                <li><a href="#" className="hover:text-white">Fashion & Tekstil</a></li>
                <li><a href="#" className="hover:text-white">Kerajinan</a></li>
                <li><a href="#" className="hover:text-white">Pertanian</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontak Kami</h4>
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
            &copy; {new Date().getFullYear()} UMKM Solok Selatan Digital. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Assistant */}
      <BusinessAssistant />
    </div>
  );
};

export default App;