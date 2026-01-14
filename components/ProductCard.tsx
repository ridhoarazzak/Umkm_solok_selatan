import React, { useState } from 'react';
import { Product, GeminiStatus } from '../types';
import { generateMarketingCopy } from '../services/geminiService';
import { ShoppingCart, Wand2, Loader2, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const handleBuy = () => {
    const phoneNumber = product.contactNumber || "6288267051392"; 
    const message = language === 'id' 
      ? `Halo ${product.owner}, saya tertarik untuk membeli produk "${product.name}". Apakah stok masih tersedia?`
      : `Hello ${product.owner}, I am interested in buying "${product.name}". Is it still available?`;
      
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative overflow-hidden h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-solok-red transition-colors">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <p className="text-white text-xs font-medium">{t.products.sold_by}: {product.owner}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-solok-gold uppercase tracking-wider">{product.category}</span>
          <span className="font-serif font-bold text-lg text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-solok-red transition-colors">{product.name}</h3>
        
        <div className="flex-grow">
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
             {aiDescription || product.description}
          </p>
        </div>

        {/* AI Feature Area */}
        {status === GeminiStatus.SUCCESS && (
           <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 animate-fade-in">
             <div className="flex items-center gap-2 mb-1">
               <Wand2 size={12} className="text-indigo-600" />
               <span className="text-xs font-bold text-indigo-700">{t.products.ai_marketing}</span>
             </div>
             <p className="text-xs text-indigo-800 italic">"{aiDescription}"</p>
           </div>
        )}

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={handleBuy}
            className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex justify-center items-center gap-2"
          >
            <MessageCircle size={18} /> {t.products.buy_wa}
          </button>
          
          <button 
            onClick={handleGenerateDescription}
            disabled={status === GeminiStatus.LOADING}
            className="px-3 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
            title={t.products.ai_button_title}
          >
            {status === GeminiStatus.LOADING ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};