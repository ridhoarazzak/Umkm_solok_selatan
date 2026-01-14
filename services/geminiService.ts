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

  const primaryModel = 'gemini-2.5-flash';
  const fallbackModel = 'gemini-3-flash-preview';

  try {
    // Attempt 1: Try with Google Maps Grounding + Search + Location Context
    // Coordinates for Solok Selatan (approx. Padang Aro)
    const solokContext = {
      latitude: -1.565,
      longitude: 101.258
    };

    const response = await ai.models.generateContent({
      model: primaryModel,
      contents: `Carikan daftar 5 rekomendasi tempat ${categoryOrQuery} terbaik dan populer di Kabupaten Solok Selatan, Sumatera Barat. 
      Berikan deskripsi menarik tentang tempat tersebut.`,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: solokContext
          }
        },
      },
    });

    // Extract grounding chunks for Maps URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sourceLinks = chunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title || "Link Info", uri: chunk.web.uri };
        }
        if (chunk.maps) {
           return { title: chunk.maps.title || "Lokasi Google Maps", uri: chunk.maps.sourceUri || chunk.maps.uri };
        }
        return null;
      })
      .filter((link: any) => link !== null && link.uri);

    return {
      text: response.text || "Tidak ditemukan data spesifik.",
      sourceLinks: sourceLinks
    };

  } catch (error) {
    console.warn("Maps grounding failed, attempting fallback to text generation...", error);
    
    // Attempt 2: Fallback to standard text generation if Maps fails (e.g. API limits)
    try {
        const fallbackResponse = await ai.models.generateContent({
            model: fallbackModel,
            contents: `Berikan rekomendasi 5 tempat ${categoryOrQuery} populer di Solok Selatan, Sumatera Barat. Berikan deskripsi singkat. Format sebagai daftar yang rapi.`,
        });
        
        return {
            text: fallbackResponse.text || "Maaf, pencarian tidak memberikan hasil.",
            sourceLinks: [] // Fallback has no guaranteed maps links
        };
    } catch (fallbackError) {
        console.error("Fallback search failed:", fallbackError);
        throw new Error("Gagal mencari informasi. Silakan coba beberapa saat lagi.");
    }
  }
};