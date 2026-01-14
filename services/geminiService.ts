import { GoogleGenAI } from "@google/genai";
import { PlaceResult } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Hardcoded data for offline/fallback mode
const LOCAL_RECOMMENDATIONS = [
  {
    name: "Kawasan Saribu Rumah Gadang",
    desc: "Kawasan cagar budaya dengan ratusan rumah adat Minangkabau yang megah. Ikon wisata Solok Selatan.",
    category: "wisata"
  },
  {
    name: "Air Terjun Tansi Ampek",
    desc: "Air terjun eksotis di kaki Gunung Kerinci dengan pemandangan kebun teh yang asri.",
    category: "wisata"
  },
  {
    name: "Goa Batu Kapal",
    desc: "Fenomena geologi unik berupa dinding batu kapur berwarna-warni yang menyerupai kapal layar.",
    category: "wisata"
  },
  {
    name: "Hot Water Boom Sapan Maluluang",
    desc: "Pemandian air panas alami yang bersumber dari panas bumi, cocok untuk relaksasi.",
    category: "wisata"
  },
  {
    name: "Masjid Agung Solok Selatan",
    desc: "Landmark megah dengan arsitektur menawan, pusat kegiatan keagamaan di Padang Aro.",
    category: "religi"
  },
  {
    name: "Sate Kambing Padang Aro",
    desc: "Kuliner legendaris dengan daging empuk dan bumbu kacang yang kaya rempah.",
    category: "kuliner"
  },
  {
    name: "Hotel Pesona Alam",
    desc: "Penginapan nyaman dengan pemandangan alam yang indah dan fasilitas lengkap.",
    category: "hotel"
  }
];

export const generateMarketingCopy = async (productName: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return `Produk ${productName} adalah pilihan terbaik dalam kategori ${category}. Dibuat dengan bahan pilihan khas Solok Selatan, menawarkan kualitas premium dan cita rasa otentik yang tak terlupakan.`;
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
    return `Nikmati keindahan dan kualitas asli Solok Selatan dengan ${productName}. Produk ${category} unggulan yang dikerjakan dengan hati oleh pengrajin lokal.`;
  }
};

export const askBusinessAdvisor = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "Maaf, saya sedang dalam mode offline. Silakan hubungi admin via WhatsApp untuk konsultasi lebih lanjut.";
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
    return "Maaf, terjadi gangguan koneksi. Silakan coba lagi nanti.";
  }
};

export const searchPlacesInSolok = async (categoryOrQuery: string): Promise<PlaceResult> => {
  // Helper to get local results
  const getLocalResults = (query: string) => {
    const q = query.toLowerCase();
    const results = LOCAL_RECOMMENDATIONS.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
    
    const finalResults = results.length > 0 ? results : LOCAL_RECOMMENDATIONS.slice(0, 4);
    
    const text = `**Hasil Pencarian (Mode Offline):**\n\n` + 
      finalResults.map(place => `*   **${place.name}**: ${place.desc}`).join('\n') +
      `\n\n*Catatan: Koneksi ke Google Maps sedang tidak tersedia, menampilkan rekomendasi lokal populer.*`;

    return {
      text,
      sourceLinks: []
    };
  };

  if (!apiKey) {
    return getLocalResults(categoryOrQuery);
  }

  const primaryModel = 'gemini-2.5-flash';
  const fallbackModel = 'gemini-3-flash-preview';

  try {
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
      text: response.text || "Data ditemukan.",
      sourceLinks: sourceLinks
    };

  } catch (error) {
    console.warn("Primary search failed, trying fallback...", error);
    
    try {
        const fallbackResponse = await ai.models.generateContent({
            model: fallbackModel,
            contents: `Berikan rekomendasi 5 tempat ${categoryOrQuery} populer di Solok Selatan, Sumatera Barat. Berikan deskripsi singkat. Format sebagai daftar yang rapi.`,
        });
        
        return {
            text: fallbackResponse.text || "Rekomendasi ditemukan.",
            sourceLinks: []
        };
    } catch (fallbackError) {
        console.error("All AI attempts failed, using local data.", fallbackError);
        return getLocalResults(categoryOrQuery);
    }
  }
};