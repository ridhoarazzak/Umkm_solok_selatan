import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="beranda" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Rumah Gadang Solok Selatan" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up">
          Karya Anak Nagari
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Keindahan <span className="text-solok-gold italic">Solok Selatan</span><br />
          Dalam Genggaman
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Jelajahi ragam produk UMKM terbaik dari Bumi Saribu Rumah Gadang. 
          Dari kuliner autentik hingga kerajinan tangan bernilai seni tinggi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#produk" className="bg-solok-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2">
            Belanja Sekarang <ArrowRight size={20} />
          </a>
          <button className="px-8 py-4 rounded-full font-semibold text-white border border-white hover:bg-white hover:text-black transition-all">
            Pelajari Budaya Kami
          </button>
        </div>
      </div>
    </section>
  );
};
