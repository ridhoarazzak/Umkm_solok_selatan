import React, { useState } from 'react';
import { X, Send, Store } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    category: 'Kuliner',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "6288267051392"; // Admin Number
    const text = `Halo Admin UMKM Solsel, saya ingin mendaftarkan usaha saya:
    
Nama Pemilik: ${formData.ownerName}
Nama Usaha: ${formData.businessName}
Kategori: ${formData.category}
Deskripsi Singkat: ${formData.description}

Mohon arahannya untuk proses verifikasi. Terima kasih.`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-solok-red p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Store size={20} />
            <h3 className="font-bold">Daftarkan UMKM Anda</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Pemilik</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-solok-red focus:outline-none"
              value={formData.ownerName}
              onChange={e => setFormData({...formData, ownerName: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Usaha / Produk</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-solok-red focus:outline-none"
              value={formData.businessName}
              onChange={e => setFormData({...formData, businessName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-solok-red focus:outline-none"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Kuliner</option>
              <option>Fashion & Tekstil</option>
              <option>Kerajinan</option>
              <option>Pertanian</option>
              <option>Jasa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
            <textarea 
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-solok-red focus:outline-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="mt-2 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} /> Kirim ke WhatsApp Admin
          </button>
          <p className="text-xs text-gray-500 text-center">Data akan diverifikasi oleh admin sebelum ditampilkan di website.</p>
        </form>
      </div>
    </div>
  );
};