export interface Variant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  owner: string;
  contactNumber?: string;
  instagram?: string; 
  facebook?: string;  
  variants?: Variant[];
  // New Fields for Govt & Agri focus
  isMbizReady?: boolean; // Vendor siap masuk e-Katalog/Mbiz
  legalitas?: string[];  // NIB, PIRT, Halal
  harvestDate?: string;  // Untuk produk pertanian (Freshness)
  minOrder?: number;     // Minimum order untuk harga grosir
}

export interface BusinessTip {
  title: string;
  content: string;
  icon: string;
}

export interface PlaceResult {
  text: string;
  sourceLinks: {
    title: string;
    uri: string;
  }[];
}

export enum GeminiStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}