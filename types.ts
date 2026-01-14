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
  variants?: Variant[]; // Optional array for product variants
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