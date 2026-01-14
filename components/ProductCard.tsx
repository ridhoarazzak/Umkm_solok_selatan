import React, { useState } from 'react';
import { Product, GeminiStatus } from '../types';
import { generateMarketingCopy } from '../services/geminiService';
import { Wand2, Loader2, Heart, MessageCircle, BadgeCheck, ListFilter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const { t, language } = useLanguage();

  const handleGenerateDescription = async () => {
    setStatus(GeminiStatus.LOADING);
    try {
      const result = await generateMarketingCopy(product.name, product.category);
      setAiDescription(result);
      setStatus(GeminiStatus.SUCCESS);
    } catch (e) {
      setStatus(GeminiStatus.ERROR);
    }
  };

  const handleAction = () => {
    // If product has variants and the handler is provided, open the modal
    if (product.variants && product.variants.length > 0 && onOpenDetail) {
      onOpenDetail(product);
    } else {
      // Direct buy logic (Fallback)
      const phoneNumber = product.contactNumber || "6288267051392"; 
      const message = language === 'id' 
        ? `Halo ${product.owner}, saya melihat produk "${product.name}" di Web UMKM Solsel dan tertarik untuk membelinya. Apakah stok masih tersedia?`
        : `Hello ${product.owner}, I saw "${product.name}" on the Solsel MSME Web and I'm interested in buying it. Is it still available?`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100 flex flex-col h-full relative">
      
      {/* Image Section */}
      <div className="relative overflow-hidden h-72 cursor-pointer" onClick={handleAction}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4">
             <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 shadow-sm border border-gray-100">
                {product.category}
             </span>
        </div>
        <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-solok-red hover:bg-white transition-all shadow-sm transform hover:scale-110">
          <Heart size={20} />
        </button>
        
        {/* Verified Badge Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
           <BadgeCheck size={14} className="text-solok-gold" />
           <p className="text-white text-xs font-medium">{product.owner}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-3">
           <h3 className="text-xl font-bold text-gray-900 group-hover:text-solok-gold transition-colors line-clamp-1 cursor-pointer" onClick={handleAction} title={product.name}>
             {product.name}
           </h3>
        </div>
        
        <p className="font-serif text-2xl font-bold text-gray-900 mb-4">
          {hasVariants ? (
            <span className="text-lg text-gray-600 font-sans font-normal">Mulai dari Rp {Math.min(...product.variants!.map(v => v.price)).toLocaleString('id-ID')}</span>
          ) : (
            `Rp ${product.price.toLocaleString('id-ID')}`
          )}
        </p>
        
        <div className="flex-grow">
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
             {aiDescription || product.description}
          </p>
        </div>

        {/* AI Feature Area */}
        {status === GeminiStatus.SUCCESS && (
           <div className="mb-5 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 shadow-inner animate-fade-in relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
             <div className="flex items-center gap-2 mb-2 relative z-10">
               <Wand2 size={14} className="text-indigo-600" />
               <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{t.products.ai_marketing}</span>
             </div>
             <p className="text-sm text-indigo-900 italic font-medium leading-relaxed relative z-10">"{aiDescription}"</p>
           </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-50 mt-auto">
          <button 
            onClick={handleAction}
            className={`flex-1 text-white py-3.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all flex justify-center items-center gap-2 group/btn ${hasVariants ? 'bg-gray-900 hover:bg-gray-800' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}
          >
            {hasVariants ? <ListFilter size={20} /> : <MessageCircle size={20} className="group-hover/btn:rotate-12 transition-transform" />}
            {hasVariants ? (language === 'id' ? 'Pilih Varian' : 'Select Variant') : t.products.buy_wa}
          </button>
          
          <button 
            onClick={handleGenerateDescription}
            disabled={status === GeminiStatus.LOADING}
            className="px-4 py-3.5 bg-gray-50 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-transparent transition-all"
            title={t.products.ai_button_title}
          >
            {status === GeminiStatus.LOADING ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};