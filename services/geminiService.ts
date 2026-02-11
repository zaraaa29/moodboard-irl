import { GoogleGenAI, Type } from "@google/genai";
import { AestheticAnalysis } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    aestheticName: { type: Type.STRING, description: "A creative, high-fashion name for the aesthetic (e.g., 'Soft Baroque', 'Cyber-Fairy Core')" },
    moodKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 structured keywords defining the mood"
    },
    emotionalTone: { type: Type.STRING, description: "Evocative description of how this style feels emotionally" },
    colorStory: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING, description: "Editorial description of the color palette" },
        palette: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hex: { type: Type.STRING, description: "Hex code" },
              name: { type: Type.STRING, description: "Creative color name" }
            }
          }
        }
      }
    },
    textureMaterial: { type: Type.STRING, description: "Fabrics, textures, and tactile elements observed" },
    stylingEnergy: { type: Type.STRING, description: "The vibe of the styling (e.g., 'Undone elegance', 'Strict tailoring')" },
    realLifeTranslation: { type: Type.STRING, description: "Actionable advice on how to translate this moodboard into a real outfit" },
    doList: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 things TO do to achieve this look"
    },
    dontList: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 things NOT to do (pitfalls)"
    }
  },
  required: ["aestheticName", "moodKeywords", "emotionalTone", "colorStory", "textureMaterial", "stylingEnergy", "realLifeTranslation", "doList", "dontList"]
};

export const analyzeMoodboard = async (base64Images: string[]): Promise<AestheticAnalysis> => {
  try {
    const parts = base64Images.map(base64 => {
       // Extract actual base64 data if it includes the prefix
       const data = base64.split(',')[1] || base64;
       return {
         inlineData: {
           mimeType: 'image/jpeg',
           data: data
         }
       };
    });

    // Add prompt part
    const promptPart = {
      text: `You are Mixboard and Pomelli, a luxury digital styling team. 
      Analyze these moodboard images as a high-end fashion editorial. 
      Identify the core aesthetic, emotional tone, and actionable styling advice.
      Be precise, evocative, and helpful. Use fashion industry terminology but keep it accessible.`
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        role: 'user',
        parts: [...parts, promptPart]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: ANALYSIS_SCHEMA,
        systemInstruction: "You are a world-class fashion director and stylist. Your output should feel like a page from Vogue or Harper's Bazaar. Sophisticated, yet clear.",
        temperature: 0.7, // A bit of creativity
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    return JSON.parse(jsonText) as AestheticAnalysis;

  } catch (error) {
    console.error("Error analyzing moodboard:", error);
    throw error;
  }
};