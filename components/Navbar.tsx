import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoinPartner = () => {
    // Direct link to WhatsApp for partnership registration
    const phoneNumber = "6288267051392"; // Admin number
    const message = "Halo Admin, saya pelaku usaha di Solok Selatan dan tertarik untuk bergabung menjadi Mitra UMKM Digital.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-solok-gold p-2 rounded-lg text-white">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className={`text-xl font-bold font-serif ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              UMKM Solsel
            </h1>
            <p className={`text-xs tracking-wider uppercase ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
              Saribu Rumah Gadang
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Beranda', 'Produk', 'Tentang', 'Kontak'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm font-medium hover:text-solok-gold transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={handleJoinPartner}
            className="bg-solok-red hover:bg-red-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg flex items-center gap-2 transform hover:scale-105"
          >
            <Sparkles size={16} />
            Mitra UMKM
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isScrolled ? 'text-gray-900' : 'text-white'}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 md:hidden flex flex-col gap-4">
          {['Beranda', 'Produk', 'Tentang', 'Kontak'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 font-medium text-lg border-b border-gray-100 pb-2"
            >
              {item}
            </a>
          ))}
           <button 
            onClick={() => {
              handleJoinPartner();
              setMobileMenuOpen(false);
            }}
            className="bg-solok-red text-white py-3 rounded-lg text-center font-semibold mt-2 flex justify-center items-center gap-2"
          >
            <Sparkles size={16} /> Daftar Mitra UMKM
          </button>
        </div>
      )}
    </nav>
  );
};