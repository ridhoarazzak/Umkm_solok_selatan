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
  // Govt & Business Fields
  isMbizReady?: boolean; 
  legalitas?: string[];  
  minOrder?: number;     
  // Agri & EUDR Specific Fields
  harvestDate?: string;
  eudrVerified?: boolean; // Status Bebas Deforestasi (EUDR)
  farmCoordinates?: string; // Titik Koordinat Kebun (Traceability)
  elevation?: string; // MDPL (Penting untuk Kopi)
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