import { GoogleGenAI } from "@google/genai";
import { PlaceResult } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMarketingCopy = async (productName: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return "Deskripsi produk otomatis tidak tersedia tanpa API Key. Silakan hubungi administrator.";
  }

  try {
    const prompt = `Buatkan deskripsi pemasaran yang menarik, elegan, dan emosional untuk produk UMKM khas Solok Selatan.
    Nama Produk: ${productName}
    Kategori: ${category}
    
    Gunakan Bahasa Indonesia yang persuasif. Fokus pada kualitas, tradisi, dan keunikan. Maksimal 100 kata.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Gagal membuat deskripsi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gagal menghubungi asisten AI.");
  }
};

export const askBusinessAdvisor = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "Maaf, fitur tanya jawab memerlukan API Key.";
  }

  try {
    const prompt = `Anda adalah konsultan bisnis ahli untuk UMKM di daerah Solok Selatan, Sumatera Barat. 
    Jawablah pertanyaan berikut dengan saran yang praktis, ramah, dan sesuai dengan konteks lokal (Sumatera Barat).
    
    Pertanyaan: "${question}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 } 
      }
    });

    return response.text || "Tidak ada jawaban.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat memproses pertanyaan Anda.";
  }
};

export const searchPlacesInSolok = async (categoryOrQuery: string): Promise<PlaceResult> => {
  if (!apiKey) {
    throw new Error("API Key required");
  }

  try {
    // We must use gemini-2.5-flash for Maps Grounding
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Carikan rekomendasi tempat ${categoryOrQuery} terbaik di Kabupaten Solok Selatan, Sumatera Barat. 
      Berikan deskripsi singkat kenapa tempat itu menarik.`,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    // Extract grounding chunks for Maps URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Robustly extract links from various potential chunk types (web or maps)
    const sourceLinks = chunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title || "Link Web", uri: chunk.web.uri };
        }
        if (chunk.maps) {
           // Maps chunks often contain the direct Google Maps URI
           return { title: chunk.maps.title || "Lihat di Google Maps", uri: chunk.maps.sourceUri || chunk.maps.uri };
        }
        return null;
      })
      .filter((link: any) => link !== null && link.uri);

    return {
      text: response.text || "Tidak ditemukan data.",
      sourceLinks: sourceLinks
    };

  } catch (error) {
    console.error("Gemini Maps Error:", error);
    throw new Error("Gagal mencari lokasi. Pastikan API Key valid.");
  }
};