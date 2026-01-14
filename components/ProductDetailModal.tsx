import React from 'react';
import { X, MessageCircle, CheckCircle2, ShoppingBag, Briefcase, FileText, Trees, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const { t, language } = useLanguage();

  if (!isOpen || !product) return null;

  const handleBuyVariant = (variantName: string, variantPrice: number) => {
    const phoneNumber = product.contactNumber || "6288267051392";
    const message = language === 'id'
      ? `Halo ${product.owner}, saya tertarik membeli "${product.name}" varian: *${variantName}* seharga Rp ${variantPrice.toLocaleString('id-ID')}. Apakah stok tersedia?`
      : `Hello ${product.owner}, I am interested in buying "${product.name}" variant: *${variantName}* for Rp ${variantPrice.toLocaleString('id-ID')}. Is it available?`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleB2BQuote = () => {
    const phoneNumber = product.contactNumber || "6288267051392";
    const message = `Yth. ${product.owner},

Saya bermaksud meminta *Penawaran Resmi (Quotation)* untuk pengadaan:

Produk: ${product.name}
Kebutuhan: [Sebutkan Jumlah]

Mohon lampirkan sertifikat EUDR/Bebas Deforestasi dan data koordinat lahan. Terima kasih.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Image Side */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900">
              {product.category}
            </span>
            {product.eudrVerified && (
              <span className="bg-green-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1">
                <Trees size={12} /> {t.products.eudr_badge}
              </span>
            )}
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                <ShoppingBag size={14} className="text-solok-gold" /> 
                {product.owner}
              </p>
            </div>
            <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {product.description}
          </p>

          {/* EUDR & Traceability Section */}
          {product.eudrVerified && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl">
              <h5 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-3 flex items-center gap-1">
                <MapPin size={14} /> {t.products.traceability}
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <span className="text-[10px] text-green-600 uppercase font-bold block mb-1">{t.products.coords}</span>
                   <p className="text-sm font-mono text-green-900 bg-white/50 p-1 rounded border border-green-100 inline-block">
                     {product.farmCoordinates}
                   </p>
                </div>
                <div>
                   <span className="text-[10px] text-green-600 uppercase font-bold block mb-1">{t.products.elevation}</span>
                   <p className="text-sm font-medium text-green-900">
                     {product.elevation}
                   </p>
                </div>
              </div>
              <p className="text-[10px] text-green-700 mt-2 italic">
                *Produk ini telah lolos verifikasi polygon bebas deforestasi sesuai regulasi EUDR.
              </p>
            </div>
          )}

          {/* Legalitas Info */}
          {product.legalitas && product.legalitas.length > 0 && (
            <div className="mb-6">
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Legalitas & Sertifikasi</h5>
              <div className="flex flex-wrap gap-2">
                {product.legalitas.map((l, i) => (
                  <span key={i} className="text-xs text-gray-600 font-medium px-2 py-1 bg-gray-50 rounded border border-gray-200">{l}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            {/* B2B / Export Action */}
            {(product.eudrVerified || product.isMbizReady) && (
              <button 
                onClick={handleB2BQuote}
                className="w-full mb-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Briefcase size={18} /> {t.products.buy_b2b}
              </button>
            )}

            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <CheckCircle2 size={18} className="text-solok-green" />
              {language === 'id' ? 'Pilih Varian (Retail)' : 'Select Variant (Retail)'}
            </h4>
            
            <div className="space-y-3">
              {product.variants && product.variants.length > 0 ? (
                product.variants.map((variant, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-solok-gold hover:bg-solok-gold/5 transition-all group">
                    <div>
                      <p className="font-bold text-gray-900">{variant.name}</p>
                      <p className="text-solok-gold font-bold text-sm">Rp {variant.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                      onClick={() => handleBuyVariant(variant.name, variant.price)}
                      className="bg-white text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
                    >
                      <MessageCircle size={16} /> Beli
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">Standar</p>
                    <p className="text-solok-gold font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</p>
                  </div>
                   <button 
                      onClick={() => handleBuyVariant("Standar", product.price)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg"
                    >
                      <MessageCircle size={18} /> Pesan Sekarang
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};