export interface ColorPalette {
  hex: string;
  name: string;
}

export interface AestheticAnalysis {
  aestheticName: string;
  moodKeywords: string[];
  emotionalTone: string;
  colorStory: {
    description: string;
    palette: ColorPalette[];
  };
  textureMaterial: string;
  stylingEnergy: string;
  realLifeTranslation: string;
  doList: string[];
  dontList: string[];
}

export type ViewState = 'landing' | 'upload' | 'analyzing' | 'results';

export interface UploadedImage {
  id: string;
  url: string; // Base64 data URL
  file: File;
}