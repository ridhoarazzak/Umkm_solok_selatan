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
  instagram?: string; // New: Username IG
  facebook?: string;  // New: Username/Page FB
  variants?: Variant[];
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